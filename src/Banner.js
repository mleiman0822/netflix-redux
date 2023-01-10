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
        backgroundImage: `url("https://images.squarespace-cdn.com/content/v1/603c2033a6de590d5d368ccc/1619440243882-HEURADB1VBT15DHA2GUX/GWD+RISING+-+BLACK+BACKGROUND.png?format=2500w")`,
        backgroundPosition:"center center"
    }}>
        <div className='banner__contents'>
            <h1 className='banner__title'>Movie Name</h1>
            <div className='banner__buttons'>
                <button className='banner__button'>Play</button>
                <button className='banner__button'>My List</button>
            </div>
            <h1 className='banner__description'>
                {/* Calling the truncate function to add '...' to any 
                string over 150 characters */}
                {truncate('This is a test description', 150)}
            </h1>
        </div>
        <div className='banner--fadeBottom'/>
    </header>
  )
}

export default Banner