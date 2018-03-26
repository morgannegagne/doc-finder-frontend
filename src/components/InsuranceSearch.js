// CAN LIKELY DELETE FILE BEFORE DEPLOYMENT

import React from 'react'
import { Search } from 'semantic-ui-react'

export default class InsuranceSearch extends React.Component {

  state = {
    isLoading: false,
    value: '',
    results: []
  }

  componentDidMount(){
    this.setState({options: this.props.insuranceList})
  }


  filterInsurances = () => {
    return this.props.insuranceList.filter(i => {
      return i.name.toLowerCase().includes(this.state.value.toLowerCase())
    })
  }

  handleSearchChange = (e) => {
    this.setState({
      value: e.target.value
    }, () => {
      let filtered = this.filterInsurances()
      this.setState({
        results: filtered
      })
    })
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.name }, () => {
      this.props.onSelectInsurance(this.state.value)
    })
  }

  resultRenderer({uid, name}) {
    return <div key={uid} value={name}>{name}</div>
  }

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Search
        fluid
        className="large"
        loading={isLoading}
        resultRenderer={this.resultRenderer}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        placeholder="Find your insurance"
      />
    )
  }
}
