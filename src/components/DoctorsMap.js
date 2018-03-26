import React from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

const DoctorsMap = compose(
  withProps({

    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBO37tWXY7797JXJmFXstlFy4J6rSMcu68&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px`, width: `600px` }} />,
    mapElement: <div style={{ height: `80%` }} />,
    isMarkerShown: true
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const markers = props.doctors.map(m => (
    <Marker
      key={m}
      position={m.closestPractice}
      onClick={props.onToggleOpen}
      >
      {props.isOpen && <InfoBox
        onCloseClick={props.onToggleOpen}
        options={{ closeBoxURL: ``, enableEventPropagation: false }}
        >
        <div style={{ backgroundColor: `white`, padding: `12px` }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            "marker"
          </div>
        </div>
      </InfoBox>}
    </Marker>
  ))

  return(
    <GoogleMap defaultZoom={15} center={props.location}>
      {markers}
    </GoogleMap>
  )
});

export default DoctorsMap
