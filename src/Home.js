import React from "react";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import { Icon, Button, Label, Segment } from "semantic-ui-react";
import DoctorsContainer from "./containers/DoctorsContainer";
import DoctorsMapContainer from "./containers/DoctorsMapContainer"
import DoctorPage from "./components/DoctorPage"
import PageHeader from "./components/PageHeader"
import WelcomeBox from "./components/WelcomeBox"
import "./App.css"

const apiKey = process.env.apiKey

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
		fetch("https://doc-finder-api.herokuapp.com/api/v1/doctor_database/insurances")
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
			navigator.geolocation.getCurrentPosition(this.setPosition);
		} else {
			alert("Geolocation is not supported by this browser. Enter an address.")
		}
	}

	fetchDoctors = () => {
		fetch(
			`https://doc-finder-api.herokuapp.com/api/v1/doctor_database/doctors?q=${
				this.state.keyword
			}&longitude=${this.state.longitude}&latitude=${this.state.latitude}`
		)
			.then(res => res.json())
			.then(doctors => {
				this.setState({ doctors: doctors.data });
			})
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
		fetch("https://doc-finder-api.herokuapp.com/api/v1/google", options)
			.then(res => res.json())
			.then(json => {
				if (!json.error){
					this.setState(
						{
							longitude: json.lng,
							latitude: json.lat
						},
						() => {
							this.fetchDoctors();
						}
					)
				}
			}
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


	filterDoctorsListByInsurance = (doctors) => {
		if (this.state.insurance === "") {
			return doctors;
		} else {
			return doctors.filter(doctor => {
				const insurances = doctor.insurances.map(
					insurance => insurance.insurance_provider.name
				);
				return insurances.includes(this.state.insurance);
			});
		}
	};

	filterDoctorsListByDistance = (doctors) => {
		return doctors.filter(doctor => {
			const practiceDistance = doctor.practices
				.map(practice => practice.distance)
				.sort();
			return practiceDistance[0] < this.state.distance;
		});
	};

	filterDoctorsListByGender = () => {
		if (this.state.gender === "") {
			return this.state.doctors
		} else {
			return this.state.doctors.filter(doctor => {
				return doctor.profile.gender === this.state.gender;
			});
		}
	};

	filterDoctors = () => {
		let filteredDoctors = this.filterDoctorsListByGender()
		filteredDoctors = this.filterDoctorsListByDistance(filteredDoctors)
		filteredDoctors = this.filterDoctorsListByInsurance(filteredDoctors)
		return filteredDoctors
	}

	render() {

		const filteredDoctors = this.filterDoctors()
		return (
			<div>
				< PageHeader />
				<SearchBar
					 onSearch={this.handleSearch}
					 insuranceList={this.state.insuranceList}
					 changeInsurance={this.handleInsuranceChange}
				/>

				{this.state.showMoreOptions ?
					(
						<div className="optionsContainer" >
							<div className="flexItem" style={{paddingLeft: 30}}>
								<Button as='div' labelPosition='left' onClick={this.handleOptionsClick}>
									<Label basic>Less Options</Label>
									<Button>
										<Icon name="minus"/>
									</Button>
								</Button>
							</div>
							<Filters
							changeDistanceValue={this.handleSliderChange}
							changeGender={this.handleGenderChange}
							/>
						</div>
					) :
					(
						<div className="optionsContainer">
							<div className="flexItem" style={{paddingLeft: 30}}>
								<Button as='div' labelPosition='left' onClick={this.handleOptionsClick}>
									<Label basic>More Options</Label>
									<Button>
										<Icon name="plus"/>
									</Button>
								</Button>
							</div>
						</div>
					)
				}

				{this.state.doctors.length ? (
					<div className="mainContainer">
						<div className="mainItemMap">
							<Segment>
								<DoctorsMapContainer
									toggleShowPage={this.toggleShowPage}
									doctors={filteredDoctors}
									location={ {lat: this.state.latitude, lng: this.state.longitude} }
									/>
							</Segment>
						</div>

						{this.state.showDoctorPage ?
							(
								<div className="mainItemDoctors">
									<DoctorPage dr={this.state.selectedDoctor}
										onClick={this.hideShowPage}
										/>
								</div>
							)
							:
							(
								<DoctorsContainer
									doctors={filteredDoctors}
									insurance={this.state.insurance}
									distance={this.state.distance}
									gender={this.state.gender}
									showDoctor={this.toggleShowPage}
									/>
							)
						}
					</div>
					) : (
						<WelcomeBox />
					)
				}
			</div>
		);
	}
}
