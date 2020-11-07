import React from "react";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import { CurrencyContext } from "containers/Providers/CurrencyProvider";
import TransportationBooking from "./TransportationBooking";
import GroundServicesBooking from "./GroundServicesBooking";
import EVisaStatus from "./EVisaStatus";
import FlightBooking from "./FlightBooking";
import HotelsBooking from "./HotelsBooking";

export const formatCurrencyNumber = num => num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

const isVisaStatusProcessInitialized = paxs => {
  return paxs && paxs.some(pax => pax && pax.status !== "checking");
};

class BookingSummary extends React.Component {
  getPassengersEvisaTotalPrice = passengers => {
    let totalPrice = 0;
    passengers.map(pax => pax && (totalPrice += pax.visaFees));
    return totalPrice;
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
      Object.keys(selectedFlights).map((selectedFlight, i) => {
        if (selectedFlights[selectedFlight].price !== undefined) {
          totalPrice += selectedFlights[selectedFlight].price;
        }
      });

    return totalPrice;
  };

  render() {
    const {
      selectedTransportationPackage, selectedTransportationCompany, selectedGroundServicesCompany,
      selectedTransportationCompany: { vehicleTypeName, price: transportationPrice = 0, count },
      selectedRoute: { routePoints },
      selectedGroundServicesPackage,
      selectedGroundServicesCompany: { totalAmount: GroundServicePrice = 0 },
      selectedJourneys,
      passengers,
      cities: selectedHotels,
      selectedRooms,
      departurePrice, returnPrice
    } = this.props;
    let visaPrices = this.getPassengersEvisaTotalPrice(passengers);
    let hotelsPrices = this.getHotelsTotalPrice(selectedRooms);
    let flightsPrices = departurePrice && returnPrice ? departurePrice + returnPrice : 0; //this.getFlightsTotalPrice({ departurePrice, returnPrice });
    let totalPrice = transportationPrice + flightsPrices + GroundServicePrice + visaPrices + hotelsPrices;

    return (
      <div className="aside">
        <div className="aside__title">
          <Trans id="booking_summary"> Booking Summary </Trans>
        </div>
        <div className="aside__main">
          <span className="aside__line"></span>

          {selectedHotels && selectedHotels.length > 0 && <HotelsBooking selectedHotels={selectedHotels} />}

          {selectedTransportationPackage &&
            Object.keys(selectedTransportationPackage).length > 0 &&
            selectedTransportationPackage.constructor === Object && (
              <TransportationBooking
                routePoints={routePoints}
                selectedPackageClass={selectedTransportationPackage.packageClass}
                vehcileType={vehicleTypeName}
                price={transportationPrice}
                count={count}
              />
            )}

          {selectedJourneys && Object.keys(selectedJourneys).length > 0 && selectedJourneys.constructor === Object && (
            <FlightBooking selectedFlights={selectedJourneys} passengers={passengers} price={flightsPrices} />
          )}

          {selectedGroundServicesPackage &&
            Object.keys(selectedGroundServicesPackage).length > 0 &&
            selectedGroundServicesPackage.constructor === Object && (
              <GroundServicesBooking type={selectedGroundServicesPackage.type} servicePrice={GroundServicePrice} />
            )}

          {passengers && passengers.length > 0 && isVisaStatusProcessInitialized(passengers) === true && (
            <EVisaStatus passengers={passengers} />
          )}

          <span className="aside__line"></span>
          <div className="aside-total">
            <div className="aside__text aside-total__info">
              <svg width="21" height="21">
                <use href="#info"></use>
              </svg>
              <span>
                <Trans id="you_will_be_charged_in"> You Will Be Charged In</Trans>{" "}
                <CurrencyContext.Consumer>{currency => currency.selectedCurrency.code}</CurrencyContext.Consumer> <br />
                <CurrencyContext.Consumer>
                  {currency => <> {`(${currency.selectedCurrency.code} ${totalPrice && formatCurrencyNumber(totalPrice)})`} </>}
                </CurrencyContext.Consumer>{" "}
                <br />
              </span>
            </div>

            <div className="aside__text _text-center">
              <Trans id="the_price_quoted_includes_5%_vat"> The price quoted includes 5% VAT. </Trans>
            </div>
            <div className="aside-total__price">
              <div className="aside-total__price-item">
                <Trans id="grand_total"> Grand Total </Trans>:
              </div>
              <div className="aside-total__price-item">
                <span className="aside-total__currency">
                  <CurrencyContext.Consumer>{currency => currency.selectedCurrency.code}</CurrencyContext.Consumer>
                </span>
                <span className="aside-total__value">
                  {totalPrice && formatCurrencyNumber(parseFloat(totalPrice) + parseFloat(totalPrice * 5) / 100)}
                </span>
              </div>
            </div>
          </div>
          {
            selectedTransportationCompany &&
            Object.keys(selectedTransportationCompany).length > 0 && selectedGroundServicesCompany &&
            Object.keys(selectedGroundServicesCompany).length > 0 && selectedRooms && selectedRooms.length > 0 && selectedJourneys && passengers.length > 0 && <div className="aside-confirm">
              <button className="button button--full-width">
                <Trans id="confirm_payment"> Checkout </Trans>
              </button>
            </div>
          }

        </div>
      </div >
    );
  }
}

const mapStateToProps = ({
  reservations: {
    cities,
    transportation: { selectedPackage: selectedTransportationPackage, selectedRoute, selectedCompany: selectedTransportationCompany },
    groundServices: { selectedPackage: selectedGroundServicesPackage, selectedCompany: selectedGroundServicesCompany },
    flight: { selectedJourneys, departurePrice, returnPrice },
    passengers
  }
}) => {
  const selectedRooms = cities.map(a => a.selectedRooms);

  return {
    cities,
    selectedTransportationPackage,
    selectedTransportationCompany,
    selectedRoute,
    selectedJourneys,
    selectedGroundServicesCompany,
    selectedGroundServicesPackage,
    passengers,
    selectedRooms,
    departurePrice, returnPrice
  };
};

export default connect(mapStateToProps, null)(BookingSummary);
