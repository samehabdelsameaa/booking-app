import React, { Component } from "react";
import PropTypes from "prop-types";
import VehicleCompanyItem from "./VehicleCompanyItem";

class VehicleComapnyList extends Component {
  state = { selectedCompanyIndex: null, vehicleCount: 1 };

  toggleSelectedCompany = index => {
    const { vehicleList, onVehicleSelected } = this.props;
    const { vehicleCount } = this.state;
    
    this.setState({ selectedCompanyIndex: index }, () => onVehicleSelected({ ...vehicleList[index], count: vehicleCount }));
  };

  updateVehicleCount = vehicleCount => this.setState({ vehicleCount });

  render() {
    const { vehicleList } = this.props;
    const { selectedCompanyIndex } = this.state;

    return (
      <div className="car__products">
        {vehicleList &&
          vehicleList.map(({ id, ...vehicle }, index) => (
            <VehicleCompanyItem
              key={id}
              index={index}
              vehicleInfo={vehicle}
              isCompanySelected={selectedCompanyIndex === index}
              onUpdateVehicleCount={amount => this.updateVehicleCount(amount)}
              selectVehicleCompany={index => this.toggleSelectedCompany(index)}
            />
          ))}
      </div>
    );
  }
}

VehicleComapnyList.propTypes = {
  vehicleList: PropTypes.arrayOf(PropTypes.object)
};

export default VehicleComapnyList;
