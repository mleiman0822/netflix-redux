import React from 'react'
import './Banner.css'

function Banner() {
  return (
    <header className='banner' style={{
        backgroundSize:"cover",
        backgroundImage: `url("https://i.imgur.com/e1hLQ2m.png")`,
        backgroundPosition:"center center"
    }}>
        <div className='banner__contents'>
            <h1 className='banner__title'>Movie Name</h1>
            <div className='banner__buttons'>
                <button>Play</button>
                <button>My List</button>
            </div>
        </div>
    </header>
  )
}

export default Banner