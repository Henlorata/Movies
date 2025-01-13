import React from 'react';
import { HighlightsCarousel } from '../components/HighlightsCarousel';
import { Categories } from '../components/Categories';

export const Home = () => {
    return (
        <div>
            <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Welcome to MovieMania</h1>
            <HighlightsCarousel />
            <Categories />
        </div>
    );
};
