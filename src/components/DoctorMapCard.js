import React from "react";
import { Button, Icon, Image as ImageComponent,	Image, Item, Label,	Modal, Grid } from "semantic-ui-react";

const DoctorMapCard = (props) => {

	return (
    <Grid>
			<Grid.Column>
				<Item>
					<Item.Image
						src={props.dr.profile.image_url}
						/>
					<Item.Content>
						<Item.Header >
							Dr. {props.dr.profile.first_name}{" "}
							{props.dr.profile.last_name}, {props.dr.profile.title}
						</Item.Header>
					</Item.Content>
				</Item>
			</Grid.Column>

		</Grid>

	);
}

export default DoctorMapCard
