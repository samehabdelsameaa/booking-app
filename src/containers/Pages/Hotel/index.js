import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Trans } from "@lingui/macro";
import reservationActions from "store/reservation/actions";
import classNames from "classnames";

import Breadcrumb from "components/Breadcrumb/";
import HotelMap from "./HotelMap";
import HotelCheckIn from "./HotelCheckIn";
import HotelImages from "./HotelImages";
import HotelFilters from "./HotelFilters";
import HotelRooms from "./HotelRooms";
import HotelFeatures from "./HotelFeatures";
import HotelSpecialInstructions from "./HotelSpecialInstructions";
import HotelAmenities from "./HotelAmenities";
import "sass/hotel-styles.scss";
import qs from "query-string";
import { qsDecrypt } from "utils/encryption";
import animateScrollTo from "animated-scroll-to";

const hotelCheckInPolicy =
  "A valid permit to perform Hajj must be presented at the airport and hotel check-in from July 25-August 25, 2019. Guests without valid permits will not be able to check-in. For permit-related questions, please contact the hotel or airline directly. Contact information is provided on the reservation confirmation received after booking.";

const hotelCheckInInstructions = [
  {
    label: "Know before you go",
    values: [
      {
        label: "Only Muslims are allowed to enter the holy cities of Mecca and Medina."
      },
      {
        label:
          "Local laws may restrict unmarried guests from sharing rooms. Guests are responsible for providing proof of marriage, if requested by the property."
      },
      {
        label: "Couples wishing to share a room must provide proof of marriage."
      },
      {
        label:
          "The property has connecting/adjoining rooms, which are subject to availability and can be requested by contacting the property using the number on the booking confirmation."
      },
      { label: "No pets and no service animals are allowed at this property." },
      { label: "Alcohol is not served or permitted at this property." }
    ]
  },
  {
    label: "Fees",
    headerTitle: "The following fees and deposits are charged by the property at time of service, check-in, or check-out.",
    footerTitle: "The above list may not be comprehensive. Fees and deposits may not include tax and are subject to change.",
    values: [
      {
        label: "Fee for buffet breakfast: SAR 90 for adults and SAR 45 for children (approximately)"
      },
      {
        label: "Fee for in-room wireless Internet: SAR 15 per hour (rates may vary)"
      }
    ]
  }
];

const hotelFeatures = {
  featureTitle: "",
  featureDetails:
    "Make yourself at home in one of the 1487 air-conditioned rooms featuring refrigerators and LCD televisions. Wireless Internet access (surcharge) keeps you connected, and digital programming is available for your entertainment. Private bathrooms with bathtubs or showers feature complimentary toiletries and bidets. Conveniences include phones, as well as safes and desks.",
  specialFeatures: [
    {
      title: "Dining",
      description:
        "Enjoy Mediterranean cuisine at Ajwaa Restaurant, one of the hotel's 3 restaurants, or stay in and take advantage of the 24-hour room service.  Wrap up your day with a drink at the bar/lounge. Buffet breakfasts are available daily from 6:00 AM to 10:00 AM for a fee."
    },
    {
      title: "Amenities",
      description:
        "Make use of convenient amenities such as complimentary wireless Internet access, concierge services, and gift shops/newsstands. Additional features at this Art Deco hotel include a hair salon, a television in a common area, and a banquet hall."
    }
  ]
};

/* map data */
const locationsMarkers = [
  {
    icon: "./assets/images/markers/marker.svg",
    id: 1,
    name: "Hilton Suites Makkah",
    price: 52,
    long: 39.824104,
    lat: 21.418344
  }
];

class HotelDetails extends Component {
  componentDidMount() {
    const { queryString, getHotelDetails, fetchKnownPlaces } = this.props;
    const params = qs.parse(qsDecrypt(queryString));
    if (params && !!params.setHotel) {
      const { hotelId, originalCode } = params;
      fetchKnownPlaces();
      getHotelDetails(hotelId, originalCode);
    }
  }

  navigateTo = step => {
    const { setCurrentStep } = this.props;
    setCurrentStep({ stepIndex: step.index });
  };

  handleContinueToNextStep = stepsCount => {
    const { steps, currentStep, setCurrentStep } = this.props;
    /*
      1- if moving back from hotel detail, we need to remove the selected hotel id, and dont 
      change the step index or the city index as we still in the same step
      2- if we are moving forward we need to do nothing, only change the path to the next step;
    */
    const index = currentStep;
    let path = undefined;
    let removeParams = [];
    const cityIndex = steps[index].cityIndex;
    //-1
    if (stepsCount < 0) {
      path = "location";
      removeParams = ["hotelId", "originalCode"];
    }
    //1
    else {
      //todo -> selectedRoomTypes
      path = "room-summary";
    }

    setCurrentStep({
      stepIndex: index,
      cityIndex: cityIndex,
      removeQps: removeParams,
      path: path
    });
  };

  calculateDistanceFromHaram = hoel => {
    //todo: calculate the distance from the current city's haram (mekka or madina haram)
    return "(42.33 km / 26.3 mi)";
  };

  scrollToElement = () => {
    animateScrollTo(document.querySelector('#mapLocation'));
  }

  render() {
    const {
      selectedHotel,
      selectedRooms,
      zoomLevel,
      searchCriterias,
      cityName,
      currentStep,
      steps,
      knownPlaces,
      setSelectedRooms
    } = this.props;

    return (
      <div className="hotel">
        <Breadcrumb steps={steps} navigateTo={step => this.navigateTo(step)} currentStep={currentStep} />
        <HotelFilters
          checkInDate={searchCriterias.date.checkInDate}
          checkoutDate={searchCriterias.date.checkOutDate}
          departureCity={"Berlin"}
          arrivalCity={cityName}
          paxInfo={searchCriterias.visitors}
        />
        <HotelImages
          nearByAreas={knownPlaces}
          knownPlacesDistances={selectedHotel.knownPlacesDistances}
          images={selectedHotel.images}
          hotelName={selectedHotel.hotelName}
          rating={selectedHotel.rating}
          hotelAddress={selectedHotel.address}
          hotelLocation={{
            lat: selectedHotel.latitude,
            Longitude: selectedHotel.longitude
          }}
          hotelAmenities={selectedHotel.amenities}
          scrollToMap={this.scrollToElement}
        />
        <HotelRooms
          hotelId={selectedHotel.id}
          roomGroups={selectedHotel.roomGroups}
          setSelectedRooms={setSelectedRooms}
          selectedRooms={selectedRooms}
          roomsWithPax={searchCriterias.visitors}
        />
        <HotelMap
          nearByAreas={knownPlaces}
          knownPlacesDistances={selectedHotel.knownPlacesDistances}
          cityName={cityName}
          zoomLevel={zoomLevel}
          mapInfo={{
            hotelName: selectedHotel.hotelName,
            distanceFromMekka: this.calculateDistanceFromHaram(selectedHotel),
            image: `${selectedHotel.images && selectedHotel.images[0].imageUrl}?w=110&h=80&mode=stretch`, //"./assets/images/hotel/infowindow-img.png",
            rating: selectedHotel.rating,
            ratingCount: 0,
            clientReviews: selectedHotel.userRating
          }}
          locationsMarkers={locationsMarkers}
          lat={selectedHotel.latitude}
          long={selectedHotel.longitude}
        />
        <HotelAmenities hotelAminities={selectedHotel.amenities} />
        <HotelFeatures hotelFeaturesDetails={hotelFeatures.featureDetails} specialHotelFeatures={hotelFeatures.specialFeatures} />
        <HotelSpecialInstructions hotelCheckInPolicy={hotelCheckInPolicy} />
        <HotelCheckIn hotelCheckInInstructions={hotelCheckInInstructions} />
        <div className="summary-nav">
          {/* <!--todo: add class 'disabled' if link/button is disabled / also tag <a> can be changed for tag <button> --> */}

          <button
            onClick={() => this.handleContinueToNextStep(-1)}
            type="button"
            title="back"
            className="button button--outline summary-nav__prev"
          >
            <span className="button__text">
              <Trans id="back"> Back </Trans>
            </span>
          </button>
          <button
            onClick={() => this.handleContinueToNextStep(1)}
            type="button"
            title="continue"
            disabled={selectedRooms.length === 0}
            className={classNames("button summary-nav__next")}
          >
            <span className="button__text">
              <Trans id="continue"> Continue </Trans>
            </span>
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({
  router: {
    location: { search: queryString }
  },
  home: { departureDate },
  reservations: { steps, cities, cityIndex, currentStep }
}) => {
  const {
    cityName,
    zoomLevel,
    hotels,
    filters,
    searchCriterias,
    pagination,
    hotelAmenities,
    selectedHotel,
    selectedRooms,
    knownPlaces
  } = cities[cityIndex];
  const allFilters = cities.map(a => a.filters);
  const allSearchCriterias = cities.map(a => a.searchCriterias);
  return {
    queryString,
    steps,
    allFilters,
    allSearchCriterias,
    cityName,
    zoomLevel,
    cityIndex,
    hotels,
    filters,
    searchCriterias,
    pagination,
    hotelAmenities,
    currentStep,
    departureDate,
    selectedHotel,
    selectedRooms,
    knownPlaces
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...reservationActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HotelDetails);
