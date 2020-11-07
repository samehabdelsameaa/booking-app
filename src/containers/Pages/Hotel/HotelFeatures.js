import React from 'react';
import { Trans } from '@lingui/macro';

const HotelFeatures = ({specialHotelFeatures, hotelFeaturesDetails}) => {
    return (
        <div className="hotel-simple hotel-features">
            <div className="container container--md">
                <div className="hotel__title">
                    <svg width="40" height="40">
                        <use href="#star"></use>
                    </svg>
                    <span><Trans id="special_features"> Special Features </Trans></span>
                </div>
                <p className="hotel-simple__text hotel-simple__text--pr"> {hotelFeaturesDetails} </p>
                <div className="grid grid--1 grid--sm-2 grid--sm-space-md grid--def-space-xl">
                    {
                        specialHotelFeatures && specialHotelFeatures.map( (feature ,i) => {
                            return(
                                <div className="gcell _pb-none" key={i}>
                                    <div className="hotel-features__item">
                                        <div className="hotel-simple__subtitle hotel-simple__subtitle--upper">{ feature.title }</div>
                                        <p className="hotel-simple__text hotel-simple__text--light"> { feature.description } </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HotelFeatures;