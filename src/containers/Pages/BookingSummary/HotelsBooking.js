import React, { Component } from "react";
import { Trans, Plural } from "@lingui/macro";
import { CurrencyContext } from "containers/Providers/CurrencyProvider";
import { getNumberOfnights, getNumberOfGuests } from "../RoomSummary/HotelSummary";
import config from "config";
import { formatCurrencyNumber } from ".";

class HotelsBooking extends Component {
  render() {
    const { selectedHotels, currentCity } = this.props;
    return (
      <div className="aside-hotel aside-hotel--full">
        {selectedHotels &&
          selectedHotels.map(({ cityName, selectedHotel: { hotelName }, searchCriterias, selectedRooms }, index) => {
            let numberOfNights = searchCriterias.date && getNumberOfnights(searchCriterias.dates);
            let numberOfGuests = searchCriterias.visitors && getNumberOfGuests(searchCriterias.visitors);
            const isMakkah = cityName && cityName.toLowerCase() == config.makkah;
            const totalPrice = selectedRooms.reduce(
              (total, group) => total + group.rooms.reduce((total, { amount }) => total + amount, 0),
              0
            );

            return (
              <React.Fragment key={index}>
                {hotelName && (
                  <div className="aside-hotel__item">
                    <div className="aside-hotel__title">
                      <svg width="20" height="20">
                        {isMakkah ? <use href="#makkah"></use> : <use href="#madina"></use>}
                      </svg>
                      <span>
                        {cityName} <Trans id="hotel"> Hotel </Trans>
                      </span>
                    </div>
                    <div className="aside-hotel__subtitle">
                      <svg width="20" height="20">
                        <use href="#double-bed"></use>
                      </svg>
                      <span>{hotelName}</span>
                    </div>
                    <div className="aside__text aside-hotel__text">
                      <span className="aside-hotel__left">
                        <svg width="20" height="20" className="aside__text-icon">
                          <use href="#group"></use>
                        </svg>
                        <Trans id="guests"> Guests </Trans>:
                        <span className="aside__text--dark">
                          {selectedRooms.length > 0 ? (
                            <>
                              {selectedRooms.length} {" "} {selectedRooms.length == 1 ? <Trans id="room"> Room </Trans> : selectedRooms.length > 1 ? <Trans id="rooms"> Rooms </Trans> : " "},{" "}
                            </>
                          ) : null}

                          {numberOfGuests.adults > 0 ? (
                            <>
                              {numberOfGuests.adults} {" "} {numberOfGuests.adults == 1 ? <Trans id="adult"> Adult </Trans> : numberOfGuests.adults > 1 ? <Trans id="adults"> Adults </Trans> : " "}
                            </>
                          ) : null}
                        </span>
                      </span>
                      <span className="aside-hotel__right">
                        <svg width="20" height="20" className="aside__text-icon">
                          <use href="#moon"></use>
                        </svg>
                        <Trans id="nights"> Nights </Trans>:<span className="aside__text--dark">{numberOfNights}</span>
                      </span>
                    </div>
                    <div className="aside__tags">
                      <span className="aside__tag">
                        <Trans id="refundable"> Refundable </Trans>
                      </span>
                    </div>
                    <div className="aside-cost">
                      <span>
                        <Trans id="cost_of_room"> Cost Of Room </Trans>:{" "}
                      </span>
                      <span className="aside-cost__currency">
                        <CurrencyContext.Consumer>{currency => currency.selectedCurrency.code}</CurrencyContext.Consumer>
                      </span>
                      <span className="aside-cost__value">{totalPrice && formatCurrencyNumber(totalPrice)}</span>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </div>
    );
  }
}

export default HotelsBooking;
