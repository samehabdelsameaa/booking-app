import React, { Component } from "react";
import { Trans } from "@lingui/macro";
import ServiceItem from "./ServiceItem";

class AdditionalServices extends Component {
  render() {
    const { additionalServices, additionalServiceSelected } = this.props;
    return (
      <React.Fragment>
        <div className="t-service">
          <div className="booking-block t-service__head">
            <div className="t-service__left">
              <div className="booking-block__svg">
                <svg width="30" height="30">
                  <use href="#ground-service"></use>
                </svg>
              </div>
              <div>
                {" "}
                <Trans id="service"> Service </Trans>
              </div>
            </div>
            <div className="t-service__center">
              <Trans id="qty"> QTY </Trans>
            </div>
            <div className="t-service__right">
              <Trans id="duration"> Duration </Trans>
            </div>
          </div>

          <div className="t-service__body">
            {additionalServices &&
              additionalServices.map((service, i) => (
                <ServiceItem
                  service={service}
                  key={i}
                  index={i}
                  onServicesChange={item => additionalServiceSelected(item)}
                />
              ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdditionalServices;
