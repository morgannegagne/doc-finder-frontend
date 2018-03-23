import React from 'react'
import { Input, Menu, Icon } from 'semantic-ui-react'

export default class SearchBar extends React.Component {

  state = {
    location: '',
    insurance: ''
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSearch(this.state)
  }

  useCurrentLocation = (e) => {
    e.preventDefault()
    this.setState({location: "Current Location"})
  }

  render() {
    const inputStyle={'padding':4, 'width': 300}
    return (
      <div>
        <Menu borderless>
          <Menu.Menu >
            <Menu.Item>
              <form onSubmit={this.handleSubmit}>
                <Input size="large" style={inputStyle} onChange={this.handleInputChange} value={this.state.specialty} name="specialty" placeholder='Specialty' />
                <Input size="large" style={inputStyle} onChange={this.handleInputChange} value={this.state.location} name="location" placeholder='Location' />
                <Icon  size="big" link onClick={this.useCurrentLocation}  name="point" />
                <Input size="large" style={inputStyle} onChange={this.handleInputChange} value={this.state.insurance} name="insurance" placeholder='Insurance' />
                <button className="ui icon button" onClick={this.handleSubmit}><i className="search icon"></i></button>
              </form>
            </Menu.Item>
            <Menu.Item>Advanced Search</Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
