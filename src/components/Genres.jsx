import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { SingleChip } from './SingleChip'
import { getData } from '../utils'
import { CircularProgress } from '@mui/material'
import { Stack } from '@mui/material'
import { useState } from 'react'
import DataObject from '@mui/icons-material/DataObject'
import { useEffect } from 'react'

export const Genres = ({ type, setUrlForGenres }) => {
    const [selectedGenres, setSelectedGenres] = useState([]) //Kategóriák azonoítói, amit a felhasználó kiválaszt
    console.log(selectedGenres);

    useEffect(() => {
        if (selectedGenres.length < 1) {
            setUrlForGenres('')
        }
        else {
            setUrlForGenres(selectedGenres.join(','))
        }
    }, [selectedGenres])

    const urlGenres = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${import.meta.env.VITE_API_KEY}`
    //console.log(urlGenres);
    const { data, isError, isLoading, error } = useQuery({ queryKey: ['genres', urlGenres], queryFn: getData })

    if (isLoading) {
        return <CircularProgress />
    }
    if (isError) {
        return <div>Error fetching data:{error.message}</div>
    }
    //console.log(data.genres);

    return (
        <div>
            <Stack direction="row" spacing={1} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '10px' }}>
                {data.genres.map(obj =>
                    <SingleChip key={obj.id} {...obj} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />)}
            </Stack>
        </div>
    )
}