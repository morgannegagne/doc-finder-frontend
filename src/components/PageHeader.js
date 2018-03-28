import React from 'react'
import { Container, Image} from "semantic-ui-react";
import StethocopeHeader from "../stethoscope.png"


const PageHeader = () => {
  return(
    <Container fluid style={{"padding": 40}} className="App-header">
      <h1 className="work-sans header-text">
        <Image src={StethocopeHeader} inline style={{height: 100}}/>
        DOC FINDER
      </h1>
    </Container>
  )
}

export default PageHeader
