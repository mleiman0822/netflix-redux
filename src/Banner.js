import axios from './axios';
import React, { useEffect, useState } from 'react'
import requests from './Requests';
import './Banner.css'

function Banner() {
    //setting the state of the movie
    const[movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            //Generate a random number from 0 to the length of the results 
            //and set the movie to that random movie
            setMovie(                
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )
        }
        fetchData();
    },[]);
    console.log(movie);
    //truncating the length of description. If description is greater than 
    //the passed in number, add '...' to the end of it.
    function truncate(string, n){
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

  return (
    <header className='banner' style={{
        backgroundSize:"cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition:"center center"
    }}>
        <div className='banner__contents'>
            <h1 className='banner__title'>
                {movie?.title || movie?.name || movie?.orignal_name}
            </h1>
            <div className='banner__buttons'>
                <button className='banner__button'>Play</button>
                <button className='banner__button'>My List</button>
            </div>
            <h1 className='banner__description'>
                {/* Calling the truncate function to add '...' to any 
                string over 150 characters */}
                {truncate(movie?.overview, 150)}
            </h1>
        </div>
        {/* The sweet fade at the bottom of the banner photo */}
        <div className='banner--fadeBottom'/>
    </header>
  )
}

export default Banner