import React, { Component } from "react";
import PropTypes from "prop-types";
import withClickOutside from "react-click-outside";
import { Trans } from "@lingui/macro";
import config from "../../../config";

const CountContext = React.createContext();

class Counter extends Component {
  state = { count: 0, minCount: 0, maxCount: 2 };

  static contextType = CountContext;

  componentDidMount() {
    this.setState({
      count: this.props.initialCountValue,
      minCount: this.props.minCount,
      maxCount: this.props.maxCount
    });
  }

  incrementCount = () => {
    const { count, maxCount } = this.state;
    if (this.context.totalAmount < maxCount) {
      this.setState(prevCount => ({ count: prevCount.count + 1 }));
      this.props.setCount(count + 1);
    }
  };

  decrementCount = () => {
    const { count, minCount } = this.state;
    if (count > minCount) {
      this.setState(prevCount => ({ count: prevCount.count - 1 }));
      this.props.setCount(count - 1);
    }
  };

  render() {
    const { label } = this.props;
    return (
      <div className="counter">
        <span className="counter__action" onClick={this.decrementCount}></span>
        <span className="counter__value _flex _flex-column _items-center">
          <span className="counter__amount">{this.state.count}</span>
          <span className="counter__desc">{label} </span>
        </span>
        <span
          className="counter__action counter__action--plus"
          onClick={this.incrementCount}
        ></span>
      </div>
    );
  }
}

Counter.propTypes = {
  initialCountValue: PropTypes.number,
  label: PropTypes.string.isRequired,
  minCount: PropTypes.number,
  maxCount: PropTypes.number
};

class NightsReseidenceDropdown extends Component {
  state = { isOpen: false };
  toggleNightsDropdown = () => this.setState({ isOpen: !this.state.isOpen });
  handleClickOutside = () => this.setState({ isOpen: false });

  render() {
    const { isOpen } = this.state;
    const {
      field: { name, value: selectedValue },
      form: { setFieldValue },
      title,
      ...rest
    } = this.props;
    const maxNightsCount = config.nightsCount.totalMaxNights;

    return (
      <div className={`form-group fs-nights${isOpen ? " open" : ""}`} {...rest}>
        <span className="form-group__label fs-label">
          <Trans id="nights"> Nights </Trans>
        </span>
        <div
          className="fs-nights__group fs-nights__group--inputs nights-filled input-filled"
          onClick={this.toggleNightsDropdown}
        >
          <div className="nights-filled__start">
            <div className="input-filled__text">
              {" "}
              <Trans id="mecca"> Mecca </Trans>{" "}
            </div>
            <div className="input-filled__subtext">
              {selectedValue.makkah} {" "} {selectedValue.makkah == 1 ? <Trans id="night"> Night </Trans> : selectedValue.makkah > 1 ? <Trans id="nights"> Nights </Trans> : " " } {" "}
            </div>
          </div>
          <div className="nights-filled__middle" style={{justifyContent: 'space-between'}}>
            <span className="nights-filled__number" style={{whiteSpace: 'nowrap'}}> 
              {selectedValue.makkah + selectedValue.madina}
            </span>
            <span className="nights-filled__icon">
              <svg width="25" height="25">
                <use href="#moon"></use>
              </svg>
            </span>
          </div>
          <div className="nights-filled__end">
            <div className="input-filled__text">
              {" "}
              <Trans id="madinah"> Madinah </Trans>{" "}
            </div>
            <div className="input-filled__subtext">
              {selectedValue.madina} {" "} {selectedValue.madina == 1 ? <Trans id="night"> Night </Trans> : selectedValue.madina > 1 ? <Trans id="nights"> Nights </Trans> : " " } {" "}
            </div>
          </div>
        </div>
        <div className="nights-results">
          <div className="nights-results__counters">
            <CounterGroup
              totalAmount={selectedValue.makkah + selectedValue.madina}
            >
              <Counter
                initialCountValue={selectedValue.makkah}
                minCount={config.nightsCount.minNightsInMecca}
                maxCount={maxNightsCount}
                label="Mecca"
                setCount={count =>
                  setFieldValue(name, { ...selectedValue, makkah: count })
                }
              />
              <Counter
                initialCountValue={selectedValue.madina}
                minCount={config.nightsCount.minNightsInMadinah}
                maxCount={maxNightsCount}
                label="Madinah"
                setCount={count =>
                  setFieldValue(name, { ...selectedValue, madina: count })
                }
              />
            </CounterGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default withClickOutside(NightsReseidenceDropdown);

const CounterGroup = ({ totalAmount, children }) => (
  <CountContext.Provider value={{ totalAmount: totalAmount }}>
    {children}
  </CountContext.Provider>
);
