import React from "react";
import ReactDOM from 'react-dom';
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReviewHotel from "./ReviewHotel";
import ReviewTransportation from "./ReviewTransportation";
import ReviewFlightReservation from "./ReviewFlightReservation";
import ReviewGroundServices from "./ReviewGroundServices";
import ReviewPassengers from "./ReviewPassengers";
import ReviewVisaCheck from "./ReviewVisaCheck";
import PaymentForm from "components/PaymentForm";
import reviewAndPayActions from "store/reservation/actions";
import "sass/review-styles.scss";
import AgreementAproval from "./AgreementAproval";
import Breadcrumb from "components/Breadcrumb";
import BookingSummary from "../BookingSummary";

class Review extends React.Component {
  navigateTo = step => {
    const { setCurrentStep } = this.props;
    setCurrentStep({ stepIndex: step.index });
  };
  // completeBooking() {
  //   console.log("completeBooking", this.props);
  //   const { submitCycle } = this.props;
  //   submitCycle();
  // }
  getPaymentToken(data) {
    const { addPaymentData } = this.props;
    addPaymentData(data);
  }
  render() {
    const {
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
    } = this.props;
    const transportation = steps.find(x => x.name.toLowerCase() == "transportation")
    return (
      <React.Fragment>
        <Breadcrumb
          steps={steps}
          navigateTo={step => this.navigateTo(step)}
          currentStep={currentStep}
        />{" "}
        <div className="review">
          <div className="container">
            <div className="grid">
              <div className="gcell gcell--12 gcell--def-8">
                <div className="review__content">
                  <div className="summary__title">
                    <div className="summary__title-svg">
                      <svg width="30" height="30">
                        <use href="#click-gesture"></use>
                      </svg>
                    </div>
                    <div>
                      <Trans id="what_you_have_selected">
                        {" "}
                        What you have selected{" "}
                      </Trans>
                    </div>
                  </div>
                  <ReviewHotel navigateTo={step => {
                    const stepMakkah = steps.findIndex(x => x.name.toLowerCase() == "makkah");
                    this.navigateTo({ index: stepMakkah });
                  }} selectedHotels={cities} />
                  <ReviewTransportation
                    navigateTo={step => {
                      const stepTransportation = steps.findIndex(x => x.name.toLowerCase() == "transportation");
                      this.navigateTo({ index: stepTransportation });
                    }
                    }
                    selectedPackage={selectedTransportationPackage}
                    selectedCompany={selectedTransportationCompany}
                    selectedRoute={selectedRoute}
                  />
                  <ReviewGroundServices
                    navigateTo={step => {
                      const stepGroundService = steps.findIndex(x => x.name.toLowerCase() == "ground-service");
                      this.navigateTo({ index: stepGroundService });
                    }}
                    selectedPackage={selectedGroundServicesPackage}
                    selectedCompany={selectedGroundServicesCompany}
                  />
                  <ReviewFlightReservation navigateTo={step => {
                    const stepFlight = steps.findIndex(x => x.name.toLowerCase() == "flights");
                    this.navigateTo({ index: stepFlight });
                  }} selectedFlight={selectedJourneys} />
                  <ReviewPassengers navigateTo={step => {
                    const stepPassenger = steps.findIndex(x => x.name.toLowerCase() == "passengers");
                    this.navigateTo({ index: stepPassenger });
                  }} passengers={passengers} />
                  <ReviewVisaCheck passengers={passengers} />
                  <PaymentForm
                    cardTokenized={data => this.props.payAndBook(data)}
                  />
                  <AgreementAproval
                  // completeBooking={() => this.completeBooking()}
                  />
                </div>
              </div>

              <div className="gcell gcell--12 gcell--def-4">
                <BookingSummary />
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

export default connect(mapStateToProps, mapDispatchToProps)(Review);
