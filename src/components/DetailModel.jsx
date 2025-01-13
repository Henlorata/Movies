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

export const DetailModal = ({ open, setOpen, id, media_type }) => {
    if (!media_type || !id) return null;

    const urlDetails = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${import.meta.env.VITE_API_KEY}`;
    const urlVideos = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}`;

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
                    style={{width: '100%'}}
                    src={data?.backdrop_path ? img_500 + data.backdrop_path : noPictureLandscape}
                    alt={data?.title || data?.name || 'No Image Available'}
                />

                <Typography id="modal-description" sx={{mt: 2}}>
                    <h2>{data?.title || data?.name}</h2>
                    <p>{data?.tagline}</p>
                    <p>{data?.overview}</p>
                </Typography>
                <Carousel id={id} media_type={media_type} />
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
