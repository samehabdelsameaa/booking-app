import React from "react";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReviewHotel from "./ReviewHotel";
import ReviewTransportation from "./ReviewTransportation";
import ReviewFlightReservation from "./ReviewFlightReservation";
import ReviewGroundServices from "./ReviewGroundServices";
import ReviewPassengers from "./ReviewPassengers";
import ReviewVisaCheck from "./ReviewVisaCheck";
import reviewAndPayActions from "store/reservation/actions";
import "sass/review-styles.scss";
import BookingSummary from "./BookingSummary";

class PrintableReview extends React.Component {

  render() {
    const {
      cities,
      selectedTransportationPackage,
      selectedTransportationCompany,
      selectedRoute,
      selectedGroundServicesCompany,
      selectedGroundServicesPackage,
      selectedJourneys,
      passengers
    } = this.props;

    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="section _flex-grow main">
            <div className="review">
              <div className="container--full">
                <div className="container">
                  <div className="grid">
                    <div className="gcell gcell--12 gcell--sm-12 gcell--xs-12">
                      <div className="review__content">
                        <div className="summary__title">
                          <div className="summary__title-svg">
                            <svg width="30" height="30">
                              <use href="#click-gesture"></use>
                            </svg>
                          </div>
                          <div>
                            <Trans id="what_you_have_selected"> What you have selected </Trans>
                          </div>
                        </div>
                        <ReviewHotel selectedHotels={cities} />
                      </div>
                      <ReviewTransportation
                        selectedPackage={selectedTransportationPackage}
                        selectedCompany={selectedTransportationCompany}
                        selectedRoute={selectedRoute}
                      />
                      <ReviewFlightReservation selectedFlight={selectedJourneys} />
                      <ReviewGroundServices
                        selectedPackage={selectedGroundServicesPackage}
                        selectedCompany={selectedGroundServicesCompany}
                      />
                      <ReviewPassengers passengers={passengers} />
                      <ReviewVisaCheck passengers={passengers} />

                    </div>
                  </div>
                  <BookingSummary />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  reservations: {
    steps,
    currentStep,
    cities,
    transportation: {
      selectedPackage: selectedTransportationPackage,
      selectedRoute,
      selectedCompany: selectedTransportationCompany
    },
    flight: { selectedJourneys },
    groundServices: {
      selectedPackage: selectedGroundServicesPackage,
      selectedCompany: selectedGroundServicesCompany
    },
    passengers
  }
}) => ({
  steps,
  currentStep,
  cities,
  selectedTransportationPackage,
  selectedTransportationCompany,
  selectedRoute,
  selectedGroundServicesCompany,
  selectedGroundServicesPackage,
  selectedJourneys,
  passengers
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...reviewAndPayActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PrintableReview);
