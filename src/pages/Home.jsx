import React from 'react'
import NavBar from '../components/NavBar'
import Garden from './Garden'
import { Link } from "react-router-dom";
import {useState} from 'react'
import Play from '../assets/PlayButtonUp.png'
import PlayDown from '../assets/PlayButtonDown.png'
import '../styles/styles.css'
import '../styles/home.css'

const Home = () => { //Homepage - play button

  return (
    <div className = "background-image-container ">
        {/* <h1>Pixel Planters</h1>
        <h2>Grow your coding skills!</h2> */}
        <Link to="/gameSlots"> 
          <img
            className='play-btn'
            src= {Play}
            alt = "Play"
            />
        </Link>
 
    </div>
 

  )
}

export default Home