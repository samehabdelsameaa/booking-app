import React from "react";
import { Trans } from "@lingui/macro";
import { CurrencyContext } from "containers/Providers/CurrencyProvider";

const PaxVisaStatus = ({ paxVisaStatus: { firstName, lastName, visaFees, status } }) => (
  <div className="visa__item">
    <div className="grid">
      <div className="gcell gcell--12 gcell--xs-7 gcell--sm-8">
        <div className="visa__left">
          {status == "success" && <span className="visa__status"></span>}
          <span className="visa__title"> {` ${firstName} ${lastName} `} </span>
        </div>
      </div>
      <div className="gcell gcell--12 gcell--xs-5 gcell--sm-4">
        <div className="visa__right">
          <span className="visa__text visa__text--md">
            <Trans id="cost"> Cost </Trans>:
          </span>
          <span className="visa__price">
            <span className="visa__currency">
              {<CurrencyContext.Consumer>{currency => currency.selectedCurrency.code}</CurrencyContext.Consumer>}
            </span>
            <span className="visa__value">{visaFees}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
);

const ReviewVisaCheck = ({ passengers }) => {
  return (
    <div className="visa__group">
      <div className="visa__head">
        <div className="visa__title visa__title--bold">
          <Trans id="e_visa"> E-VISA </Trans>
        </div>
      </div>
      <div className="visa__body">{passengers && passengers.map((pax, i) => <PaxVisaStatus key={i} paxVisaStatus={pax} />)}</div>
    </div>
  );
};

export default ReviewVisaCheck;
