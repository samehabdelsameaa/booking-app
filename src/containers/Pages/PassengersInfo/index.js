import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Trans } from "@lingui/macro";
import * as Yup from "yup";
import passengersInfoActions from "store/reservation/actions";
import Passengers from "./Passengers";
import "sass/passengers-styles.scss";
import Breadcrumb from "components/Breadcrumb";
import "./Passengers.scss";

class PassengerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.passengerFormRef = React.createRef();
  }

  state = {
    contactFormIsValid: false,
    passengerFormIsValid: false,
    isEnabled: false,
    passengersData: [],
    contactInfo: {}
  };

  enableSubmition = val => {
    // console.log("from state transition", val);
    return val !== this.state.isEnabled
      ? this.setState(currentState => ({ isEnabled: !currentState.isEnabled }))
      : null;
  };

  submitData = passengerAndContact => {
    console.log(
      "data====>>>>>",
      passengerAndContact.contactInfo,
      passengerAndContact.passengers
    );
    const { setPassengersContactsInfo } = this.props;
    const { passengers, contactInfo } = passengerAndContact;
    setPassengersContactsInfo(passengers, contactInfo);
    this.handleContinueToNextStep(1);

    //todo: fix async issue
    // setTimeout(() => {
    // }, 1);
  };

  navigateTo = step => {
    const { setCurrentStep } = this.props;
    setCurrentStep({ stepIndex: step.index });
  };

  handleContinueToNextStep = stepsCount => {
    const { steps, currentStep, setCurrentStep } = this.props;
    const index = currentStep + stepsCount;
    const nextStep = steps[index];
    if (nextStep && nextStep.cityIndex == undefined) {
      setCurrentStep({ stepIndex: index });
    } else {
      setCurrentStep({ stepIndex: index, cityIndex: nextStep.cityIndex });
    }
  };

  setPassengersData = () => { };

  render() {
    const {
      passengers,
      steps,
      currentStep,
      isoCountries,
      contactInfo
    } = this.props; // to be get in from store
    //const { isEnabled } = this.state;
    let isEnabled = true;
    return (
      <React.Fragment>
        <Breadcrumb
          steps={steps}
          navigateTo={step => this.navigateTo(step)}
          currentStep={currentStep}
        />
        <div className="passengers">
          <div className="container--full">
            <div className="container">
              <div className="sm-contacts">
                <div className="sm-contacts__form" id="contact-payment-form">
                  <div className="sm-contacts__group">
                    <div className="sm-contacts__body">
                      <div className="sm-contacts__title sm-contacts__title--bold">
                        <Trans id="who_s_going"> Who's going? </Trans>
                      </div>
                      <div className="sm-contacts__text">
                        <span>
                          <Trans id="please_enter_the_details_for_all_travelers...">
                            Please enter the details for all travelers as shown
                            in your passport. The details provided here will be
                            used for both the flight e-ticket and the hotel
                            voucher.
                          </Trans>
                        </span>
                      </div>
                    </div>
                  </div>
                  <Passengers
                    submitForm={values => this.submitData(values)}
                    setFormRef={ref => (this.passengerFormRef = ref)}
                    passengers={passengers}
                    contactInfo={contactInfo}
                    countriesList={isoCountries}
                  />
                </div>
              </div>

              <div className="summary-nav">
                <button
                  title="back"
                  className="button button--outline summary-nav__prev"
                  onClick={() => this.handleContinueToNextStep(-1)}
                >
                  <span className="button__text">
                    <Trans id="back"> Back </Trans>
                  </span>
                </button>
                <button
                  title="continue"
                  className={`button summary-nav__next ${
                    !isEnabled ? "disabled" : ""
                    }`}
                  onClick={() => {
                    console.log("submitting form ", this.passengerFormRef);
                    this.passengerFormRef.submitForm();
                  }}
                // disabled={!this.passengerFormRef.valid}
                >
                  <span className="button__text">
                    <Trans id="continue"> Continue </Trans>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  reservations: { currentStep, steps, passengers, contactInfo },
  home: { isoCountries }
}) => ({
  currentStep,
  steps,
  passengers,
  contactInfo,
  isoCountries
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...passengersInfoActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PassengerInfo));
