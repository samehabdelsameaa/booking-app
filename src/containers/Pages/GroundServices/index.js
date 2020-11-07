import React from "react";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GroundServicesCompanyList from "./Companies/GroundServicesCompanyList";
import GroundPackages from "./GSPackages/GroundPackages";
import reservationActions from "store/reservation/actions";
import { groundServicesPackageItems } from "store/reservation/dummy/groundservice";
import Breadcrumb from "components/Breadcrumb";

import "sass/ground-service-styles.scss";
import BookingSummary from "../BookingSummary";
import AdditionalServices from "./AdditionalServices";
import CountriesLookUpForm from "./CountriesLookUpForm";

class GroundServices extends React.Component {
  constructor(props) {
    super(props);
   
  }
  componentDidMount() {
    // const { fetchGroundServicesPackages } = this.props;
    // fetchGroundServicesPackages();

    const {
      fetchGroundServicesPackages,
      fetchGsAdditionalServices
    } = this.props;
    fetchGroundServicesPackages();
    fetchGsAdditionalServices();
  }

  setSelectedPackage = servicepackage => {
    const { setSelectedGroundServicesPackage } = this.props;
    setSelectedGroundServicesPackage(servicepackage);
  };

  setSelectedCompany = company => {
    const { setSelectedGroundServicesCompany } = this.props;
    setSelectedGroundServicesCompany(company);
  };

  setAdditionalServices = services => {
    const { setSelectedAdditionalServices } = this.props;
    setSelectedAdditionalServices(services);
  };
  additionalServiceSelected(newItem) {
    const { setSelectedAdditionalServices } = this.props;
    setSelectedAdditionalServices(newItem);
  }

  setNationalityAndCountryOfResidence = (target, val) => {
    const { setNationality, setCountryOfResidence } = this.props;
    if (target === "nationality") {
      setNationality(val);
    } else if (target === "countryOfResidence") {
      setCountryOfResidence(val);
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
    const {
      steps,
      currentStep,
      packagesMetadata,
      packages,
      selectedPackage,
      selectedCompany,
      companies,
      additionalServices,
      selectedAdditionalServices,
      fetchGroundServicesCompanies,
      isoCountries,
      nationality,
      countryOfResidence
    } = this.props;
    return (
      <React.Fragment>
        <Breadcrumb
          steps={steps}
          navigateTo={step => this.navigateTo(step)}
          currentStep={currentStep}
        />
        <div className="ground">
          <div className="container">
            <div className="grid">
              <div className="gcell gcell--12 gcell--def-8">
                <div className="ground__content">
                  {packages && selectedPackage && selectedPackage.code && (
                    <GroundPackages
                      packagesMetadata={groundServicesPackageItems}
                      groundPackages={packages}
                      selectedPackage={selectedPackage}
                      onSelectedPackage={servicePackage =>
                        this.setSelectedPackage(servicePackage)
                      }
                    />
                  )}

                  <AdditionalServices
                    additionalServices={additionalServices}
                    selectedAdditionalServices={selectedAdditionalServices}
                    setAdditionalServices={services =>
                      this.setAdditionalServices(services)
                    }
                    additionalServiceSelected={item => {
                      this.additionalServiceSelected(item);
                    }}
                  />

                  <CountriesLookUpForm
                    isoCountries={isoCountries}
                    nationality={nationality}
                    countryOfResidence={countryOfResidence}
                    setNationalityAndResidence={(target, val) => this.setNationalityAndCountryOfResidence(target, val)}
                  />

                  <div className="summary-nav">
                    <a
                      className="button summary-nav__next"
                      onClick={fetchGroundServicesCompanies}
                      disabled={
                        !nationality || !countryOfResidence
                      }
                    >
                      <span className="button__text">
                        <Trans id="search"> Search </Trans>{" "}
                      </span>
                    </a>
                  </div>
                  {companies && companies.length > 0 && (
                    <GroundServicesCompanyList
                      GroundCompanyList={companies}
                      onSelectedCompany={company =>
                        this.setSelectedCompany(company)
                      }
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
                      disabled={
                        !selectedCompany || !selectedCompany.companyCode
                      }
                      onClick={() => this.handleContinueToNextStep(1)}
                      title="continue"
                      className="button summary-nav__next"
                    >
                      <span className="button__text">
                        <Trans id="continue"> Continue </Trans>{" "}
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
    nationality,
    countryOfResidence,
    groundServices: {
      packagesMetadata,
      packages,
      selectedPackage,
      companies,
      selectedCompany,
      additionalServices,
      selectedAdditionalServices
    }
  },
  home: { isoCountries }
}) => ({
  steps,
  currentStep,
  packages,
  selectedPackage,
  companies,
  selectedCompany,
  packagesMetadata,
  additionalServices,
  selectedAdditionalServices,
  isoCountries,
  nationality,
  countryOfResidence
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...reservationActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GroundServices);
