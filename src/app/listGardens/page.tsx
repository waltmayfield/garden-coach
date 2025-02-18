"use client"
import React, { useEffect, useState } from 'react';
// import { stringify } from 'yaml';
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../amplify/data/resource";
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const amplifyClient = generateClient<Schema>();

const Page = () => {
    const [gardens, setGardens] = useState<Schema["Garden"]["createType"][]>([]);

    useEffect(() => {
        const fetchGardens = async () => {
            const result = await amplifyClient.models.Garden.list();
            setGardens(result.data);
        };
        fetchGardens();
    }, []);

    return (
        <Box>
            {gardens.map(garden => (
                <Card key={garden.id}>
                    <CardContent>
                        <Typography variant="h5">{garden.name}</Typography>
                        <Typography variant="body1">{garden.location?.cityStateAndCountry}</Typography>
                        <Box mt={2}>
                            <Button variant="contained" color="primary" href={`/garden/${garden.id}`}>
                                View Garden
                            </Button>
                        </Box>
                    <Box mt={2}>
                        <Button
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            color="secondary"
                            onClick={async () => {
                                if (window.confirm(`Are you sure you want to delete the garden "${garden.name}"?`)) {
                                    await amplifyClient.models.Garden.delete({ id: garden.id! });
                                    setGardens(gardens.filter(g => g.id !== garden.id));
                                }
                            }}
                        />
                    </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}

export default Page;