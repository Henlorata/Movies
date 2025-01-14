import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress, Box } from '@mui/material';
import { getData, img_300, imgUnavailable } from '../utils';
import { DetailModal } from './DetailModel';

const urlTrending = `https://api.themoviedb.org/3/trending/all/day?api_key=${import.meta.env.VITE_API_KEY}`;

export const HighlightsCarousel = () => {
    const [selectedItem, setSelectedItem] = useState(null); // For DetailModal

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['trendingHome'],
        queryFn: () => getData({ queryKey: [undefined, urlTrending] }),
    });

    if (isLoading) return <CircularProgress />;
    if (isError) return <div>Error loading data: {error.message}</div>;

    const items = data.results.slice(0, 10).map((obj) => (
        <Box
            key={obj.id}
            onClick={() => setSelectedItem({ id: obj.id, media_type: obj.media_type })}
            sx={{
                cursor: 'pointer',
                textAlign: 'center',
                padding: '10px',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            }}
        >
            <img
                src={obj.poster_path ? img_300 + obj.poster_path : imgUnavailable}
                alt={obj.title || obj.name}
                style={{ borderRadius: '10px', marginBottom: '10px', height: '300px' }}
            />
            <h3>{obj.title || obj.name}</h3>
        </Box>
    ));

    return (
        <Box sx={{ margin: '20px auto', maxWidth: '80%' }}>
            <AliceCarousel
                mouseTracking
                items={items}
                infinite
                autoPlay
                autoPlayInterval={3000}
                disableButtonsControls
            />
            {selectedItem && (
                <DetailModal
                    open={!!selectedItem}
                    setOpen={() => setSelectedItem(null)}
                    id={selectedItem.id}
                    media_type={selectedItem.media_type}
                />
            )}
        </Box>
    );
};
