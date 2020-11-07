import React from "react";
import withClickOutside from "react-click-outside";
import { Trans, DateFormat } from "@lingui/macro";
import { DualCalendar } from "components/Forms";

class CalenadarDropDownFilter extends React.PureComponent {
  state = { calenderDropdown: false };

  toggleCalenderDropdown = () => this.setState({ calenderDropdown: !this.state.calenderDropdown });
  handleClickOutside = () => this.setState({ calenderDropdown: false });

  render() {
    const {
      state: { calenderDropdown },
      toggleCalenderDropdown
    } = this;
    const {
      field: { name, value: selectedValue },
      form: { setFieldValue },
      initialCheckInDate,
      title,
      ...rest
    } = this.props;

    let numberOfNights = 1;
    if (selectedValue && selectedValue.checkInDate && selectedValue.checkOutDate) {
      const timeDiff = Math.abs(selectedValue.checkOutDate - selectedValue.checkInDate);
      numberOfNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }

    return (
      <div className={`form-group fs-calendar${calenderDropdown ? " open" : ""}`} {...rest}>
        <div className="fs-calendar__group">
          <div className="fs-calendar__title">
            {title !== undefined ? (
              <span className="form-group__label fs-label">
                <Trans id="start_date"> Start Date </Trans>
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="fs-calendar__title">
            {title !== undefined ? (
              <span className="form-group__label fs-label">
                <Trans id="end_date">End date</Trans>
              </span>
            ) : (
              ""
            )}
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
                  value={selectedValue.checkInDate}
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
                  value={selectedValue.checkInDate}
                  format={{
                    weekday: "long"
                  }}
                />
              )}
            </div>
          </div>
          {!!numberOfNights && (
            <div className="calendar-filled__middle" style={{justifyContent: 'space-around'}}>
              <span className="calendar-filled__number" style={{whiteSpace: 'nowrap'}}>{numberOfNights}</span>
              <span className="calendar-filled__icon">
                <svg width="25" height="25">
                  <use href="#moon" />
                </svg>
              </span>
            </div>
          )}
          <div className="calendar-filled__end">
            <div className="input-filled__text input-filled__text--one-line">
              <div className="calendar-filled__dp-icon">
                <svg width="27" height="26">
                  <use href="#calendar_end" />
                </svg>
              </div>
              <DateFormat
                value={selectedValue.checkOutDate}
                format={{
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                }}
              />
            </div>
            <div className="input-filled__subtext">
              <DateFormat
                value={selectedValue.checkOutDate}
                format={{
                  weekday: "long"
                }}
              />
            </div>
          </div>
        </div>
        <div id="root" className="fs-day-picker">
          <DualCalendar
            setDates={dates => {
              setFieldValue(name, dates);
            }}
            from={selectedValue.checkInDate}
            to={selectedValue.checkOutDate}
            initialCheckInDate={initialCheckInDate}
            closeDropdown={() => this.toggleCalenderDropdown()}
          />
        </div>
      </div>
    );
  }
}

export default withClickOutside(CalenadarDropDownFilter);
