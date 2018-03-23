import React from 'react'
import { Input, Menu } from 'semantic-ui-react'

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

  render() {
    return (
      <div>
        <Menu borderless>
          <Menu.Menu position="right">
            <Menu.Item>
              <form onSubmit={this.handleSubmit}>
                <Input size="large" style={{'padding':4, 'width': 300}} onChange={this.handleInputChange} value={this.state.specialty} name="specialty" placeholder='Specialty' />
                <Input size="large" style={{'padding':4, 'width': 300}} onChange={this.handleInputChange} value={this.state.location} name="location" placeholder='Location' />
                <Input size="large" style={{'padding':4, 'width': 300}} onChange={this.handleInputChange} value={this.state.insurance} name="insurance" placeholder='Insurance' />
                <Input size="large" style={{'padding':4}} type="submit" icon="search" placeholder="search"/>
              </form>
            </Menu.Item>
            <Menu.Item>Advanced Search</Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
