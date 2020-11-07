import React, { Component } from "react";
import { Trans } from "@lingui/macro";
import PackageTypes from "./PackageTypeItem";

const flightPackages = [
  {
    type: "Light",
    price: "",
    code: "LIGH",
    description: [
      {
        item: {
          label: "Cabin baggage",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: true,
        amount: "7 Kg"
      },
      {
        item: {
          label: "Checked baggage",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: "fundable",
        fundAmount: "for Free"
      },
      {
        item: {
          label: "Seat selection",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: "fundable",
        fundAmount: "for Free"
      },
      {
        item: {
          label: "Meal",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: "fundable",
        fundAmount: "for Free"
      },
      {
        item: {
          label: "Change booking",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: "fundable",
        fundAmount: "125 SAR"
      },
      {
        item: {
          label: "Cancel booking",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: false
      },
      {
        item: {
          label: "SMILE Points",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: "rated",
        amount: 73
      }
    ]
  },
  {
    type: "Plus",
    price: "",
    code: "PLUS",

    isRecommended: true,
    description: [
      {
        item: {
          label: "Cabin baggage",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: true,
        amount: "7 Kg"
      },
      {
        item: {
          label: "Checked baggage",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: true,
        fundAmount: "20 Kg"
      },
      {
        item: {
          label: "Seat selection",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: true,
        fundAmount: "standard"
      },
      {
        item: {
          label: "Meal",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: "fundable",
        fundAmount: "for Free"
      },
      {
        item: {
          label: "Change booking",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: "fundable",
        fundAmount: "75 SAR"
      },
      {
        item: {
          label: "Cancel booking",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: false
      },
      {
        item: {
          label: "SMILE Points",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: "rated",
        amount: 112
      }
    ]
  },
  {
    type: "Premium",
    price: "",
    code: "PRUM",
    description: [
      {
        item: {
          label: "Cabin baggage",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: true,
        amount: "7 Kg"
      },
      {
        item: {
          label: "Checked baggage",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: true,
        amount: "30 Kg"
      },
      {
        item: {
          label: "Seat selection",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: true,
        amount: "All available"
      },
      {
        item: {
          label: "Meal",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: true,
        amount: "snack"
      },
      {
        item: {
          label: "Change booking",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: true,
        amount: "Free of charge"
      },
      {
        item: {
          label: "Cancel booking",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: "fundable",
        amount: "100 SAR"
      },
      {
        item: {
          label: "SMILE Points",
          info: "Here is your tooltip! Reception and welcome in hotel..."
        },
        status: "rated",
        amount: 172
      }
    ]
  }
];

class FlightPackages extends Component {
  state = { selectedItem: 1 };
  setSelectedItem = (index, packageCode) => {
    this.setState({ selectedItem: index });
    const { selected } = this.props;
    selected(packageCode);
  };

  render() {
    const { prices, flightPrice } = this.props;
    flightPackages.forEach((e, index) => {
      e.price = parseFloat(flightPrice) + parseFloat(prices[index]["price"]);
    });
    return (
      <div className="flight-pack package package--flight">
        <div className="package__body">
          <div className="package__left">
            <div className="package__name">
              <svg width="30" height="30">
                <use href="#click-gesture"></use>
              </svg>
              <span>
                <Trans id="choose_your_fare"> Choose your fare </Trans>
              </span>
            </div>
            <ul className="menu-list package__list menu-list--no-style  _ms-show">
              <li className="menu-list__item package__list-item">
                <span>
                  <Trans id="cabin_baggage"> Cabin baggage </Trans>{" "}
                </span>
              </li>

              <li className="menu-list__item package__list-item">
                <span>
                  <Trans id="checked_baggage"> Checked baggage </Trans>{" "}
                </span>
              </li>

              <li className="menu-list__item package__list-item">
                <span>
                  <Trans id="seat_selection"> Seat selection </Trans>{" "}
                </span>
              </li>

              <li className="menu-list__item package__list-item">
                <span>
                  <Trans id="meal"> Meal </Trans>
                </span>

                <span className="info-tooltip">
                  <svg width="12" height="12" className="info-tooltip__icon">
                    <use href="#info-ground"></use>
                  </svg>
                  <span className="info-tooltip__content">
                    <Trans id="here_is_your_tooltip!">
                      {" "}
                      Here is your tooltip! Reception and welcome in hotel{" "}
                    </Trans>
                    ...
                  </span>
                </span>
              </li>

              <li className="menu-list__item package__list-item">
                <Trans id="cancel_booking"> Cancel booking </Trans>

                <span className="info-tooltip">
                  <svg width="12" height="12" className="info-tooltip__icon">
                    <use href="#info-ground"></use>
                  </svg>
                  <span className="info-tooltip__content">
                    <Trans id="here_is_your_tooltip!">
                      {" "}
                      Here is your tooltip! Reception and welcome in hotel{" "}
                    </Trans>
                    ...
                  </span>
                </span>
              </li>

              <li className="menu-list__item package__list-item">
                <span>
                  <Trans id="cancel_booking"> Cancel booking </Trans>{" "}
                </span>

                <span className="info-tooltip">
                  <svg width="12" height="12" className="info-tooltip__icon">
                    <use href="#info-ground"></use>
                  </svg>
                  <span className="info-tooltip__content">
                    <Trans id="here_is_your_tooltip!">
                      {" "}
                      Here is your tooltip! Reception and welcome in hotel{" "}
                    </Trans>
                    ...
                  </span>
                </span>
              </li>

              <li className="menu-list__item package__list-item">
                <span>
                  <Trans id="smile_points"> SMILE Points </Trans>
                </span>
              </li>
            </ul>
          </div>
          <div className="package__right">
            <div className="package-types">
              {flightPackages &&
                flightPackages.map((flightPackage, i) => (
                  <PackageTypes
                    key={i}
                    index={i}
                    flightPackage={flightPackage}
                    isSelected={this.state.selectedItem === i}
                    setSelected={ele =>
                      this.setSelectedItem(ele, flightPackage.code)
                    }
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FlightPackages;
