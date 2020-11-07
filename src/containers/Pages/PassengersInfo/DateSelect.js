import React from "react";
import { Trans } from "@lingui/macro";
import withClickOutside from "react-click-outside";
import { DateFormat } from "@lingui/macro";
import RegularCalendar from "components/Forms/Date/RegularCalendar";

class DateSelect extends React.PureComponent {
  state = { calenderDropdown: false };

  toggleCalenderDropdown = () =>
    this.setState({ calenderDropdown: !this.state.calenderDropdown });
  handleClickOutside = () => this.setState({ calenderDropdown: false });

  render() {
    const {
      field: { name, value: selectedValue },
      form: { setFieldValue, setFieldTouched, errors, touched },
      title,
      index,
      enableDaysAfterToday = false,
      enableDaysBeforeToday,
      allowYears,
      ...rest
    } = this.props;
    const {
      state: { calenderDropdown },
      toggleCalenderDropdown
    } = this;

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

    return (
      <div
        className={`form-group fs-calendar--single fs-calendar${
          calenderDropdown ? " open" : ""
        } `}
        {...rest}
        style={{ width: "100%" }}
      >
        <div
          className={`fs-calendar__group fs-calendar__group--inputs calendar-filled input-filled`}
          onClick={toggleCalenderDropdown}
          style={styles}
          tabIndex="0"
          onBlur={() => setFieldTouched(name, true)}
        >
          <div className="calendar-filled__start">
            <div className="calendar-filled__dp-icon">
              <svg width="27" height="26">
                <use href="#calendar_start" />
              </svg>
            </div>
            <div className="input-filled__text input-filled__text--one-line">
              {(selectedValue && (
                <DateFormat
                  value={selectedValue}
                  format={{
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  }}
                />
              )) || (
                <span className="select-drop__text">
                  {" "}
                  <Trans id="mm_dd_yy"> MM / DD / Year </Trans>{" "}
                </span>
              )}
            </div>
          </div>
        </div>
        <div id="root" className="fs-day-picker">
          <RegularCalendar
            setDate={day => {
              setFieldValue(name, day);
            }}
            allowYears={allowYears}
            selectedDate={selectedValue}
            enableDaysAfterToday={enableDaysAfterToday}
            enableDaysBeforeToday={enableDaysBeforeToday}
            closeDropdown={() => this.toggleCalenderDropdown()}
          />
        </div>
      </div>
    );
  }
}

export default withClickOutside(DateSelect);
