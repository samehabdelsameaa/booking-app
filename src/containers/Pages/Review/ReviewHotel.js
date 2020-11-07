import React from "react";
import classNames from "classnames";
import { Trans } from "@lingui/macro";
import Tabs, { TabList, Tab, TabPanels, TabPane } from "components/Tabs";

import {
  HotelSummaryCard,
  getNumberOfnights,
  getNumberOfGuests,
  getRoomType
} from "../RoomSummary/HotelSummary";

class ReviewHotel extends React.Component {
  state = { selectedHotel: 0 };
  setSelectedHotel = index => this.setState({ selectedHotel: index });

  render() {
    const { selectedHotels, navigateTo } = this.props;
    const { searchCriterias, hotelAmenities, selectedRooms } = selectedHotels[
      this.state.selectedHotel
    ];
    const { hotelName, imageUrl, rating, amenities } = selectedHotels[
      this.state.selectedHotel
    ]["selectedHotel"];

    let numberOfNights = getNumberOfnights(searchCriterias.date);
    let numberOfGuests = getNumberOfGuests(searchCriterias.visitors);
    let RoomsType = getRoomType(selectedRooms);

    return (
      <div className="summary-hotel">
        <div className="summary-top">
          <div className="summary-top__head">
            <div className="summary-top__left">
              <svg
                width="30"
                height="30"
                className="summary-hotel__icon _ms-show"
              >
                <use href="#double-bed"></use>
              </svg>
              <span>
                <Trans id="your_hotel"> Your Hotel </Trans>
              </span>
            </div>
            <div className="summary-top__right">
              <a href="#">
                <svg width="12" height="12">
                  <use href="#change"></use>
                </svg>
                <span onClick={() => navigateTo()}>
                  <Trans id="change_hotels"> Change Hotels </Trans>
                </span>
              </a>
            </div>
          </div>
          <div className="review__tabs">
            <div className="grid grid--2 grid--space-ms">
              {selectedHotels &&
                selectedHotels.map(({ cityName }, index) => {
                  return (
                    <div
                      className="gcell"
                      key={index}
                      onClick={() => this.setSelectedHotel(index)}
                    >
                      <div
                        className={classNames("review__tab", {
                          "tab-active": this.state.selectedHotel === index
                        })}
                      >
                        <svg width="37" height="37">
                          <use href={`#${cityName}`}></use>
                        </svg>
                        <span>
                          {cityName} <Trans id="hotel"> Hotel </Trans>
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {
            <HotelSummaryCard
              hotelName={hotelName}
              imageUrl={imageUrl}
              rating={rating}
              hotelAmenities={amenities}
              searchCriterias={searchCriterias}
              numberOfNights={numberOfNights}
              numberOfGuests={numberOfGuests}
              RoomsType={RoomsType}
            />
          }
          <div className="review__tabs">
            <div className="grid grid--2 grid--space-ms"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewHotel;
