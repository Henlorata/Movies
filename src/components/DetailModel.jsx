import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress, Button } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { getData, img_500, noPictureLandscape } from '../utils';
import { Carousel } from './Carousel';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const DetailModal = ({ open, setOpen, id, media_type, type }) => {
    if (!id) return null;

    const resolvedMediaType = media_type || type; // Use the passed type if media_type is undefined

    console.log('ID:', id, 'Media Type:', resolvedMediaType);

    const urlDetails = `https://api.themoviedb.org/3/${resolvedMediaType}/${id}?api_key=${import.meta.env.VITE_API_KEY}`;
    const urlVideos = `https://api.themoviedb.org/3/${resolvedMediaType}/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}`;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['details', urlDetails],
        queryFn: getData,
    });

    const { data: dataVideos, isLoading: isLoadingVideos, isError: isErrorVideos } = useQuery({
        queryKey: ['videos', urlVideos],
        queryFn: getData,
    });

    if (isLoading || isLoadingVideos) return <CircularProgress />;
    if (isError || isErrorVideos) return <div>Error fetching data: {error?.message}</div>;

    const handleClose = () => setOpen(false);

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Box sx={style}>
                <img
                    style={{ width: '100%' }}
                    src={data?.backdrop_path ? img_500 + data.backdrop_path : noPictureLandscape}
                    alt={data?.title || data?.name || 'No Image Available'}
                />
                <Typography id="modal-description" component="div" sx={{ mt: 2 }}>
                    <Typography component="h2" variant="h5" sx={{ mb: 1 }}>
                        {data?.title || data?.name}
                    </Typography>
                    <Typography component="p" variant="body1" sx={{ fontStyle: 'italic', mb: 1 }}>
                        {data?.tagline || 'No tagline available'}
                    </Typography>
                    <Typography component="p" variant="body2">
                        {data?.overview || 'No description available'}
                    </Typography>
                </Typography>
                <Carousel id={id} media_type={resolvedMediaType} />
                {dataVideos?.results?.length > 0 && (
                    <Button
                        variant="contained"
                        startIcon={<YouTubeIcon />}
                        href={`https://www.youtube.com/watch?v=${dataVideos.results[0].key}`}
                        target="_blank"
                        style={{ marginTop: '10px' }}
                    >
                        Watch the Trailer
                    </Button>
                )}
            </Box>
        </Modal>
    );
};
