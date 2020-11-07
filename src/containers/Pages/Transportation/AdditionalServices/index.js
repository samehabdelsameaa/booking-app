import React, { Component } from 'react';
import { Trans } from '@lingui/macro';
import ServiceItem from './ServiceItem';

class AdditionalServices extends Component {
    render() {
        const { additionalServices, setAdditionalServices, selectedAdditionalServices } = this.props;

        return (
            <div className="t-service">
                <div className="booking-block t-service__head">
                    <div className="t-service__left">
                        <div className="booking-block__svg">
                            <svg width="30" height="30">
                                <use href="#ground-service"></use>
                            </svg>
                        </div>
                        <div> <Trans id="additional_service"> Additional Service </Trans> </div>
                    </div>
                </div>

                <div className="t-service__body">
                    {
                        additionalServices && additionalServices.map((service, i) => (
                            <ServiceItem
                                key={i}
                                service={service}
                                selectedAdditionalServices={selectedAdditionalServices}
                                setServiceSelected={code => setAdditionalServices(code)}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default AdditionalServices;