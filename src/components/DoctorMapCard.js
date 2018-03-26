import React from "react";
import { Item } from "semantic-ui-react";
import { NavLink } from "react-router-dom"

const DoctorMapCard = (props) => {

	const { dr } = props

	return (
		<Item>
			<Item.Image
				src={dr.profile.image_url}
				size="tiny"
				/>
			<Item.Content>
				<Item.Header >
					<strong>
						Dr. {dr.profile.first_name}{" "} {dr.profile.last_name}, {dr.profile.title}
					</strong>
				</Item.Header>
				<Item.Meta>
					<span>
						<i>{dr.specialties.length
							? dr.specialties[0].actor
							: null}
						</i>
					</span>
					<br />
					<br />
					<span className="cinema">
						{dr.closestPractice.visit_address.street} <br />
						{dr.closestPractice.visit_address.city},{" "}
						{dr.closestPractice.visit_address.state}{" "}
						{dr.closestPractice.visit_address.zip}
						<br />
						<br />
						<strong>
							{dr.closestPractice.distance.toFixed(2)} Miles Away
						</strong>
						<br />
					</span>
				</Item.Meta>
			</Item.Content>
		</Item>
	);
}

export default DoctorMapCard
