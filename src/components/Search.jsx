import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';

export const Search = () => {
    return (
        <>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' }, display: "flex", justifyContent: "center", backgroundColor: 'none' }}
                noValidate
                autoComplete="off"
            >
                <TextField id="filled-basic" label="Search" variant="filled" />
                <Button
                    sx={{ maxWidth: 50, backgroundColor: 'lightblue' }}
                >
                    <SearchIcon sx={{ color: 'black' }}></SearchIcon>
                </Button>
            </Box>
            <Box sx={{display: "flex", justifyContent: "center", margin:1}}>
                <Button
                    variant="outlined"
                >
                    SEARCH MOVIES
                </Button>
                <div style={{margin:5}}></div>
                <Button
                    variant="outlined"
                >
                    SEARCH TV SERIES
                </Button>
            </Box>

        </>
    );
}
