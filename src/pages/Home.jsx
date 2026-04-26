import React from 'react'
import NavBar from '../components/NavBar'
import Garden from './Garden'
import { Link } from "react-router-dom";
import {useState} from 'react'
import Play from '../assets/PlayButtonUp.png'
import PlayDown from '../assets/PlayButtonDown.png'
import './styles.css'

const Home = () => { //Homepage - play button

  return (
    <div>
      <h1>Pixel Planters</h1>
      <h2>Grow your coding skills!</h2>
      <div className = "background-image-container">
        <Link to="/garden"> 
          <img
            src= {Play}
            style={{
              height:96,
              width:288,
              marginTop: 500
            }}
            alt = "Play"
            />
        </Link>
      </div>
      <div>
        <button>
          Options
        </button>
      </div>
        <NavBar />
    </div>
  )
}

export default Home