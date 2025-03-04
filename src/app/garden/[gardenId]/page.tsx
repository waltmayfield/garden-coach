"use client"
import React, { useEffect, useState } from 'react';
// import { stringify } from 'yaml';
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../amplify/data/resource";
import { Box, Button, Card, CardActions, CardContent, Grid2 as Grid, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// import FloatingHidableChatBox from '@/components/FloatingHidableChatBox';
import ChatBoxDrawer from '@/components/ChatBoxDrawer';
import PlantRowCardContent from '@/components/PlantRowCardContent';
import EditableTextBox from '@/components/EditableTextBox';

import { PlannedSteps, GardenWithSvg } from '@/../utils/types';
import { createGardenSVG } from '@/../utils/drawing';
import { sendMessage } from '@/../utils/amplifyUtils';

const amplifyClient = generateClient<Schema>();

type WeeklyHarvest = { [week: string]: { [species: string]: number } };


function getWeekNumber(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
}

function getFirstDayOfWeek(weekNumber: number, year: number): Date {
    const firstDayOfYear = new Date(year, 0, 1);
    const daysOffset = (weekNumber - 1) * 7;
    const firstDayOfWeek = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + daysOffset));

    // Adjust to the first day of the week (assuming Sunday as the first day of the week)
    const dayOfWeek = firstDayOfWeek.getDay();
    const firstDay = new Date(firstDayOfWeek.setDate(firstDayOfWeek.getDate() - dayOfWeek));

    return firstDay;
}

const getWeeklyHarvestData = (plantRows: Schema["PlantedPlantRow"]["createType"]["info"][]) => {
    const weeklyHarvest: WeeklyHarvest = {};

    plantRows.forEach(row => {
        if (row && row.harvest?.first && row.harvest?.amount && row.species) {
            const harvestDate = new Date(row.harvest.first);
            const harvestDays = row.harvest.window || 1;
            const weeks = Math.ceil(harvestDays / 7);
            const amountPerWeek = row.harvest.amount / weeks;

            for (let i = 0; i < weeks; i++) {
                const weekDate = new Date(harvestDate);
                weekDate.setDate(harvestDate.getDate() + (i * 7));
                // const week = `${weekDate.getFullYear()}-W${Math.ceil(weekDate.getDate() / 7)}`;
                // const week = weekDate.toISOString().split('T')[0];
                // const week = getWeekNumber(weekDate).toString();
                const week = getFirstDayOfWeek(getWeekNumber(weekDate), weekDate.getFullYear()).toISOString().split('T')[0];

                if (!weeklyHarvest[week]) {
                    weeklyHarvest[week] = {};
                }

                if (!weeklyHarvest[week][row.species]) {
                    weeklyHarvest[week][row.species] = 0;
                }

                weeklyHarvest[week][row.species] += amountPerWeek;
            }
        }
    });

    return weeklyHarvest;
};

const getChartData = (weeklyHarvest: WeeklyHarvest) => {
    const labels = Object.keys(weeklyHarvest).sort();
    const species = [...new Set(Object.values(weeklyHarvest).flatMap(week => Object.keys(week)))];

    const colorPalette = [
        "#8BC34A", // Light Green
        "#FFEB3B", // Yellow
        "#FF9800", // Orange
        "#FF5722", // Deep Orange
        "#795548", // Brown
        "#4CAF50", // Green
        "#CDDC39", // Lime
        "#FFC107", // Amber
        "#FFEB3B", // Yellow
        "#FF9800", // Orange
    ];

    const datasets = species.map((speciesName, index) => ({
        label: speciesName,
        data: labels.map(week => weeklyHarvest[week][speciesName] || 0),
        backgroundColor: colorPalette[index % colorPalette.length],
    }));

    return {
        labels,
        datasets,
    };
};

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
    // const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
    // const [editValues, setEditValues] = useState<{ [key: string]: string }>({});

    // const handleDoubleClick = (field: string, value: string) => {
    //     setIsEditing(prev => ({ ...prev, [field]: true }));
    //     setEditValues(prev => ({ ...prev, [field]: value }));
    // };

    // const handleChange = (field: string, value: string) => {
    //     setEditValues(prev => ({ ...prev, [field]: value }));
    // };

    // const handleBlur = async (field: string, updateFunction: (value: string) => Promise<void>) => {
    //     setIsEditing(prev => ({ ...prev, [field]: false }));
    //     await updateFunction(editValues[field]);
    // };



    const setActiveGardenAndUpload = async (newGarden: Schema["Garden"]["createType"]) => {
        // console.log('New Garden for Update: ', newGarden)
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

    // const updatePlannedStep = async (updatedStep: Schema["PlannedStep"]["createType"]) => {
    //     const { data: newPlannedStep } = await amplifyClient.models.PlannedStep.update({
    //         id: updatedStep.id,
    //         ...updatedStep
    //     });
    //     if (newPlannedStep) {
    //         // response.data.
    //         // setPlannedSteps(prev => prev.filter(step => step !== null).map(step => step!.id === updatedStep.id ? response.data : step as PlannedSteps[number]));
    //         setPlannedSteps(prev => ({
    //             ...prev.filter(step => step.id !== updatedStep.id),
    //             newPlannedStep
    //         }))
    //     }
    // };

    // const updatePlantedPlantRow = async (updatedRow: Schema["PlantedPlantRow"]["createType"]) => {
    //     const response = await amplifyClient.models.PlantedPlantRow.update({
    //         id: updatedRow.id!,
    //         ...updatedRow
    //     });
    //     if (response.data) {
    //         setPlantedPlantRows(prev => prev.map(row => row.id === updatedRow.id ? response.data! : row));
    //     }
    // };

    // const updateGardenField = async (field: string, value: string) => {
    //     const updatedGarden = { ...activeGarden, [field]: value };
    //     await setActiveGardenAndUpload(updatedGarden);
    // };

    // const updatePlantedPlantRowField = async (id: string, field: string, value: string) => {
    //     const updatedRow = plantedPlantRows.find(row => row.id === id);
    //     if (updatedRow) {
    //         if (updatedRow.info) {
    //             (updatedRow.info as any)[field] = value;
    //         }
    //         await updatePlantedPlantRow(updatedRow);
    //     }
    // };

    // const updatePlannedStepField = async (id: string, field: string, value: string) => {
    //     const updatedStep = plannedSteps.find(step => step.id === id);
    //     if (updatedStep) {
    //         updatedStep.step[field] = value;
    //         await updatePlannedStep(updatedStep);
    //     }
    // };

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
                            <EditableTextBox
                                object={activeGarden}
                                fieldPath="name"
                                onUpdate={setActiveGardenAndUpload}
                                typographyVariant="h5"
                            />
                            <EditableTextBox
                                object={activeGarden}
                                fieldPath="objective"
                                onUpdate={setActiveGardenAndUpload}
                                typographyVariant="body2"
                            />
                            
                            {/* <Typography variant="h5" component="div">
                                {activeGarden.name}
                            </Typography> */}
                            {/* <Typography variant="body2" color="text.secondary">
                                {activeGarden.objective}
                            </Typography> */}
                            {/* <Typography variant="body2" color="text.secondary">
                                Location: {activeGarden.location?.cityStateAndCountry || "Unknown"}
                            </Typography> */}
                            <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                                <Typography variant="body2" color="text.secondary">
                                    Location:
                                </Typography>
                                <EditableTextBox
                                    object={activeGarden}
                                    fieldPath={['location', 'cityStateAndCountry']}
                                    onUpdate={setActiveGardenAndUpload}
                                    typographyVariant="body2"
                                    typographyColor = "text.secondary"
                                />
                            </Box>

                            <Box mt={2}>
                                <Typography variant="h6" component="div">
                                    Planted Rows
                                </Typography>
                                {plantedPlantRows.length === 0 ? (
                                    <Typography variant="body2" color="text.secondary">
                                        No plants have been planted yet.
                                    </Typography>
                                ) : (
                                    <Grid container spacing={2}>{
                                        plantedPlantRows.map((row, index) => (
                                            // <Box key={index} mt={1}>
                                            <Card
                                                key={index}
                                            >
                                                <PlantRowCardContent row={row.info} />
                                                <CardActions>
                                                    <Button
                                                        // variant="contained"
                                                        // color="secondary"
                                                        onClick={async () => {
                                                            if (row.id) {
                                                                await deletePlantedPlantRowAndUpload(row.id);
                                                            }
                                                        }}
                                                    >
                                                        X
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                            // </Box>
                                        ))
                                    }</Grid>
                                )}
                            </Box>
                            <Box mt={2}>
                                {activeGardenSvg}
                            </Box>

                        </CardContent>

                    </Card>


                </Box>


                <Box mt={5} sx={{ overflowX: 'auto' }}>
                    <Typography variant="h6" component="div">
                        Forecasted Harvest by Week
                    </Typography>
                    <Box sx={{ minHeight: 300 }}>
                        {/* <Box> */}
                        <Bar
                            data={getChartData(getWeeklyHarvestData([
                                ...plantedPlantRows.map(row => row.info),
                                ...plannedSteps.map(step => step.step?.plantRows || []).flat()
                            ]))}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Week',
                                        },
                                        stacked: true,
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: 'Units',
                                        },
                                        stacked: true,
                                    },
                                },
                            }}
                        />
                    </Box>
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

                                {/* <Box mt="2" flexDirection={"column"}> */}
                                <Grid container spacing={2}>
                                    {plannedStep.step?.plantRows?.map((row, rowIndex) => (
                                        // <Box key={rowIndex} mt={2}>
                                        <Card key={rowIndex}>
                                            <PlantRowCardContent row={row} />
                                            <CardActions>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={async () => {
                                                        if (!row) return;
                                                        const daysToHarvest = (
                                                            row.harvest?.first &&
                                                            plannedStep.plannedDate
                                                        ) && Math.ceil((new Date(row.harvest.first).getTime() - new Date(plannedStep.plannedDate).getTime()) / (1000 * 60 * 60 * 24));
                                                        console.log(`
                                                    Plant Date: ${plannedStep.plannedDate}
                                                    Expected Harvest: ${row.harvest?.first}
                                                    Days to harvest: `, daysToHarvest);
                                                        const newPlantedPlantRow: Schema["PlantedPlantRow"]["createType"] = {
                                                            gardenId: activeGarden.id,
                                                            info: {
                                                                ...row,
                                                                plantDate: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
                                                                harvest: {
                                                                    ...row.harvest,
                                                                    first: new Date(new Date().setDate(new Date().getDate() + Number(daysToHarvest))).toISOString().split('T')[0],
                                                                }
                                                            }
                                                        };
                                                        console.log("Creating new planted plant row:\n", newPlantedPlantRow);
                                                        await addPlantedPlantRowAndUpload(newPlantedPlantRow);
                                                    }}
                                                >
                                                    +
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    ))}

                                </Grid>
                                {/* </Box> */}
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
                            </CardContent>
                            <CardActions>
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
                                    X
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={async () => {
                                        const userUpdateMessagePrompt = prompt("Edit the step:", "");

                                        if (userUpdateMessagePrompt !== null && plannedStep.step) {

                                            const newMessage: Schema['ChatMessage']['createType'] = {
                                                role: 'human',
                                                content: {
                                                    text: `Create a new version the step with title ${plannedStep.step?.title}. ` + userUpdateMessagePrompt
                                                },
                                                gardenId: activeGarden.id,
                                                contextStepId: plannedStep.id
                                            }

                                            await sendMessage({
                                                gardenId: activeGarden.id,
                                                newMessage: newMessage
                                            })

                                            // TODO: find a way to open the chat box


                                            // Implement the logic to update the planned step
                                            // console.log(`Editing planned step: ${plannedStep.id}`, updatedStep);
                                            // You can call a function to update the planned step in the backend
                                        }
                                    }}
                                >
                                    Edit
                                </Button>
                            </CardActions>
                        </Card>

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
                initialFullScreenStatus={false}//{activeGarden && plannedSteps.length === 0}
                setGarden={setActiveGardenAndUpload}
                setPlannedSteps={setPlannedStepsAndAddSvg}
            />



            {/* <pre>{JSON.stringify(activeGarden, null, 2)}</pre>
            <pre>{JSON.stringify(plannedSteps, null, 2)}</pre> */}
        </Box>
    );
}

export default Page;