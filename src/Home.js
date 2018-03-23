import React from 'react'
import SearchBar from './components/SearchBar'

export default class Home extends React.Component {

  state = {
    doctors: [],
    latitude: 40.7047751,
    longitude: -74.013277,
    location: '',
    insuranceList: []
  }

  componentDidMount(){
    this.fetchInsurances()
  }


  fetchInsurances(){
    fetch('http://Localhost:3000/api/v1/doctor_database/insurances')
      .then(res => res.json())
      .then(json => this.setState({
        insuranceList: json.data
      }))
  }

  setPosition = (position) => {
    this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude}, this.fetchDoctors)
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
    fetch(`http://Localhost:3000/api/v1/doctor_database/doctors?longitude=${this.state.longitude}&latitude=${this.state.latitude}`)
      .then(res => res.json())
      .then(doctors => this.setState({doctors}))
  }

  searchWithGoogleCoordinates = () => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        "location": this.state.location
      })
    }
    fetch('http://localhost:3000/api/v1/google', options)
      .then(res => res.json())
      .then(json => this.setState({
        longitude: json.lng,
        latitude: json.lat
      }, () => {
        this.fetchDoctors()
      }))
  }

  handleSearch = (values) => {
    this.setState(values, () => {
      if (this.state.location === "Current Location"){
        this.getLocation()
      } else {
        this.searchWithGoogleCoordinates()
      }
    })
  }

  render(){
    console.log(this.state)
    return(
      <div>
        <h1>DOC FINDER</h1>
        < SearchBar onSearch={this.handleSearch} insuranceList={this.state.insuranceList}/>
      </div>
    )
  }
}
