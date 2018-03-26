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
			return { lat: closestPractice.lat, lng: closestPractice.lon }
		});
	};

	render() {
		const markers = this.findClosestPractice()
		return (
			<div>
				<DoctorsMap markers={markers} location={this.state.location} />
			</div>
		);
	}
}
