import React, { Component } from "react";
import { Trans } from "@lingui/macro";
import TransportationPackageItem from "./TransportationPackageItem";

//test
class TransportationPackageList extends Component {
  state = { selectedPackageIndex: 1 };
  componentDidMount() {
    const { selectedPackage, transportationPackages } = this.props;
    if (selectedPackage && selectedPackage.id)
      this.setState({ selectedPackageIndex: selectedPackage.id });
  }
  toggleSelectedPackage = index => {
    const { transportationPackages, onPackageSelected } = this.props;
    this.setState({ selectedPackageIndex: index }, () =>
      onPackageSelected(transportationPackages[index])
    );
  };

  render() {
    const { transportationPackages, packagesMetadata } = this.props;
    const { selectedPackageIndex } = this.state;
    return (
      <div className="package">
        <div className="booking-block">
          <div className="booking-block__svg">
            <svg width="30" height="30">
              <use href="#click-gesture"></use>
            </svg>
          </div>
          <div>
            {" "}
            <Trans id="select_transportation_package">
              {" "}
              Select transportation package{" "}
            </Trans>{" "}
          </div>
        </div>

        <div className="package__body">
          <div className="package__left">
            <div className="package__name">
              {" "}
              <Trans id="package_type"> Package type </Trans>
            </div>
            <ul className="menu-list package__list">
              {packagesMetadata &&
                packagesMetadata.map(({ label }, index) => (
                  <li
                    className="menu-list__item package__list-item"
                    key={index}
                  >
                    <span> <Trans id={label}> {label} </Trans> </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="package__right">
            <div className="package-types">
              {transportationPackages &&
                transportationPackages.map(({ id, ...packageItem }, index) => (
                  <TransportationPackageItem
                    key={index}
                    index={index}
                    packageInfo={packageItem}
                    isSelectedPackage={selectedPackageIndex === index}
                    toggleSelected={index => this.toggleSelectedPackage(index)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TransportationPackageList;
