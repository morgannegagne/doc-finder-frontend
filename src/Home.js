import React from "react";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import { Icon, Grid, Button, Label, Header, Container } from "semantic-ui-react";
import DoctorsContainer from "./containers/DoctorsContainer";
import DoctorsMapContainer from "./containers/DoctorsMapContainer"
import DoctorPage from "./components/DoctorPage"


export default class Home extends React.Component {
	state = {
		doctors: [],
		latitude: 40.7047751,
		longitude: -74.013277,
		location: "",
		insuranceList: [],
		keyword: "",
		showMoreOptions: false,
		distance: 10,
		gender: "",
		insurance: "",
		showDoctorPage: false,
		selectedDoctor: ""
	};

	componentDidMount() {
		this.fetchInsurances();
	}

	fetchInsurances() {
		fetch("http://Localhost:3000/api/v1/doctor_database/insurances")
			.then(res => res.json())
			.then(json =>
				this.setState({
					insuranceList: json.data
				})
			);
	}

	setPosition = position => {
		this.setState(
			{
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			},
			this.fetchDoctors
		);
	};

	getLocation() {
		if (navigator.geolocation) {
			console.log("getting position");
			navigator.geolocation.getCurrentPosition(this.setPosition);
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	}

	fetchDoctors = () => {
		fetch(
			`http://Localhost:3000/api/v1/doctor_database/doctors?q=${
				this.state.keyword
			}&longitude=${this.state.longitude}&latitude=${this.state.latitude}`
		)
			.then(res => res.json())
			.then(doctors => this.setState({ doctors: doctors.data }));
	};

	searchWithGoogleCoordinates = () => {
		let options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				accept: "application/json"
			},
			body: JSON.stringify({
				location: this.state.location
			})
		};
		fetch("http://localhost:3000/api/v1/google", options)
			.then(res => res.json())
			.then(json =>
				this.setState(
					{
						longitude: json.lng,
						latitude: json.lat
					},
					() => {
						this.fetchDoctors();
					}
				)
			);
	};

	handleSearch = values => {
		this.setState(
			{
				location: values.location,
				insurance: values.insurance,
				keyword: values.keyword
			},
			() => {
				if (this.state.location === "Current Location") {
					this.getLocation();
				} else {
					this.searchWithGoogleCoordinates();
				}
			}
		);
	};

	toggleShowPage = (dr) => {
		let doctor = this.state.doctors.find(doctor => doctor.uid === dr.uid)
		this.setState({showDoctorPage: true, selectedDoctor: doctor})
	}

	hideShowPage = () => {
		this.setState({showDoctorPage: false, selectedDoctor: ""})
	}

	handleOptionsClick = () =>
		this.setState({ showMoreOptions: !this.state.showMoreOptions });

	handleSliderChange = distance => this.setState({ distance });

	handleGenderChange = gender => this.setState({ gender });

	handleInsuranceChange = insurance => this.setState({ insurance });

	render() {
		return (
			<div>
				<Container fluid style={{"padding": 40}}>
					<Header as='h1' icon textAlign="center">
						<Icon name="doctor"/>
						<Header.Content>
							DOC FINDER
						</Header.Content>
					</Header>
				</Container>

				<Grid fluid container>
				<Grid.Row>
					<SearchBar onSearch={this.handleSearch} insuranceList={this.state.insuranceList} changeInsurance={this.handleInsuranceChange}/>
				</Grid.Row>
				<Grid.Row>
						{this.state.showMoreOptions ? (
							<div>
								<Button as='div' labelPosition='left' onClick={this.handleOptionsClick}>
									<Label basic>Less Options</Label>
									<Button>
										<Icon name="minus"/>
									</Button>
								</Button>
								<Filters
									changeDistanceValue={this.handleSliderChange}
									changeGender={this.handleGenderChange}
									/>
							</div>
						) : (
							<div>
								<Button as='div' labelPosition='left' onClick={this.handleOptionsClick}>
									<Label basic>More Options</Label>
									<Button>
										<Icon name="plus"/>
									</Button>
								</Button>
							</div>
						)}
				</Grid.Row>
			</Grid>

			<div>


					< DoctorsMapContainer toggleShowPage={this.toggleShowPage} doctors={this.state.doctors} location={ {lat: this.state.latitude, lng: this.state.longitude} }/>


				{this.state.showDoctorPage ?
					<DoctorPage dr={this.state.selectedDoctor}
						onClick={this.hideShowPage} />
					:
					<DoctorsContainer
						doctors={this.state.doctors}
						insurance={this.state.insurance}
						distance={this.state.distance}
						gender={this.state.gender}
						showDoctor={this.toggleShowPage}
						/>
				}
			) : null }
					</div>
			</div>
		);
	}
}
