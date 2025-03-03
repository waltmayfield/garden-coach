import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
// import { getValueByPath } from '../utils/getValueByPath';

const getValueByPath = (obj: any, path: string | string[]): any => {
    if (typeof path === 'string') {
        path = path.split('.');
    }

    return path.reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : undefined, obj);
};

interface EditableTextBoxProps<T> {
    object: T;
    fieldPath: string | string[];
    onUpdate: (updatedObject: T) => void;
    typographyVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline' | 'inherit';
    typographyColor?: string//'initial' | 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error';
}

const EditableTextBox = <T,>({ object, fieldPath, onUpdate, typographyVariant = 'body1', typographyColor }: EditableTextBoxProps<T>) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState<string>(String(getValueByPath(object, fieldPath)));

    useEffect(() => {
        setValue(String(getValueByPath(object, fieldPath)));
    }, [object, fieldPath]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        const updatedObject: any = { ...object };
        const keys = Array.isArray(fieldPath) ? fieldPath : fieldPath.split('.');
        let temp: any = updatedObject;
        keys.slice(0, -1).forEach(key => {
            if (!temp[key]) temp[key] = {};
            temp = temp[key];
        });
        temp[keys[keys.length - 1]] = value;

        Object.keys(updatedObject as object).forEach(key => {
            if (typeof updatedObject[key] === 'function') {
                delete updatedObject[key];
            }
            if (['owner', 'createdAt', 'id', 'updatedAt'].includes(key)) {
                delete updatedObject[key];
            }
        });
        onUpdate(updatedObject);
        setIsEditing(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <Box display="flex" alignItems="center" onBlur={() => setIsEditing(false)}>
            {isEditing ? (
                <TextField value={value} onChange={handleChange} autoFocus onBlur={handleSaveClick} />
            ) : (
                <Typography variant={typographyVariant} color={typographyColor} onDoubleClick={handleEditClick}>
                    {String(getValueByPath(object, fieldPath))}
                </Typography>
            )}
        </Box>
    );
};

export default EditableTextBox;
