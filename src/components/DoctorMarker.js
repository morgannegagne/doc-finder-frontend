import React from "react";
import { Marker, InfoWindow } from "react-google-maps";
import DoctorMapCard from "./DoctorMapCard"
import StethoscopeIcon from "../stethoscopeIcon.png"

export default class DoctorMarker extends React.Component {

  state = {
    isOpen: false,
    activeMarker: this.props.activeMarker
  }

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen}, () =>{
        if (!this.state.isOpen){
          this.setState({activeMarker: false}, () => {
            this.props.closeMarkers(null)
          })
        } else{
          this.props.closeMarkers(this.props.uid)
        }
      }
    )
  }

  componentWillReceiveProps(nextProps){
    this.setState({activeMarker: nextProps.activeMarker})
  }

  render(){
    return(
      <div>
        <Marker onClick={this.toggleOpen}
          position={this.props.location}
          icon={StethoscopeIcon}
        >
        { this.state.isOpen && this.state.activeMarker ?
          <InfoWindow maxWidth={800} defaultPosition={ this.props.location } onCloseClick={this.props.onToggleOpen}>
            <DoctorMapCard toggleShowPage={this.props.toggleShowPage} dr={this.props.doctor}/>
          </InfoWindow> : null
        }
        </Marker>
      </div>
    )

  }
}
