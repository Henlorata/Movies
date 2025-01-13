import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const ContentPagination = ({ page, setPage, numberOfPage}) => {
    const handleChange = (event, p) => {
        console.log('oldal:', p);
        setPage(p)
    }
    return (
        <Stack spacing={2}>
            <Pagination count={numberOfPage} variant="outlined" shape="rounded"
                page={page}
                onChange={handleChange}
            />
        </Stack>
    );
}
