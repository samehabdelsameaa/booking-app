import React from "react";
import { Trans } from "@lingui/macro";
import FlightPackages from "./FlightPackages";
import config from "config";
import geoTz from "geo-tz";

// const geoTz = require('geo-tz')


class FlightItem extends React.Component {
  getAirportCityByCode(code) {
    const { airports } = this.props;
    const city = airports.find(a => a.code == code);
    return city;
  }
  render() {
    const {
      flightDetails,
      flightType,
      onSelect,
      selected,
      selectPackage,
      isOpen,
      onToggle
    } = this.props;
    const journyData = flightDetails[0];
    const departureCity = this.getAirportCityByCode(journyData.flightDesignator[0].departure);
    const returnCity = this.getAirportCityByCode(
      journyData.flightDesignator[
        journyData.flightDesignator.length - 1
      ].arrival);

    const departureCityTZ = 0;// departureCity.lat && departureCity.long ? geoTz(parseFloat(departureCity.lat), parseFloat(departureCity.long)) : 0;
    const returnCityTZ = 0; // returnCity.lat && returnCity.long ? geoTz(parseFloat(returnCity.lat), parseFloat(returnCity.long)) : 0;

    return (
      <div className="flight-item">
        <div className={`flight-dropdown ${isOpen === true ? 'open' : ''}`}>
          <div className="flight-dropdown__btn">
            <span className="ft flight-dropdown__name">
              <span className="ft--bold ft--xl">{flightType} ( </span>
              <span className="ft--grey">
                {" "}

                {`${departureCity.city} - ${returnCity.city}  ${new Date(
                  journyData.flightDesignator[0].departureDate
                ).toDateString()}`}{" "}
              </span>
              <span className="ft--bold ft--lg">)</span>
            </span>
            <span className="flight-dropdown__icon" onClick={onToggle}>
              <svg width="8" height="8" className="flight-dropdown__svg">
                <use href="#sort-down"></use>
              </svg>
            </span>
          </div>

          <div className="flight-dropdown__content">
            {flightDetails &&
              flightDetails.map((flight, i) => (
                <React.Fragment key={i}>
                  {(flight.eC_Amount != 0 || flight.bZ_Amount != 0) && (
                    <React.Fragment>
                      <FlightRow
                        departureCityTZ={departureCityTZ}
                        returnCityTZ={returnCityTZ}

                        departureCity={departureCity.city}
                        returnCity={returnCity.city}
                        selected={selected}
                        flightInfo={flight}
                        onSelect={data => {
                          onSelect(data);
                        }}
                      />
                      {flight.journeySellKey === selected.JourneySellKey &&
                        flight.eC_FareSellKey === selected.fareSellKey &&
                        flight.bundles &&
                        flight.bundles.length > 0 && (
                          <FlightPackages
                            flightPrice={flight.eC_Amount}
                            prices={flight.bundles}
                            selected={packageCode => {
                              selectPackage(packageCode);
                            }}
                          />
                        )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default FlightItem;

const FlightRow = ({ flightInfo, onSelect, selected, departureCity, returnCity, departureCityTZ, returnCityTZ }) => {
  const returnDate = new Date().toLocaleString("en-US", { timeZone: returnCityTZ[0] });
  const departureDate = new Date().toLocaleString("en-US", { timeZone: departureCityTZ[0] });
  const offset = new Date(returnDate) - new Date(departureDate);

  var milliseconds = new Date(flightInfo.flightDesignator[
    flightInfo.flightDesignator.length - 1
  ].arrivalDate) - new Date(flightInfo.flightDesignator[0].departureDate);
  milliseconds = milliseconds - offset;
  var hours = Math.floor(milliseconds / 3600000);
  var minutes = Math.floor((milliseconds - hours * 3600000) / 60000);
  let flightNo = flightInfo.flightDesignator.map(
    x => `${x.carrierCode} ${x.flightNumber}`
  );
  const { xrefFlightDesignator } = flightInfo.journey.segments[0];
  return (
    <div className="flight-row">
      <div className="grid grid--2 grid--sm-6 grid--space-none flight-row__table">
        <div className="gcell order-0">
          <div className="flight-row__cell flight-row__cell--title">
            {" "}
            <Trans id="depart"> Depart </Trans>{" "}
          </div>
        </div>

        <div className="gcell">
          <div className="flight-row__cell flight-row__cell--desc">
            <div className="flight-row__name">
              {new Date(
                flightInfo.flightDesignator[0].departureDate
              ).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </div>
            <div className="flight-row__text">
              {departureCity}
            </div>
          </div>
        </div>

        <div className="gcell order-1">
          <div className="flight-row__cell flight-row__cell--title">
            {" "}
            <Trans id="stops"> Stops </Trans>{" "}
          </div>
        </div>

        <div className="gcell">
          <div className="flight-row__cell flight-row__cell--desc">
            <div className="flight-row__name">
              {!flightInfo.stops ? "Non-stop" : `${flightInfo.stops} Stop`}
            </div>
            <div className="flight-row__text flight-row__text--norm">
              {`${hours} hr ${minutes} min`}
            </div>
          </div>
        </div>

        <div className="gcell order-2">
          <div className="flight-row__cell flight-row__cell--title">
            {" "}
            <Trans id="arrives"> Arrives </Trans>{" "}
          </div>
        </div>

        <div className="gcell">
          <div className="flight-row__cell flight-row__cell--desc">
            <div className="flight-row__name">
              {" "}
              {new Date(
                flightInfo.flightDesignator[
                  flightInfo.flightDesignator.length - 1
                ].arrivalDate
              ).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </div>
            <div className="flight-row__text flight-row__text--norm">
              {" "}
              {returnCity}{" "}
            </div>
          </div>
        </div>

        <div className="gcell order-3">
          <div className="flight-row__cell  flight-row__cell--title">
            {" "}
            <Trans id="flight"> Flight </Trans>{" "}
          </div>
        </div>

        <div className="gcell">
          <div className="flight-row__cell flight-row__cell--desc">
            <div className="flight-row__name"> {`${flightNo.join(" / ")}*`} {flightInfo.isCodeShare ? `Operated By ${config.airlines[xrefFlightDesignator.carrierCode]}` : ""} </div>
          </div>
        </div>

        <div className="gcell order-4">
          <div className="flight-row__type flight-row__type--title economy">
            <div className="flight-row__label">
              <Trans id="economy"> Economy </Trans>{" "}
            </div>
          </div>
        </div>

        <div className="gcell order-5">
          <div className="flight-row__type flight-row__type--title business">
            <div className="flight-row__label">
              <Trans id="business"> Business </Trans>{" "}
            </div>
          </div>
        </div>

        <div
          className="gcell"
          onClick={() => {
            onSelect({
              journey: flightInfo.journey,
              JourneySellKey: flightInfo.journeySellKey,
              fareSellKey: flightInfo.eC_FareSellKey,
              departure: flightInfo.flightDesignator[0].departure,
              arrival:
                flightInfo.flightDesignator[
                  flightInfo.flightDesignator.length - 1
                ].arrival,
              noOfStops: !flightInfo.stops
                ? "Non-stop"
                : `${flightInfo.stops} Stop`,
              stops: flightInfo.stops,
              departureHour: new Date(
                flightInfo.flightDesignator[0].departureDate
              ).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit"
              }),
              arrivalHour: new Date(
                flightInfo.flightDesignator[
                  flightInfo.flightDesignator.length - 1
                ].arrivalDate
              ).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit"
              }),
              package: "Economy",
              duration: `${hours} hr ${minutes} min`,
              departureAirportCode: flightInfo.flightDesignator[0].departure,
              returnAirportCode:
                flightInfo.flightDesignator[
                  flightInfo.flightDesignator.length - 1
                ].arrival,
              flightNo: flightNo.join(" / "),
              departureDate: new Date(
                flightInfo.flightDesignator[0].departureDate
              ).toDateString(),
              arrivalDate: new Date(
                flightInfo.flightDesignator[
                  flightInfo.flightDesignator.length - 1
                ].arrivalDate
              ).toDateString()
            });
          }}
        >
          <div
            className={
              flightInfo.eC_Amount
                ? selected &&
                  flightInfo.journeySellKey == selected.JourneySellKey &&
                  selected.fareSellKey == flightInfo.eC_FareSellKey
                  ? "flight-row__type flight-row__type--desc economy active"
                  : "flight-row__type flight-row__type--desc economy"
                : "flight-row__type flight-row__type--desc soldout ft--lg"
            }
          >
            <div className="ft ft--bold">
              <span className="ft--sm">
                {flightInfo.eC_Amount ? "SAR" : "Sold Out"}
              </span>
              <span className="ft--lg">
                {flightInfo.eC_Amount != 0 ? flightInfo.eC_Amount : ""}
              </span>
            </div>
            {flightInfo.eC_AvailabilityCount > 0 &&
              flightInfo.eC_AvailabilityCount <= 5 &&
              !flightInfo.stops && (
                <div className="ft ft--light ft--bold">
                  <span className="ft--xs">
                    {flightInfo.eC_AvailabilityCount || ""} <Trans id="seats_left"> seats left </Trans>
                  </span>
                </div>
              )}
            {/* <div className="flight-row__promo"> Promo </div> */}
          </div>
        </div>

        <div
          className="gcell"
          onClick={() => {
            onSelect({
              journey: flightInfo.journey,
              JourneySellKey: flightInfo.journeySellKey,
              fareSellKey: flightInfo.bZ_FareSellKey,
              departure: flightInfo.flightDesignator[0].departure,
              arrival:
                flightInfo.flightDesignator[
                  flightInfo.flightDesignator.length - 1
                ].arrival,
              noOfStops: !flightInfo.stops
                ? "Non-stop"
                : `${flightInfo.stops} Stop`,
              stops: flightInfo.stops,
              departureHour: new Date(
                flightInfo.flightDesignator[0].departureDate
              ).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit"
              }),
              arrivalHour: new Date(
                flightInfo.flightDesignator[
                  flightInfo.flightDesignator.length - 1
                ].arrivalDate
              ).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit"
              }),
              package: "Business",
              duration: `${hours} hr ${minutes} min`,
              departureAirportCode: flightInfo.flightDesignator[0].departure,
              returnAirportCode:
                flightInfo.flightDesignator[
                  flightInfo.flightDesignator.length - 1
                ].arrival,
              flightNo: flightNo.join(" / "),
              departureDate: new Date(
                flightInfo.flightDesignator[0].departureDate
              ).toDateString(),
              arrivalDate: new Date(
                flightInfo.flightDesignator[
                  flightInfo.flightDesignator.length - 1
                ].arrivalDate
              ).toDateString()
            });
          }}
        >
          <div
            className={
              flightInfo.bZ_Amount
                ? selected &&
                  flightInfo.journeySellKey == selected.JourneySellKey &&
                  selected.fareSellKey == flightInfo.bZ_FareSellKey
                  ? "flight-row__type flight-row__type--desc business active"
                  : "flight-row__type flight-row__type--desc business"
                : "flight-row__type flight-row__type--desc soldout ft--lg"
            }
          >
            <div className="ft ft--bold">
              <span className="ft--sm">
                {" "}
                {flightInfo.bZ_Amount ? "SAR" : "Sold Out"}
              </span>
              <span className="ft--lg">
                {flightInfo.bZ_Amount != 0 ? flightInfo.bZ_Amount : ""}
              </span>
            </div>
            {flightInfo.bZ_AvailabilityCount > 0 &&
              flightInfo.bZ_AvailabilityCount <= 5 &&
              !flightInfo.stops && (
                <div className="ft ft--light ft--bold">
                  <span className="ft--xs">
                    {flightInfo.bZ_AvailabilityCount || ""}{" "}
                    <Trans id="seats_left"> seats left </Trans>
                  </span>
                </div>
              )}
            {/* <div className="flight-row__promo"> Promo </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
