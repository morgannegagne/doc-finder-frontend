import React from "react";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import { Icon } from "semantic-ui-react";
import DoctorsContainer from "./containers/DoctorsContainer";

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
		insurance: ""
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
		this.setState(values, () => {
			if (this.state.location === "Current Location") {
				this.getLocation();
			} else {
				this.searchWithGoogleCoordinates();
			}
		});
	};

	handleOptionsClick = () =>
		this.setState({ showMoreOptions: !this.state.showMoreOptions });

	handleSliderChange = distance => this.setState({ distance });

	handleGenderChange = gender => this.setState({ gender });

	handleInsuranceChange = insurance => this.setState({ insurance });

	render() {
		console.log(this.state);
		return (
			<div>
				<h1>DOC FINDER</h1>
				<SearchBar
					onSearch={this.handleSearch}
					insuranceList={this.state.insuranceList}
					changeInsurance={this.handleInsuranceChange}
				/>
				<div className="dividing header" style={{ paddingLeft: 15 }}>
					{this.state.showMoreOptions ? (
						<div>
							Less Options:{" "}
							<Icon
								onClick={this.handleOptionsClick}
								className="big"
								link
								name="minus"
							/>{" "}
							<Filters
								changeDistanceValue={this.handleSliderChange}
								changeGender={this.handleGenderChange}
							/>{" "}
						</div>
					) : (
						<div>
							More Options:<Icon
								onClick={this.handleOptionsClick}
								className="big"
								link
								name="plus"
							/>
						</div>
					)}
				</div>
				{this.state.doctors.length ? (
					<DoctorsContainer doctors={this.state.doctors} />
				) : null}
			</div>
		);
	}
}
