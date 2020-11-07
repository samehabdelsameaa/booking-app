import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import reservationActions from "store/reservation/actions";
import HotelBookingSummary from "./HotelBookingSummary";
import HotelLocationMap from "./HotelLocationMap";
import HotelSearchCriteria from "./HotelSearchCriteria";
import HotelFilters from "./HotelFilters";
import HotelCardsList from "./HotelCardsList";
import Breadcrumb from "../../../components/Breadcrumb/";
import qs from "query-string";
import { qsDecrypt } from "utils/encryption";
import animateScrollTo from "animated-scroll-to";
import "sass/location-styles.scss";

class HotelLocation extends Component {
  state = {
    isCardsOpen: true,
    isFilterOpen: false,
    isMarkerSelected: 0
  };

  selectHotelDetails = (id, originalCode) => {
    this.props.routeToHotelId(id, originalCode);
    // console.log(id);
  };
  
  componentDidMount() {
    const {
      queryString,
      cityIndex,
      cityName,
      filters,
      fetchHotels,
      searchCriterias,
      pagination,
      setCurrentStep,
      initSession,
      trackToken
    } = this.props;
    animateScrollTo(0, { speed: 400 });
    // cityIndex == 0
    //   ? setCurrentStep({ stepIndex: 1, newPath: undefined })
    //   : setCurrentStep({ stepIndex: 2, newPath: undefined });
    const params = qs.parse(qsDecrypt(queryString));
    if (params && params.loadHotels) {
      const { visitors } = searchCriterias;

      //initializing session will create empty array for passengers, and set departure airport code
      initSession(
        "airportCode",
        {
          /* dates */
        },
        visitors
      );
      // debugger;
      fetchHotels({
        cityName,
        filters,
        searchCriterias,
        pagination,
        cityIndex,
        trackToken
      });
    }
  }

  toggleCardsListOpen = () => {
    this.setState(prevState => ({ isCardsOpen: !prevState.isCardsOpen }));
  };

  toggleSummaryInfo = status => {
    this.setState(prevState => ({ isFilterOpen: status }));
  };

  updateSearchCriteria = newCriterias => {
    const newSearchCriteria = {
      visitors: newCriterias.pax,
      date: newCriterias.date
    };
    const {
      cityName,
      hotels,
      filters,
      trackToken,
      // pagination,
      hotelAmenities
    } = this.props;
    const newPagination = { pageNumber: 1, pageSize: 10, hasMoreItems: true };
    this.props.fetchHotels({
      cityName,
      hotels,
      filters,
      searchCriterias: newSearchCriteria,
      pagination: newPagination,
      hotelAmenities,
      trackToken
    });
  };

  updateFilterInputs = newFilters => {
    const newFiltersCriteria = [];
    let num = 0;
    for (let key in newFilters) {
      newFiltersCriteria[num] = { name: key, values: newFilters[key] };
      num++;
    }

    const { cityName, hotels, searchCriterias, pagination, hotelAmenities, trackToken } = this.props;
    const newPagination = { pageNumber: 1, pageSize: 10, hasMoreItems: true };

    this.props.fetchHotels({
      cityName,
      hotels,
      filters: newFiltersCriteria,
      searchCriterias,
      pagination: newPagination,
      hotelAmenities,
      trackToken
    });
  };

  getFilterValueForFormik = (filters, keyName) => filters[filters.findIndex(a => a.name === keyName)].values;

  navigateTo = step => {
    const { switchCityIndex, setCurrentStep } = this.props;
    //update bread crumb active step
    step.isCityStep ? setCurrentStep({ stepIndex: step.index, cityIndex: step.cityIndex }) : setCurrentStep({ stepIndex: step.index });
    if (!!step.isCityStep && !!this.filterFormRef && !!this.searchCriteriaFormRef) {
      //if this is a city step, switch to that city, and reset resetable settings
      // switchCityIndex(step.cityIndex);

      const { allFilters, allSearchCriterias } = this.props;
      const filters = allFilters[step.cityIndex];
      const searchCriterias = allSearchCriterias[step.cityIndex];
      let formFilters = {
        nightsCount: this.getFilterValueForFormik(filters, "nightsCount"),
        priceRange: this.getFilterValueForFormik(filters, "priceRange"),
        comfortLevel: this.getFilterValueForFormik(filters, "comfortLevel"),
        selectedAmenities: this.getFilterValueForFormik(filters, "selectedAmenities")
      };

      let formSearchCriteria = {
        date: {
          checkInDate: +new Date(searchCriterias.date.checkInDate),
          checkOutDate: +new Date(searchCriterias.date.checkOutDate)
        },
        pax: searchCriterias.visitors
      };
      this.filterFormRef.resetForm(formFilters);
      this.searchCriteriaFormRef.resetForm(formSearchCriteria);
    }
  };

  unSelectLocationmarker = index => this.setState({ isMarkerSelected: index });
  selectLocationmarker = index => this.setState({ isMarkerSelected: index });

  render() {
    const { isCardsOpen, isFilterOpen, isMarkerSelected } = this.state;

    const {
      steps,
      currentStep,
      cityName,
      latitude,
      longitude,
      zoomLevel,
      hotels,
      filters,
      searchCriterias: {
        date: { checkInDate, checkOutDate },
        visitors
      },
      pagination: { hasMoreItems, pageNumber, pageSize },
      hotelAmenities,
      fetchHotelsPage,
      departureDate: initialCheckInDate,
      priceRange,
      selectedJourneys,
      flightPrice,
      selectedHotels,
      selectedRooms,
      passengers,
      trackToken,
      amenities
    } = this.props;
    const markersData = hotels.map(e => {
      return {
        id: e.id,
        name: e.hotelName,
        price: e.price,
        lat: e.latitude,
        long: e.longitude
      };
    });
    // console.log("priceRange", priceRange);
    return (
      <div className="loc">
        <Breadcrumb steps={steps} navigateTo={step => this.navigateTo(step)} currentStep={currentStep} />
        <div className="loc-head">
          <div className="container container--md loc-head__container">
            <HotelSearchCriteria
              setSearchCriteriaRef={form => (this.searchCriteriaFormRef = form)}
              onFilterUpdated={values => this.updateSearchCriteria(values)}
              initialCheckInDate={initialCheckInDate}
              currentCity={cityName}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              visitors={visitors}
            />
          </div>
        </div>

        <div className="container container--max loc__container">
          <div className={classNames("loc__content", { 'left-f-open': isCardsOpen, 'right-f-open': isFilterOpen })}>
            <HotelLocationMap
              cityName={cityName}
              latitude={latitude}
              longitude={longitude}
              zoomLevel={zoomLevel}
              mapInfo={markersData}
              markerIcon={isMarkerSelected}
              isFloatWindowOpen={[isCardsOpen, isFilterOpen]}
            />
            <div className={classNames("loc-filter", { open: isCardsOpen })}>
              <div className="loc__arrow loc__arrow--left" onClick={this.toggleCardsListOpen}>
                <svg width="15" height="15">
                  {" "}
                  <use href="#arrow"></use>{" "}
                </svg>
              </div>
              <div className="loc-filter__wrap">
                {priceRange && (
                  <HotelFilters
                    setFormRef={form => (this.filterFormRef = form)}
                    onFilterUpdated={values => this.updateFilterInputs(values)}
                    hotelAmenities={hotelAmenities}
                    filters={filters}
                    minPrice={priceRange.min}
                    maxPrice={priceRange.max}
                    amenities={amenities}
                  />
                )}
                <HotelCardsList
                  hotels={hotels}
                  hasMoreItems={hasMoreItems}
                  nextPage={pageNumber}
                  selectHotelDetails={this.selectHotelDetails}
                  fetchHotels={() => {
                    let newPageNumber = pageNumber + 1;
                    fetchHotelsPage({
                      cityName,
                      filters,
                      searchCriterias: {
                        date: { checkInDate, checkOutDate },
                        visitors
                      },
                      pagination: {
                        pageNumber: newPageNumber,
                        pageSize,
                        hasMoreItems
                      },
                      trackToken
                    });
                  }}
                  selectLocationmarker={index => this.selectLocationmarker(index)}
                  unSelectLocationmarker={index => this.unSelectLocationmarker(index)}
                />
              </div>
            </div>
            <HotelBookingSummary
              selectedFlights={selectedJourneys}
              selectedHotels={selectedHotels}
              selectedRooms={selectedRooms}
              price={flightPrice}
              passengers={passengers}
              toggleSummaryInfo={status => this.toggleSummaryInfo(status)}
              isFilterOpen={isFilterOpen}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  router: {
    location: { search: queryString }
  },
  home: { departureDate, amenities },
  reservations: {
    steps,
    cities,
    cityIndex,
    currentStep,
    flight: { selectedJourneys, price: flightPrice },
    passengers
  }
}) => {
  const {
    cityName,
    latitude,
    longitude,
    zoomLevel,
    hotels,
    filters,
    searchCriterias,
    pagination,
    hotelAmenities,
    priceRange,
    trackToken
  } = cities[cityIndex];
  const allFilters = cities.map(a => a.filters);
  const allSearchCriterias = cities.map(a => a.searchCriterias);
  const selectedHotels = [...cities];
  const selectedRooms = cities.map(a => a.selectedRooms);
  return {
    queryString,
    steps,
    allFilters,
    allSearchCriterias,
    cityName,
    latitude,
    longitude,
    zoomLevel,
    cityIndex,
    hotels,
    filters,
    trackToken,
    searchCriterias,
    pagination,
    hotelAmenities,
    currentStep,
    departureDate,
    priceRange,
    selectedJourneys,
    flightPrice,
    selectedHotels,
    passengers,
    selectedRooms,
    amenities
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...reservationActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HotelLocation);
