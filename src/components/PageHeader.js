import React from 'react'
import { Icon, Header, Container } from "semantic-ui-react";


const PageHeader = () => {
  return(
    <Container fluid style={{"padding": 40}} className="App-header">
      <Icon className="doctor"/>
      <h1 id="header-text" className="oswald header-text">
        DOC FINDER
      </h1>
    </Container>
  )
}

export default PageHeader
