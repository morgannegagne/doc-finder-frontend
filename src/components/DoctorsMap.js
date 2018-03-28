import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import DoctorMarker from "./DoctorMarker"

const DoctorsMap = withScriptjs(withGoogleMap((props) =>{

  const markers = props.doctors.map( doctor => {
    let marker = <DoctorMarker
                    key={doctor.uid}
                    uid={doctor.uid}
                    closeMarkers={props.closeOtherMarkers}
                    toggleShowPage={props.toggleShowPage}
                    doctor={doctor}
                    location={{lat: doctor.closestPractice.lat, lng: doctor.closestPractice.lon}}
                    activeMarker={doctor.uid === props.activeMarker ? true : false}
                  />
    return marker
  })
  return (
      <GoogleMap
        defaultZoom={14}
        center={ props.location }
        >
        {markers}
      </GoogleMap>
    )
  }
))

export default DoctorsMap
