import React from "react";
import withClickOutside from "react-click-outside";
import { Trans, Plural } from "@lingui/macro";

const RoomSelector = ({ visitors, setVisitors }) => {
  const addRoom = () => {
    setVisitors({ ...visitors, rooms: visitors.rooms + 1 });
  };
  const removeRoom = () => {
    if (visitors.rooms <= 1) return;
    setVisitors({ ...visitors, rooms: visitors.rooms - 1 });
  };

  return (
    <div className="counter">
      <span className="counter__action" onClick={removeRoom} />
      <span className="counter__value _flex _flex-column _items-center">
        <span className="counter__amount">{visitors.rooms}</span>
        <span className="counter__desc">
          <Trans id="rooms">Rooms</Trans>
        </span>
      </span>
      <span className="counter__action counter__action--plus" onClick={addRoom} />
    </div>
  );
};

const AdultSelector = ({ visitors, setVisitors }) => {
  const addAdult = () => {
    setVisitors({ ...visitors, adults: visitors.adults + 1 });
  };
  const removeAdult = () => {
    if (visitors.adults <= 1) return;
    if (visitors && visitors.infants === visitors.adults) {
      setVisitors({
        ...visitors,
        adults: visitors.adults - 1,
        infant: visitors.adults - 1
      });
    } else {
      setVisitors({ ...visitors, adults: visitors.adults - 1 });
    }
  };

  return (
    <div className="counter">
      <span className="counter__action" onClick={removeAdult} />
      <span className="counter__value _flex _flex-column _items-center">
        <span className="counter__amount">{visitors.adults}</span>
        <span className="counter__desc">
          <Trans id="adults">Adults</Trans>
        </span>
      </span>
      <span className="counter__action counter__action--plus" onClick={addAdult} />
    </div>
  );
};

const ChildSelector = ({ visitors, setVisitors }) => {
  const addChild = () => {
    setVisitors({ ...visitors, children: visitors.children + 1 });
  };
  const removeChild = () => {
    if (visitors.children <= 0) return;
    setVisitors({ ...visitors, children: visitors.children - 1 });
  };

  return (
    <div className="counter">
      <span className="counter__action" onClick={removeChild} />
      <span className="counter__value _flex _flex-column _items-center">
        <span className="counter__amount">{visitors.children}</span>
        <span className="counter__desc" style={{ textAlign: "center" }}>
          <Trans id="children">Children</Trans>
          <span style={{ textAlign: "center", fontSize: 10, display: "block" }}> <Trans id="from_two_to_twelve_years"> 2 - 12 years </Trans></span>
        </span>
      </span>
      <span className="counter__action counter__action--plus" onClick={addChild} />
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
    <div className="counter">
      <span className="counter__action" onClick={removeInfant} />
      <span className="counter__value _flex _flex-column _items-center">
        <span className="counter__amount">{visitors.infants}</span>
        <span className="counter__desc" style={{ textAlign: "center" }}>
          <Trans id="infants">Infants</Trans>
          <span style={{ textAlign: "center", fontSize: 10, display: "block" }}> <Trans id="under_two_years"> Under 2 years </Trans></span>
        </span>
      </span>
      <span className="counter__action counter__action--plus" onClick={addInfant} />
    </div>
  );
};

class VisitorsDropdown extends React.PureComponent {
  state = { visitorsDropdown: false };
  toggleVisitorsDropdown = () => this.setState({ visitorsDropdown: !this.state.visitorsDropdown });
  handleClickOutside = () => this.setState({ visitorsDropdown: false });

  render() {
    const {
      state: { visitorsDropdown },
      toggleVisitorsDropdown
    } = this;

    const {
      field: { name, value: selectedValue },
      form: { setFieldValue },
      title,
      hasIcon,
      ...rest
    } = this.props;
    const visitors = selectedValue;

    return (
      <div className={`form-group fs-visitors${visitorsDropdown ? " open" : ""}`} {...rest}>
        {title && <span className="form-group__label fs-label">{title}</span>}
        <div className="fs-visitors__item fs-visitors__item--filled input-filled" onClick={toggleVisitorsDropdown}>
          <div className="input-filled__text" value={{ adults: 1, children: 1, infants: 1 }}>
            {visitors.adults}  {visitors.adults == 1 ? <Trans id="adult"> Adult </Trans> : visitors.adults > 1 ? <Trans id="adults"> Adults </Trans> : " " }{" "}
            {!!visitors.children && <>{visitors.children} </>}
            {visitors.children == 1 ? <Trans id="child"> Child </Trans> : visitors.children > 1 ? <Trans id="children"> Children </Trans> : " " }
          </div>
          <div className="input-filled__subtext">
            {visitors.rooms}  {visitors.rooms == 1 ? <Trans id="room"> Room </Trans> : visitors.rooms > 1 ? <Trans id="rooms"> Rooms </Trans> : " " }
            <span style={{ color: "#333", fontSize: 14, marginLeft: "25px" }}>
              {!!visitors.infants && <>{visitors.infants} </>}
              {visitors.infants == 1 ? <Trans id="infant"> Infant </Trans> : visitors.infants > 1 ? <Trans id="infants"> Infants </Trans> : " " }
            </span>
          </div>
        </div>
        <div className="visitors-results">
          <div className="visitors-results__counters">
            <RoomSelector visitors={visitors} setVisitors={visitors => setFieldValue(name, visitors)} />
            <AdultSelector visitors={visitors} setVisitors={visitors => setFieldValue(name, visitors)} />
            <ChildSelector visitors={visitors} setVisitors={visitors => setFieldValue(name, visitors)} />
            <InfantSelector visitors={visitors} setVisitors={visitors => setFieldValue(name, visitors)} />
          </div>
          <div className="visitors-results__info">
            <div className="visitors-results__info-title">
              <Trans id="traveling_with_kids">Traveling with kids?</Trans>
            </div>
            <div className="visitors-results__info-text">
              <Trans id="include_them_above">Include them above for the best prices and recommendations.</Trans>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withClickOutside(VisitorsDropdown);
