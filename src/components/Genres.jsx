import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress, Stack, Button } from '@mui/material';
import { SingleChip } from './SingleChip';
import { getData } from '../utils';

export const Genres = ({ type, setUrlForGenres }) => {
    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(() => {
        if (selectedGenres.length < 1) {
            setUrlForGenres('');
        } else {
            setUrlForGenres(selectedGenres.join(','));
        }
    }, [selectedGenres]);

    const urlGenres = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${import.meta.env.VITE_API_KEY}`;
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['genres', urlGenres],
        queryFn: getData,
    });

    if (isLoading) return <CircularProgress />;
    if (isError) return <div>Error fetching data: {error.message}</div>;

    return (
        <div>
            <Stack
                direction="row"
                spacing={1}
                sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '10px' }}
            >
                {data.genres.map((obj) => (
                    <SingleChip
                        key={obj.id}
                        {...obj}
                        selectedGenres={selectedGenres}
                        setSelectedGenres={setSelectedGenres}
                    />
                ))}
            </Stack>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <Button
                    variant="outlined"
                    onClick={() => setSelectedGenres([])} // Clear selectedGenres state
                >
                    Reset Genres
                </Button>
            </div>
        </div>
    );
};
