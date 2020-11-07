import React from 'react';
import { Trans } from '@lingui/macro';
import { CurrencyContext } from 'containers/Providers/CurrencyProvider';
import { formatCurrencyNumber } from '.';

class TransportationBooking extends React.Component {
    render() {
        const { routePoints, selectedPackageClass, vehcileType, price, count } = this.props;
        return (
            <div className="aside-transport">
                <div className="aside-title">
                    <svg width="20" height="20" className="icon-xl">
                        <use href="#car-4"></use>
                    </svg>
                    <span><Trans id="transportation"> Transportation </Trans></span>
                </div>

                <div className="aside__text">
                    <svg width="20" height="20" className="aside__text-icon">
                        <use href="#clipboard"></use>
                    </svg>
                    <Trans id="transportation_package"> Transportation package </Trans>:
                    <span className="aside__text--dark">{selectedPackageClass}</span>
                </div>

                <div className="aside__text">
                    <svg width="20" height="20" className="aside__text-icon">
                        <use href="#empty-marker"></use>
                    </svg>
                    <Trans id="route"> Route </Trans>:
                    <span className="aside__text--dark">
                        {
                            routePoints && routePoints.map(({ city }, index) => (
                                <React.Fragment key={index}>
                                    {city}
                                    {routePoints.length - 1 !== index && <span className="aside__text--blue"> / </span>}
                                </React.Fragment>
                            ))
                        }
                    </span>
                </div>

                <div className="aside__text">
                    <svg width="20" height="20" className="aside__text-icon">
                        <use href="#group"></use>
                    </svg>
                    <span className="aside__text--dark">
                        <Trans id="selected_vehicle"> Selected vehicle </Trans>: {vehcileType}, {" "}
                        {count} {count == 1 ? <Trans id="adult"> Adult </Trans> : count > 1 ? <Trans id="adults"> Adults </Trans> : " " }
                    </span>
                </div>

                <div className="aside__tags">
                    <span className="aside__tag">
                        <Trans id="changeable"> Changeable </Trans>
                    </span>
                </div>

                <div className="aside-cost">
                    <span><Trans id="cost"> Cost </Trans>:</span>
                    <span className="aside-cost__currency">
                        <CurrencyContext.Consumer>
                            {currency => currency.selectedCurrency.code}
                        </CurrencyContext.Consumer>
                    </span>
                    <span className="aside-cost__value">{price && formatCurrencyNumber(price)}</span>
                </div>
            </div>
        )
    }
}

export default TransportationBooking;