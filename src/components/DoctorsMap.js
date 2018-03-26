import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import DoctorMarker from "./DoctorMarker"

const DoctorsMap = withScriptjs(withGoogleMap((props) =>

  <GoogleMap
    defaultZoom={14}
    center={ props.location }
  >
    {props.doctors.map(doctor => <DoctorMarker doctor={doctor} location={doctor.closestPractice} />)}
  </GoogleMap>

))

export default DoctorsMap
