import React from 'react'

export default class Home extends React.Component {

  state = {
    doctors: [],
    latitude: null,
    longitude: null
  }

  setPosition = (position) => {
      console.log(position)
      this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
  }

  componentDidMount(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  render(){
    console.log(this.state)
    return(
      <div>
        Home
      </div>
    )
  }
}
