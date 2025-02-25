import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Grid2 as Grid,
    // Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { z } from "zod";

import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/../amplify/data/resource";

import { Message, PlannedSteps, createGardenType, plannedStepArrayType } from '@/../utils/types';
// import { createGardenType, plannedStepArrayType } from '../../utils/types';

// import { MuiMarkdown } from 'mui-markdown';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const amplifyClient = generateClient<Schema>();

const ChatMessage = (params: {
    message: Message,
    setGarden: (newGarden: Schema["Garden"]["createType"]) => void,
    setPlannedSteps: (newPlannedSteps: PlannedSteps) => void
}) => {
    //Render either ai or human messages based on the params.message.role

    const theme = useTheme();

    let messageStyle = {};

    // let proposedGarden: z.infer<typeof createGardenType>
    let proposedGarden: Schema["Garden"]["createType"] = {}
    const proposedSteps: PlannedSteps = []

    switch (params.message.role) {
        case 'ai':
            messageStyle = {
                backgroundColor: theme.palette.grey[200],
                padding: theme.spacing(1),
                borderRadius: theme.shape.borderRadius,
            };
            if (params.message.toolCalls && params.message.toolCalls !== '[]') {
                // console.log('Parsing tool calls: ', params.message.toolCalls)
                const toolCalls = JSON.parse(params.message.toolCalls) as { name: string, args: unknown }[]
                // console.log('toolCalls: ', toolCalls)
                for (const toolCall of toolCalls) {
                    // toolCalls.forEach((toolCall) => {
                    switch (toolCall.name) {
                        case 'createGardenPlannedSteps':
                            // Verfiy schema using Zod verify
                            const plannedStepParseResult = plannedStepArrayType.safeParse(toolCall.args);
                            if (plannedStepParseResult.success) {
                                plannedStepParseResult.data.steps?.forEach((step, index) => {
                                    const stepWithId = {
                                        ...step,
                                        // id: params.message.id?.slice(-3) + String(index),
                                        id: `${params.message.id?.slice(0, -1)}${index}`,
                                        gardenId: params.message.gardenId,
                                        // id: String(index),
                                    }
                                    proposedSteps.push(stepWithId)
                                })

                            } else {
                                // console.log(
                                //     'Failed to parse planned steps:',
                                //     plannedStepParseResult.error,
                                //     "\nMessage Content: ",
                                //     params.message.content?.text,
                                // )
                                // return (
                                //     <div style={messageStyle}>
                                //         <p>
                                //             Failed to parse planned steps
                                //         </p>
                                //     </div>
                                // )
                            }
                            break
                        case 'recommendGardenUpdate':
                            const gardenVerifySchemaResult = createGardenType.safeParse(toolCall.args);
                            if (gardenVerifySchemaResult.success) {
                                proposedGarden = {
                                    ...gardenVerifySchemaResult.data,
                                    id: params.message.gardenId!,
                                }

                                proposedGarden = {
                                    ...(toolCall.args as z.infer<typeof createGardenType>),
                                    id: params.message.gardenId!,
                                }
                            } else {
                                // console.log(
                                //     'Failed to parse garden update:',
                                //     gardenVerifySchemaResult.error,
                                //     "\nMessage Content: ",
                                //     params.message.content?.text,
                                // )
                                // return (
                                //     <div style={messageStyle}>
                                //         <p>
                                //             Failed to parse garden update
                                //         </p>
                                //     </div>
                                // )

                            }

                            
                            break
                    }
                }
            }
        case 'tool':
            
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
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
            >
                {params.message.content?.text}
            </ReactMarkdown>

            {/* <pre>
                {params.message.content?.text}
            </pre> */}

            {proposedGarden.id && (
                <Box>
                    <Typography variant="h6" component="div">
                        {proposedGarden.name}
                    </Typography>
                    <Typography variant="body2">
                        {proposedGarden.location?.cityStateAndCountry}
                    </Typography>
                    <Typography variant="body2">
                        {proposedGarden.objective}
                    </Typography>
                    <Button
                        onClick={() => {
                            params.setGarden(proposedGarden);
                        }}
                    >
                        Update Garden
                    </Button>
                </Box>
            )}
            {proposedSteps.length > 0 && (
                // <div style={{ display: 'flex', overflowX: 'auto', marginTop: theme.spacing(1) }}>
                <Grid container spacing={2}>
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
                </Grid>
                // </div>
            )}
            {/* <pre>
                {JSON.stringify(params.message, null, 2)}
            </pre> */}
        </div>
    )
}

export default ChatMessage