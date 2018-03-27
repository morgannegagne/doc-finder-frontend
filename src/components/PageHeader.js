import React from 'react'
import { Icon, Header, Container } from "semantic-ui-react";


const PageHeader = () => {
  return(
    <Container fluid style={{"padding": 40}}>
      <Header as='h1' icon textAlign="center">
        <Icon name="doctor"/>
        <Header.Content className="oswald">
          DOC FINDER
        </Header.Content>
      </Header>
    </Container>
  )
}

export default PageHeader
