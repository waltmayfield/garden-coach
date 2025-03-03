import { Box, Drawer, Button, Typography } from "@mui/material"
import { styled, useTheme } from '@mui/material/styles';

import { useState } from "react";

import ChatBox from "./ChatBox"
import { PlannedSteps } from "../../utils/types";
import { Schema } from "../../amplify/data/resource";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ChatBoxDrawer = (params: {
    gardenId: string,
    initialFullScreenStatus: boolean,
    setGarden: (newGarden: Schema["Garden"]["createType"]) => void,
    setPlannedSteps: (newPlannedSteps: PlannedSteps) => void
}) => {
    const theme = useTheme();

    const [isHidden, setIsHidden] = useState(!params.initialFullScreenStatus);

    const setHidden = (hiddenState: boolean) => {
        setIsHidden(hiddenState);
    };

    return (
        <Box>
            {isHidden ? (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        padding: isHidden ? 0 : 2,
                        boxShadow: isHidden ? 0 : 3,
                        borderRadius: 2,
                        backgroundColor: 'white',
                        zIndex: 1000,

                    }}
                >
                    <Button onClick={() => setHidden(false)}>
                        <span role="img" aria-label="chat">💬</span>
                    </Button>
                </Box>
            ) : (
                <>


                    <Drawer
                        anchor="bottom"
                        open={true}
                        onClose={() => setHidden(true)}
                        // onOpen={() => setHidden(false)}
                    >
                        <DrawerHeader
                            sx={{
                                position: 'sticky',
                                top: 0,
                                backgroundColor: 'white',
                                zIndex: 1,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: theme.spacing(1),
                            }}
                        >
                            <Typography variant="h6">Chat</Typography>
                            <Button onClick={() => setHidden(true)}>
                                Hide
                            </Button>
                        </DrawerHeader>
                        <ChatBox
                            gardenId={params.gardenId}
                            setGarden={params.setGarden}
                            setPlannedSteps={params.setPlannedSteps}
                        />
                    </Drawer>
                </>
            )}
        </Box>
    );
};

export default ChatBoxDrawer