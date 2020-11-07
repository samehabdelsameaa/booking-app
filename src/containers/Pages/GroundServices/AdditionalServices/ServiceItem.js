import React, { Component } from "react";
import Counter from "./Counter";
import { Trans } from "@lingui/macro";

class ServiceItem extends Component {
  constructor(props) {
    super(props);
    this.counterRef = React.createRef();
  }

  syncCounters = (countVal, index, target, otherProperty) => {
    // if (countVal === 0) {
    //   this.props.onServicesChange({ index, duration: 0, qty: 0 });
    // }
    this.props.onServicesChange({
      index,
      [target]: countVal,
      target: target,
      otherProperty: otherProperty
    });
  };

  render() {
    const { index, service } = this.props;

    return (
      <div className="t-service__item">
        <div className="t-service__left">
          <span className="t-service__name">{service.name}</span>
        </div>
        <div className="t-service__center">
          <Counter
            value={service.qty}
            ref={this.counterRef}
            resetSyncedCounters={val =>
              this.syncCounters(val, index, "qty", "duration")
            }
          />
        </div>
        <div className="t-service__right">
          <Counter
            value={service.duration}
            ref={this.counterRef}
            resetSyncedCounters={val =>
              this.syncCounters(val, index, "duration", "qty")
            }
          />
        </div>
      </div>
    );
  }
}

export default ServiceItem;
