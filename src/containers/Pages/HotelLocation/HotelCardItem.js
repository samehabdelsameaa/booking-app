import React from "react";
import PropTypes from "prop-types";
import { CurrencyContext } from "containers/Providers/CurrencyProvider";
import HotelRating from "./HotelRating";
import HotelAmenities from "./HotelAmenities";
import { Trans, NumberFormat } from "@lingui/macro";

const HotelCardItem = ({
  id,
  originalCode,
  hotelName,
  roomType,
  imageUrl,
  amenities,
  price,
  amountType,
  rating,
  userRating,
  selectLocationmarker,
  unSelectLocationmarker,
  index,
  selectHotelDetails
}) => {
  return (
    <div className="hrz-products__item" onMouseEnter={() => selectLocationmarker(index)} onMouseLeave={() => unSelectLocationmarker(index)}>
      <a href="#" className="hrz-products__link">
        <input type="hidden" name="hotelId" value={id} />
        <input type="hidden" name="hotelCode" value={originalCode} />
        <span className="img-wrap">
          <span className="hrz-products__view">
            <span className="hrz-products__img">
              <img alt="" src={`${imageUrl}?w=269&h=183&mode=stretch`} />
            </span>
          </span>
        </span>

        <span className="hrz-products__middle">
          <span className="hrz-products__middle-img">
            <img src="/assets/images/location/hrz-product-corners.png" alt="" className="corners-img" />
            <img src="/assets/images/location/hrz-product-corners-hover.png" alt="" className="corners-img-hover _md-show" />
          </span>
        </span>

        <span className="hrz-products__bottom">
          <span className="hrz-products__bottom-wrap">
            <span className="hrz-products__category">{roomType}</span>
            <span className="hrz-products__title">{hotelName}</span>
            <span className="hrz-products__rating rating">
              <span className="rating__icons" data-rating={rating}>
                <HotelRating rating={rating} />
              </span>
              <span> {userRating} </span>
            </span>

            <span className="hrz-products__amenities">
              <HotelAmenities hotelAmenities={amenities} />
            </span>

            <span className="hrz-products__bt-info">
              <span className="hrz-products__info">
                <CurrencyContext.Consumer>
                  {currency => (
                    <span className="hrz-price">
                      <span className="hrz-price__number">
                        {currency.selectedCurrency.symbol}
                        <span>
                          <NumberFormat
                            value={price}
                            format={{
                              style: "decimal",
                              maximumFractionDigits: 2
                            }}
                          />
                        </span>
                      </span>
                      <span className="hrz-price__info">/ <Trans id={amountType}> {amountType} </Trans></span>
                    </span>
                  )}
                </CurrencyContext.Consumer>
                <button className="button hrz-products__btn" onClick={() => selectHotelDetails()} type="button">
                  <Trans id="more_details"> More details </Trans>
                </button>
              </span>
            </span>
          </span>
        </span>
      </a>
    </div>
  );
};

HotelCardItem.propTypes = {
  hotelName: PropTypes.string,
  roomType: PropTypes.string,
  imageUrl: PropTypes.string,
  aminities: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.string
    })
  ),
  price: PropTypes.number,
  amountType: PropTypes.string,
  rating: PropTypes.number,
  userRating: PropTypes.string
};

export default HotelCardItem;
