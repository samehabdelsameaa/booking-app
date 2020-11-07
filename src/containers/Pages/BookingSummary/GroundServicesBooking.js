import React from "react";
import { Trans } from "@lingui/macro";
import { CurrencyContext } from "containers/Providers/CurrencyProvider";
import { formatCurrencyNumber } from ".";

class GroundServicesBooking extends React.Component {
  render() {
    const { type, servicePrice } = this.props;
    return (
      <div className="aside-ground">
        <div className="aside-title">
          <svg width="20" height="20">
            <use href="#ground-service"></use>
          </svg>
          <span>
            <Trans id="ground_service"> Ground Service </Trans>
          </span>
        </div>
        <div className="aside__text">
          <svg width="20" height="20" className="aside__text-icon">
            <use href="#clipboard"></use>
          </svg>
          <Trans id="package_type"> Package type </Trans>:<span className="aside__text--dark">{type}</span>
        </div>

        <div className="aside__tags">
          <span className="aside__tag">
            <Trans id="changeable"> Changeable </Trans>
          </span>
        </div>
        <div className="aside-cost">
          <span>
            <Trans id="cost"> Cost </Trans>:
          </span>
          <span className="aside-cost__currency">
            <CurrencyContext.Consumer>{currency => currency.selectedCurrency.code}</CurrencyContext.Consumer>
          </span>
          <span className="aside-cost__value">{servicePrice && formatCurrencyNumber(servicePrice)}</span>
        </div>
      </div>
    );
  }
}

export default GroundServicesBooking;
