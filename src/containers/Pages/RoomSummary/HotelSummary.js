import React from "react";
import { Trans, Plural, DateFormat } from "@lingui/macro";
import HotelRating from "../HotelLocation/HotelRating";
import config from "config";

export const getNumberOfnights = dates => {
  let numberOfNights = 1;
  if (dates && dates.checkInDate && dates.checkOutDate) {
    const timeDiff = Math.abs(dates.checkOutDate - dates.checkInDate);
    numberOfNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }
  return numberOfNights;
};

export const getNumberOfGuests = guests => {
  let numberOfGuests = 1;
  if (guests && guests) {
    let adults = 0,
      children = 0,
      infants = 0;
    guests.map(pax => {
      adults += pax.adults;
      children += pax.children;
      infants += pax.infants;
      return (numberOfGuests = { adults, children, infants });
    });
  }
  return numberOfGuests;
};

export const getRoomType = roomTypes => {
  let RoomsType = roomTypes[0] && roomTypes[0].name;
  return RoomsType;
};

export const HotelSummaryCard = ({
  hotelName,
  imageUrl,
  rating,
  hotelAmenities,
  searchCriterias,
  numberOfNights,
  numberOfGuests,
  RoomsType,
  ...rest
}) => (
    <div className="sm-hotel">
      <div className="summary-hotel__title">
        <svg width="30" height="30" className="summary-hotel__icon _ms-show">
          <use href="#double-bed"></use>
        </svg>

        <span>{hotelName}</span>
        <span className="rating__icons" data-rating={rating}>
          <HotelRating rating={rating} />
        </span>
      </div>
      <div className="grid">
        <div className="gcell gcell--12 gcell--ms-5">
          <div className="sm-hotel__view">
            <span className="sm-hotel__img">
              <img src={`${imageUrl}?w=268&h=358&mode=stretch`} alt="" />
            </span>
          </div>
        </div>
        <div className="gcell gcell--12 gcell--ms-7">
          <div className="sm-hotel__table">
            <div className="sm-hotel__cell">
              <span className="sm-hotel__text sm-hotel__text--light">
                <Trans id="check_in"> Check-in </Trans>
              </span>
              <span className="sm-hotel__text">
                {
                  <DateFormat
                    value={searchCriterias.date.checkInDate}
                    format={{
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    }}
                  />
                }
              </span>
            </div>
            <div className="sm-hotel__cell">
              <span className="sm-hotel__text sm-hotel__text--light">
                <Trans id="check_out"> Check-out </Trans>
              </span>
              <span className="sm-hotel__text">
                {
                  <DateFormat
                    value={searchCriterias.date.checkOutDate}
                    format={{
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    }}
                  />
                }
              </span>
            </div>
            <div className="sm-hotel__cell">
              <span className="sm-hotel__text sm-hotel__text--light">
                <Trans id="guests"> Guests </Trans>
              </span>
              <span className="sm-hotel__text">
                {numberOfGuests.adults > 0 ? (
                  <>
                    {numberOfGuests.adults}{" "}
                    {numberOfGuests.adults == 1 ? <Trans id="adult"> Adult </Trans> : numberOfGuests.adults > 1 ? <Trans id="adults"> Adults </Trans> : " "}
                  </>
                ) : null}

                {numberOfGuests.children > 0 ? (
                  <>
                    - {numberOfGuests.children}{" "}
                    {numberOfGuests.children == 1 ? <Trans id="child"> Child </Trans> : numberOfGuests.children > 1 ? <Trans id="children"> Children </Trans> : " "}
                  </>
                ) : null}

                {numberOfGuests.infants > 0 ? (
                  <>
                    - <br /> {numberOfGuests.infants}{" "}
                    {numberOfGuests.infants == 1 ? <Trans id="infant"> Infant </Trans> : numberOfGuests.infants > 1 ? <Trans id="infants"> Infants </Trans> : " "}
                  </>
                ) : null}
              </span>
            </div>
            <div className="sm-hotel__cell">
              <span className="sm-hotel__text sm-hotel__text--light">
                <Trans id="rooms"> Rooms </Trans>
              </span>
              <span className="sm-hotel__text">
                {searchCriterias.visitors.length}{" "}
                {searchCriterias.visitors.length == 1 ? <Trans id="room"> Room </Trans> : searchCriterias.visitors.length > 1 ? <Trans id="rooms"> Rooms </Trans> : " "}
              </span>
            </div>
            <div className="sm-hotel__cell">
              <span className="sm-hotel__text sm-hotel__text--light">
                <Trans id="nights"> Nights </Trans>
              </span>
              <span className="sm-hotel__text">
                {numberOfNights}{" "}
                {numberOfNights == 1 ? <Trans id="night"> Night </Trans> : numberOfNights > 1 ? <Trans id="nights"> Nights </Trans> : " "}
              </span>
            </div>
            <div className="sm-hotel__cell">
              <span className="sm-hotel__text sm-hotel__text--light">
                <Trans id="room_type"> Room Type </Trans>
              </span>
              <span className="sm-hotel__text">{RoomsType}</span>
              <span className="sm-hotel__text sm-hotel__text--light">
                (<Trans id="includes_taxes_and_fees">
                  {" "}
                  Includes taxes and fees{" "}
                </Trans>)
            </span>
            </div>

            <div className="sm-hotel__cell sm-hotel__cell--full">
              <span className="sm-hotel__text sm-hotel__text--light">
                <Trans id="hotel_features"> Hotel Features </Trans>
              </span>
              <div className="sm-hotel__features">
                {hotelAmenities &&
                  hotelAmenities.slice(0, 7).map((amenity, index) => (
                    <div className="sm-hotel__feature sm-hotel__text" key={index}>
                      <svg width="17" height="17">
                        <use href={`#${amenity.icon}`}></use>
                      </svg>
                      {amenity.label}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

const HotelSummary = ({
  cityName,
  selectedHotel: { hotelName, imageUrl, rating, amenities },
  hotelAmenities,
  searchCriterias,
  selectedRooms
}) => {
  let numberOfNights = getNumberOfnights(searchCriterias.dates);
  let numberOfGuests = getNumberOfGuests(searchCriterias.visitors);
  let RoomsType = getRoomType(selectedRooms);
  const isMakkah = cityName && cityName.toLowerCase() == config.makkah;

  return (
    <div className="summary-hotel">
      <div className="summary-top">
        <div className="summary-top__head">
          <div className="summary-top__left">
            <svg width="37" height="37">
              {isMakkah ? (
                <use href="#makkah"></use>
              ) : (
                  <use href="#madina"></use>
                )}
            </svg>
            <span>
              {cityName} <Trans id="hotel"> Hotel </Trans>
            </span>
          </div>
          <div className="summary-top__right">
            <a href="#">
              <svg width="12" height="12">
                <use href="#change"></use>
              </svg>
              <span>
                <Trans id="change_hotel"> Change Hotel</Trans>
              </span>
            </a>
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default HotelSummary;
