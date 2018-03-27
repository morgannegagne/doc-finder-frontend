import React from 'react'
import { Icon, Header, Container } from "semantic-ui-react";


const PageHeader = () => {
  return(
    <Container fluid style={{"padding": 40}} className="App-header">
      <Header as='h1' icon textAlign="center">
        <Icon name="doctor" color="white"/>
        <Header.Content className="oswald" style={{color: "white"}}>
          DOC FINDER
        </Header.Content>
      </Header>
    </Container>
  )
}

export default PageHeader
