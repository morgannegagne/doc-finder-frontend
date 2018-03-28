import React from "react";
import { Button, Item, Label, Modal, Grid } from "semantic-ui-react";

export default class DoctorCard extends React.Component {
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

	listAllLanguagesSpokenByDoctor = () => {
		return this.props.dr.profile.languages.map(language => {
			return <Label icon="globe" content={language.name} />;
		});
	};

	listOfInsurancesAccepted = () => {
		if (this.props.dr.insurances.length) {
			let insurances = [this.props.dr.insurances[0].insurance_provider.name];
			let i = 1;
			while (i < this.props.dr.insurances.length && insurances.length < 3) {
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

	betterDoctorsRating = () => {
		let ratingImg = null;
		if (this.props.dr.ratings.length) {
			this.props.dr.ratings.forEach(rating => {
				if (rating.provider === "betterdoctor") {
					ratingImg = <img src={rating.image_url_small} alt={this.props.dr.profile.slug} />;
				}
			});
		}
		return ratingImg;
	};

	ReviewModal = () => {
		return this.props.dr.ratings.map(rating => {
			if (rating.provider === "yelp") {
				return (
					<Modal
						size="large"
						trigger={
							<Button primary size="small">
								See Reviews
							</Button>
						}
						closeIcon
					>
						<Modal.Content>
							<Modal.Description>
								<iframe
									src={rating.provider_url}
									width="1025"
									height="576.56"
									title=""
								/>
							</Modal.Description>
						</Modal.Content>
					</Modal>
				);
			} else {
				return null;
			}
		});
	};

	render() {
		console.log(this.props.dr)
		this.findClosestPractice();
		return (
			<Item>
				<Item.Image
					src={this.props.dr.profile.image_url}
					alt={this.props.dr.profile.slug}
					onClick={e => this.props.onClick(this.props.dr)}
				/>
			<Item.Content>
					<Item.Header as="a" onClick={e => this.props.onClick(this.props.dr)} style={{color: "rgb(95, 124, 162)"}}>
						Dr. {this.props.dr.profile.first_name}{" "}
						{this.props.dr.profile.last_name}, {this.props.dr.profile.title}
					</Item.Header>
					<Item.Meta>
						<span>
							{this.props.dr.specialties.length
								? this.props.dr.specialties[0].actor
								: null}
						</span>
						<br />
						<br />
						<span className="cinema">
							{this.state.closestPractice.visit_address.street} <br />
							{this.state.closestPractice.visit_address.city},{" "}
							{this.state.closestPractice.visit_address.state}{" "}
							{this.state.closestPractice.visit_address.zip}
							<br />
							<br />
							<strong>
								{this.state.closestPractice.distance.toFixed(2)} Miles Away
							</strong>
							<br />
						</span>
					</Item.Meta>
					<Item.Extra>
						<Grid>
							<Grid.Row columns={3}>
								<Grid.Column>
									<p>Languages Spoken: </p>
									{this.listAllLanguagesSpokenByDoctor()}
								</Grid.Column>
								<Grid.Column>
									<p>Accepted Insurance: </p>
									{this.listOfInsurancesAccepted()}
									{this.props.dr.insurances.length > 3 ? (
										<Label content="..." />
									) : null}
								</Grid.Column>
								<Grid.Column>
									{this.betterDoctorsRating() ? <p>Rating:</p> : null}
									{this.betterDoctorsRating()}
									<br />
									{this.ReviewModal()}
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Item.Extra>
				</Item.Content>
			</Item>
		);
	}
}
