import React from "react";
import { Marker, InfoWindow } from "react-google-maps";
import DoctorMapCard from "./DoctorMapCard"

export default class DoctorMarker extends React.Component {

  state = {
    isOpen: false
  }

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render(){
    return(
      <div>
        <Marker onClick={this.toggleOpen}
          position={this.props.location}
        >
        { this.state.isOpen ?
          <InfoWindow maxWidth={800} defaultPosition={ this.props.location } onCloseClick={this.props.onToggleOpen}>
            <DoctorMapCard dr={this.props.doctor}/>
          </InfoWindow> : null
        }
        </Marker>
      </div>
    )

  }
}
