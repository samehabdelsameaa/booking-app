import React from 'react';
import { Trans } from '@lingui/macro';
import HotelCheckInRulesItems from './HotelCheckInRulesItems';

const HotelCheckIn = ({hotelCheckInInstructions}) => {
    return (
        <div className="hotel-simple hotel-simple--check">
            <div className="container container--md">
                <div className="hotel__title">
                    <svg width="40" height="40">
                        <use href="#guide"></use>
                    </svg>
                    <span> <Trans id="check_in_instructions"> Check-in instructions </Trans> </span>
                </div>
                {
                    hotelCheckInInstructions && hotelCheckInInstructions.map( (item,i) => {
                        return (
                            <React.Fragment key={i}>
                                <div className="hotel-simple__subtitle">{item.label}</div>

                                { (item.headerTitle !== undefined && item.headerTitle.length > 0) ? <p className="hotel-simple__text hotel-simple__text--light"> { item.headerTitle } </p> : null }

                                    <HotelCheckInRulesItems checkInRulesItems={item.values} key={i} />

                                { (item.footerTitle !== undefined && item.footerTitle.length > 0) ? <p className="hotel-simple__text hotel-simple__text--light"> { item.footerTitle } </p> : null }

                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default HotelCheckIn;