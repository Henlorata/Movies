import React from 'react';
import { Card, CardActionArea, Typography } from '@mui/material';

const categories = [
    { name: 'Trending', url: '/trendings' },
    { name: 'Movies', url: '/movies' },
    { name: 'TV Series', url: '/series' },
    { name: 'Search', url: '/search' },
];

export const Categories = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px' }}>
            {categories.map((category, index) => (
                <Card key={index} sx={{ maxWidth: 200 }}>
                    <CardActionArea href={category.url}>
                        <Typography variant="h6" sx={{ padding: '10px', textAlign: 'center' }}>
                            {category.name}
                        </Typography>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
};
