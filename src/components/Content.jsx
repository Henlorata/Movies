import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../utils';
import { CircularProgress, Grid, Box, Container } from '@mui/material';
import { SingleContent } from './SingleContent';
import { ContentPagination } from './ContentPagination';

export const Content = ({ url, type }) => {
    const [page, setPage] = useState(1);

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['content', `${url}&page=${page}`],
        queryFn: getData,
    });

    if (isLoading) return <CircularProgress />;
    if (isError) return <div>Error fetching data: {error.message}</div>;

    return (
        <Container sx={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <Grid container spacing={3} justifyContent="center">
                {data.results.map((obj) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={obj.id}>
                        <SingleContent {...obj} type={type} />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <ContentPagination page={page} setPage={setPage} numberOfPage={data.total_pages} />
            </Box>
        </Container>
    );
};
