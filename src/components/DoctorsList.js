import React from "react";
import DoctorCard from "./DoctorCard";
import { Item } from "semantic-ui-react";
import uuid from "uuid";
import DoctorPage from "./DoctorPage";

export default class DoctorsList extends React.Component {
	state = {
		clicked: false,
		selectedDoctor: ""
	};

	handleListClick = dr => {
		this.setState({
			clicked: true,
			selectedDoctor: dr
		});
	};

	handlePageClick = () => {
		this.setState({
			clicked: false,
			selectedDoctor: ""
		});
	};

	createDoctorCards = () => {
		return this.props.doctors.map(doctor => (
			<DoctorCard dr={doctor} key={uuid()} onClick={this.handleListClick} />
		));
	};

	render() {
		return (
			<div>
				{this.state.clicked ? (
					<DoctorPage
						dr={this.state.selectedDoctor}
						onClick={this.handlePageClick}
					/>
				) : (
					<Item.Group divided>{this.createDoctorCards()}</Item.Group>
				)}
			</div>
		);
	}
}
