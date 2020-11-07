import React from "react";
import withClickOutside from "react-click-outside";
import { Trans, Plural } from "@lingui/macro";
import { color } from "style-value-types";
import config from "config";

class AdultSelector extends React.PureComponent {
  render() {
    const { visitors } = this.props;

    return (
      <div className="counter counter--column">
        <span
          className="counter__action counter__action--plus"
          onClick={this.addAdult}
        ></span>
        <span className="counter__value _flex _flex-column _items-center">
          <span className="counter__amount">{visitors.adults}</span>
          <span className="counter__desc">
            <Trans id="adults"> Adults </Trans>{" "}
          </span>
        </span>
        <span className="counter__action" onClick={this.removeAdult}></span>
      </div>
    );
  }

  addAdult = () => {
    const { setVisitors, visitors } = this.props;            
    if(visitors.adults < config.totalPaxCount.adults)
      setVisitors({ ...visitors, adults: visitors.adults + 1 });
    else return; 
  };
  removeAdult = () => {
    const { setVisitors, visitors } = this.props;
    if (visitors.adults <= 1) return;
    if (visitors && visitors.infants === visitors.adults) {
      setVisitors({
        ...visitors,
        adults: visitors.adults - 1,
        infants: visitors.adults - 1
      });
    } else {
      setVisitors({ ...visitors, adults: visitors.adults - 1 });
    }
  };
}

const ChildSelector = ({ visitors, setVisitors }) => {
  const addChild = () => {
    setVisitors({ ...visitors, children: visitors.children + 1 });
  };
  const removeChild = () => {
    if (visitors.children <= 0) return;
    setVisitors({ ...visitors, children: visitors.children - 1 });
  };

  return (
    <div className="counter  counter--column">
      <span
        className="counter__action counter__action--plus"
        onClick={addChild}
      ></span>
      <span className="counter__value _flex _flex-column _items-center">
        <span className="counter__amount">{visitors.children}</span>
        <span className="counter__desc">
          <Trans id="children"> Children </Trans>
        </span>
        <span className="counter__desc counter__desc--sm">
          <Trans id="from_two_to_twelve_years"> 2 - 12 years </Trans>
        </span>
      </span>
      <span className="counter__action" onClick={removeChild}></span>
    </div>
  );
};

const InfantSelector = ({ visitors, setVisitors }) => {
  const addInfant = () => {
    if (visitors && visitors.infants >= visitors.adults) {
      setVisitors({ ...visitors, infants: visitors.infants });
    } else {
      setVisitors({ ...visitors, infants: visitors.infants + 1 });
    }
  };

  const removeInfant = () => {
    if (visitors.infants <= 0) return;
    setVisitors({ ...visitors, infants: visitors.infants - 1 });
  };

  return (
    <div className="counter counter--column counter--border">
      <span
        className="counter__action counter__action--plus"
        onClick={addInfant}
      ></span>
      <span className="counter__value _flex _flex-column _items-center">
        <span className="counter__amount">{visitors.infants}</span>
        <span className="counter__desc">
          <Trans id="infants"> Infants </Trans>
        </span>
        <span className="counter__desc counter__desc--sm">
          <Trans id="under_two_years"> Under 2 years </Trans>
        </span>
      </span>
      <span className="counter__action" onClick={removeInfant}></span>
    </div>
  );
};

class PaxDetailsDropdown extends React.Component {
  state = {
    visitorsDropdown: false
  };
  addRoom = () => {
    const {
      field: { value: selectedValue },
      form: { setFieldValue }
    } = this.props;
    selectedValue.push({ adults: 1, children: 0, infants: 0 });
    setFieldValue("pax", selectedValue);
  };

  removeRoom = index => {
    const {
      field: { value: selectedValue },
      form: { setFieldValue }
    } = this.props;
    selectedValue.splice(index, 1);
    setFieldValue("pax", selectedValue);
  };
  toggleVisitorsDropdown = () =>
    this.setState({ visitorsDropdown: !this.state.visitorsDropdown });
  handleClickOutside = () => this.setState({ visitorsDropdown: false });

  updateRooms = (name, item, index) => {
    const {
      field: { value: selectedValue },
      form: { setFieldValue }
    } = this.props;
    selectedValue[index] = item;
    let newRooms = selectedValue
      .slice(0, index)
      .concat(selectedValue.slice(index + 1, selectedValue.length));
    // x = [...x, item];
    newRooms.splice(index, 0, item);
    setFieldValue("pax", newRooms);
  };
  render() {
    const {
      state: { visitorsDropdown },
      toggleVisitorsDropdown
    } = this;

    const {
      field: { name, value: selectedValue },
      // form: { setFieldValue },
      title,
      ...rest
    } = this.props;
    // const rooms = selectedValue;    

    let adultsCount = selectedValue.reduce((a, b) => a + (b["adults"] || 0), 0);
    let childrenCount = selectedValue.reduce(
      (a, b) => a + (b["children"] || 0),
      0
    );
    let infantsCount = selectedValue.reduce(
      (a, b) => a + (b["infants"] || 0),
      0
    );

    return (
      <div
        className={`form-group fs-visitors${visitorsDropdown ? " open" : ""}`}
        {...rest}
      >
        {title && <span className="form-group__label fs-label"> <Trans id={title.toLowerCase()}> {title} </Trans> </span>}
        <div
          className="fs-visitors__item fs-visitors__item--filled input-filled"
          onClick={toggleVisitorsDropdown}
        >
          <div
            className="input-filled__text"
            value={{ adults: 1, children: 1, infants: 1 }}
          >
            <div className="input-filled__text">
              {adultsCount > 0 ? (
                <>
                  {adultsCount}{" "}
                  {adultsCount == 1 ? <Trans id="adult"> Adult </Trans> : adultsCount > 1 ? <Trans id="adults"> Adults </Trans> : " " }  {" "}
                </>
              ) : null}{" "}
              {childrenCount > 0 ? (
                <>
                  ,{childrenCount}{" "}
                  {childrenCount == 1 ? <Trans id="child"> Child </Trans> : childrenCount > 1 ? <Trans id="children"> Children </Trans> : " " } {" "}
                </>
              ) : null}{" "}
              {infantsCount > 0 ? (
                <>
                  ,{infantsCount}{" "}
                  {infantsCount == 1 ? <Trans id="infant"> Infant </Trans> : infantsCount > 1 ? <Trans id="infants"> Infants </Trans> : " " }
                  {" "}
                </>
              ) : null}{" "}
            </div>
            <div className="input-filled__subtext"> 
              {selectedValue.length} {" "} {selectedValue.length == 1 ? <Trans id="room"> Room </Trans> : selectedValue.length > 1 ? <Trans id="rooms"> Rooms </Trans> : " " }
            </div>{" "}
          </div>
        </div>
        <div className="visitors-results">
          <div className="visitors-results__info">
            <div className="visitors-results__info-left">
              <div className="visitors-results__info-title">
                <Trans id="traveling_with_kids"> Traveling with kids? </Trans>
              </div>
              <div className="visitors-results__info-text">
                <Trans id="include_them_above">
                  {" "}
                  Include them above for the best prices and recommendations.{" "}
                </Trans>
              </div>
            </div>
            <div className="visitors-results__info-right">
              <button
                className="button visitors-results__info-btn"
                type="button"
                onClick={() => {
                  this.addRoom();
                }}
              >
                + <Trans id="room"> Room </Trans>
              </button>
            </div>
          </div>
          {selectedValue.map((item, index) => {
            return (
              <div key={index} className="visitors-results__counters">
                <div className="visitors-results__item">
                  <div className="visitors-results__item-head">
                    <div className="visitors-results__item-title">
                      <Trans id="room"> Room </Trans> №{index + 1}
                    </div>
                    <button
                      className="visitors-results__item-remove"
                      type="button"
                    >
                      {index != 0 && (
                        <span onClick={() => this.removeRoom(index)}>
                          <Trans id="remove"> Remove </Trans>
                        </span>
                      )}
                      <svg width="9" height="9">
                        <use href="#close"></use>
                      </svg>
                    </button>
                  </div>
                  <div className="visitors-results__item-body">
                    <AdultSelector
                      visitors={item}
                      setVisitors={item => this.updateRooms(name, item, index)}
                    />
                    <ChildSelector
                      visitors={item}
                      setVisitors={item => this.updateRooms(name, item, index)}
                    />
                    <InfantSelector
                      visitors={item}
                      setVisitors={item => this.updateRooms(name, item, index)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withClickOutside(PaxDetailsDropdown);
