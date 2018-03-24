import React from 'react'
import { Form, Input, Grid, Icon, Dropdown } from 'semantic-ui-react'

export default class SearchBar extends React.Component {

  state = {
    location: '',
    insurance: '',
    specialty: ''
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.location){
      this.props.onSearch(this.state)
    }
  }

  useCurrentLocation = (e) => {
    e.preventDefault()
    this.setState({location: "Current Location"})
  }

  createInsuranceOptions = () => {
    let options = this.props.insuranceList.map(i => {
      return { key: i.uid, value: i.name, text: i.name }
    })
    options.unshift({key: 'none', value: '', text: ''})
    return options
  }

  handleSelectInsurance = (e, { value }) => this.setState({ insurance: value })

  render() {
    const options = this.createInsuranceOptions()
    return (
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={5}>
              <Form onSubmit={this.handleSubmit} >
                  <Input style={{'paddingLeft': 5, 'width': 400}} size="large" onChange={this.handleInputChange} value={this.state.keyword} name="keyword" placeholder='Search for condition, procedure, physician...' />
              </Form>
          </ Grid.Column >
          <Grid.Column width={5}>
              <Form onSubmit={this.handleSubmit} >
                <Form.Group inline>
                  <Form.Field inline >
                    <label><Icon className="link big" name='point' onClick={this.useCurrentLocation}/></label>
                    <Input size="large" style={{'width': 320}} onChange={this.handleInputChange} value={this.state.location} name="location" placeholder='Location' />
                  </Form.Field>
                </Form.Group>
              </Form>
          </ Grid.Column >
          <Grid.Column width={5} >
              <Dropdown onChange={this.handleSelectInsurance} className="large" placeholder='Select insurance' search selection fluid options={options} />
          </Grid.Column>
          <Grid.Column width={1}>
            <button className="ui icon button big" onClick={this.handleSubmit}><i className="search icon"></i></button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
