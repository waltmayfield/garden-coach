import { Box } from "@mui/material"
import ChatBox from "./ChatBox"



import { useState } from "react";
import { Button } from "@mui/material";
import { PlannedSteps } from "../../utils/types";
import { Schema } from "../../amplify/data/resource";

const FloatingHidableChatBox = (params: {
    gardenId: string,
    initialFullScreenStatus: boolean,
    setGarden: (newGarden: Schema["Garden"]["createType"]) => void,
    setPlannedSteps: (newPlannedSteps: PlannedSteps) => void
}) => {
    const [isFullScreen, setIsFullScreen] = useState(params.initialFullScreenStatus);
    const [isHidden, setIsHidden] = useState(!params.initialFullScreenStatus);

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const toggleHidden = () => {
        setIsHidden(!isHidden);
    };

    return (
        <Box
            sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            width: isHidden ? 'auto' : isFullScreen ? '100%' : 'calc(100vw - 32px)',
            height: isHidden ? 'auto' : isFullScreen ? '100%' : 400,
            maxHeight: isFullScreen ? '100%' : 400,
            maxWidth: isFullScreen ? '100%' : 500,
            padding: isHidden ? 0 : 2,
            boxShadow: isHidden ? 0 : 3,
            borderRadius: 2,
            backgroundColor: 'white',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            }}
        >
            {isHidden ? (
            <Button onClick={toggleHidden}>
            <span role="img" aria-label="chat">💬</span>
            </Button>
            ) : (
            <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button onClick={toggleFullScreen}>
                {isFullScreen ? "Exit Full Screen" : "Full Screen"}
            </Button>
            <Button onClick={toggleHidden}>
                Hide
            </Button>
            </Box>
            <ChatBox
            gardenId={params.gardenId}
            setGarden={params.setGarden}
            setPlannedSteps={params.setPlannedSteps}
            />
            </>
            )}
        </Box>
    );
};

export default FloatingHidableChatBox