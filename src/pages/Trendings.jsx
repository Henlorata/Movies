import React from 'react';
import { Content } from '../components/Content';

const urlTrending = `https://api.themoviedb.org/3/trending/all/day?api_key=${import.meta.env.VITE_API_KEY}`;

export const Trendings = () => {
    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Trending Movies & TV Shows</h1>
            <Content url={urlTrending} />
        </div>
    );
};
