import React from "react";
import { PropTypes } from "prop-types";
import { DropdownList } from "components/Forms";

class RoomQtyDropdown extends React.PureComponent {
  render() {
    const { options, onChange, initialValue, selectedOption } = this.props;
    return (
      <DropdownList
        initialValue={initialValue}
        render={({ dropdownOpen }, toggleDropdown, setSelected) => (
          <div className={`select-drop car-product__select ${dropdownOpen ? "open" : ""}`} onClick={toggleDropdown}>
            <span className="select-drop__text"> {selectedOption} </span>
            <span>
              <div className="select-drop__results">
                {options &&
                  options.map(({ id, value, label }) => (
                    <span
                      className="select-drop__results-item"
                      key={id}
                      value={value}
                      onClick={e => {
                        setSelected(e);
                        onChange(e.target.getAttribute("value"));
                      }}
                    >
                      {label}
                    </span>
                  ))}
              </div>
            </span>
          </div>
        )}
      />
    );
  }
}

RoomQtyDropdown.defaultProps = {
  initialValue: "0"
};

export default RoomQtyDropdown;
