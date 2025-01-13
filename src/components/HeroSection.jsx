import React from 'react';
import { Button } from '@mui/material';

export const HeroSection = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f5f5f5' }}>
            <h1>Welcome to MovieMania</h1>
            <p>Your one-stop destination to explore movies and TV shows.</p>
            <div>
                <Button variant="contained" color="primary" href="/trendings" style={{ margin: '0 10px' }}>
                    Explore Trending
                </Button>
                <Button variant="outlined" color="secondary" href="/search" style={{ margin: '0 10px' }}>
                    Search Now
                </Button>
            </div>
        </div>
    );
};
