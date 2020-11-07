import React from 'react';
import { Trans, DateFormat, Plural } from "@lingui/macro";
import { CurrencyContext } from "containers/Providers/CurrencyProvider";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled.div`
    a{
        color:#333;
        text-decoration: none;
        &:hover{
            color: #01bab4;
            text-decoration: underline;
        }
    }
`;

const BookingItem = (
    { bookingItem : 
        { 
            bookingRef,
            bookingDate,
            checkInDate,
            totalValue,
            visitors: { adults },
            rooms,
            totalNights
        } 
    }) => {

    return (
        <div className="pc-booking__row">
            <div className="pc-booking__it">
                <div className="pc-booking__text pc-booking__text--title _sm-hide"><Trans id="booking_ref"> Booking Ref </Trans></div>
                <div className="pc-booking__text">
                    <StyledLink>
                        <Link to="/bookings-details"> {bookingRef} </Link>
                    </StyledLink>
                </div>
            </div>
            <div className="pc-booking__it">
                <div className="pc-booking__text pc-booking__text--title _sm-hide"><Trans id="booking_date"> Booking Date </Trans></div>
                <div className="pc-booking__text">
                { 
                    <DateFormat 
                        value={bookingDate} 
                        format={{
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        }} 
                    />
                }
                </div>
            </div>
            <div className="pc-booking__it">
                <div className="pc-booking__text pc-booking__text--title _sm-hide"> <Trans id="checkin_date"> Checkin Date  </Trans></div>
                <div className="pc-booking__text"> 
                {
                    <DateFormat 
                        value={checkInDate} 
                        format={{
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        }} 
                    />
                } 
                </div>
            </div>
            <div className="pc-booking__it">
                <div className="pc-booking__text pc-booking__text--title _sm-hide"><Trans id="total_value"> Total Value </Trans>  </div>
                <div className="pc-booking__text">
                    {totalValue }
                    <CurrencyContext.Consumer>
                        { currency => currency.selectedCurrency.code }
                    </CurrencyContext.Consumer>
                </div>
            </div>
            <div className="pc-booking__it">
                <div className="pc-booking__text pc-booking__text--title _sm-hide"><Trans id="summary"> Summary </Trans></div>
                <div className="pc-booking__text">
                    {totalNights} {totalNights == 1 ? <Trans id="night"> Night </Trans> : totalNights > 1 ? <Trans id="nights"> Nights </Trans> : " " } ,{" "}
                    {rooms} {rooms == 1 ? <Trans id="room"> Room </Trans> : rooms > 1 ? <Trans id="rooms"> Rooms </Trans> : " " } ,{" "}
                    {adults} {adults == 1 ? <Trans id="adult"> Adult </Trans> : adults > 1 ? <Trans id="adults"> Adults </Trans> : " " }
                </div>
            </div>
        </div>
    )
}

export default BookingItem;