import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import { getData, img_300, imgUnavailable } from '../utils';

const urlTrending = `https://api.themoviedb.org/3/trending/all/day?api_key=${import.meta.env.VITE_API_KEY}`;

export const HighlightsCarousel = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['trendingHome'],
        queryFn: () => getData({ queryKey: [urlTrending] }),
    });

    if (isLoading) return <CircularProgress />;
    if (isError) return <div>Error loading data: {error.message}</div>;

    const items = data.results.slice(0, 10).map((obj) => (
        <div key={obj.id} style={{ textAlign: 'center' }}>
            <img
                src={obj.poster_path ? img_300 + obj.poster_path : imgUnavailable}
                alt={obj.title || obj.name}
                style={{ borderRadius: '10px', marginBottom: '10px', height: '300px' }}
            />
            <h3>{obj.title || obj.name}</h3>
        </div>
    ));

    return (
        <div style={{ margin: '20px auto', maxWidth: '80%' }}>
            <AliceCarousel
                mouseTracking
                items={items}
                infinite
                autoPlay
                autoPlayInterval={3000}
                disableButtonsControls
            />
        </div>
    );
};
