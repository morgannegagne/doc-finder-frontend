import React from "react";
import {
	Grid,
	Image,
	Header,
	List,
	Container,
	Button,
	Label,
	Segment
} from "semantic-ui-react";

export default class DoctorPage extends React.Component {
	state = {
		closestPractice: this.props.dr.practices[0]
	};

	findClosestPractice = () => {
		this.props.dr.practices.forEach(practice => {
			if (practice.distance < this.state.closestPractice.distance) {
				this.setState({
					closestPractice: practice
				});
			}
		});
	};

	formatClosestPracticePhoneNumber = () =>
		`(${this.state.closestPractice.phones[0].number.slice(
			0,
			3
		)})-${this.state.closestPractice.phones[0].number.slice(
			3,
			6
		)}-${this.state.closestPractice.phones[0].number.slice(6, 9)}`;

	formatClosestPracticeAddress = () => {
		return `${this.state.closestPractice.visit_address.street}
      ${this.state.closestPractice.visit_address.city}, ${
			this.state.closestPractice.visit_address.state
		} ${this.state.closestPractice.visit_address.zip}`;
	};

	betterDoctorsRating = () => {
		let ratingImg = null;
		if (this.props.dr.ratings.length) {
			this.props.dr.ratings.forEach(rating => {
				if (rating.provider === "betterdoctor") {
					ratingImg = <img src={rating.image_url_small} alt="" />;
				}
			});
		}
		return ratingImg;
	};

	practicesList = () => {
		return this.props.dr.practices.map(practice => {
			return (
				<li>
					{practice.visit_address.street}
					<br />
					{practice.visit_address.city}, {practice.visit_address.state}{" "}
					{practice.visit_address.zip}
					<br />
					<br />
				</li>
			);
		});
	};

	listOfInsurancesAccepted = () => {
		if (this.props.dr.insurances.length) {
			let insurances = [];
			let i = 0;
			while (i < this.props.dr.insurances.length) {
				if (
					!insurances.includes(
						this.props.dr.insurances[i].insurance_provider.name
					)
				) {
					insurances.push(this.props.dr.insurances[i].insurance_provider.name);
				}
				i++;
			}
			let sortedInsurance = insurances.sort();
			return sortedInsurance.map(insurance => <Label content={insurance} />);
		}
	};
	render() {
		this.findClosestPractice();
		return (
			<Segment>
				<Grid celled fluid>
					<Grid.Row>
						<Grid.Column width={3}>
							<Image src={this.props.dr.profile.image_url} />
						</Grid.Column>
						<Grid.Column width={8}>
							<Header as="h1" style={{color: "rgb(95, 124, 162)"}}>
								Dr. {this.props.dr.profile.first_name}{" "}
								{this.props.dr.profile.last_name}, {this.props.dr.profile.title}
							</Header>
							{this.betterDoctorsRating()}
							<List>
								<List.Item>
									<List.Icon name="treatment" />
									<List.Content>
										{this.props.dr.specialties[0].actor}
									</List.Content>
								</List.Item>
								<List.Item>
									<List.Icon name="phone" />
									<List.Content>
										{this.formatClosestPracticePhoneNumber()}
									</List.Content>
								</List.Item>
								<List.Item>
									<List.Icon name="marker" />
									<List.Content>
										{this.formatClosestPracticeAddress()}
									</List.Content>
								</List.Item>
							</List>
						</Grid.Column>
						<Grid.Column stretched width={5} style={{textAlign: "center"}}>
							<Button onClick={this.props.onClick}>
								<h1>Back To List</h1>
							</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Container textAlign="left">
					<h4>{this.props.dr.profile.bio}</h4>
					<h4>{this.props.dr.specialties[0].description}</h4>
					<br />
					<br />
					<Grid columns={2} divided>
						<Grid.Row>
							<Grid.Column>
								<h4>Practice Locations:</h4>
								<ul>{this.practicesList()}</ul>
							</Grid.Column>
							<Grid.Column>
								<h4>Accepted Insurance:</h4>
								{this.listOfInsurancesAccepted()}
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</Segment>
		);
	}
}
