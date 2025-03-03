import React from 'react';
import { CardContent, Typography } from '@mui/material';
import { Schema } from '@/../amplify/data/resource';

// Schema["PlantRow"]["type"]
const PlantRowCardContent = ({ row }: { row: Schema["PlantedPlantRow"]["createType"]["info"] }) => {
    if (!row) return null;
    return (
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                Species: {row.species}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Variety: {row.variety}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Row Spacing: {JSON.stringify(row?.rowSpacingCm)} cm
            </Typography>
            {
                row.plantDate && new Date(row.plantDate).toLocaleDateString() ? (
                    <Typography variant="body2" color="text.secondary">
                        Plant Date: {row?.plantDate ? new Date(row.plantDate).toLocaleDateString() : "Unknown"}
                    </Typography>
                ) : null
            }
            <Typography variant="body2" color="text.secondary">
                Expected Harvest: {
                    row?.harvest?.first ?
                        new Date(row.harvest.first).toLocaleDateString()
                        : "Unknown"
                } - {row?.harvest?.amount} {row?.harvest?.unit}
            </Typography>
        </CardContent>
    );
};

export default PlantRowCardContent;
