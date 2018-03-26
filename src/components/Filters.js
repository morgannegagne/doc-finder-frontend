import React from 'react';
import { Grid } from 'semantic-ui-react'
import DistanceSlider from './DistanceSlider'
import GenderButtonGroup from './GenderButtonGroup'

export default class Filters extends React.Component {

  state = {
    value: 10
  }

  render() {
    return (
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={4}>
            < DistanceSlider changeDistanceValue={this.props.changeDistanceValue}/>
          </Grid.Column>
          <Grid.Column width={4} centered stretched>
            < GenderButtonGroup changeGender={this.props.changeGender}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
