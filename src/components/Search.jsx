import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Button, CircularProgress, Grid, Container, Typography, Switch, FormControlLabel } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getData, img_300, imgUnavailable } from '../utils';
import { DetailModal } from './DetailModel';

export const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [type, setType] = useState('movie'); // Default to movie
    const [page, setPage] = useState(1);
    const [includeAdult, setIncludeAdult] = useState(false); // Default to exclude adult content
    const [selectedItem, setSelectedItem] = useState(null); // To handle DetailModal

    const urlSearch = `https://api.themoviedb.org/3/search/${type}?api_key=${import.meta.env.VITE_API_KEY}&query=${searchText}&page=${page}&include_adult=${includeAdult}`;

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['search', urlSearch],
        queryFn: getData,
        enabled: !!searchText, // Only fetch if there is search text
    });

    // Automatically refetch when includeAdult changes
    useEffect(() => {
        if (searchText) {
            refetch();
        }
    }, [includeAdult]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); // Reset to the first page on new search
        refetch(); // Fetch results on search
    };

    const handleItemClick = (item) => {
        setSelectedItem({ id: item.id, media_type: type });
    };

    return (
        <Container sx={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <Box
                component="form"
                onSubmit={handleSearch}
                sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 3 }}
            >
                <TextField
                    id="filled-basic"
                    label="Search"
                    variant="filled"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{ flex: 1, maxWidth: '600px' }}
                />
                <Button type="submit" variant="contained" sx={{ backgroundColor: 'lightblue', height: '56px' }}>
                    <SearchIcon sx={{ color: 'black' }} />
                </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 3 }}>
                <Button
                    variant={type === 'movie' ? 'contained' : 'outlined'}
                    onClick={() => {
                        setType('movie');
                        setPage(1); // Reset page on type change
                        refetch(); // Refetch results
                    }}
                >
                    Search Movies
                </Button>
                <Button
                    variant={type === 'tv' ? 'contained' : 'outlined'}
                    onClick={() => {
                        setType('tv');
                        setPage(1); // Reset page on type change
                        refetch(); // Refetch results
                    }}
                >
                    Search TV Series
                </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={includeAdult}
                            onChange={(e) => setIncludeAdult(e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Include Adult Content"
                />
            </Box>

            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                    <CircularProgress />
                </Box>
            )}

            {isError && (
                <Typography color="error" sx={{ textAlign: 'center', marginTop: 5 }}>
                    Error: {error?.message}
                </Typography>
            )}

            {!isLoading && data && data.results.length === 0 && (
                <Typography sx={{ textAlign: 'center', marginTop: 5 }}>
                    No results found. Please try a different search.
                </Typography>
            )}

            <Grid container spacing={3} justifyContent="center">
                {data?.results.map((obj) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={obj.id}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                border: '1px solid #ddd',
                                borderRadius: 2,
                                padding: 2,
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                            onClick={() => handleItemClick(obj)}
                        >
                            <img
                                src={obj.poster_path ? img_300 + obj.poster_path : imgUnavailable}
                                alt={obj.title || obj.name}
                                style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
                            />
                            <Typography variant="h6">{obj.title || obj.name}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 1 }}>
                                {type === 'movie' ? obj.release_date : obj.first_air_date}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {data?.total_pages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                    <Button
                        variant="outlined"
                        disabled={page === 1}
                        onClick={() => {
                            setPage((prev) => prev - 1);
                            refetch();
                        }}
                        sx={{ marginRight: 2 }}
                    >
                        Previous
                    </Button>
                    <Typography variant="body1" sx={{ margin: '0 16px', display: 'flex', alignItems: 'center' }}>
                        Page {page} of {data.total_pages}
                    </Typography>
                    <Button
                        variant="outlined"
                        disabled={page === data.total_pages}
                        onClick={() => {
                            setPage((prev) => prev + 1);
                            refetch();
                        }}
                    >
                        Next
                    </Button>
                </Box>
            )}

            {selectedItem && (
                <DetailModal
                    open={!!selectedItem}
                    setOpen={() => setSelectedItem(null)}
                    id={selectedItem.id}
                    media_type={selectedItem.media_type}
                />
            )}
        </Container>
    );
};
