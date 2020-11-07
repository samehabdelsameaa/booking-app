import React, { Component } from 'react';
import { Trans } from '@lingui/macro';
import BookingSideNav from './BookingSideNav';

class MyBookingsDetails extends Component {
    state={}

    render(){
        return(
            <div className="pc pc--booking">
                <div className="pc__container">
                    <div className="pc__content">
                        <BookingSideNav />
                        <div className="pc-profile">
                            <div className="container">
                                <div className="pc-breadcrumbs">
                                    <a href="#" className="pc-breadcrumbs__link"><Trans id="account"> Account </Trans> </a>
                                    /
									<span className="pc-breadcrumbs__link active"><Trans id="my_booking"> My Booking </Trans>  </span>
                                </div>
                            </div>

                            <div className="pc-profile__content">
                                <div className="container">
                                    <h1> Bookings Details </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         )
    }
}

export default MyBookingsDetails;