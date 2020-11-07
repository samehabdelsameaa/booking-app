import React from "react";
import { Trans } from "@lingui/macro";
import { HotelSummaryCard, getNumberOfnights, getNumberOfGuests, getRoomType } from "../RoomSummary/HotelSummary";

class ReviewHotel extends React.Component {
  state = { selectedHotel: 0 };
  setSelectedHotel = index => this.setState({ selectedHotel: index });

  render() {
    const { selectedHotels } = this.props;
    return (
      <div className="summary-hotel">
        <div className="summary-top">
          <div className="summary-top__head">
            <div className="summary-top__left">
              <svg width="30" height="30" className="summary-hotel__icon _ms-show">
                <use href="#double-bed"></use>
              </svg>
              <span>
                <Trans id="your_hotel"> Your Hotel </Trans>
              </span>
            </div>
          </div>

          {selectedHotels &&
            selectedHotels.map(({ selectedHotel: { hotelName, imageUrl, rating }, cityName, searchCriterias, hotelAmenities, selectedRooms }, index) => {
              let numberOfNights = getNumberOfnights(searchCriterias.date);
              let numberOfGuests = getNumberOfGuests(searchCriterias.visitors);
              let RoomsType = getRoomType(selectedRooms);

              return <React.Fragment>
                <div className="review__tabs">
                  <div className="grid grid--2 grid--space-ms">

                    <div className="gcell" key={index} onClick={() => this.setSelectedHotel(index)}>
                      <div className="review__tab tab-active">
                        <svg width="37" height="37">
                          <use href={`#${cityName}`}></use>
                        </svg>
                        <span>
                          {cityName} <Trans id="hotel"> Hotel </Trans>
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                <HotelSummaryCard
                  key={index}
                  isSelectedHotel={this.state.selectedHotel === index}
                  hotelName={hotelName}
                  imageUrl={imageUrl}
                  rating={rating}
                  hotelAmenities={hotelAmenities}
                  searchCriterias={searchCriterias}
                  numberOfNights={numberOfNights}
                  numberOfGuests={numberOfGuests}
                  RoomsType={RoomsType}
                />
              </React.Fragment>
            })
          }
        </div>
      </div>
    );
  }
}

export default ReviewHotel;
