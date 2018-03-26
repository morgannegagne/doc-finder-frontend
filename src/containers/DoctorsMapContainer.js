import React from "react";
import DoctorsMap from "../components/DoctorsMap";

export default class DoctorsMapContainer extends React.Component {

	state = {
		markers: [],
		doctors: [],
		location: this.props.location
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.doctors != this.props.doctors){
			this.setState({
				doctors: nextProps.doctors,
				location: nextProps.location
			})
		}
	}

	findClosestPractice = () => {
		return this.props.doctors.map(doctor => {
			let closestPractice = doctor.practices[0]
			doctor.practices.forEach(practice => {
				if (practice.distance < closestPractice.distance){
					closestPractice = practice
				}
			})
			return Object.assign(doctor, { closestPractice: {lat: closestPractice.lat, lng: closestPractice.lon }})
		});
	};

	render() {
		const doctors = this.findClosestPractice()
		return (
			<div>
				<DoctorsMap
					doctors={doctors}
					location={this.state.location}
					googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyBO37tWXY7797JXJmFXstlFy4J6rSMcu68&v=3.exp&libraries=geometry,drawing,places"}
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `600px`, width: `600px` }} />}
					mapElement={<div style={{ height: `80%` }} />}
					doctors={doctors}
				/>
			</div>
		);
	}
}
