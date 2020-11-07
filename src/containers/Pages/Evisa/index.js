import React from "react";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import PassengersVisaCheckItem from "./PassengersVisaCheckItem";
import { bindActionCreators } from "redux";
import passengersVisaCheckActions from "store/reservation/actions";
import Breadcrumb from "components/Breadcrumb";
import BookingSummary from "../BookingSummary";

class PassengersVisaCheck extends React.Component {
  state = { isEnabled: false };

  componentDidMount() {
    const { fetchPassengersForVisaCheck } = this.props;
    fetchPassengersForVisaCheck();
  }

  componentDidUpdate(prevProps, prevState) {
    const { passengers } = this.props;
    if (passengers !== prevProps.passengers) {
      const paxStatus = passengers.find(pax => pax.status === "checking");
      if (paxStatus === undefined) this.setState({ isEnabled: !prevState.isEnabled });
    }
  }

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

  render() {
    const { steps, currentStep, passengers } = this.props;
    // const { isEnabled } = this.state;
    let isEnabled = true;

    return (
      <React.Fragment>
        <Breadcrumb steps={steps} navigateTo={step => this.navigateTo(step)} currentStep={currentStep} />
        <div className="visa">
          <div className="container">
            <div className="grid">
              <div className="gcell gcell--12 gcell--def-8">
                <div className="visa__content">
                  <div className="visa__group visa-top visa-top__group">
                    <div className="visa-top__body">
                      <div className="visa__title _mb-ms">
                        <Trans id="your_e_visa_status"> Your E-VISA status </Trans>
                      </div>
                      <div className="visa__text">
                        <span>
                          <Trans id="here_you_can_see_the_status_of_your_visa">
                            Here you can see the status of your visa. If you need help in obtaining a visa, our company can help you with
                            this.
                          </Trans>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="visa__group visa__group--mb">
                    <div className="visa__head">
                      <div className="visa__title visa__title--bold">
                        <Trans id="e_visa"> E-VISA </Trans>
                      </div>
                    </div>
                    <div className="visa__body">
                      {passengers && passengers.map((paxInfo, index) => <PassengersVisaCheckItem key={index} paxInfo={paxInfo} />)}
                    </div>
                  </div>

                  <div className="summary-nav">
                    <a
                      href="#"
                      onClick={() => this.handleContinueToNextStep(-1)}
                      title="back"
                      className="button button--outline summary-nav__prev"
                    >
                      <span className="button__text">
                        <Trans id="back"> Back </Trans>
                      </span>
                    </a>
                    <a
                      href="#"
                      onClick={() => this.handleContinueToNextStep(1)}
                      title="continue"
                      className={`button summary-nav__next ${!isEnabled ? "disabled" : ""}`}
                    >
                      <span className="button__text">
                        <Trans id="continue"> Continue </Trans>
                      </span>
                    </a>
                  </div>
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

const mapStateToProps = ({ reservations: { currentStep, steps, passengers } }) => ({
  currentStep,
  steps,
  passengers
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...passengersVisaCheckActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassengersVisaCheck);
