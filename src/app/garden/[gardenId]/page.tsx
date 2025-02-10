"use client"
import React, { useEffect, useState } from 'react';
// import { stringify } from 'yaml';
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../amplify/data/resource";
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

// import FloatingHidableChatBox from '@/components/FloatingHidableChatBox';
import ChatBoxDrawer from '@/components/ChatBoxDrawer';
import { PlannedSteps, GardenWithSvg } from '@/../utils/types';
import { createGardenSVG } from '@/../utils/drawing';

const amplifyClient = generateClient<Schema>();

function Page({
    params,
}: {
    params: Promise<{ gardenId: string }>
}) {
    const [activeGarden, setActiveGarden] = useState<GardenWithSvg>();
    const [activeGardenSvg, setActiveGardenSvg] = useState<React.JSX.Element>();
    const [plantedPlantRows, setPlantedPlantRows] = useState<Schema["PlantedPlantRow"]["createType"][]>([]);
    const [plannedSteps, setPlannedSteps] = useState<PlannedSteps>([]);
    // const [pastSteps, setPastSteps] = useState<Array<Schema["PastStep"]["createType"]>>();

    const setActiveGardenAndUpload = async (newGarden: Schema["Garden"]["createType"]) => {
        const gardenId = (await params).gardenId
        const newGardenResponse = await amplifyClient.models.Garden.update({
            id: gardenId,
            ...newGarden
        });
        // if (!newGardenResponse.data) return;
        // const plantRows = newGardenResponse.data.plantRows || []
        // const newGardenSvg = createGardenSVG({
        //     garden: newGardenResponse.data,
        //     plantRows: plantRows
        // })

        if (newGardenResponse.data) setActiveGarden(newGardenResponse.data)
    }

    const proccessPlannedSteps = React.useCallback((params: { garden: GardenWithSvg, unproccessedPlanSteps: PlannedSteps }) => {
        const { garden, unproccessedPlanSteps } = params
        if (garden) {
            // console.log('unproccessedPlanSteps: ', unproccessedPlanSteps)
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

                const plantRows = item.step.plantRows
                // .map(step => step.step?.plantRows || [])
                // .flat()
                // .filter(row => row)
                // console.log("Planned step plant rows: ", plantRows)
                return {
                    ...item,
                    gardenSvg: createGardenSVG({
                        garden: garden,
                        // plannedSteps: [item], 
                        plantRows: plantRows
                    })
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

    }, [])

    const setPlannedStepsAndAddSvg = (newPlannedSteps: PlannedSteps) => {
        setPlannedSteps(prev => {
            const processedPlannedSteps = proccessPlannedSteps({
                garden: activeGarden!,
                unproccessedPlanSteps: [
                    ...prev,
                    ...newPlannedSteps

                ]
            })
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
    }, [activeGarden])

    //Update the activeGardenSvg when plantedPlantRows change
    useEffect(() => {
        if (activeGarden && activeGarden.id) {
            setActiveGardenSvg(createGardenSVG({
                garden: activeGarden,
                plantRows: plantedPlantRows.map(row => row.info)
            }))
        }
    }, [activeGarden, plantedPlantRows])

    //Query the planned steps
    useEffect(() => {
        const fetchPlannedSteps = async () => {
            if (!activeGarden) return;
            const { data: newPlannedSteps } = await activeGarden.plannedSteps()
            // setPlannedStepsAndAddSvg(plannedSteps)
            setPlannedSteps(prev => {
                const processedPlannedSteps = proccessPlannedSteps({
                    garden: activeGarden,
                    unproccessedPlanSteps: [
                        ...prev,
                        ...newPlannedSteps

                    ]
                })
                if (processedPlannedSteps) return processedPlannedSteps
                else return prev
            });
        }
        fetchPlannedSteps();
    }, [activeGarden, proccessPlannedSteps, setPlannedSteps]);

    if (!activeGarden || !activeGarden.id) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" flexDirection="row" gap={2}>
                    <Card sx={{ minWidth: 200 }}>
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
                                            {/* <Typography variant="body2" color="text.secondary">
                                                Spacing: {JSON.stringify(row.info?.plantSpacingInMeters)}
                                            </Typography> */}
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
                    {activeGardenSvg}
                </Box>
                {plannedSteps?.map((plannedStep, index) => (
                    <Box key={index} display="flex" flexDirection="row" gap={2}>
                        <Card sx={{ minWidth: 200 }}>
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
                                        {/* <Typography variant="body2" color="text.secondary">
                                            Location: {JSON.stringify(row?.location)}
                                        </Typography> */}
                                        <Typography variant="body2" color="text.secondary">
                                            Expected Harvest: {row?.expectedHarvest?.date ? new Date(row.expectedHarvest.date).toLocaleDateString() : "Unknown"} - {row?.expectedHarvest?.amount} {row?.expectedHarvest?.unit}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={async () => {
                                                if (!row) return;
                                                const daysToHarvest = (
                                                    row.expectedHarvest?.date &&
                                                    plannedStep.plannedDate
                                                ) && Math.ceil((new Date(row.expectedHarvest.date).getTime() - new Date(plannedStep.plannedDate).getTime()) / (1000 * 60 * 60 * 24));
                                                console.log(`
                                                    Plant Date: ${plannedStep.plannedDate}
                                                    Expected Harvest: ${row.expectedHarvest?.date}
                                                    Days to harvest: `, daysToHarvest);
                                                const newPlantedPlantRow: Schema["PlantedPlantRow"]["createType"] = {
                                                    gardenId: activeGarden.id,
                                                    info: {
                                                        ...row,
                                                        plantDate: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
                                                        expectedHarvest: {
                                                            ...row.expectedHarvest,
                                                            date: new Date(new Date().setDate(new Date().getDate() + Number(daysToHarvest))).toISOString().split('T')[0],
                                                        }
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
            {/* <FloatingHidableChatBox
                gardenId={activeGarden.id}
                initialFullScreenStatus={activeGarden.objective === ""}
                setGarden={setActiveGardenAndUpload}
                setPlannedSteps={setPlannedStepsAndAddSvg}
            /> */}

            <ChatBoxDrawer
                gardenId={activeGarden.id}
                initialFullScreenStatus={activeGarden.objective === ""}
                setGarden={setActiveGardenAndUpload}
                setPlannedSteps={setPlannedStepsAndAddSvg}
            />



            {/* <pre>{JSON.stringify(activeGarden, null, 2)}</pre>
            <pre>{JSON.stringify(plannedSteps, null, 2)}</pre> */}
        </Box>
    );
}

export default Page;