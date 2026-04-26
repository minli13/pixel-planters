import React from 'react'
import { Link } from "react-router-dom";
import HomeButton from '../assets/HomeButton.png'
import StringIntro from '../assets/DialogStringIntro.png'
import './styles.css'

const Levels = () => {
  return (
    <div>
      {/*home button*/}
        <Link to="/"> 
          <img
          src= {HomeButton}
          style={{
            height:68,
            width:68,
            display: 'flex',
            alignItems: 'start'
          }}
          alt = "Home"/>
        </Link>
        <div className = "background-image-container"> {/*title and description*/}
          <h1>Levels</h1>
          <img
          src= {StringIntro}
          style={{
            display: 'flex',
            alignItems: 'start'
          }}
          alt = "Home"/>
        </div>
    </div>
  )
}

export default Levels