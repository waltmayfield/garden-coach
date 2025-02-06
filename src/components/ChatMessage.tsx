import { useTheme } from '@mui/material/styles';
import {
    Button,
    Card,
    CardContent,
    Typography,
} from '@mui/material';

import { z } from "zod";

import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../amplify/data/resource";

import { Message, PlannedSteps } from '@/../utils/types';
import { plannedStepArrayType } from '../../utils/amplifyStrucutedOutputs';

const amplifyClient = generateClient<Schema>();

const ChatMessage = (params: { 
    message: Message, 
    setPlannedSteps: (newPlannedSteps: PlannedSteps) => void
}) => {
    //Render either ai or human messages based on the params.message.role

    const theme = useTheme();

    let messageStyle = {};

    const proposedSteps: PlannedSteps = []

    switch (params.message.role) {
        case 'ai':
            if (params.message.toolCalls && params.message.toolCalls !== '[]') {
                // console.log('Parsing tool calls: ', params.message.toolCalls)
                const toolCalls = JSON.parse(params.message.toolCalls) as { name: string, args: any }[]
                toolCalls.forEach((toolCall) => {
                    if (toolCall.name === 'createGardenPlannedSteps') {
                        (toolCall.args as z.infer<typeof plannedStepArrayType>)
                            .steps.forEach((step, index) => {
                                const stepWithId = {
                                    ...step,
                                    // id: params.message.id?.slice(-3) + String(index),
                                    id: `${params.message.id?.slice(0,-1)}${index}`,
                                    gardenId: params.message.gardenId,
                                    // id: String(index),
                                }
                                proposedSteps.push(stepWithId)
                            })
                    }
                })
            }
        case 'tool':
            messageStyle = {
                backgroundColor: theme.palette.grey[200],
                padding: theme.spacing(1),
                borderRadius: theme.shape.borderRadius,
            };
            break;
        case 'human':
            messageStyle = {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                padding: theme.spacing(1),
                borderRadius: theme.shape.borderRadius,
            };
            break;
    }

    if (['human', 'ai'].includes(params.message.role || 'noRole')) return (
        <div style={messageStyle}>
            <Typography variant="body1">
                {params.message?.content?.text}
            </Typography>
            {params.message.role === 'ai' && proposedSteps.length > 0 && (
                <div style={{ display: 'flex', overflowX: 'auto', marginTop: theme.spacing(1) }}>
                    {proposedSteps.map((proposedStep, index) => (
                        <Card
                            key={index}
                            sx={{
                                // minWidth: 275, 
                                margin: theme.spacing(1)
                            }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {proposedStep.step?.title}
                                </Typography>
                                <Typography variant="body2">
                                    {proposedStep.plannedDate}
                                </Typography>
                                {proposedStep.step?.plantRows && (
                                    proposedStep.step?.plantRows.map((plantRow, index) => (
                                        <Typography key={index} variant="body2">
                                            {plantRow?.species}
                                        </Typography>
                                    ))
                                )}
                                <Button
                                    onClick={async () => {
                                        console.log('setPlannedSteps: ', params.setPlannedSteps)
                                        params.setPlannedSteps([proposedStep]);
                                        // const { id, ...proposedStepWithoutId } = proposedStep
                                        const createStepResponse = await amplifyClient.models.PlannedStep.create(proposedStep)
                                        console.log('createStepResponse: ', createStepResponse)
                                    }}
                                >
                                    Add Step
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            {/* <pre>
                {JSON.stringify(params.message, null, 2)}
            </pre> */}
        </div>
    )
}

export default ChatMessage