import React from 'react';
import { Trans, Plural, DateFormat } from '@lingui/macro';

const formatCurrencyNumber = (num) => num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const getPaxCount = passengers => {
    let paxsCount = 1;
    if (passengers && passengers) {
        let adults = 0, children = 0, infants = 0;
        passengers.map(pax => {
            if (pax.type === "ADT") {
                adults++;
            } else if (pax.type === "CHD") {
                children++;
            } else if (pax.type === "INF") {
                infants++;
            } else {
                return null;
            }
        })
        paxsCount = { adults, children, infants };
    }
    return paxsCount;
}

const ReviewPassengers = ({ navigateTo, passengers }) => {

    const paxsCount = getPaxCount(passengers);

    return (
        <div className="review-passengers review-block">
            <div className="review-block__info">
                <div className="review-head">
                    <div className="review-head__left">
                        <svg width="30" height="30">
                            <use href="#group"></use>
                        </svg>
                        <span><Trans id="who_s_going"> Who's going? </Trans></span>
                        <span className="review-passengers__text _sm-show">
                            {paxsCount.adults > 0 && <> {paxsCount.adults} {paxsCount.adults == 1 ? <Trans id="adult"> Adult </Trans> : paxsCount.adults > 1 ? <Trans id="adults"> Adults </Trans> : " "} </>}
                            {paxsCount.children > 0 && <> - {" "} {paxsCount.children} {paxsCount.children == 1 ? <Trans id="child"> Child </Trans> : paxsCount.children > 1 ? <Trans id="children"> Children </Trans> : " "} </>}
                            {paxsCount.infants > 0 && <>  - {" "} {paxsCount.infants} {paxsCount.infants == 1 ? <Trans id="infant"> Infant </Trans> : paxsCount.infants > 1 ? <Trans id="infants"> Infants </Trans> : " "} </>}
                        </span>
                    </div>
                    <div className="review-head__right">
                        <a href="#">
                            <svg width="12" height="12">
                                <use href="#change"></use>
                            </svg>
                            <span onClick={() => navigateTo()}><Trans id="change"> Change </Trans></span>
                        </a>
                    </div>
                </div>
                <div className="review-passengers__body">
                    {
                        passengers && passengers.map(({ type, title, firstName, middleName, lastName, passportNo, passportExpiryDate, country, visaFees }, index) => (
                            <div className="review-passengers__item" key={index}>
                                <div className="review-passengers__text">
                                    1 <Trans id="guest"> Guest </Trans>, {type}
                                </div>
                                <div className="review-passengers__text review-passengers__text--md">
                                    {`${title && title}. ${firstName && firstName} ${middleName && middleName} ${lastName && lastName}, 
                                    ${visaFees && formatCurrencyNumber(visaFees)}, 
                                    ${passportNo && passportNo},`}
                                    {passportExpiryDate &&
                                        <>
                                            <DateFormat
                                                value={passportExpiryDate}
                                                format={{
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric"
                                                }}
                                            />,</>}
                                    {`${country && country}`}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ReviewPassengers;