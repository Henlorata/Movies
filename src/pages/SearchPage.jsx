import React from 'react'
import { Search } from '../components/Search'

//const urlSearch = `https://api.themoviedb.org/3/search/${media_type}?api_key=${import.meta.env.VITE_API_KEY}&include_adult=false&query=${searchText}&page=${page}`;

export const SearchPage = () => {
  return (
    <div>
      <Search /*url={urlSearch}*//>
    </div>
  )
}