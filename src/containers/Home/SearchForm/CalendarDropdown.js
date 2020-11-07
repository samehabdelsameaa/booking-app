import React from "react";
import withClickOutside from "react-click-outside";
import { Trans, DateFormat } from "@lingui/macro";
import MonoCalendar from "components/Forms/Date/MonoCalendar";

class CalenderDropdown extends React.PureComponent {
  state = { calenderDropdown: false };

  toggleCalenderDropdown = () => this.setState({ calenderDropdown: !this.state.calenderDropdown });
  handleClickOutside = () => this.setState({ calenderDropdown: false });

  render() {
    const {
      field: { name, value: selectedValue },
      form: { setFieldValue },
      title,
      ...rest
    } = this.props;

    const {
      state: { calenderDropdown },
      toggleCalenderDropdown
    } = this;

    return (
      <div className={`form-group fs-calendar--single fs-calendar${calenderDropdown ? " open" : ""}`} {...rest}>
        <div className="fs-calendar__group">
          <div className="fs-calendar__title">
              <span className="form-group__label fs-label">
                <Trans id="departure_date"> Departure Date </Trans>
              </span>
          </div>
        </div>
        <div className="fs-calendar__group fs-calendar__group--inputs calendar-filled input-filled" onClick={toggleCalenderDropdown}>
          <div className="calendar-filled__start">
            <div className="calendar-filled__dp-icon">
              <svg width="27" height="26">
                <use href="#calendar_start" />
              </svg>
            </div>
            <div className="input-filled__text input-filled__text--one-line">
              {selectedValue && (
                <DateFormat
                  value={selectedValue}
                  format={{
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  }}
                />
              )}
            </div>
            <div className="input-filled__subtext">
              {selectedValue && (
                <DateFormat
                  value={selectedValue}
                  format={{
                    weekday: "long"
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div id="root" className="fs-day-picker">
          <MonoCalendar
            setDate={day => {
              setFieldValue(name, day);
            }}
            selectedDate={selectedValue}
            closeDropdown={() => this.toggleCalenderDropdown()}
          />
        </div>
      </div>
    );
  }
}

export default withClickOutside(CalenderDropdown);
