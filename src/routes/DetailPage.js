import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


function DetailPage() {
    const [movie,setMovie] = useState({});
    let {movieId} = useParams();

    const fetchData = async() =>{
     const request = await axios.get(`/movie/${movieId}`);
     console.log(request);
     setMovie(request.data);
    }
    useEffect(()=>{
        fetchData();
    },[movieId])
  return (
    <section>
        <img
        className='modal_poster_img'
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster" />
    </section>
  )
}

export default DetailPage