import React from 'react'
import { Segment, Grid, Image } from 'semantic-ui-react'
import stockDoc from "../stockDoc.jpg"
import "../App.css"

const WelcomeBox = () => {

  return(
    <Segment className="welcomeBox">

        <h1 className="work-sans">Welcome to Doc Finder!</h1>
        <h3 className="work-sans"><i>The Easiest Way to Find Local Doctors</i></h3>
        <h3 className="work-sans">Simply enter your current location to get started</h3>
        <Image src={stockDoc} fluid/>
    </Segment>


  )
}
export default WelcomeBox
