
# README

**Doc Finder** is a Flatiron Module 4 final project created by Morganne Gagne and Torre Johnson. The frontend uses React, Semantic UI React Components, and custom CSS styling.

Users can search for physicians either using their current location (via [geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)) or near any address (coordinates found through the Google Geolocation API). Users can search by keyword (physician name, speciality, condition, etc) and can filter search results by insurance, distance, and gender.

**Doc Finder** utilizes the [BetterDoctor API](https://developer.betterdoctor.com/), a nationwide database of physicians, dentists, and eye doctors. API requests are made through a Rails backend.

Production Site: http://doc-finder.herokuapp.com/

## Using Google Maps API with React

In order to display physician data on a map, we utilized **react-google-maps** to integrate Google Maps. **react-google-maps** and documentation can be found at [https://github.com/tomchentw/react-google-maps]. We displayed physician locations with custom markers.
