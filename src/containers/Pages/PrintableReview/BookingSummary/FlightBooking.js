import React, { Component } from 'react';
import { Trans, Plural } from '@lingui/macro';
import { CurrencyContext } from 'containers/Providers/CurrencyProvider';
import { getPaxCount } from '../../Review/ReviewPassengers';
import { formatCurrencyNumber } from '.';

class FlightBooking extends Component {
    render() {
        const { selectedFlights : {departureFlight , returnFlight }, price, passengers } = this.props;
        const paxCount = passengers && getPaxCount(passengers);

        return (
            <div className="aside-flight">
                <div className="aside-title">
                    <svg width="20" height="20" className="aside-flight__icon">
                        <use href="#flight"></use>
                    </svg>
                    <span><Trans id="your_flight"> Your flight </Trans></span>
                </div>
                <div className="aside__flight">

                    <span className="aside__flight-point"><Trans id="flight"> Flight </Trans> {departureFlight.flightNo} </span>

                    <svg width="30" height="30">
                        <use href="#aeroplane"></use>
                    </svg>
                    <span className="aside__flight-point aside__flight-point--end"><Trans id="flight"> Flight </Trans> {returnFlight.flightNo} </span>
                </div>
                <div className="aside-flight__body">
                    <div className="aside-path">
                        <span className="aside-path__item"> {departureFlight.departure} </span>
                        <svg width="15" height="15" className="flight-icon aside-path__svg">
                            <use href="#flight"></use>
                        </svg>
                        <span className="aside-path__item">{departureFlight.arrival}</span>
                        <svg width="15" height="15" className="flight-icon aside-path__svg">
                            <use href="#flight"></use>
                        </svg>
                        <span className="aside-path__item">{returnFlight.arrival}</span>
                    </div>
                    <div className="aside-visitors">
                        <Trans id="who_s_going"> Who's going? </Trans>
                        <span> {paxCount && paxCount.adults > 0 ?  paxCount.adults : null} {" "}
                        { paxCount.adults ? <Trans id="adult"> Adult </Trans> : paxCount.adults > 1 ? <Trans id="adults"> Adults </Trans> : "1" } </span>
                    </div>
                    <div className="aside-cost">
                        <span><Trans id="cost_of_fly"> Cost of fly </Trans>:</span>
                        <span className="aside-cost__currency">
                            <CurrencyContext.Consumer>
                                {currency => currency.selectedCurrency.code}
                            </CurrencyContext.Consumer></span>
                        <span className="aside-cost__value">{price && formatCurrencyNumber(price)}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default FlightBooking;