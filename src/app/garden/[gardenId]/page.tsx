"use client"
import React, { useEffect, useState, useMemo } from 'react';
// import { stringify } from 'yaml';
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../amplify/data/resource";
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

import FloatingHidableChatBox from '@/components/FloatingHidableChatBox';
import { PlannedSteps, GardenWithSvg } from '@/../utils/types';
import { createGardenSVG } from '@/../utils/drawing';

const amplifyClient = generateClient<Schema>();

function Page({
    params,
}: {
    params: Promise<{ gardenId: string }>
}) {
    const [activeGarden, setActiveGarden] = useState<GardenWithSvg>();
    const [plantedPlantRows, setPlantedPlantRows] = useState<Schema["PlantedPlantRow"]["createType"][]>([]);
    const [plannedSteps, setPlannedSteps] = useState<PlannedSteps>([]);
    // const [pastSteps, setPastSteps] = useState<Array<Schema["PastStep"]["createType"]>>();

    const proccessPlannedSteps = (unproccessedPlanSteps: PlannedSteps) => {
        if (activeGarden) {
            console.log('unproccessedPlanSteps: ', unproccessedPlanSteps)
            const uniquePlannedSteps = unproccessedPlanSteps.filter((step, index, self) =>
                index === self.findIndex((s) => s.id === step.id)
            );

            const plannedStepsWithSvg = uniquePlannedSteps.map(item => {
                // If the step has plant rows, render the garden svg
                if (
                    !item.step ||
                    !item.step.plantRows ||
                    item.step?.plantRows?.length === 0
                ) return item

                return {
                    ...item,
                    gardenSvg: createGardenSVG({ garden: activeGarden, plannedSteps: [item] })
                    // gardenSvg: <GardenSVG garden={activeGarden!} plannedSteps={[item]} />
                }
            })

            return (
                plannedStepsWithSvg.sort((a, b) => {
                    const dateA = new Date(a.plannedDate || 0);
                    const dateB = new Date(b.plannedDate || 0);
                    return dateA.getTime() - dateB.getTime();
                })
            )
        }

    }

    const setPlannedStepsAndAddSvg = (newPlannedSteps: PlannedSteps) => {
        proccessPlannedSteps(newPlannedSteps);

        setPlannedSteps(prev => {
            const processedPlannedSteps = proccessPlannedSteps([
                ...prev,
                ...newPlannedSteps

            ])
            if (processedPlannedSteps) return processedPlannedSteps
            else return prev
        });
    }

    const addPlantedPlantRowAndUpload = async (
        newPlantedPlantRow: Schema["PlantedPlantRow"]["createType"]
    ) => {
        const createPlantedPlantRowResponse = await amplifyClient.models.PlantedPlantRow.create(newPlantedPlantRow)
        console.log('createPlantedPlantRowResponse: ', createPlantedPlantRowResponse)
        if (createPlantedPlantRowResponse.data) setPlantedPlantRows(prev => [...prev, createPlantedPlantRowResponse.data!])
    }

    const deletePlantedPlantRowAndUpload = async (id: string) => {
        await amplifyClient.models.PlantedPlantRow.delete({ id: id })
        setPlantedPlantRows(prev => prev?.filter(row => row.id !== id))
    }


    //Query the garden
    useEffect(() => {
        const fetchGarden = async () => {
            const gardenId = (await params).gardenId
            if (gardenId) {
                const { data: newGardenData } = await amplifyClient.models.Garden.get({
                    id: gardenId
                });
                // console.log('newGardenData: ', newGardenData)
                if (newGardenData) setActiveGarden(newGardenData);
            }
        }
        fetchGarden()
    }, [params]);

    //Query the PlantedPlantRows
    useEffect(() => {
        const fetchPlantedPlantRows = async () => {
            if (!activeGarden) return;
            const { data: plantedPlantRows } = await activeGarden.plantedPlantRow()
            if (plantedPlantRows) setPlantedPlantRows(plantedPlantRows)
        }
        fetchPlantedPlantRows();
    }, [params])

    //Query the planned steps
    useEffect(() => {
        const fetchPlannedSteps = async () => {
            if (!activeGarden) return;
            const { data: plannedSteps } = await activeGarden.plannedSteps()
            const plannedStepsWithSvg = plannedSteps.map(item => {
                // If the step has plant rows, render the garden svg
                if (
                    !item.step ||
                    !item.step.plantRows ||
                    item.step?.plantRows?.length === 0
                ) return item

                return {
                    ...item,
                    gardenSvg: createGardenSVG({ garden: activeGarden, plannedSteps: [item] })
                    // gardenSvg: <GardenSVG garden={activeGarden!} plannedSteps={[item]} />
                }
            })

            setPlannedSteps(plannedStepsWithSvg)
        }
        fetchPlannedSteps();
    }, [activeGarden]);

    if (!activeGarden || !activeGarden.id) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Box display="flex" flexDirection="column" gap={2}>
                <Box>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {activeGarden.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {activeGarden.objective}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Location: {activeGarden.location?.cityStateAndCountry || "Unknown"}
                            </Typography>
                            <Box mt={2}>
                                <Typography variant="h6" component="div">
                                    Planted Rows
                                </Typography>
                                {plantedPlantRows.length === 0 ? (
                                    <Typography variant="body2" color="text.secondary">
                                        No plants have been planted yet.
                                    </Typography>
                                ) : (
                                    plantedPlantRows.map((row, index) => (
                                        <Box key={index} mt={1}>
                                            <Typography variant="body2" color="text.secondary">
                                                Species: {row.info?.species}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Location: {JSON.stringify(row.info?.location)}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Plant Date: {row.info?.plantDate ? new Date(row.info?.plantDate).toLocaleDateString() : "Unknown"}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Expected Harvest: {row.info?.expectedHarvest?.date ? new Date(row.info?.expectedHarvest.date).toLocaleDateString() : "Unknown"} - {row.info?.expectedHarvest?.amount} {row.info?.expectedHarvest?.unit}
                                            </Typography>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={async () => {
                                                if (row.id) {
                                                    await deletePlantedPlantRowAndUpload(row.id);
                                                }
                                            }}
                                        >
                                            Delete
                                        </Button>
                                        </Box>
                                    ))
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                {plannedSteps?.map((plannedStep, index) => (
                    <Box key={index} display="flex" flexDirection="row" gap={2}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {plannedStep.step?.title}
                                </Typography>
                                {/* <Typography variant="body2">
                                    {plannedStep.id}
                                </Typography> */}
                                <Typography variant="body2" color="text.secondary">
                                    {plannedStep.plannedDate ? new Date(plannedStep.plannedDate).toLocaleDateString() : "Unknown"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {plannedStep.step?.description}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={async () => {
                                        await amplifyClient.models.PlannedStep.delete({
                                            id: plannedStep.id!
                                        });
                                        setPlannedSteps(prev => prev?.filter(step => step.id !== plannedStep.id));
                                    }}
                                >
                                    Delete
                                </Button>
                                {plannedStep.step?.plantRows?.map((row, rowIndex) => (
                                    <Box key={rowIndex} mt={2}>
                                        <Typography variant="body2" color="text.secondary">
                                            Species: {row?.species}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Location: {JSON.stringify(row?.location)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Expected Harvest: {row?.expectedHarvest?.date ? new Date(row.expectedHarvest.date).toLocaleDateString() : "Unknown"} - {row?.expectedHarvest?.amount} {row?.expectedHarvest?.unit}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={async () => {
                                                if (!row) return;
                                                const newPlantedPlantRow: Schema["PlantedPlantRow"]["createType"] = {
                                                    gardenId: activeGarden.id,
                                                    info: {
                                                        species: row.species,
                                                        location: row.location,
                                                        expectedHarvest: row.expectedHarvest,
                                                        plantDate: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
                                                    }
                                                };
                                                console.log("Creating new planted plant row:\n", newPlantedPlantRow);
                                                await addPlantedPlantRowAndUpload(newPlantedPlantRow);
                                            }}
                                        >
                                            Add to Planted Rows
                                        </Button>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                        <Box mt={5}>
                            {(
                                plannedStep.step &&
                                plannedStep.step.plantRows &&
                                plannedStep.step?.plantRows?.length > 0
                            ) && (
                                    // <GardenSVG garden={activeGarden} plannedSteps={[plannedStep]} />
                                    plannedStep.gardenSvg
                                )}
                            {/* <GardenSVG garden={activeGarden} plannedSteps={[plannedStep]} /> */}
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Floating Chat Box */}
            <FloatingHidableChatBox
                gardenId={activeGarden.id}
                setPlannedSteps={setPlannedStepsAndAddSvg}
            />

            {/* <pre>{JSON.stringify(activeGarden, null, 2)}</pre>
            <pre>{JSON.stringify(plannedSteps, null, 2)}</pre> */}
        </Box>
    );
}

export default Page;