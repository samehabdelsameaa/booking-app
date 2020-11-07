import React, { Component } from "react";
import { DropdownList } from "components/Forms";
import countryStatesList from "store/CitiesInCountries";

export const getListOfCityInCertainCountry = country => {
  let list = Object.keys(countryStatesList).find(item => item === country);
  return countryStatesList[list];
};

export const CitiesSelect = ({
  field: { name, value: selectedValue },
  form: { setFieldValue, setFieldTouched, errors, touched },
  selectedCountry,
  isDisabled = true,
  index,
  ...rest
}) => {
  let fieldName = name
    .split(".")
    .slice(-1)
    .pop();
  const styles =
    errors.passengers &&
    errors.passengers[index][fieldName] &&
    touched.passengers &&
    touched.passengers[index] &&
    touched.passengers[index][fieldName]
      ? {
          border: "1px solid #e3050f",
          backgroundColor: "rgba(227, 5, 15, 0.05)"
        }
      : {};
  const disabledStyles = isDisabled
    ? {
        borderLeft: "5px solid #eee",
        position: "relative",
        borderRadius: 2,
        zIndex: 100000
      }
    : {};

  const cities = getListOfCityInCertainCountry(selectedCountry);

  return (
    <DropdownList
      initialValue={selectedValue}
      render={({ dropdownOpen }, toggleDropdown, setSelected) => (
        <div className="form-group__wrap">
          <div
            className={`select-drop sm-contacts__select ${
              isDisabled ? "" : dropdownOpen ? "open" : ""
            }`}
            onClick={toggleDropdown}
            style={{ ...styles, ...disabledStyles }}
            tabIndex="0"
            onBlur={() => setFieldTouched(name, true)}
          >
            <span className="select-drop__text">
              {selectedValue || rest.placeholder}
            </span>
            <div
              className="select-drop__results"
              style={{ maxHeight: 250, overflow: "auto", zIndex: 100000000 }}
            >
              {cities &&
                cities.map((city, index) => (
                  <span
                    className="select-drop__results-item"
                    value={city}
                    key={index}
                    onClick={e => {
                      setSelected(e);
                      setFieldValue(name, city);
                    }}
                  >
                    {city}
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}
    />
  );
};

class CountriesSelect extends Component {
  state = { _countries: [] };

  componentDidMount() {
    this.setState({ _countries: this.props.options });
  }

  render() {
    const {
      field: { name, value: selectedValue },
      form: { setFieldValue, setFieldTouched, errors, touched },
      isCitySelectEnabled,
      index,
      options,
      ...rest
    } = this.props;
    const { _countries } = this.state;

    let fieldName = name
      .split(".")
      .slice(-1)
      .pop();
    const styles =
      errors.passengers &&
      errors.passengers[index][fieldName] &&
      touched.passengers &&
      touched.passengers[index] &&
      touched.passengers[index][fieldName]
        ? {
            border: "1px solid #e3050f",
            backgroundColor: "rgba(227, 5, 15, 0.05)"
          }
        : {};

    const countryName =
      _countries && _countries.find(item => item.twoCode === selectedValue);
    let selectedCountryValue = countryName && countryName.shortName;

    return (
      <DropdownList
        initialValue={selectedValue}
        render={({ dropdownOpen }, toggleDropdown, setSelected) => (
          <div className="form-group__wrap">
            <div
              className={`select-drop sm-contacts__select ${
                dropdownOpen ? "open" : ""
              }`}
              onClick={toggleDropdown}
              style={styles}
              tabIndex="0"
              onBlur={() => setFieldTouched(name, true)}
            >
              <input
                type="text"
                className="custom-input-field"
                value={selectedValue}
                placeholder="Select Country"
                onChange={e => {
                  if (!dropdownOpen) toggleDropdown();

                  let filteredCountries =
                    options &&
                    options.filter(a => {
                      return (
                        a.shortName
                          .toLowerCase()
                          .startsWith(e.target.value.toLowerCase()) ||
                        a.twoCode
                          .toLowerCase()
                          .startsWith(e.target.value.toLowerCase())
                      );
                    });
                  this.setState({ _countries: filteredCountries });
                  setFieldValue(name, e.target.value);
                }}
              />
              <div
                className="select-drop__results"
                style={{ maxHeight: 250, overflow: "auto", zIndex: 100000000 }}
              >
                {_countries &&
                  _countries.map(
                    ({ numericCode, shortName, twoCode }, index) => (
                      <span
                        className="select-drop__results-item"
                        value={twoCode}
                        key={index}
                        onClick={e => {
                          setSelected(e);
                          setFieldValue(name, e.target.getAttribute("value"));
                          isCitySelectEnabled &&
                            isCitySelectEnabled(e.target.textContent);
                        }}
                      >
                        {shortName}
                      </span>
                    )
                  )}
              </div>
            </div>
          </div>
        )}
      />
    );
  }
}

export default CountriesSelect;
