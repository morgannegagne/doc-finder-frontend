import React from "react";
import DoctorsList from "../components/DoctorsList";

export default class DoctorsContainer extends React.Component {
	render() {
		return (
				<DoctorsList
					doctors={this.props.doctors}
					insurance={this.props.insurance}
					distance={this.props.distance}
					gender={this.props.gender}
				/>
		);
	}
}
