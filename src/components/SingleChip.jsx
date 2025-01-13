import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const SingleChip = ({ id, name, selectedGenres, setSelectedGenres }) => {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected(!selected);
        if (selectedGenres.includes(id)) {
            setSelectedGenres((prev) => prev.filter((item) => item !== id));
        } else {
            setSelectedGenres((prev) => [...prev, id]);
        }
    };

    return (
        <Chip
            icon={selected ? <DoneIcon /> : <RadioButtonUncheckedIcon />}
            label={name}
            clickable
            onClick={handleClick}
            sx={{
                backgroundColor: selected ? 'lightblue' : 'white',
                fontWeight: selected ? 'bold' : 'normal',
            }}
        />
    );
};
