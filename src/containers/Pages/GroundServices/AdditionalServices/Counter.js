import React, { Component } from "react";

class Counter extends Component {
  state = { count: 0 };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      return true;
    }
  }

  incrementCount = () => {
    const { value, resetSyncedCounters } = this.props;
    let tempValue = value + 1;
    resetSyncedCounters(tempValue);
    // this.setState(
    //   prevCount => ({ count: prevCount.count + 1 }),
    //   () => this.props.resetSyncedCounters(this.state.count)
    // );
  };

  decrementCount = () => {
    const { value, resetSyncedCounters } = this.props;
    if (value >= 0) {
      let tempValue = value - 1;
      resetSyncedCounters(tempValue);
    }
  };

  resetCounter = () => {
    const { value, resetSyncedCounters } = this.props;
    resetSyncedCounters(0);
  };

  render() {
    const { value } = this.props;
    return (
      <div className="t-counter">
        <span
          className="t-counter__action"
          onClick={this.decrementCount}
        ></span>
        <span className="t-counter__value _flex _flex-column _items-center">
          <span className="t-counter__amount">{value}</span>
        </span>
        <span
          className="t-counter__action t-counter__action--plus"
          onClick={this.incrementCount}
        ></span>
      </div>
    );
  }
}

export default Counter;
