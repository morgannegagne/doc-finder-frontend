import React from "react";
import DistanceSlider from "./DistanceSlider";
import GenderButtonGroup from "./GenderButtonGroup";

export default class Filters extends React.Component {
	state = {
		value: 10
	};

	render() {
		return (
			<div className="container">
				<DistanceSlider
					changeDistanceValue={this.props.changeDistanceValue}
					/>
				<GenderButtonGroup changeGender={this.props.changeGender}/>
			</div>
		);
	}
}
