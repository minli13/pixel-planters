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
    <div className = "background-image-container">
      <Link to="/gameSlots"> 
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
  )
}

export default Home