import React from "react";
import { Trans } from '@lingui/macro';
import HotelRating from "../HotelLocation/HotelRating";
import HotelSlider from "../../../components/HotelSlider/HotelSlider";
import HotelAmenities from "../HotelLocation/HotelAmenities";
import animateScrollTo from "animated-scroll-to";

const HotelImages = ({ nearByAreas, images, rating, hotelName, hotelAddress, hotelAmenities, knownPlacesDistances, scrollToMap }) => {
  const getLocationNameById = id => nearByAreas.find(item => item.code === id);

  return (
    <div className="hotel-top">
      <div className="container container--md">
        <div className="hotel-top__title"> {hotelName} </div>
        <div className="hotel-top__rating rating">
          <span className="rating__icons" data-rating={rating}>
            <HotelRating rating={rating} />
          </span>
        </div>
        <div className="grid">
          <div className="gcell gcell--12 gcell--def-8">
            <div className="hotel-slider">
              <HotelSlider images={images} />
            </div>
          </div>
          <div className="gcell gcell--12 gcell--def-4">
            <div className="hotel-info">
              <div className="hotel-address">
                <div className="hotel-address__text"><Trans id="hotel_address"> Hotel Address </Trans></div>
                <div className="hotel-address__title"> {hotelAddress} </div>
                <div className="hotel-address__loc">
                  <svg width="25" height="25">
                    <use href="#location"></use>
                  </svg>
                  <span>
                    <a
                      style={{
                        color: "#01bab4",
                        cursor:"pointer",
                        fontWeight: 600,
                        lineheight: "1.2",
                        textDecoration: "none"
                      }}
                      onClick={scrollToMap}
                    >
                    {" "} <Trans id="view_location_on_map"> View Location on Map </Trans> {" "} 
                      
                    </a>
                  </span>
                </div>
              </div>
              <div className="hotel-distance">
                <div className="hotel-distance__title"><Trans id="distance_from_hotel"> Distance from Hotel </Trans></div>
                <div className="hotel-distance__text">
                  {knownPlacesDistances &&
                    knownPlacesDistances.slice(0, 6).map(({ id, distanceInkilo, distanceInMile }, i) => {
                      let placeName = getLocationNameById(id).placeName;
                      return <span key={i}>{`${placeName} ( ${distanceInkilo} km / ${distanceInMile} mi )`}</span>;
                    })}
                </div>
              </div>
              <div className="hotel-amenities">
                <div className="hotel-amenities__title"><Trans id="hotel_amenities"> Hotel Amenities </Trans></div>
                <div className="hotel-amenities__content">
                  <HotelAmenities hotelAmenities={hotelAmenities} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelImages;
