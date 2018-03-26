import React from "react";
import DoctorsContainer from "./containers/DoctorsContainer";

export default class Home extends React.Component {
	state = {
		doctors: [],
		latitude: 40.704775,
		longitude: -74.013277,
		input: ""
	};

	// setPosition = position => {
	// 	console.log(position);
	// 	this.setState(
	// 		{
	// 			latitude: position.coords.longitude,
	// 			longitude: position.coords.latitude
	// 		},
	// 		this.fetchDoctors
	// 	);
	// };
	//
	// getLocation() {
	// 	if (navigator.geolocation) {
	// 		console.log("getting position");
	// 		navigator.geolocation.getCurrentPosition(this.setPosition);
	// 	} else {
	// 		console.log("Geolocation is not supported by this browser.");
	// 	}
	// }

	componentDidMount() {
		this.fetchDoctors();
	}

	fetchDoctors = () => {
		fetch(
			`http://Localhost:3000/api/v1/doctor_database/doctors?longitude=${
				this.state.longitude
			}&latitude=${this.state.latitude}`
		)
			.then(res => res.json())
			.then(doctors => this.setState({ doctors: doctors.data }));
	};

	clicked = e => {
		e.preventDefault();
		let options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				accept: "application/json"
			},
			body: JSON.stringify({
				location: this.state.input
			})
		};
		fetch("http://localhost:3000/api/v1/google", options)
			.then(res => res.json())
			.then(json => console.log(json));
	};

	handleChange = e => {
		this.setState({
			input: e.target.value
		});
	};

	render() {
		console.log(this.state);
		return (
			<div>
				{this.state.doctors.length ? (
					<DoctorsContainer doctors={this.state.doctors} />
				) : null}
			</div>
		);
	}
}
