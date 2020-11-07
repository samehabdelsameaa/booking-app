import React from "react";
import PropTypes from "prop-types";
const MAX_AMENTIES_IN_HOTEL_LIST = 3;
const HotelAmenities = ({ hotelAmenities }) => {
  const aminities = hotelAmenities ? (
    hotelAmenities.slice(0, MAX_AMENTIES_IN_HOTEL_LIST).map((aminity, index) => {
      return (
        <span className="hrz-products__amenities-item" key={index}>
          <svg width="16" height="16">
            <use href={`#${aminity.icon}`}></use>
          </svg>
          <span>{aminity.label}</span>
        </span>
      );
    })
  ) : (
    <span className="hrz-products__amenities-item"></span>
  );
  return aminities;
};

HotelAmenities.propTypes = {
  hotelAmenities: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.string
    })
  )
};

export default HotelAmenities;
