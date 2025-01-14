import React from 'react';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const SingleChip = ({ id, name, selectedGenres, setSelectedGenres }) => {
    const isSelected = selectedGenres.includes(id);

    const handleClick = () => {
        if (isSelected) {
            setSelectedGenres((prev) => prev.filter((item) => item !== id));
        } else {
            setSelectedGenres((prev) => [...prev, id]);
        }
    };

    return (
        <Chip
            icon={isSelected ? <DoneIcon /> : <RadioButtonUncheckedIcon />}
            label={name}
            clickable
            onClick={handleClick}
            sx={{
                backgroundColor: isSelected ? 'lightblue' : 'white',
                fontWeight: isSelected ? 'bold' : 'normal',
            }}
        />
    );
};
