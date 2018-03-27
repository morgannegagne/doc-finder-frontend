import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import { Grid } from 'semantic-ui-react'

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const wrapperStyle = { width: 200, margin: 5 };

export default class DistanceSlider extends React.Component {

  state = {
    value: 10
  }

  handleSliderChange = (value) => {
    this.setState({value}, () => {
      this.props.changeDistanceValue(value)
    })
  }

  render(){
    return (
      <div className="item" style={{paddingLeft: 30}}>
        <p>Filter by distance ({this.state.value} {this.state.value == 1 ? 'mile' : 'miles'})</p>
        <Slider min={1} max={10} defaultValue={10} handle={handle} onAfterChange={this.handleSliderChange} />
      </div>
    )
  }

}
