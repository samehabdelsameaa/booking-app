import React from "react";
import { Trans, DateFormat } from "@lingui/macro";
import { CurrencyContext } from "containers/Providers/CurrencyProvider";
import { getNumberOfnights, getNumberOfGuests } from "../RoomSummary/HotelSummary";
import { formatCurrencyNumber } from "../BookingSummary";

const HotelsSummary = ({
  selectedHotels,
  citiesRooms /* 2d array, first dim on city level, seond for list or selected rooms of each city */
}) => {
  return (
    <React.Fragment>
      {selectedHotels &&
        selectedHotels.map(({ selectedHotel, searchCriterias }, i) => {
          if (selectedHotel && Object.values(selectedHotel).length > 0) {
            const numberOfNights = getNumberOfnights(searchCriterias.date);
            const numberOfGuests = getNumberOfGuests(searchCriterias.visitors);
            const currentCityName = selectedHotels[i].cityName;
            const numberOfRooms = searchCriterias.visitors.length;
            const totalAmount = citiesRooms[i].reduce((total, a) => total + a.amount, 0);

            return (
              <div className="loc-hotel" key={i}>
                <div className="loc-booking">
                  <div className="loc-info__group">
                    <div className={`loc-hotel__top ${currentCityName}`}>
                      <svg width="30" height="30">
                        <use href={`#${currentCityName}`}></use>
                      </svg>
                      <span>
                        {currentCityName} <Trans id="hotel"> Hotel </Trans>
                      </span>
                    </div>
                    <div className="loc-booking__subtitle">
                      <svg width="30" height="30">
                        <use href="#double-bed"></use>
                      </svg>
                      <span className="color--second weight--bold size--md">{selectedHotel.hotelName}</span>
                    </div>
                    <div className="loc-booking__place">
                      <span>
                        <svg width="30" height="17">
                          <use href="#location"></use>
                        </svg>
                      </span>

                      <span className="weight--semibold">{selectedHotel.address}</span>
                    </div>
                    <div className="loc-booking__moon">
                      <span className="color--main weight--bold size--lg"> {numberOfNights && numberOfNights} </span>
                      <svg width="20" height="20">
                        <use href="#moon"></use>
                      </svg>
                    </div>
                    <div className="loc-booking__date weight--bold">
                      <div className="loc-booking__date-item">
                        {searchCriterias.date.checkInDate && (
                          <DateFormat
                            value={searchCriterias.date.checkInDate}
                            format={{
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            }}
                          />
                        )}
                      </div>
                      <div className="loc-booking__date-item">
                        {searchCriterias.date.checkOutDate && (
                          <DateFormat
                            value={searchCriterias.date.checkOutDate}
                            format={{
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="_text-center color--light weight--semibold _mt-md">
                      {numberOfRooms && numberOfRooms > 0 ? (
                        <>
                          {numberOfRooms} {" "} {numberOfRooms == 1 ? <Trans id="room"> Room </Trans> : numberOfRooms > 1 ? <Trans id="rooms"> Rooms </Trans> : " " }
                        </>
                      ) : null}

                      {numberOfGuests.adults > 0 ? (
                        <>
                          {numberOfGuests.adults} {" "} {numberOfGuests.adults == 1 ? <Trans id="adult"> Adult </Trans> : numberOfGuests.adults > 1 ? <Trans id="adults"> Adults </Trans> : " " }
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="loc-total weight--bold">
                  <div className="size--md size--upper color--second">
                    <Trans id="total"> Total </Trans>
                  </div>
                  <div>
                    <CurrencyContext.Consumer>
                      {currency => <span className="size--upper">{currency.selectedCurrency.symbol}</span>}
                    </CurrencyContext.Consumer>
                    <span className="size--lg"> {totalAmount && formatCurrencyNumber(totalAmount)} </span>
                  </div>
                </div>

                <div className="loc-change _text-center">
                  <a href="#" className="loc-change__link">
                    <svg width="14" height="14">
                      <use href="#change"></use>
                    </svg>
                    <span className="weight--bold size--upper">
                      <Trans id="change"> Change </Trans>
                    </span>
                  </a>
                </div>
              </div>
            );
          }
        })}
    </React.Fragment>
  );
};

export default HotelsSummary;
