import React from "react";
import { Trans, Plural } from "@lingui/macro";
import config from "config";

const HotelFilters = ({ checkInDate, checkoutDate, arrivalCity, paxInfo }) => {
  let adults = paxInfo.map(e => {
    return e.adults;
  });
  let childrens = paxInfo.map(e => {
    return e.children;
  });
  let infants = paxInfo.map(e => {
    return e.infants;
  });
  const isMakkah = arrivalCity && arrivalCity.toLowerCase() == config.makkah;

  let adultsCount = adults && adults.length > 0 ? adults.reduce((sum, x) => sum + x) : 0;
  let childrenCount = childrens && childrens.length > 0 ? childrens.reduce((sum, x) => sum + x) : 0;
  let infantsCount = infants && infants.length > 0 ? infants.reduce((sum, x) => sum + x) : 0;

  return (
    <div className="hotel-filter">
      <div className="container container--md hotel-filter__container">
        <div className="hotel-filter__hotel _flex _items-center">
          <div className="hotel-filter__hotel-icon">
            <svg width="40" height="40">
              {isMakkah ? <use href="#makkah"></use> : <use href="#madina"></use>}
            </svg>
          </div>
          <div className="hotel-filter__hotel-name">
            {arrivalCity} <Trans id="hotel"> Hotel </Trans>
          </div>
        </div>
        <div className="hotel-filter__item hotel-filter__item--date">
          <div className="hotel-filter__icon _md-show">
            <svg width="27" height="27">
              <use href="#calendar_start"></use>
            </svg>
          </div>
          <div className="hotel-filter__content">
            <div className="hotel-filter__part">
              <div className="hotel-filter__text">{new Date(checkInDate).toDateString()}</div>
              <div className="hotel-filter__subtext">
                <Trans id="coming_from"> Coming From </Trans>
              </div>
            </div>
            <div className="hotel-filter__line _md-show"></div>
            <div className="hotel-filter__icon _md-hide">
              <svg width="27" height="27">
                <use href="#calendar_start"></use>
              </svg>
            </div>
            <div className="hotel-filter__part">
              <div className="hotel-filter__text">{new Date(checkoutDate).toDateString()}</div>
              <div className="hotel-filter__subtext">
                <Trans id="back_on"> Back on </Trans>
              </div>
            </div>
          </div>
        </div>
        <div className="hotel-filter__item hotel-filter__item--nights">
          <div className="hotel-filter__icon _md-show">
            <svg width="27" height="27">
              <use href="#moon"></use>
            </svg>
          </div>
          <div className="hotel-filter__content">
            <div className="hotel-filter__part">
              <div className="hotel-filter__text">{Math.floor((checkoutDate - checkInDate) / (1000 * 60 * 60 * 24))}</div>
              <div className="hotel-filter__subtext">
                {Math.floor((checkoutDate - checkInDate) / (1000 * 60 * 60 * 24)) == 1 ? 
                  <Trans id="night"> Night </Trans> :
                 Math.floor((checkoutDate - checkInDate) / (1000 * 60 * 60 * 24)) > 1 ? <Trans id="nights"> Nights </Trans> : " " } 
              </div>
            </div>
            <div className="hotel-filter__line _md-show"></div>
            <div className="hotel-filter__icon _md-hide">
              <svg width="27" height="27">
                <use href="#moon"></use>
              </svg>
            </div>
            <div className="hotel-filter__part">
              <div className="hotel-filter__text">{paxInfo.length}</div>
              <div className="hotel-filter__subtext">
                {paxInfo.length == 1 ? <Trans id="room"> Room </Trans> : paxInfo.length > 1 ? <Trans id="rooms"> Rooms </Trans> : " " }
              </div>
            </div>
          </div>
        </div>
        <div className="hotel-filter__item hotel-filter__item--visitors">
          <div className="hotel-filter__icon _md-show">
            <svg width="27" height="27">
              <use href="#group"></use>
            </svg>
          </div>
          <div className="hotel-filter__content">
            <div className="hotel-filter__part">
              <div className="hotel-filter__text">
                {adultsCount > 0 && (
                  <>
                    {" "}
                    {adultsCount} 
                    {adultsCount == 1 ? <Trans id="adult"> Adult </Trans> : adultsCount > 1 ? <Trans id="adults"> Adults </Trans> : " " }{" "}
                  </>
                )}
                {childrenCount > 0 && (
                  <>
                    {" "}
                    ,{childrenCount}
                    {childrenCount == 1 ? <Trans id="child"> Child </Trans> : childrenCount > 1 ? <Trans id="children"> Children </Trans> : " " }{" "}
                  </>
                )}
                {infantsCount > 0 && (
                  <>
                    {" "}
                    ,{infantsCount}
                    {infantsCount == 1 ? <Trans id="infant"> Infant </Trans> : infantsCount > 1 ? <Trans id="infants"> Infants </Trans> : " " }{" "}
                  </>
                )}
              </div>
              <div className="hotel-filter__subtext">
                <Trans id="piligrim"> Piligrim </Trans>
              </div>
            </div>

            <div className="hotel-filter__icon _md-hide">
              <svg width="27" height="27">
                <use href="#group"></use>
              </svg>
            </div>
          </div>
        </div>

        <div className="hotel-filter__item hotel-filter__item--change">
          <a href="#" className="button hotel__link" style={{ padding: "14px 20px" }}>
            <Trans id="change_package"> Change package </Trans>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HotelFilters;
