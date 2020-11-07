import React from "react";
import { Trans } from "@lingui/macro";
import { CurrencyContext } from "containers/Providers/CurrencyProvider";
import HotelRating from "containers/Pages/HotelLocation/HotelRating";

const formatCurrencyNumber = num =>
  num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

const GroundServicesCompanyItem = ({
  serviceInfo: {
    images,
    companyName,
    provider,
    vendor,
    price,
    totalAmount,
    companyCode,
    packageCode,
    rating,
    userRating
  },
  index,
  isSelectedCompany,
  setSelectedCompany
}) => {
  return (
    <div
      className="company"
      style={{
        border: isSelectedCompany ? "2px solid #999" : "2px solid transparent"
      }}
    >
      <div className="company__view">
        <div className="company__img">
          <img
            src={`${images[0].imageUrl}?w=100&h=65&mode=stretch`}
            alt="company-logo"
          />
        </div>
      </div>
      <div className="company__info">
        <div className="grid">
          <div className="gcell gcell--12 gcell--ms-8">
            <div className="company__title">{companyName}</div>
          </div>
          <div className="gcell gcell--12 gcell--ms-4">
            <div className="company__price">
              <CurrencyContext.Consumer>
                {currency => <span> {currency.selectedCurrency.code} </span>}
              </CurrencyContext.Consumer>
              {totalAmount && formatCurrencyNumber(parseFloat(totalAmount))}
            </div>
          </div>
        </div>
        <div className="company__bottom">
          <span className="rating company__rating">
            <span className="rating__icons" data-rating={rating}>
              <HotelRating rating={rating} />
            </span>
            <span className="rating__mark">{userRating}</span>
          </span>
          <div className="company__btn">
            <button
              className={isSelectedCompany ? "button active" : "button"}
              onClick={() => setSelectedCompany(index)}
            >
              {isSelectedCompany ? <Trans id="selected"> Selected </Trans> : <Trans id="select"> Select </Trans>} {" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroundServicesCompanyItem;
