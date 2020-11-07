import React from 'react';
import { Trans, DateFormat } from '@lingui/macro';
import { CurrencyContext } from 'containers/Providers/CurrencyProvider';
import { formatCurrencyNumber } from '../BookingSummary';

const FlightSummary = ({ selectedFlights, passengers }) => {
    
    return (
        <div className="loc-flight">
            <div className="loc-flight__title size--upper"><Trans id="flight_summary"> Flight Summary </Trans></div>
            {
                selectedFlights && Object.keys(selectedFlights).map((selectedFlight, i) => {

                    let numberOfPassengers = passengers.length;
                    let currentFlight = selectedFlights[selectedFlight];
                        
                    if (currentFlight && Object.values(currentFlight).length > 0) {

                        return <div className="loc-flight__item" key={i}>
                            <div className="loc-flight__head">
                                <svg width="30" height="30" className={selectedFlight === "returnFlight" ? "return" : ''}>
                                    <use href="#aeroplane"></use>
                                </svg>
                                <span className="weight--bold size--md color--second">
                                    {
                                        selectedFlight === "departureFlight" ?
                                            <Trans id="departing_flight"> Departing Flight </Trans>
                                            :
                                            <Trans id="returning_flight"> Returning Flight </Trans>
                                    }
                                </span>
                            </div>
                            <div className="loc-flight__info weight--semibold color--light">
                                <span className="size--ms"> <Trans id="flight"> Flight </Trans>{currentFlight.flightNo} </span>
                                <span> 
                                    {
                                        currentFlight.departureDate &&
                                        <DateFormat
                                            value={ currentFlight.departureDate}
                                            format={{
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                            }}
                                        />
                                    } 
                                </span>
                            </div>
                            <div className="loc-flight__body loc-info__group">
                                <div className="loc-flight__group weight--bold size--ms">
                                    <div>{currentFlight.departureHour}</div>
                                    <div></div>
                                    <div>{currentFlight.arrivalHour} </div>
                                </div>
                                <div className="loc-flight__group _mt-md">
                                    <div>
                                        <div>
                                            <div className="weight--bold size--ms size--upper color--second">{currentFlight.departureAirportCode}</div>
                                            <div className="color--light">{currentFlight.returnAirportCode}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <svg width="16" height="16">
                                            <use href="#flight"></use>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="weight--bold size--ms size--upper color--second">{currentFlight.departure} </div>
                                        <div className="color--light">{currentFlight.arrival}</div>
                                    </div>
                                </div>
                                <div className="loc-flight__foot _mt-def">
                                    <div className="color--light">{currentFlight.package}  x {numberOfPassengers && numberOfPassengers} </div>

                                    <div className="size--upper weight--bold">
                                        <CurrencyContext.Consumer>
                                            {currency => currency.selectedCurrency.code}
                                        </CurrencyContext.Consumer>
                                        <span className="size--ms"> {currentFlight.price && formatCurrencyNumber(currentFlight.price)} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                })
            }
        </div>
    )
}

export default FlightSummary;