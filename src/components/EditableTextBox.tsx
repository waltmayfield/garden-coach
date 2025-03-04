import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';

const getValueByPath = <T,>(obj: T, path: string | string[]): unknown => {
    if (typeof path === 'string') {
        path = path.split('.');
    }
    return (path as string[]).reduce((acc, key) => (acc && (acc as Record<string, unknown>)[key] !== undefined) ? (acc as Record<string, unknown>)[key] : undefined, obj as unknown);
};

interface EditableTextBoxProps<T> {
    object: T;
    fieldPath: string | string[];
    onUpdate: (updatedObject: T) => void;
    typographyVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline' | 'inherit';
    typographyColor?: string; //'initial' | 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error';
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
        const updatedObject = { ...object } as Record<string, unknown>;
        const keys = Array.isArray(fieldPath) ? fieldPath : fieldPath.split('.');
        let temp: Record<string, unknown> = updatedObject; 
        keys.slice(0, -1).forEach(key => {
            if (!temp[key]) temp[key] = {};
            temp = temp[key] as Record<string, unknown>;
        });
        temp[keys[keys.length - 1]] = value;

        Object.keys(updatedObject).forEach(key => {
            if (typeof updatedObject[key] === 'function') {
                delete updatedObject[key];
            }
            if (['owner', 'createdAt', 'id', 'updatedAt'].includes(key)) {
                delete updatedObject[key];
            }
        });

        onUpdate(updatedObject as T);
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