import React from "react";
import PropTypes from "prop-types";
import HotelRating from "./HotelRating";
import "./MapMarkerCard.css";

const MapMarkerCard = ({ mapData: { hotelName, image, distanceFromMekka, rating, ratingCount, clientReviews } }) => {
  return (
    <div className="map-info map-info--triangle">
      <div className="map-info__left">
        <span className="map-info__view">
          <span className="map-info__img">
            <img src={image} alt="" />
          </span>
        </span>
      </div>
      <div className="map-info__right">
        <div className="map-info__title">{hotelName}</div>
        <div className="map-info__text">{distanceFromMekka}</div>
        <div className="map-info__rating map-info__rating rating">
          <HotelRating rating={rating} />
          {ratingCount && <span className="rating__count">{ratingCount}</span>}
        </div>
        <div className="map-info__text">{clientReviews}</div>
      </div>
    </div>
  );
};

MapMarkerCard.propTypes = {
  mapData: PropTypes.shape({
    hotelName: PropTypes.string,
    image: PropTypes.string,
    distanceFromMekka: PropTypes.string,
    rating: PropTypes.number,
    ratingCount: PropTypes.number,
    clientReviews: PropTypes.string
  }).isRequired
};

export default MapMarkerCard;
