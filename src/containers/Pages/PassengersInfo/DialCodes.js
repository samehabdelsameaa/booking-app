import React, { Component } from "react";
import { DropdownList } from "components/Forms";
import countries from "store/SupportedCountries";

class DialCodes extends Component {
  state = { _dialCodes: [] };

  componentDidMount() {
    const { options } = this.props;
    this.setState({ _dialCodes: options });
  }
  render() {
    const {
      field: { name, value: selectedValue },
      form: { setFieldValue, setFieldTouched, touched, errors },
      index,
      options,
      ...rest
    } = this.props;

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
    const { _dialCodes } = this.state;

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
                placeholder="Select Dial Code"
                onChange={e => {
                  if (!dropdownOpen) toggleDropdown();

                  let filteredDialCodes =
                    options &&
                    options.filter(a => {
                      return a
                        .toString()
                        .startsWith(e.target.value.toLowerCase());
                    });
                  this.setState({ _dialCodes: filteredDialCodes });
                  setFieldValue(name, e.target.value);
                }}
              />
              <div
                className="select-drop__results"
                style={{ maxHeight: 250, overflow: "auto" }}
              >
                {_dialCodes &&
                  _dialCodes.map((dialCode, index) => (
                    <span
                      className="select-drop__results-item"
                      value={dialCode}
                      key={index}
                      onClick={e => {
                        setSelected(e);
                        setFieldValue(name, e.target.getAttribute("value"));
                      }}
                    >
                      {`+${dialCode}`}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        )}
      />
    );
  }
}

export default DialCodes;
