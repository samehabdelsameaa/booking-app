import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Trans } from "@lingui/macro";
import TransportationPackageList from "./Packages/TransportationPackageList";
import Routes from "./Routes/Routes";
import VehicleTypes from "./VehiclesTypes";
import reservationActions from "store/reservation/actions";
import Breadcrumb from "components/Breadcrumb";
import { transportationPackagesItems } from "store/reservation/dummy/transportation";

import "sass/transportation-styles.scss";
import BookingSummary from "../BookingSummary";
import AdditionalServices from "./AdditionalServices";

class Transportation extends Component {
  componentDidMount() {
    const { fetchRoutes, fetchTransportationPackages, fetchTrAdditionalServices } = this.props;
    fetchTransportationPackages();
    fetchTrAdditionalServices();
    fetchRoutes();
  }

  setActivePackage = packageItem => {
    const { setSelectedTransportationPackage } = this.props;
    setSelectedTransportationPackage(packageItem);
  };

  setActiveRoute = route => {
    const { setSelectedRoute } = this.props;
    setSelectedRoute(route);
  };

  setSelectedVehicleType = vehicleType => {
    const { setSelectedTransportationCompany } = this.props;
    setSelectedTransportationCompany(vehicleType);
  };

  sortCompaniesList = criteria => {
    const { sortCompaniesList } = this.props;
    sortCompaniesList(criteria);
  };

  setSelectedAdditionalServices = service => {
    const { setSelectedTrAdditionalServices } = this.props;
    setSelectedTrAdditionalServices(service);
  };

  fetchTransportationCompanies = () => {
    const { fetchTransportationCompanies } = this.props;
    fetchTransportationCompanies();
  };

  navigateTo = step => {
    const { setCurrentStep } = this.props;
    setCurrentStep({ stepIndex: step.index });
  };

  handleContinueToNextStep = stepsCount => {
    //move forward
    if (stepsCount > 0) {
      const { selectedRoute, setReturnFlight } = this.props;
      const airport = selectedRoute.endCityAirportCode;
      setReturnFlight(airport);
    }

    const { steps, currentStep, setCurrentStep, selectedHotel, selectedRooms } = this.props;
    const index = currentStep + stepsCount;
    const nextStep = steps[index];
    let path = undefined;
    if (nextStep && nextStep.cityIndex === undefined) {
      setCurrentStep({ stepIndex: index });
    } else if (nextStep && nextStep.cityIndex !== undefined) {
      //if the goto step is city step
      if (selectedHotel && selectedHotel.id) {
        //if user selected a room for this city, then go to the room summary page
        if (selectedRooms && selectedRooms.length) {
          path = "room-summary";
        }
        // otherwise goto hotel details page
        else {
          path = "hotel";
        }
      } //else do nothing, it should be location page

      setCurrentStep({ stepIndex: index, cityIndex: nextStep.cityIndex, path });
    }
  };

  render() {
    const {
      steps,
      currentStep,
      routes,
      packages,
      selectedPackage,
      selectedRoute,
      selectedCompany,
      companies,
      additionalServices,
      selectedAdditionalServices
    } = this.props;
    return (
      <React.Fragment>
        <Breadcrumb steps={steps} navigateTo={step => this.navigateTo(step)} currentStep={currentStep} />
        <div className="transport">
          <div className="container">
            <div className="grid">
              <div className="gcell gcell--12 gcell--def-8">
                <div className="transport__content">
                  <TransportationPackageList
                    packagesMetadata={transportationPackagesItems}
                    transportationPackages={packages}
                    selectedPackage={selectedPackage}
                    onPackageSelected={packageItem => this.setActivePackage(packageItem)}
                  />

                  <AdditionalServices
                    additionalServices={additionalServices}
                    selectedAdditionalServices={selectedAdditionalServices}
                    setAdditionalServices={services => this.setSelectedAdditionalServices(services)}
                  />

                  {Object.keys(selectedPackage).length > 0 && selectedPackage.constructor === Object && (
                    <Routes routes={routes} selectedRoute={selectedRoute} onRouteSelected={route => this.setActiveRoute(route)} />
                  )}

                  <div className="summary-nav">
                    <a className="button summary-nav__next" onClick={this.fetchTransportationCompanies}>
                      <span className="button__text">
                        <Trans id="search"> Search </Trans>{" "}
                      </span>
                    </a>
                  </div>

                  {companies && companies.length > 0 && (
                    <VehicleTypes
                      companiesList={companies}
                      onVehicleSelected={company => this.setSelectedVehicleType(company)}
                      onSortCompanies={sortCriteria => this.sortCompaniesList(sortCriteria)}
                    />
                  )}

                  <div className="summary-nav">
                    <button
                      onClick={() => this.handleContinueToNextStep(-1)}
                      title="back"
                      className="button button--outline summary-nav__prev"
                    >
                      <span className="button__text">
                        <Trans id="back"> Back </Trans>
                      </span>
                    </button>
                    <button
                      onClick={() => this.handleContinueToNextStep(1)}
                      title="continue"
                      disabled={!selectedCompany.hasOwnProperty("vehicleTypeCode")}
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

const mapStateToProps = ({
  reservations: {
    steps,
    currentStep,
    transportation: {
      routes,
      packages,
      selectedPackage,
      selectedRoute,
      companies,
      selectedCompany,
      additionalServices,
      selectedAdditionalServices
    },
    cities,
    cityIndex
  }
}) => {
  const { selectedHotel, selectedRooms } = cities[cityIndex];
  const returnDate = cities[cities.length - 1].searchCriterias.date.checkOutDate;
  return {
    steps,
    currentStep,
    packages,
    selectedPackage,
    routes,
    selectedRoute,
    companies,
    selectedCompany,
    selectedHotel,
    selectedRooms,
    returnDate,
    additionalServices,
    selectedAdditionalServices
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...reservationActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Transportation);
