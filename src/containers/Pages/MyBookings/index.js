import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import myBookingsActions from 'store/reservation/actions';
import myAccountsActions from 'store/accounts/actions';
import BookingItem from './BookingItem';
import BookingSideNav from './BookingSideNav';
import DropDownList from '../../../components/Forms/DropDownList';
import { Trans } from "@lingui/macro";
import BreadCrumbNavBar from './BreadCrumbNavBar';

class MyBookings extends Component {
    state = {
        myBookingsList: [],
        searchCriteria: {
            selectedTab: 1,
            sortingText: "",
        },
    }

    componentDidMount() {
        const { fetchMyBookings, fetchUserProfile } = this.props;
        fetchMyBookings();
        fetchUserProfile();
    }

    componentDidUpdate(prevProps) {
        const { myBookings } = this.props;
        if (myBookings !== prevProps.myBookings) {
            this.setState({
                myBookingsList: myBookings
            });
        }
    }

    setSorting = async (sortingKey, index = null) => {
        const { myBookings } = this.props;
        let _sortedList = await this.sortListByKey(myBookings, sortingKey);
        this.setState(prevState => ({
            myBookingsList: _sortedList,
            searchCriteria: {
                ...prevState.searchCriteria,
                selectedTab: index !== null ? index : prevState.searchCriteria.selectedTab,
                sortingText: sortingKey
            }
        }
        ));
    }

    sortListByKey = async (list, key) => {
        let today = +new Date();
        switch (key) {
            case "totalValue":
                return list.sort((a, b) => b.totalValue - a.totalValue);
            case "bookingDate":
                return list.sort((a, b) => b.bookingDate - a.bookingDate);
            case "checkInDate":
                return list.sort((a, b) => b.checkInDate - a.checkInDate);
            case "view":
                return list.sort((a, b) => b.totalNights - a.totalNights);
            case "current":
                return list.filter(bookingItem => bookingItem.status === "Confirmed" && bookingItem.checkoutDate === today);
            case "upcoming":
                return list.filter(bookingItem => bookingItem.status === "Confirmed" && bookingItem.checkoutDate > today);
            case "completed":
                return list.filter(bookingItem => bookingItem.status === "Confirmed" && bookingItem.checkoutDate < today);
            case "canceled":
                return list.filter(bookingItem => bookingItem.status === "Cancelled");
            default:
                return list;
        }
    }

    render() {
        const { location } = this.props;
        const { myBookingsList } = this.state;
        
        return (
            <div className="pc pc--booking">
                <div className="pc__container">
                    <div className="pc__content">
                        <BookingSideNav 
                            location={location}
                        />
                        <div className="pc-profile">
                            <div className="container">
                                <BreadCrumbNavBar location={location} />
                            </div>

                            <div className="pc-profile__content">
                                <div className="container">
                                    <div className="pc-booking">
                                        <div className="pc-booking__tabs">
                                            {
                                                ["Current", "Upcoming", "Completed", "Canceled"].map((value, index) => (
                                                    <span
                                                        key={index}
                                                        className={`pc-booking__tab ${this.state.searchCriteria.selectedTab === index ? "active" : ""}`}
                                                        onClick={() => this.setSorting(value.toLowerCase(), index)}
                                                    >
                                                        {value}
                                                    </span>
                                                ))
                                            }
                                        </div>

                                        <DropDownList
                                            initialValue="Booking date"
                                            render={({ dropdownOpen, selectedOption }, toggleDropdown, setSelected) => (
                                                <div className="pc-booking__select">
                                                    <div className="pc-booking__select-text"><Trans id="order_by"> Order by </Trans>:</div>
                                                    <div className={`select-drop pc-booking__select-it ${dropdownOpen === true ? "open" : ""}`} onClick={toggleDropdown}>
                                                        <span className="select-drop__text"> {selectedOption} </span>
                                                        <div className="select-drop__results">
                                                            {
                                                                Array.from(["booking Date", "checkIn Date", "total Value", "view"], x => {
                                                                    return { label: x, value: x.replace(/ /gi, "") };
                                                                })
                                                                    .map(({ label, value }, i) => (
                                                                        <span
                                                                            className="select-drop__results-item"
                                                                            key={i}
                                                                            value={value}
                                                                            onClick={e => {
                                                                                setSelected(e);
                                                                                this.setSorting(e.target.getAttribute("value"));
                                                                            }
                                                                            }
                                                                        >
                                                                            {label}
                                                                        </span>
                                                                    ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        />

                                        <div className="pc-booking__table">
                                            <div className="pc-booking__head _sm-show">
                                                <div className="pc-booking__text pc-booking__text--title">Booking Ref</div>
                                                <div className="pc-booking__text pc-booking__text--title">Booking Date</div>
                                                <div className="pc-booking__text pc-booking__text--title">Checkin Date</div>
                                                <div className="pc-booking__text pc-booking__text--title">Total Value</div>
                                                <div className="pc-booking__text pc-booking__text--title">Summary</div>
                                            </div>
                                            <div className="pc-booking__body">
                                                {
                                                    myBookingsList && myBookingsList.map((bookingItem, i) => (
                                                        <BookingItem key={i} bookingItem={bookingItem} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({
    reservations: { myBookings },
    account: { profile },
    auth: { currentUser, isLoggedIn }
}) => ({
    myBookings,
    profile,
    currentUser,
    isLoggedIn
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...myBookingsActions, ...myAccountsActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyBookings);