import React from "react";
import DoctorCard from "./DoctorCard";
import { Item, Segment } from "semantic-ui-react";
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
			<DoctorCard dr={doctor} key={uuid()} onClick={this.handleListClick} toggleShowPage={this.props.toggleShowPage} />
		));
	};

	render() {
		return (
			<div className="mainItemDoctors" style={{paddingRight: 20}}>
				{this.state.clicked ? (
					<DoctorPage
						dr={this.state.selectedDoctor}
						onClick={this.handlePageClick}
						key={uuid()}
					/>
				) : (
					<Segment style={{height: 620, overflow: "scroll"}}>
						{this.createDoctorCards().length ?
							<Item.Group divided>{this.createDoctorCards()}</Item.Group>
							:
							<h1 style={{textAlign: "center", color: "rgb(95, 124, 162)"}}>No results found. Try different search terms.</h1>
						}
					</Segment>
				)}
			</div>
		);
	}
}
