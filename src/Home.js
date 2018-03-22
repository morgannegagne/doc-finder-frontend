import React from 'react'

export default class Home extends React.Component {

  state = {
    doctors: [],
    latitude: 40.7047751,
    longitude: -74.013277,
    input: ''
  }

  setPosition = (position) => {
    console.log(position);
      this.setState({latitude: position.coords.longitude, longitude: position.coords.latitude}, this.fetchDoctors)
  }

  getLocation() {
    if (navigator.geolocation) {
      console.log('getting position')
      navigator.geolocation.getCurrentPosition(this.setPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  fetchDoctors = () => {
    fetch(`http://Localhost:3000/api/v1/doctor_database?longitude=${this.state.longitude}&latitude=${this.state.latitude}`)
      .then(res => res.json())
      .then(doctors => this.setState({doctors}))
  }

  clicked = (e) => {
    e.preventDefault();
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        "location": this.state.input
      })
    }
    console.log(options)
    fetch('http://localhost:3000/api/v1/google', options)
      .then(res => res.json())
      .then(json => console.log(json))
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  render(){
    return(
      <div>
        <form>
          <input type="text" onChange={this.handleChange}/>
          <button onClick={this.clicked}>Submit</button>
        </form>
      </div>
    )
  }
}
