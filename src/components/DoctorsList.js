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

	filterDoctorsListByInsurance = () => {
		if (this.props.insurance === "") {
			return this.props.doctors;
		} else {
			return this.props.doctors.filter(doctor => {
				const insurances = doctor.insurances.map(
					insurance => insurance.insurance_provider.name
				);
				return insurances.includes(this.props.insurance);
			});
		}
	};

	filterDoctorsListByDistance = () => {
		return this.filterDoctorsListByInsurance().filter(doctor => {
			const practiceDistance = doctor.practices
				.map(practice => practice.distance)
				.sort();
			return practiceDistance[0] < this.props.distance;
		});
	};

	filterDoctorsListByGender = () => {
		console.log(this.props.gender);
		if (this.props.gender === "") {
			return this.filterDoctorsListByDistance();
		} else {
			return this.filterDoctorsListByDistance().filter(doctor => {
				return doctor.profile.gender === this.props.gender;
			});
		}
	};

	createDoctorCards = () => {
		return this.filterDoctorsListByGender().map(doctor => (
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
						key={uuid()}
					/>
				) : (
					<Item.Group divided>{this.createDoctorCards()}</Item.Group>
				)}
			</div>
		);
	}
}
