import React from "react";
import HotelRating from "../HotelLocation/HotelRating";
import { Trans } from "@lingui/macro";

const ReviewTransportation = ({
  selectedPackage: { packageClass },
  selectedCompany: { vehicleImage, vehicleTypeName, companyName, rating, userRating, count },
  selectedRoute: { routePoints }
}) => {
  return (
    <div className="review-transport review-block">
      <div className="review-block__info">
        <div className="review-head">
          <div className="review-head__left">
            <svg width="30" height="30">
              <use href="#route"></use>
            </svg>
            <span>
            <Trans id="transportation_package"> Transportation package </Trans>:
            </span>
          </div>

        </div>
        <div className="review__top">
          <div className="review__selected">
            <div className="review__selected-item">
              <div className="review__selected-text">
                <Trans id="package_type"> Package type</Trans>:
              </div>
              <div className="review__selected-label"> {packageClass} </div>
            </div>
            <div className="review__selected-item review__selected-item--second">
              <div className="review__selected-text">
                <Trans id="selected_vechicle_type"> Selected vehicle type </Trans>:
              </div>
              <div className="review__selected-text review__selected-text--color"> {vehicleTypeName} </div>
            </div>
          </div>
          <div className="review__path">
            <div className="review__path-item">
              <div className="review__marker">
                <svg width="35" height="35">
                  <use href="#empty-marker"></use>
                </svg>
              </div>
              <div className="review-transport__route">
                {routePoints &&
                  routePoints.map(({ city, ...rest }, index) => (
                    <React.Fragment key={index}>
                      <span>{city}</span>
                      <span>
                        <svg width="20" height="20">
                          <use href="#arrow-right"></use>
                        </svg>
                      </span>
                    </React.Fragment>
                  ))}
              </div>
            </div>
            <div className="review__path-item review-transport__quantity">
              <span>
                <Trans id="quantity"> Quantity </Trans>
              </span>
              <span className="review-transport__quantity-val">{count || 1}</span>
            </div>
          </div>
        </div>
        <div className="review-transport__body">
          <div className="review-car">
            <div className="review-car__view">
              <img src={vehicleImage} className="review-car__img" alt="" />
            </div>
            <div className="review-car__info">
              <div className="review-car__title"> {companyName} </div>
              <span className="rating review-car__rating">
                <span className="rating__icons" data-rating={rating}>
                  <HotelRating rating={rating} />
                </span>
                <span className="rating__mark">{userRating}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewTransportation;
