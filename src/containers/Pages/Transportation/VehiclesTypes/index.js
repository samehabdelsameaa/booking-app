import React, { Component } from "react";
import VehicleComapnyList from "./VehicleComapnyList";
import { DropdownList } from "components/Forms";
import Tabs, { TabList, Tab, TabPanels, TabPane } from "components/Tabs";
import { Trans, t } from '@lingui/macro';
import { I18n } from "@lingui/react";
import { groupBy } from "utils";
const sortingOptions = [
  { id: 1, label: "Popularity", value: "Popular" },
  { id: 2, label: "Top Reated", value: "TopRate" },
  { id: 3, label: "Price: Low to High", value: "PriceAsc" },
  { id: 4, label: "Price: High to Low", value: "PriceDesc" }
];

/*
    TODO: still working on sorting. 
*/

class VehicleTypes extends Component {
  state = { sortedCompaniesList: [], sortCriteria: "" };

  handleSortCompanies = (list, sortingCriteria) => {
    const sortedList = this.sortCompanies(list, sortingCriteria);
    this.setState({
      sortedCompaniesList: sortedList,
      sortCriteria: sortingCriteria
    });
  };

  sortCompanies = (xs, criteria) => {
    const userRatingValues = {
      1: "normal",
      2: "good",
      3: "very good",
      4: "excellent",
      5: "amazing"
    };
    // item.userRating -> { very good - good - very good - excellent }
    switch (criteria) {
      case "topRated":
        let byTopRate = xs.slice(0);
        return byTopRate.sort((a, b) => b.rating - a.rating);
      case "PriceDesc":
        let byPriceDesc = xs.slice(0);
        return byPriceDesc.sort((a, b) => a.price - b.price);
      case "PriceAsc":
        let byPriceAsc = xs.slice(0);
        return byPriceAsc.sort((a, b) => b.price - a.price);
      case "Popular":
        let List = xs.slice(0);
        const byPopular = [];
        List.map((item, index) => {
          Object.keys(userRatingValues).map(key => {
            if (
              item.userRating &&
              item.userRating.toLowerCase().indexOf(userRatingValues[key]) !==
              -1
            ) {
              byPopular.push({ key: item });
            }
            // console.log('it found', item.userRating.toLowerCase(), userRatingValues[index+1]);

            // byPopular.push(item)
          });
        });
        return byPopular;
      default:
        return xs;
    }
  };

  render() {
    const { onVehicleSelected, onSortCompanies, companiesList } = this.props;
    // console.log("companiesList", companiesList);
    // console.log("sorting... ", this.sortCompanies(companiesList, "Popular"));

    const vehcileTypes = groupBy(companiesList, "vehicleTypeName");
    // console.log("vehcileTypes", vehcileTypes);
    return (
      <div className="car">
        <div className="booking-block booking-block--no-sep">
          <div className="booking-block__svg">
            <svg width="30" height="30">
              <use href="#bus"></use>
            </svg>
          </div>
          <div>
            {" "}
            <Trans id="vehicle_types"> Vehicle Types </Trans>{" "}
          </div>
        </div>

        <Tabs className="car__content">
          <TabList
            name="TabList"
            className="car__tabs"
            activeClassName="active"
          >
            {vehcileTypes &&
              Object.keys(vehcileTypes).map((vehicle, index) => (
                <Tab tabClassName="car__tab" key={index}>
                  <svg width="35" height="35">
                    <use href={`#car-${index + 1}`}></use>
                  </svg>
                  <span style={{ textTransform: "uppercase" }}>{vehicle}</span>
                </Tab>
              ))}
          </TabList>
          <TabPanels name="TabPanels">
            {vehcileTypes &&
              Object.keys(vehcileTypes).map((vehicle, index) => {
                return (
                  <TabPane key={index}>
                    <div className="car__body">
                      <div className="car-info">
                        <div className="car-info__left">
                          <div className="car-info__item">
                            <svg
                              width="18"
                              height="18"
                              className="car-info__svg"
                            >
                              <use href="#car-seat"></use>
                            </svg>
                            <span>
                              {vehcileTypes[vehicle][0].noOfSeats} <Trans id="seats"> Seats </Trans>
                            </span>
                          </div>

                          <div className="car-info__item">
                            <svg
                              width="18"
                              height="18"
                              className="car-info__svg"
                            >
                              <use href="#car-door"></use>
                            </svg>
                            <span>
                              {vehcileTypes[vehicle][0].noOfDoors} <Trans id="doors"> Doors </Trans>
                            </span>
                          </div>

                          <div className="car-info__item">
                            <svg
                              width="18"
                              height="18"
                              className="car-info__svg"
                            >
                              <use href="#briefcase"></use>
                            </svg>
                            <span>
                              {vehcileTypes[vehicle][0].nofOfLargeBags} <Trans id="large_bags"> Large bags </Trans>
                            </span>
                          </div>

                          <div className="car-info__item">
                            <svg
                              width="18"
                              height="18"
                              className="car-info__svg"
                            >
                              <use href="#briefcase-2"></use>
                            </svg>
                            <span>
                              {vehcileTypes[vehicle][0].nofOfSmallBags} <Trans id="small_bags"> Small bag </Trans>

                            </span>
                          </div>
                          {vehcileTypes[vehicle][0].airConditioning && (
                            <div className="car-info__item">
                              <svg
                                width="18"
                                height="18"
                                className="car-info__svg"
                              >
                                <use href="#air-conditioning"></use>
                              </svg>
                              <span> <Trans id="air_conditioning"> Air Conditioning </Trans> </span>
                            </div>
                          )}
                          {vehcileTypes[vehicle][0].automaticGearBox && (
                            <div className="car-info__item">
                              <svg
                                width="18"
                                height="18"
                                className="car-info__svg"
                              >
                                <use href="#gearbox"></use>
                              </svg>
                              <span><Trans id="automatic_gearbox"> Automatic gearbox </Trans></span>
                            </div>
                          )}
                        </div>
                        <div className="car-info__right">
                          <div className="form-group__wrap">
                            <I18n>
                              {({ i18n }) => (
                                <DropdownList
                                  initialValue={i18n._(t`best_match`)}
                                  render={(
                                    { dropdownOpen, selectedOption },
                                    toggleDropdown,
                                    setSelected
                                  ) => (
                                      <div
                                        className={`select-drop select-drop--cars car-info__select ${
                                          dropdownOpen ? "open" : ""
                                          }`}
                                        onClick={toggleDropdown}
                                      >
                                        <span className="select-drop__text">
                                          <Trans id="sort_by"> Sort by </Trans>:{" "}
                                          <span className="select-drop__selected">
                                            {" "}
                                            {selectedOption}{" "}
                                          </span>
                                        </span>
                                        <div className="select-drop__results">
                                          {sortingOptions &&
                                            sortingOptions.map(
                                              ({ id, value, label }) => (
                                                <span
                                                  className="select-drop__results-item"
                                                  key={id}
                                                  value={value}
                                                  onClick={e => {
                                                    setSelected(e);
                                                    onSortCompanies(
                                                      e.target.getAttribute("value")
                                                    );
                                                  }}
                                                >
                                                  {label}
                                                </span>
                                              )
                                            )}
                                        </div>
                                      </div>
                                    )}
                                />
                              )}
                            </I18n>

                          </div>
                        </div>
                      </div>
                      <VehicleComapnyList
                        vehicleList={vehcileTypes[vehicle]}
                        onVehicleSelected={onVehicleSelected}
                      />
                    </div>
                  </TabPane>
                );
              })}
          </TabPanels>
        </Tabs>
      </div>
    );
  }
}

export default VehicleTypes;
