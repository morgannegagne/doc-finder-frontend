import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const GenderButtonGroup = (props) => {

  const handleClick = (e) => {
    props.changeGender(e.target.value)
  }

  return(
    <div className="item" style={{paddingLeft: 30}}>
      <Button.Group onClick={handleClick} compact>
        <Button labelPostion="left" value="female">
          <Icon name="female" />
          Female
        </Button>
        <Button value="">Any Gender</Button>
        <Button labelPostion="right" value="male">
          <Icon name="male"/>
          Male
        </Button>
      </Button.Group>
    </div>
  )
}

export default GenderButtonGroup
