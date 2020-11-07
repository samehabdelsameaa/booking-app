import React, { Component } from "react";
import { Trans, Plural } from "@lingui/macro";
import classNames from "classnames";
import HotelsSummary from "./HotelsSummary";
import { CurrencyContext } from "containers/Providers/CurrencyProvider";
import FlightSummary from "./FlightSummary";

const formatCurrencyNumber = num => num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

const isPackageAvailable = (selectedHotels, selectedFlights) => {
  const Shotel = selectedHotels && selectedHotels.map(hotel => hotel.selectedHotel);
  const SFlight = selectedFlights && Object.values(selectedFlights).map(flight => selectedFlights[flight]);
  return Shotel && Shotel.length > 0 && SFlight && SFlight.length > 0;
};

class HotelBookingSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSummaryOpen: this.props.isFilterOpen
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.isFilterOpen !== prevState.isSummaryOpen){
      return { isSummaryOpen: nextProps.isFilterOpen};
    }
    else return null;
  }

  toggleSummaryOpen = () => {
    this.setState(prevState => ({
      isSummaryOpen: !prevState.isSummaryOpen
    }), this.props.toggleSummaryInfo(!this.state.isSummaryOpen));
  };

  getHotelsTotalPrice = citiesRooms => {
    let totalPrice = 0;
    // hotels.map(({ selectedHotel: { price } }) => price && (totalPrice += price));
    //selected rooms are room groups, inside each group array of rooms
    totalPrice = citiesRooms.reduce(
      (gtotal, roomGroups) =>
        gtotal + roomGroups.reduce((total, group) => total + group.rooms.reduce((total, { amount }) => total + amount, 0), 0),
      0
    );
    return totalPrice;
  };

  getFlightsTotalPrice = selectedFlights => {
    let totalPrice = 0;
    selectedFlights &&
      Object.keys(selectedFlights).map(selectedFlight => {
        if (selectedFlights[selectedFlight].price !== undefined) {
          totalPrice += selectedFlights[selectedFlight].price;
        }
      });
    return totalPrice;
  };

  render() {
    const { isSummaryOpen } = this.state;
    const { selectedHotels, selectedFlights, passengers, selectedRooms } = this.props;

    let hotelsPrices = this.getHotelsTotalPrice(selectedRooms);
    let flightsPrices = this.getFlightsTotalPrice(selectedFlights);
    let totalPrice = hotelsPrices + flightsPrices;

    return (
      <div className={classNames("loc-info", { open: isSummaryOpen })}>
        <div className="loc__arrow loc__arrow--right" onClick={this.toggleSummaryOpen}>
          <svg width="15" height="15">
            <use href="#arrow"></use>
          </svg>
        </div>

        <div className="loc-info__wrap">
          <div className="loc-info__group loc-package">
            <div className="size--upper color--second weight--bold">
              <Trans id="your_package_cost"> Your Package Cost </Trans>
            </div>
            <div className="size--upper">
              <span className="weight--bold size--ms">
                <CurrencyContext.Consumer>{currency => currency.selectedCurrency.code}</CurrencyContext.Consumer>
              </span>{" "}
              <span className="weight--bold size--xl">{formatCurrencyNumber(totalPrice)}</span>
            </div>
            <div className="color--light weight--semibold _mb-def">
              <Trans id="includes_flight_and_hotel_for"> Includes Flight + Hotel For </Trans> {passengers.length}{" "}
              {passengers.length == 1 ? <Trans id="adult"> Adult </Trans> : passengers.length > 1 ? <Trans id="adults"> Adults </Trans> : " " }
            </div>
            {isPackageAvailable(selectedHotels, selectedFlights) && (
              <button type="button" className="button button--full-width loc-package__btn">
                <Trans id="proceed_to_checkout"> Proceed to checkout </Trans>
              </button>
            )}
          </div>

          <div className="loc-booking__title size--upper">
            <Trans id="book_this_package"> Book this package </Trans>
          </div>

          {selectedHotels && selectedHotels.length > 0 && <HotelsSummary selectedHotels={selectedHotels} citiesRooms={selectedRooms} />}

          {selectedFlights && Object.keys(selectedFlights).length > 0 && selectedFlights.constructor === Object && (
            <FlightSummary selectedFlights={selectedFlights} passengers={passengers} />
          )}

          <div className="loc-total loc-total--sub">
            <div className="size--md color--second">
              <Trans id="sub_total"> Sub Total </Trans>
            </div>
            <div>
              <span className="size--upper color--light">
                <CurrencyContext.Consumer>{currency => currency.selectedCurrency.code}</CurrencyContext.Consumer>{" "}
              </span>
              <span className="size--lg color--light">{totalPrice && formatCurrencyNumber(totalPrice)}</span>
            </div>
          </div>

          <div className="loc-total weight--bold">
            <div className="size--md size--upper color--second">
              <Trans id="total"> Total </Trans>
            </div>

            <div>
              <span className="size--upper">
                <CurrencyContext.Consumer>{currency => currency.selectedCurrency.code}</CurrencyContext.Consumer>
              </span>{" "}
              <span className="size--lg">
                {" "}
                {totalPrice && formatCurrencyNumber(parseFloat(totalPrice) + parseFloat(totalPrice * 5) / 100)}{" "}
              </span>
            </div>
          </div>
          <div className="loc-change _text-center">
            <a href="#" className="loc-change__link">
              <svg width="14" height="14">
                <use href="#change"></use>
              </svg>
              <span className="weight--bold size--upper">
                <Trans id="change"> Change </Trans>
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default HotelBookingSummary;
