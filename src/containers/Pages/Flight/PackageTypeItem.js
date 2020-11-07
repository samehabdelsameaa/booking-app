import React from "react";
import { Trans } from "@lingui/macro";
import { CurrencyContext } from "containers/Providers/CurrencyProvider";

const PackageTypeItem = ({
  flightPackage: { type, price, description: packagesInfo, isRecommended },
  isSelected,
  index,
  setSelected
}) => {
  let PackageType = type.toLowerCase();
  const packageBrandColor =
    PackageType === "light"
      ? "light"
      : PackageType === "plus"
      ? "green"
      : PackageType === "premium"
      ? "blue"
      : "default";
  return (
    <div
      className={`package-types__block package-types__block--flight-${packageBrandColor} ${
        isSelected ? "active" : ""
      }`}
      onClick={() => setSelected(index)}
    >
      <div className="package-types__head"> {type} </div>
      <div className="package-types__body">
        <div className="package-types__check">
          <div className="package-types__check-icon"></div>
          <div className="ft ft--bold">
            {price}
            <CurrencyContext.Consumer>
              {currency => (
                <span className="ft--sm">
                  {" "}
                  {currency.selectedCurrency.code}{" "}
                </span>
              )}
            </CurrencyContext.Consumer>
          </div>
          {isRecommended ? (
            <div className="package-types__label">
              <Trans id="recommended"> Recommended </Trans>{" "}
            </div>
          ) : (
            ""
          )}
        </div>
        {packagesInfo &&
          packagesInfo.map(({ item, status, amount, fundAmount }, i) => (
            <div
              key={i}
              className={`package-types__item package-types__item--${
                status === true
                  ? "success"
                  : status === "fundable"
                  ? "default"
                  : status === "rated"
                  ? "star"
                  : "error"
              }`}
            >
              <span className="_ms-hide package-types__desc">
                {" "}
                {item.label}{" "}
              </span>
              <span className="package-types__desc-info">
                <svg width="12" height="12">
                  <use
                    href={`#${
                      status === true
                        ? "checked"
                        : status === "fundable"
                        ? "dollar-coin-money"
                        : status === "rated"
                        ? "star"
                        : "error-package"
                    }`}
                  ></use>
                </svg>
                <span>{amount || fundAmount || "Not allowed"}</span>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PackageTypeItem;
