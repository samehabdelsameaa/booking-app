import React, { Component } from "react";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HotelSummary from "./HotelSummary";
import RoomPreferences from "./RoomPreferences";
import RoomBookingTerms from "./RoomBookingTerms";
import roomSummaryActions from "store/reservation/actions";
import Breadcrumb from "../../../components/Breadcrumb";
import BookingSummary from "../BookingSummary";

const bookingTerms = [
  {
    id: 1,
    value:
      "Flynas Umrah services Terms have to be accepted by the passenger prior to payment for a holiday booking to be accepted and confirmed. All persons travelling together will be deemed to i) have understood all these booking conditions and ii) be compliant with them."
  },
  {
    id: 2,
    value: "Your booking is governed by the conditions below and by the terms of business under which your booking is made."
  },
  {
    id: 3,
    value: "Full payment is required at the time of booking.In the event of this condition not being met, booking will not be materialised."
  },
  {
    id: 4,
    value: "Subsequent alterations / amendments / cancellations may attract charges as per the applicable"
  },
  {
    id: 5,
    value: "Full payment is required at the time of booking.In the event of this condition not being met, booking will not be materialised."
  },
  {
    id: 6,
    value: "Subsequent alterations / amendments / cancellations may attract charges as per the applicable"
  }
];

const roomPreferences = [
  { id: 1, label: "Early Check-in", value: "55" },
  { id: 2, label: "Late Check-out", value: "25" },
  { id: 3, label: "Honeymoon", value: "24" },
  { id: 4, label: "Adjoining/connecting rooms", value: "45" },
  { id: 5, label: "High Floor", value: "05" }
];

const beddingPrefernces = [
  { id: 1, label: "King Bed", value: "1" },
  { id: 2, label: "King Bed 2", value: "2" },
  { id: 3, label: "King Bed 3", value: "3" },
  { id: 4, label: "King Double Bed", value: "4" }
];

class RoomSummary extends Component {
  componentDidMount() {}

  setPreferencesForSelectedRoom = (values, roomTypeIndex) => {
    const { setSelectedRoomPreferences } = this.props;
    setSelectedRoomPreferences(values, roomTypeIndex);
    // console.log(this.roomPreferencesRef);
    // let preferencesvalue = {
    //   roomPreferences: [],
    //   bedPreferences: [beddingPrefernces[0].label],
    //   additionalRequests: ""
    // };
    // if (!!this.roomPreferencesRef) {
    //   this.roomPreferencesRef.resetForm(preferencesvalue);
    // }
  };

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
    let index = currentStep;
    let path = undefined;
    let removeParams = [];
    let cityIndex = steps[index].cityIndex;
    //-1
    if (stepsCount < 0) {
      path = "hotel";
    }
    //1
    else {
      removeParams = ["hotelId"];
      index = currentStep + stepsCount;
      cityIndex = steps[index].cityIndex;
      if (cityIndex === undefined) {
        //next step is not a city step, so remove city from params also
        removeParams.push("city");
      }
      // console.log('remov those ', removeParams);
    }

    setCurrentStep({
      stepIndex: index,
      cityIndex: cityIndex,
      removeQps: removeParams,
      path: path
    });
  };

  render() {
    const {
      cityName,
      steps,
      currentStep,
      selectedHotel,
      hotelAmenities,
      searchCriterias,
      selectedRooms,
      selectedRoomOptionalAmenities
    } = this.props;

    return (
      <React.Fragment>
        <Breadcrumb steps={steps} navigateTo={step => this.navigateTo(step)} currentStep={currentStep} />
        <div className="summary">
          <div className="container">
            <div className="grid">
              <div className="gcell gcell--12 gcell--def-8">
                <HotelSummary
                  cityName={cityName}
                  selectedHotel={selectedHotel}
                  hotelAmenities={hotelAmenities}
                  searchCriterias={searchCriterias}
                  selectedRooms={selectedRooms}
                />
                <RoomPreferences
                  setPreferencesRef={el => (this.roomPreferencesRef = el)}
                  selectedRooms={selectedRooms}
                  selectedRoomOptionalAmenities={selectedRoomOptionalAmenities}
                  onSelectedPreferences={(values, i) => this.setPreferencesForSelectedRoom(values, i)}
                  roomPreferences={roomPreferences}
                  beddingPrefernces={beddingPrefernces}
                />
                <RoomBookingTerms bookingTerms={bookingTerms} />

                <div className="summary-nav">
                  <button
                    type="button"
                    onClick={() => this.handleContinueToNextStep(-1)}
                    title="back"
                    className="button button--outline summary-nav__prev"
                  >
                    <span className="button__text">
                      <Trans id="back"> Back </Trans>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => this.handleContinueToNextStep(1)}
                    title="continue"
                    className="button summary-nav__next"
                  >
                    <span className="button__text">
                      <Trans id="continue"> Continue </Trans>
                    </span>
                  </button>
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

const mapStateToProps = ({ reservations: { cities, cityIndex, steps, currentStep } }) => {
  const { cityName, selectedHotel, hotelAmenities, searchCriterias, selectedRooms, selectedRoomOptionalAmenities } = cities[cityIndex];
  return {
    cityName,
    steps,
    currentStep,
    selectedHotel,
    hotelAmenities,
    searchCriterias,
    selectedRooms,
    selectedRoomOptionalAmenities
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...roomSummaryActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RoomSummary);
