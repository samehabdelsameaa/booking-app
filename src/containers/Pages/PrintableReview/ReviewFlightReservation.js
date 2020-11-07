import React from 'react';
import { Trans } from '@lingui/macro';

const ReviewFlightReservation = ( { selectedFlight : {departureFlight , returnFlight }}) => {
    return (
        <div className="summary-booking">
            <div className="summary-booking__info">
                <div className="booking-flight">

                    <div className="review-head">
                        <div className="review-head__left">
                            <svg width="30" height="30">
                                <use href="#aeroplane"></use>
                            </svg>
                            <span><Trans id="flight_details"> Flight details </Trans></span>
                        </div>

                    </div>
                    <div className="sm-flight">
                        <div className="sm-flight__head">
                            <div className="sm-flight__name">
                                <span>{departureFlight.departure && departureFlight.departure}</span>
                                <span>
                                    <svg width="15" height="15" className="sm-flight-icon">
                                        <use href="#flight"></use>
                                    </svg>
                                </span>
                                <span>{departureFlight.arrival}</span>
                            </div>
                            <div className="sm-flight__label">{departureFlight.package}</div>
                        </div>
                        <div className="sm-flight__table">
                            <div className="sm-flight__column sm-flight-departure">
                                <span className="sm-flight__title">
                                    {departureFlight.departureAirportCode} : {departureFlight.departureHour}
                                </span>
                                <span className="sm-flight__subtitle">
                                    <Trans id="flight"> Flight </Trans> {departureFlight.flightNo}
                                </span>
                                <span className="sm-flight__text">
                                    {departureFlight.departureDate}
                                </span>
                            </div>

                            <div className="sm-flight__column sm-flight-time">
                                <svg width="30" height="30">
                                    <use href="#stopwatch"></use>
                                </svg>

                                <span className="sm-flight__text sm-flight__text--dark">
                                    {departureFlight.duration}
                                </span>
                            </div>
                            <div className="sm-flight__column sm-flight-arrival">
                                <span className="sm-flight__title">
                                    {departureFlight.returnAirportCode} : {departureFlight.arrivalHour}
                                </span>
                                <span className="sm-flight__text">
                                    {departureFlight.arrivalDate}
                                </span>
                            </div>
                            <div className="sm-flight-info">
                                <div className="sm-flight-info__item">
                                    <span className="sm-flight__text">
                                        <Trans id="class_of_travel"> Class of travel (T) </Trans>
                                    </span>
                                    <span className="sm-flight__text sm-flight__text--dark">
                                        <Trans id="guest"> Guest </Trans>
                                    </span>
                                </div>
                                <div className="sm-flight-info__item">
                                    <span className="sm-flight__text">
                                        <Trans id="number_of_stops"> Number of stops </Trans>
                                    </span>
                                    <span className="sm-flight__text sm-flight__text--dark">
                                        { departureFlight.noOfStops } 
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sm-flight">
                        <div className="sm-flight__head">
                            <div className="sm-flight__name">
                                <span>{returnFlight.departure && returnFlight.departure}</span>
                                <span>
                                    <svg width="15" height="15" className="sm-flight-icon">
                                        <use href="#flight"></use>
                                    </svg>
                                </span>
                                <span>{returnFlight.arrival}</span>
                            </div>
                            <div className="sm-flight__label"> {returnFlight.package} </div>
                        </div>
                        <div className="sm-flight__table">
                            <div className="sm-flight__column sm-flight-departure">
                                <span className="sm-flight__title">
                                    {returnFlight.departureAirportCode} : {returnFlight.departureHour}
                                </span>
                                <span className="sm-flight__subtitle">
                                    <Trans id="flight"> Flight </Trans> {returnFlight.flightNo}
                                </span>
                                <span className="sm-flight__text">
                                    {returnFlight.departureDate}
                                </span>
                            </div>

                            <div className="sm-flight__column sm-flight-time">
                                <svg width="30" height="30">
                                    <use href="#stopwatch"></use>
                                </svg>
                                <span className="sm-flight__text sm-flight__text--dark">
                                    {returnFlight.duration}
                                </span>
                            </div>
                            <div className="sm-flight__column sm-flight-arrival">
                                <span className="sm-flight__title">
                                    {returnFlight.returnAirportCode} : {returnFlight.arrivalHour}
                                </span>
                                <span className="sm-flight__text">
                                    {returnFlight.arrivalDate}
                                </span>
                            </div>
                            <div className="sm-flight-info">
                                <div className="sm-flight-info__item">
                                    <span className="sm-flight__text">
                                        <Trans id="class_of_travel"> Class of travel (T) </Trans>
                                    </span>
                                    <span className="sm-flight__text sm-flight__text--dark">
                                        <Trans id="guest"> Guest </Trans>
                                    </span>
                                </div>
                                <div className="sm-flight-info__item">
                                    <span className="sm-flight__text">
                                        <Trans id="number_of_stops"> Number of stops </Trans>
                                    </span>
                                    <span className="sm-flight__text sm-flight__text--dark">
                                        { returnFlight.noOfStops } 
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="baggage open">
                    <span className="baggage__btn" >
                        <svg width="17" height="17" className="baggage-suitcase">
                            <use href="#baggage"></use>
                        </svg>
                        <span><Trans id="baggage"> Baggage </Trans></span>
                        <svg width="8" height="8" className="baggage-arrow">
                            <use href="#sort-down"></use>
                        </svg>
                    </span>

                    <div className="baggage__content">
                        <div className="baggage__text _text-center">
                            Your baggage allowance for international flights – Guest Class
                                                </div>

                        <div className="grid grid--2 grid--sm-4 grid--space-none baggage__table">
                            <div className="gcell order-0">
                                <div className="baggage__cell baggage__cell--title">
                                    All Sectors Adult & Child
                                                        </div>
                            </div>

                            <div className="gcell">
                                <div className="baggage__cell">
                                    2 Pieces, 23 KG each (50lbs)
                                                        </div>
                            </div>

                            <div className="gcell order-2">
                                <div className="baggage__cell baggage__cell--title">
                                    Alfursan Gold & Silver
                                                            <br /> and Elite & Elite Plus
                                                        </div>
                            </div>

                            <div className="gcell">
                                <div className="baggage__cell">
                                    1 Piece, 10 KG (22 lbs)
                                                        </div>
                            </div>

                            <div className="gcell order-1">
                                <div className="baggage__cell baggage__cell--title">
                                    Infant
                                </div>
                            </div>

                            <div className="gcell">
                                <div className="baggage__cell">
                                    1 Extra Piece, 23 KG (50 lbs)
                                </div>
                            </div>

                            <div className="gcell order-3">
                                <div className="baggage__cell  baggage__cell--title">
                                    Cabin Baggage <br /> (Carry-on bag)
                                </div>
                            </div>

                            <div className="gcell">
                                <div className="baggage__cell">
                                    1 Piece, 7 KG (15lbs)
                                                        </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewFlightReservation;