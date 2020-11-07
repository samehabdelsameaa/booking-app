import React, { Component } from "react";
import PropTypes from "prop-types";
import InputRange from "react-input-range";
import "./InputRangeSlider.scss";

class PriceRangeSlider extends Component {
  state = {
    value: {
      min: this.props.minOffset,
      max: this.props.maxOffset
    }
  };
  componentDidMount() {
    const { minOffset, maxOffset } = this.props;
    if (this.state.max == 1 && this.state.min == 0)
      this.setState({ value: { min: minOffset, max: maxOffset } });
  }
  render() {
    const { getPriceRange, minOffset, maxOffset } = this.props;
    return (
      <InputRange
        maxValue={maxOffset + 1}
        minValue={minOffset - 1}
        value={this.state.value}
        onChange={value => (value.min >= minOffset && value.max <= maxOffset ? this.setState({ value: value }) : 0)}
        onChangeComplete={value => {
          getPriceRange(value);
        }}
      />
    );
  }
}

PriceRangeSlider.propTypes = {
  getPriceRange: PropTypes.func
};

export default PriceRangeSlider;
