"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Container, List, ListItem, TextField, Typography } from '@mui/material';
import { Authenticator } from '@aws-amplify/ui-react';

import {
    Button
} from '@mui/material';

import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../amplify/data/resource";
import { defaultPrompts } from '@/constants/defaultPrompts';
const amplifyClient = generateClient<Schema>();

const CreatePage = () => {
    const router = useRouter();
    const [gardenObjective, setGardenObjective] = React.useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGardenObjective(event.target.value);
    };

    const handleSubmit = async (userInput: string) => {
        try {
            const newGarden = await amplifyClient.models.Garden.create({});
            // const generateGardenResponse = amplifyClient.queries.generateGarden({ 
            //     gardenId: newGarden.data!.id,
            //     userInput: gardenObjective
            // })
            // console.log('generateGardenResponse:\n', generateGardenResponse)

            const newMessage: Schema['ChatMessage']['createType'] = {
                role: 'human',
                content: {
                    text: userInput
                },
                gardenId: newGarden.data!.id
            }
            await amplifyClient.models.ChatMessage.create(newMessage)

            const invokeResponse = await amplifyClient.queries.generateGarden({
                gardenId: newGarden.data!.id,
                userInput: userInput
            })

            console.log('invokeResponse:\n', invokeResponse)

            router.push(`/garden/${newGarden.data!.id}`);

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
                <Button onClick={() => handleSubmit(gardenObjective)}>Submit</Button>
                <List>
                    {defaultPrompts.map((prompt, index) => (
                        <ListItem key={index}>
                            <Button
                                // onClick={() => handleSubmit(prompt)}
                                onClick={() => setGardenObjective(prompt)}
                            >
                                {prompt}
                            </Button>
                        </ListItem>
                    ))}
                </List>
                
            </Container>
        </Authenticator>
    );
};

export default CreatePage;