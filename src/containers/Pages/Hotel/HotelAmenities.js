import React from "react";
import { Trans } from '@lingui/macro';

const HotelAmenities = ({ hotelAminities }) => {
  return (
    <div className="hotel-simple">
      <div className="container container--md">
        <div className="hotel__title">
          <svg width="40" height="40">
            <use href="#bed"></use>
          </svg>
          <span> <Trans id="hotel_amenities"> Hotel Amenities </Trans> </span>
        </div>

        <ul className="hotel-simple__list">
          {hotelAminities &&
            hotelAminities.map((item, index) => {
              return (
                <li className="hotel-simple__list-item" key={index}>
                  <span> {item.label} </span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default HotelAmenities;
