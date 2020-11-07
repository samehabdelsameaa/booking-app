import React from "react";
import PropTypes from "prop-types";
import { Trans } from "@lingui/macro";
import GroundServicesCompanyItem from "./GroundServicesCompanyItem";

class GroundServicesCompanyList extends React.Component {
  state = { selectedItem: null };

  setSelected = index => {
    const { GroundCompanyList, onSelectedCompany } = this.props;
    this.setState({ selectedItem: index }, () =>
      onSelectedCompany(GroundCompanyList[index])
    );
  };

  render() {
    const { GroundCompanyList } = this.props;
    const { selectedItem } = this.state;
    return (
      <div className="companies">
        <div className="booking-block booking-block--no-sep">
          <div className="booking-block__svg">
            <svg width="30" height="30">
              <use href="#businessman"></use>
            </svg>
          </div>
          <div>
            {" "}
            <Trans id="select_company"> Select company </Trans>{" "}
          </div>
        </div>
        <div className="companies__content">
          {GroundCompanyList &&
            GroundCompanyList.map((service, i) => (
              <GroundServicesCompanyItem
                key={i}
                serviceInfo={service}
                isSelectedCompany={selectedItem === i}
                index={i}
                setSelectedCompany={index => this.setSelected(index)}
              />
            ))}
        </div>
      </div>
    );
  }
}

GroundServicesCompanyList.propTypes = {
  GroundCompanyList: PropTypes.arrayOf(PropTypes.object)
};

export default GroundServicesCompanyList;
