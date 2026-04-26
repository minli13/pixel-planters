import React from 'react'
import Home from './Home'
import { Link } from "react-router-dom";
import HomeButton from '../assets/HomeButton.png'
import DialogIntroNew from '../assets/DialogueIntroNewUser.png'
import DirtPatch from '../assets/DirtPatch.png'
import './styles.css'

const Garden = () => {
  return (
    <div >
      <div> {/*home button*/}
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
      </div>
      <div>
        <div className = "background-image-container"> {/*background grass img*/}
          <h1>Your Garden</h1> {/*title*/}
          <div
            style={{
              justifyContent: 'center',
              flexDirection: 'row'
            }}> {/*dirt patches*/}
            <Link to= "/levels">
              <img
                src= {DirtPatch}
                style={{
                  height:176,
                  width: 176,
                  display: 'flex',
                  alignItems: 'center'
                }}
                alt = "dirtpatch 1"/>
              </Link>
              <Link to= "/levels">
                <img
                src= {DirtPatch}
                style={{
                  height:176,
                  width: 176,
                  display: 'flex',
                  alignItems: 'center'
                }}
                alt = "dirtpatch 2"/>
              </Link>
          </div>
          <div> {/*dialog*/}
            <img 
              src= {DialogIntroNew}
              style={{
                height:128,
                width: 608,
                display: 'fixed',
                alignItems: 'center'
              }}
              alt = "Welcome to Pixel Planters! Click a dirt patch to start growing!"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Garden