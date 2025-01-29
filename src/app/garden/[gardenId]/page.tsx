"use client"
import React, { useEffect, useState } from 'react';
import { stringify } from 'yaml';
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../amplify/data/resource";
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
const amplifyClient = generateClient<Schema>();

function Page({
    params,
}: {
    params: Promise<{ gardenId: string }>
}) {
    const [activeGarden, setActiveGarden] = useState<Schema["Garden"]["createType"]>();
    const [plannedSteps, setPlannedSteps] = useState<Array<Schema["PlannedStep"]["createType"]>>();
    const [pastSteps, setPastSteps] = useState<Array<Schema["PastStep"]["createType"]>>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const gardenSubscriptionHandler = async () => {
            const gardenId = (await params).gardenId
            if (gardenId) {
                const gardenSub = amplifyClient.models.Garden.observeQuery({
                    filter: {
                        id: { eq: gardenId }
                    }
                }).subscribe({
                    next: ({ items, isSynced }) => {
                        setActiveGarden(items[0])
                    }
                })

                const plannedStepsSub = amplifyClient.models.PlannedStep.observeQuery({
                    filter: {
                        gardenId: { eq: gardenId }
                    }
                }).subscribe({
                    next: ({ items, isSynced }) => {
                        setPlannedSteps(items)
                        console.log('plannedSteps: ', items)
                    }
                })

                return () => {
                    gardenSub.unsubscribe(),
                    plannedStepsSub.unsubscribe()
                };
            }
        }

        gardenSubscriptionHandler()
        
    }, [params])

    if (!activeGarden) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2}>
                <Box gridColumn="span 12">
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
                        </CardContent>
                    </Card>
                </Box>
                {plannedSteps?.map((plannedStep, index) => (
                    <Box key={index} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {plannedStep.step?.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {plannedStep.step?.description}
                                </Typography>
                                {plannedStep.step?.plantRows?.map((row, rowIndex) => (
                                    <Box key={rowIndex} mt={2}>
                                        <Typography variant="body2" color="text.secondary">
                                            Species: {row?.species}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Plant Date: {row?.plantDate ? new Date(row.plantDate).toLocaleDateString() : "Unknown"}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Expected Harvest: {row?.expectedHarvest?.date ? new Date(row.expectedHarvest.date).toLocaleDateString() : "Unknown"} - {row?.expectedHarvest?.amount} {row?.expectedHarvest?.unit}
                                        </Typography>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
            <pre>{JSON.stringify(plannedSteps, null, 2)}</pre>
        </Box>
    );
}

export default Page;