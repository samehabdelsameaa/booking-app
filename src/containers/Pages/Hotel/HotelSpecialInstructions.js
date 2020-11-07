import React from 'react';
import { Trans } from '@lingui/macro';

const HotelSpecialInstructions = ({hotelCheckInPolicy}) => {
    return (
        <div className="hotel-simple">
            <div className="container container--md">
                <div className="hotel__title">
                    <svg width="40" height="40">
                        <use href="#instructions"></use>
                    </svg>
                    <span><Trans id="special_check_in_instructions"> Special check-in instructions </Trans>  </span>
                </div>
                <p className="hotel-simple__text hotel-simple__text--pr">
                    {hotelCheckInPolicy}
				</p>
            </div>
        </div>
    )
}

export default HotelSpecialInstructions;