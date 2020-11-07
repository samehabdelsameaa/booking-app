import React, { Component } from 'react';
import { Trans, Plural } from '@lingui/macro';
import { CurrencyContext } from 'containers/Providers/CurrencyProvider';
import { formatCurrencyNumber } from '.';

class EVisaStatus extends Component {
    getPassengersEvisaTotalPrice = passengers => {
        let totalPrice = 0;
        passengers.map( pax => pax && (totalPrice += pax.visaFees) );
        return totalPrice;
    }
    
    render() {
        const { passengers } = this.props;
        let evisaTotalPrice = passengers && this.getPassengersEvisaTotalPrice(passengers);

        return(
            <div className="aside-visa">
                <div className="aside-title">
                    <svg width="20" height="20">
                        <use href="#visa"></use>
                    </svg>
                    <span><Trans id="e_visa_status"> E-VISA status </Trans></span>
                </div>
                <div className="aside__text">
                    <svg width="20" height="20" className="aside__text-icon">
                        <use href="#group"></use>
                    </svg>
                    <Trans id="visitors"> Visitors </Trans>:
                    <span className="aside__text--dark"> { passengers.length } {" "} 
                        {passengers.length == 1 ? <Trans id="adult"> Adult </Trans> : passengers.length > 1 ? <Trans id="adults"> Adults </Trans> : " " } 
                    </span>
                </div>
                <div className="aside-cost">
                    <span><Trans id="cost"> Cost </Trans>: </span>
                    <span className="aside-cost__currency">
                        <CurrencyContext.Consumer>
                            {currency => currency.selectedCurrency.code}
                        </CurrencyContext.Consumer></span>
                    <span className="aside-cost__value">{evisaTotalPrice && formatCurrencyNumber(evisaTotalPrice)}</span>
                </div>
            </div>
        )
    }
}

export default EVisaStatus;