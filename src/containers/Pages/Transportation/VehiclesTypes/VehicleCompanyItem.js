import React from "react";
import { Trans } from "@lingui/macro";
import HotelRating from "containers/Pages/HotelLocation/HotelRating";
import { CurrencyContext } from "containers/Providers/CurrencyProvider";
import { DropdownList } from "components/Forms";

const carsSelectedAmount = [
  { id: 1, label: 1, value: 1 },
  { id: 2, label: 2, value: 2 },
  { id: 3, label: 3, value: 3 },
  { id: 4, label: 4, value: 4 }
];

const formatCurrencyNumber = num => num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

class VehicleCompanyItem extends React.Component {
  render() {
    const {
      vehicleInfo: { vehicleImage, companyName, price, rating, userRating },
      selectVehicleCompany,
      onUpdateVehicleCount,
      index,
      isCompanySelected
    } = this.props;

    return (
      <div
        className="car-product"
        style={{
          border: isCompanySelected ? "2px solid #999" : "2px solid transparent"
        }}
      >
        <div className="car-product__view">
          <img src={vehicleImage} className="car-product__img" alt="" />
        </div>
        <div className="car-product__info">
          <div className="car-product__title">{companyName}</div>
          <div className="car-product__price">
            <CurrencyContext.Consumer>{currency => <span>{currency.selectedCurrency.code}</span>}</CurrencyContext.Consumer>
            {formatCurrencyNumber(price)}
          </div>
          <div className="car-product__bottom">
            <span className="rating car-product__rating">
              <span className="rating__icons" data-rating={rating}>
                <HotelRating rating={rating} />
              </span>
              <span className="rating__mark">{userRating}</span>
            </span>
            <div className="car-product__amount">
              <div className="car-product__amount-text">
                <Trans id="qty"> QTY </Trans>
              </div>
              <DropdownList
                initialValue={"1"}
                render={({ dropdownOpen, selectedOption }, toggleDropdown, setSelected) => (
                  <div className={`select-drop car-product__select ${dropdownOpen ? "open" : ""}`} onClick={toggleDropdown}>
                    <span className="select-drop__text"> {selectedOption} </span>
                    <div className="select-drop__results">
                      {carsSelectedAmount &&
                        carsSelectedAmount.map(({ id, value, label }) => (
                          <span
                            className="select-drop__results-item"
                            key={id}
                            value={value}
                            onClick={e => {
                              setSelected(e);
                              onUpdateVehicleCount(e.target.getAttribute("value"));
                            }}
                          >
                            {label}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="car-product__btn">
              <button className={isCompanySelected ? "button active" : "button"} onClick={() => selectVehicleCompany(index)}>
                {" "}
                {isCompanySelected ? <Trans id="selected"> Selected </Trans> : <Trans id="select"> Select </Trans>} {" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VehicleCompanyItem;
