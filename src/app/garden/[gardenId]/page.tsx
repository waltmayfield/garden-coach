"use client"
import React, { useEffect, useState, useMemo } from 'react';
import { stringify } from 'yaml';
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../amplify/data/resource";
import { Box, Card, CardContent, Typography } from '@mui/material';
const amplifyClient = generateClient<Schema>();

interface GardenSVGProps {
    garden: Schema["Garden"]["createType"];
    plannedSteps: Schema["PlannedStep"]["createType"][];
}

const GardenSVG: React.FC<GardenSVGProps> = ({ garden, plannedSteps }) => {
    const speciesColorMap = useMemo(() => {
        const map = new Map<string, string>();
        plannedSteps.forEach(plannedStep => {
            plannedStep.step?.plantRows?.forEach(row => {
                if (row?.species && !map.has(row.species)) {
                    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                    map.set(row.species, color);
                }
            });
        });
        return map;
    }, [plannedSteps]);

    const renderPlantRows = () => {
        return plannedSteps
            .filter(plannedStep => (
                plannedStep.step &&
                plannedStep.step.plantRows
            ))
            .flatMap((plannedStep, stepIndex) =>
                plannedStep.step!.plantRows!
                    .filter(row => (row && row.location && row.species))
                    .map((row, rowIndex) => (
                        <g key={`step-${stepIndex}-row-${rowIndex}`}>
                            <line
                                x1={row!.location!.start.x}
                                y1={row!.location!.start.y}
                                x2={row!.location!.end.x}
                                y2={row!.location!.end.y}
                                stroke={speciesColorMap.get(row!.species!) || '#000000'}
                                strokeWidth={row!.plantSpacingInMeters || 0.1}
                            />
                            {/* <text
                    x={(row!.location!.start.x + row!.location!.end.x) / 2}
                    y={(row!.location!.start.y + row!.location!.end.y) / 2}
                    fontSize="0.5"
                    fill="black"
                    textAnchor="middle"
                    transform={`rotate(${Math.atan2(row!.location!.end.y - row!.location!.start.y, row!.location!.end.x - row!.location!.start.x) * 180 / Math.PI}, ${(row!.location!.start.x + row!.location!.end.x) / 2}, ${(row!.location!.start.y + row!.location!.end.y) / 2})`}
                    >
                    {row!.species}
                    </text> */}
                        </g>
                    ))
            );
    };

    const renderLegend = () => {
        return (
            <g className="legend">
                {[...speciesColorMap.entries()].map(([species, color], index) => (
                    <g key={`legend-${index}`} transform={`translate(0, ${index * 0.5})`}>
                        <rect x="5" y="1" width="1" height=".4" fill={color} />
                        <text x="6" y="1.3" fontSize=".3" fill="black">{species}</text>
                    </g>
                ))}
            </g>
        );
    };



    const renderPerimeter = () => {
        if (!garden.perimeterPoints) return;
        const points = garden.perimeterPoints.filter(point => point).map(point => `${point!.x},${point!.y}`).join(' ');
        return <polygon points={points} fill="saddlebrown" strokeWidth="0" stroke="black" />;
    };

    const getViewBox = () => {
        if (!garden.perimeterPoints) return "0 0 10 10";
        const xValues = garden.perimeterPoints.map(point => point!.x);
        const yValues = garden.perimeterPoints.map(point => point!.y);
        const minX = Math.min(...xValues);
        const maxX = Math.max(...xValues);
        const minY = Math.min(...yValues);
        const maxY = Math.max(...yValues);
        return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
    };

    return (
        <Box display="flex" flexDirection="row" gap={0}>
            <svg width="500" height="500" viewBox={getViewBox()}>
            {renderPerimeter()}
            {renderPlantRows()}
            {renderLegend()}
            </svg>
            <svg width="500" height="500" viewBox="0 0 10 10">
            {/* {renderPerimeter()}
            {renderPlantRows()} */}
            {renderLegend()}
            </svg>
        </Box>

    );
};


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
                        </CardContent>
                    </Card>
                </Box>
                {plannedSteps?.sort((a, b) => {
                    const dateA = new Date(a.plannedDate || 0);
                    const dateB = new Date(b.plannedDate || 0);
                    return dateA.getTime() - dateB.getTime();
                }).map((plannedStep, index) => (
                    <Box key={index} display="flex" flexDirection="row" gap={2}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {plannedStep.step?.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {plannedStep.plannedDate ? new Date(plannedStep.plannedDate).toLocaleDateString() : "Unknown"}
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
                                            Expected Harvest: {row?.expectedHarvest?.date ? new Date(row.expectedHarvest.date).toLocaleDateString() : "Unknown"} - {row?.expectedHarvest?.amount} {row?.expectedHarvest?.unit}
                                        </Typography>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                        <Box mt={5}>
                            <GardenSVG garden={activeGarden} plannedSteps={[plannedStep]} />
                        </Box>
                    </Box>
                ))}
            </Box>
            <pre>{JSON.stringify(activeGarden, null, 2)}</pre>
            <pre>{JSON.stringify(plannedSteps, null, 2)}</pre>
        </Box>
    );
}

export default Page;