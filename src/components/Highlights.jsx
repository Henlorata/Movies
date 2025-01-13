import React from 'react';
import { Content } from './Content';

const urlTrending = `https://api.themoviedb.org/3/trending/all/day?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false`;

export const Highlights = () => {
    return (
        <div>
            <h2 style={{ textAlign: 'center', marginTop: '30px' }}>Trending Now</h2>
            <Content url={urlTrending} type="highlight" />
        </div>
    );
};
