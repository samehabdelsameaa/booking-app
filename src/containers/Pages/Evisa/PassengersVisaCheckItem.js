import React from "react";
import { Trans } from "@lingui/macro";
import { CurrencyContext } from "containers/Providers/CurrencyProvider";

const PassengersVisaCheckItem = ({ paxInfo: { firstName, lastName, visaFees, status } }) => (
  <div className={`visa__item ${status === "checking" ? "is-loading" : status === "Failed" ? "is-canceled" : ""}`}>
    <div className="grid">
      <div className="gcell gcell--12 gcell--xs-7 gcell--sm-8">
        <div className="visa__left">
          <span className="visa__status"></span>
          <span className="visa__title"> {`${firstName && firstName} ${lastName && lastName}`} </span>
        </div>
      </div>
      <div className="gcell gcell--12 gcell--xs-5 gcell--sm-4">
        {status === "checking" ? (
          <div className="visa__right">
            <span className="visa__text visa__text--md">
              <Trans id="checking"> Checking </Trans> ...
            </span>
          </div>
        ) : status === "Failed" ? (
          <div className="visa__right">
            <span className="visa__text visa__text--md">
              <Trans id="failed"> Failed </Trans> ...
            </span>
          </div>
        ) : (
          <div className="visa__right">
            <span className="visa__text visa__text--md">
              <Trans id="cost"> Cost</Trans>:
            </span>
            <span className="visa__price">
              <span className="visa__currency">
                <CurrencyContext.Consumer>{currency => currency.selectedCurrency.code}</CurrencyContext.Consumer>
              </span>
              <span className="visa__value">{visaFees && visaFees}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default PassengersVisaCheckItem;
