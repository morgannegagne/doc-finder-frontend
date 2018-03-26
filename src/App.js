import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home'
import DoctorPage from "./components/DoctorPage"

class App extends Component {
  render() {
    return (
      <div className="App">
        < Home />
      </div>
    );
  }
}

export default App;
