import React, { Component } from "react";
import { Trans } from "@lingui/macro";
import FlightItem from "./FlightItem";
import FlightPromoCodeForm from "./FlightPromoCodeForm";
import reservationActions from "store/reservation/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Breadcrumb from "components/Breadcrumb";
import "sass/flight-styles.scss";
import BookingSummary from "../BookingSummary";

class Flight extends Component {
  state = {
    departureFlight: "",
    returnFlight: "",
    isOpen: {
      return: true,
      departure: true
    },
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getFlightsData, flight } = this.props;
    getFlightsData();
    if (
      flight.selectedJourneys &&
      flight.selectedJourneys.departureFlight &&
      flight.selectedJourneys.returnFlight
    )
      this.setState({
        departureFlight: flight.selectedJourneys.departureFlight,
        returnFlight: flight.selectedJourneys.returnFlight
      });
  }

  onSelectReturnFlight(data) {
    this.setState({ returnFlight: data });
    const { setSelectedFlight, getFlightPrice } = this.props;
    const { departureFlight } = this.state;
    data["type"] = 'return';
    getFlightPrice(data);
    setSelectedFlight({ departureFlight, returnFlight: data });
  }

  onSelectDepartureFlight(data) {
    this.setState({ departureFlight: data });
    const { setSelectedFlight, getFlightPrice } = this.props;
    const { returnFlight } = this.state;
    data["type"] = 'departure';

    getFlightPrice(data);
    setSelectedFlight({ departureFlight: data, returnFlight });
  }

  toggleIsOpenFlight = target => {
    if (target === 'departure') {
      this.setState({
        isOpen: {
          departure: !this.state.isOpen.departure,
          return: this.state.isOpen.return
        }
      });
    } else {
      this.setState({
        isOpen: {
          return: !this.state.isOpen.return,
          departure: this.state.isOpen.departure,
        }
      });
    }
  }

  onSelectDeparturePackage(packageCode) {
    const { getFlightPrice, setSelectedFlight } = this.props;
    let departureFlightObj = this.state.departureFlight;
    departureFlightObj["packageCode"] = packageCode;
    this.setState({ departureFlight: departureFlightObj });
    getFlightPrice(departureFlightObj);
    const { returnFlight } = this.state;
    setSelectedFlight({ departureFlight: departureFlightObj, returnFlight });
  }
  onSelectReturnPackage(packageCode) {
    const { setSelectedFlight, getFlightPrice } = this.props;
    let returnFlightObj = this.state.returnFlight;
    returnFlightObj["packageCode"] = packageCode;
    this.setState({ returnFlight: returnFlightObj });
    getFlightPrice(returnFlightObj);
    const { departureFlight } = this.state;
    setSelectedFlight({ departureFlight, returnFlight: returnFlightObj });
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
    const { steps, currentStep, flight, airports } = this.props;
    const { departureFlight, returnFlight, isOpen } = this.state;
    const noFlightsAvailable = !(
      flight.data &&
      flight.data.departure &&
      flight.data.return &&
      flight.data.departure.length > 0 &&
      flight.data.return.length > 0
    );
    return (
      <React.Fragment>
        <Breadcrumb
          steps={steps}
          navigateTo={step => this.navigateTo(step)}
          currentStep={currentStep}
        />
        <div className="flight">
          <div className="container">
            <div className="grid">
              <div className="gcell gcell--12 gcell--def-8">
                <div className="flight__content">
                  <div className="flight-top">
                    <div className="flight-top__left">
                      <svg width="30" height="30">
                        <use href="#aeroplane"></use>
                      </svg>
                      <span>
                        <Trans id="flight_details"> Flight details </Trans>
                      </span>
                    </div>
                    {!noFlightsAvailable && <FlightPromoCodeForm />}
                  </div>
                  <div className="flight-body">
                    {noFlightsAvailable ? (
                      <div className="flight-item">
                        <div className="flight-dropdown open">
                          <span className="ft--bold ft--xl center">
                            <Trans id="no_flights_available">
                              {" "}
                              No Flights available, try another dates
                            </Trans>
                          </span>
                        </div>
                      </div>
                    ) : (
                        <div>
                          <FlightItem
                            airports={airports}
                            onSelect={data => {
                              data["packageCode"] = "PLUS";
                              this.onSelectDepartureFlight(data);
                            }}
                            selectPackage={packageCode => {
                              this.onSelectDeparturePackage(packageCode);
                            }}
                            selected={this.state.departureFlight}
                            flightType="Departure"
                            flightDetails={flight.data.departure}
                            onToggle={() => this.toggleIsOpenFlight('departure')}
                            isOpen={isOpen.departure}
                          />
                          <FlightItem
                            airports={airports}
                            onSelect={data => {
                              data["packageCode"] = "PLUS";
                              this.onSelectReturnFlight(data);
                            }}

                            selectPackage={packageCode => {
                              this.onSelectReturnPackage(packageCode);
                            }}
                            selected={this.state.returnFlight}
                            flightType="Return"
                            flightDetails={flight.data.return}
                            onToggle={() => this.toggleIsOpenFlight('return')}
                            isOpen={isOpen.return}
                          />
                        </div>
                      )}
                  </div>

                  <div className="summary-nav">
                    <button
                      type="button"
                      onClick={() => this.handleContinueToNextStep(-1)}
                      title="back"
                      className="button button--outline summary-nav__prev"
                    >
                      <span className="button__text">
                        <Trans id="back"> Back </Trans>{" "}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => this.handleContinueToNextStep(1)}
                      title="continue"
                      disabled={!departureFlight || !returnFlight}
                      className="button summary-nav__next"
                    >
                      <span className="button__text">
                        <Trans id="continue"> Continue </Trans>
                      </span>
                    </button>
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

const mapStateToProps = ({ reservations: { steps, currentStep, flight }, home: { airports } }) => {
  return { steps, currentStep, flight, airports };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...reservationActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Flight);
