import React from "react";
import { Form, Input, Icon, Dropdown } from "semantic-ui-react";

export default class SearchBar extends React.Component {
	state = {
		location: "",
		insurance: "",
		keyword: ""
	};

	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		if (this.state.location) {
			this.props.onSearch(this.state);
		}
	};

	useCurrentLocation = e => {
		e.preventDefault();
		this.setState({ location: "Current Location" });
	};

	createInsuranceOptions = () => {
		let options = this.sortInsuranceList().map(i => {
			return { key: i.uid, value: i.name, text: i.name };
		});
		options.unshift({ key: "none", value: "", text: "" });
		return options;
	};

	handleSelectInsurance = (e, { value }) => {
		this.setState({ insurance: value });
		this.props.changeInsurance(value);
	};

	sortInsuranceList = () => {
		let sortedInsurance = [...this.props.insuranceList];
		return sortedInsurance.sort((a, b) => {
			let x = a.name;
			let y = b.name;
			if (x < y) {
				return -1;
			} else if (x > y) {
				return 1;
			} else {
				return 0;
			}
		});
	};

	render() {
		const options = this.createInsuranceOptions();
		return (
			<div className="container" style={{paddingTop: 30}}>
				<div className="searchBarItem">
					<Form onSubmit={this.handleSubmit}>
						<Input
							fluid
							style={{ paddingLeft: 15, width: 400 }}
							size="large"
							onChange={this.handleInputChange}
							value={this.state.keyword}
							name="keyword"
							placeholder="Search for condition, procedure, physician..."
						/>
					</Form>
				</div>
				<div style={{paddingLeft: 5}} className="searchBarItem">
					<Form onSubmit={this.handleSubmit}>
						<Form.Group inline>
							<Form.Field inline>
								<label>
									<Icon
										className="link big"
										name="point"
										onClick={this.useCurrentLocation}
										style={{color: "rgb(95, 124, 162)"}}
									/>
								</label>
								<Input
									size="large"
									style={{ width: 370 }}
									onChange={this.handleInputChange}
									value={this.state.location}
									name="location"
									placeholder="Location"
								/>
							</Form.Field>
						</Form.Group>
					</Form>
				</div>
				<div className="searchBarItem">
					<Dropdown
						style={{width: 300}}
						onChange={this.handleSelectInsurance}
						className="large"
						placeholder="Select insurance"
						search
						selection
						options={options}
					/>
				</div>
				<div style={{paddingLeft: 5}} className="searchBarItem">
					<button className="ui icon primary button big" onClick={this.handleSubmit} >
						<i className="search icon" />
					</button>
				</div>
			</div>
		);
	}
}
