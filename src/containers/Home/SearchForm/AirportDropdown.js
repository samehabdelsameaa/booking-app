import React from "react";
import withClickOutside from "react-click-outside";
// import { Trans } from '@lingui/react';
import { Trans, t } from '@lingui/macro';
import { I18n } from "@lingui/react";

class AirportDropdown extends React.PureComponent {
  state = { placeDropdownOpen: false, _airports: [] };
  togglePlaceDropdownOpen = () => this.setState({ placeDropdownOpen: !this.state.placeDropdownOpen });
  handleClickOutside = () => {
    this.setState({ placeDropdownOpen: false });
  }

  componentDidMount() {
    const { airports } = this.props;
    this.setState({ _airports: airports });
  }
  componentDidUpdate(prevProps) {
    const { airports: old_airports } = prevProps;
    const { airports } = this.props;
    if (airports !== old_airports) {
      this.setState({ _airports: airports });
    }
  }

  getCurrentCityAirport = () => {
    //todo: try to dedict the nearest airport according to the IP
    let tr = <Trans id="departure_airport"> Departure Airport </Trans>;
    return tr;
  }

  render() {
    const {
      field: { name, value: selectedValue, onChange, onBlur },
      form: { setFieldValue },
      airports
    } = this.props;
    const {
      state: { _airports, placeDropdownOpen },
      togglePlaceDropdownOpen
    } = this;
    const airportObj = airports.find(a => a.code == selectedValue);
    return (
      <div className={`form-group fs-search${placeDropdownOpen ? " open" : ""}`}>
        <span className="form-group__label fs-label"> <Trans id="departure_airport"> Departure Airport </Trans> </span>
        <div className="form-group__wrap fs-search__wrap">
          <I18n>
            {({ i18n }) => (
              <input
                type="text"
                className="form-group__input fs-input fs-search__input"
                name={name}
                // value={`${city} ${code}`}
                value={!placeDropdownOpen && airportObj ? `${airportObj.city} (${airportObj.code})` : selectedValue}
                placeholder={i18n._(t`departure_airport`)}
                onKeyDown={e => {
                  //todo we need to implement a way to scroll up and down on the list of items like dropdowns
                  // console.log(e.keyCode, e.charCode);
                }}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
                onClick={togglePlaceDropdownOpen}
                onBlur={() => {
                  if (_airports.length == 1) setFieldValue(name, _airports[0].code);
                  // this.setState({ _airports: airports });
                }}
                onChange={e => {
                  // console.log("change", e);
                  if (!placeDropdownOpen) {
                    togglePlaceDropdownOpen();
                  }
                  let filteredAirports = airports.filter(
                    a =>
                      a.code.toLowerCase().startsWith(e.target.value.toLowerCase()) ||
                      a.city.toLowerCase().startsWith(e.target.value.toLowerCase())
                  );

                  this.setState({ _airports: filteredAirports });
                  setFieldValue(name, e.target.value);
                }}
              />
            )}
          </I18n>
          {/* <AirportsLocationInput  name={name} {...field} {...Props } /> */}
          <span className="fs-search__icon">
            <svg width="20" height="28">
              <use href="#search" />
            </svg>
          </span>
        </div>

        <div className="search-results">
          {_airports &&
            _airports.map((airport, index) => (
              <div
                className="search-results__item"
                key={index}
                onClick={() => {
                  setFieldValue(name, airport.code);
                  togglePlaceDropdownOpen();
                }}
              >
                <div className="search-results__place">
                  <span className="search-results__icon">
                    <svg width="17" height="17">
                      <use href="#location"></use>
                    </svg>
                  </span>
                  <span className="search-results__group">
                    <span className="search-results__code">{airport.code}</span>
                    <span className="search-results__airport">{airport.city}</span>
                    <span className="search-results__info">{airport.location}</span>
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default withClickOutside(AirportDropdown);
