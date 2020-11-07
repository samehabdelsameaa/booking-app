import React, { Component } from "react";
import { Trans } from "@lingui/macro";
import GroundPackageItem from "./GroundPackageItem";

class GroundPackages extends Component {
  state = { selectedItem: 1 };
  // componentDidMount() {
  //   const { groundPackages, onSelectedPackage, selectedPackage } = this.props;
  //   onSelectedPackage(selectedPackage);
  // }
  setSelected = index => {
    const { groundPackages, onSelectedPackage } = this.props;
    this.setState({ selectedItem: index }, () =>
      onSelectedPackage(groundPackages[index])
    );
  };

  render() {
    const { packagesMetadata, groundPackages } = this.props;
    const { selectedItem } = this.state;

    return (
      <div className="package package--ground">
        <div className="booking-block">
          <div className="booking-block__svg">
            <svg width="30" height="30">
              <use href="#click-gesture"></use>
            </svg>
          </div>
          <div className="name">
            <Trans id="select_ground_service_package">
              {" "}
              Select ground service package{" "}
            </Trans>{" "}
          </div>
        </div>

        <div className="package__body">
          <div className="package__left _ms-show">
            <div className="package__name">
              <Trans id="package_type"> Package type </Trans>
            </div>
            <ul className="menu-list package__list menu-list--no-style">
              {packagesMetadata &&
                packagesMetadata.map(({ label, icon, info }, index) => (
                  <li
                    className="menu-list__item package__list-item"
                    key={index}
                  >
                    <svg width="14" height="14" className="package__list-icon">
                      <use href={`#${icon}`}></use>
                    </svg>
                    <span>
                      <span><Trans id={label}> {label} </Trans> </span>
                      <span className="info-tooltip">
                        <svg
                          width="12"
                          height="12"
                          className="info-tooltip__icon"
                        >
                          <use href="#info-ground"></use>
                        </svg>
                        <span className="info-tooltip__content"><Trans id={info}> {info} </Trans>  </span>
                      </span>
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="package__right">
            <div className="package-types">
              {groundPackages &&
                groundPackages.map((servicePackage, index) => (
                  <GroundPackageItem
                    key={index}
                    isSelectedPackage={selectedItem === index}
                    index={index}
                    servicePackageInfo={servicePackage}
                    setSelectedPackage={index => this.setSelected(index)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GroundPackages;
