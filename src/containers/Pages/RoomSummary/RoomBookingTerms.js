import React from "react";
import { Trans } from "@lingui/macro";

class RoomBookingTerms extends React.Component {
  state = { isExpanded: true };
  toggleExpanded = () => this.setState({ isExpanded: !this.state.isExpanded });

  render() {
    const { bookingTerms } = this.props;
    const { isExpanded } = this.state;
    return (
      <div className="summary-terms">
        <div className={`summary-dropdown ${isExpanded ? "open" : ""}`}>
          <span className="summary-dropdown__btn" onClick={this.toggleExpanded}>
            <span className="summary-dropdown__icon">
              <svg width="8" height="8" className="summary-dropdown__svg">
                <use href="#sort-down"></use>
              </svg>
            </span>
            <span>
              <Trans id="booking_terms"> Booking Terms </Trans>
            </span>
          </span>

          <div className="summary-dropdown__content">
            <div className="summary-terms__info">
              <div className="summary-terms__info-wrap">
                {bookingTerms &&
                  bookingTerms.map((term, index) => (
                    <div className="summary-terms__text" key={index}>
                      {term.value}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomBookingTerms;
