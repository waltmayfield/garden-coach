"use client"
import React from 'react';
import { Container, TextField, Typography } from '@mui/material';
import { Authenticator } from '@aws-amplify/ui-react';

import {
    Button
} from '@mui/material';

import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../amplify/data/resource";
const amplifyClient = generateClient<Schema>();

const CreatePage = () => {

    const [gardenObjective, setGardenObjective] = React.useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGardenObjective(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const newGarden = await amplifyClient.models.Garden.create({});
            amplifyClient.queries.generateGarden({ 
                gardenId: newGarden.data!.id,
                userInput: gardenObjective
            })
            // TODO: Now route the user to the garden's page
            // await amplifyClient.createGarden({ name: gardenName });
            alert("Garden created successfully!");
        } catch (error) {
            console.error("Error creating garden:", error);
            alert("Failed to create garden.");
        }
    };

    return (
        <Authenticator>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Create Garden
                </Typography>
                <TextField
                    label="Describe the goals you have for this garden."
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={gardenObjective}
                    onChange={handleInputChange}
                />
                <Button onClick={handleSubmit}>Submit</Button>
            </Container>
        </Authenticator>
    );
};

export default CreatePage;