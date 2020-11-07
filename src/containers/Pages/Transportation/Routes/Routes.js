import React, { Component } from "react";
import { Trans } from "@lingui/macro";
import PropTypes from "prop-types";
import Route from "./Route";

class Routes extends Component {
  state = { selectedRoute: null };
  componentDidMount() {
    const { selectedRoute, routes, onRouteSelected } = this.props;

    if (selectedRoute && selectedRoute.code)
      this.setState({ selectedRoute: selectedRoute.code });


  }
  toggleSelectedRoute = index => {
    const { routes, onRouteSelected } = this.props;
    this.setState({ selectedRoute: routes[index].code }, () =>
      onRouteSelected(routes[index])
    );
  };

  render() {
    const { routes, selectedRoute } = this.props;
    // const { selectedRoute } = this.state;
    return (
      <div className="route">
        <div className="booking-block">
          <div className="booking-block__svg">
            <svg width="30" height="30">
              <use href="#route"></use>
            </svg>
          </div>
          <div>
            {" "}
            <Trans id="select_route"> Select route </Trans>{" "}
          </div>
        </div>
        <div className="route__body">
          {routes &&
            routes.map(({ id, code, ...route }, index) => (
              <Route
                key={id}
                routes={route}
                index={index}
                isSelectedRoute={selectedRoute && selectedRoute.code === code}
                toggleRoute={index => this.toggleSelectedRoute(index)}
              />
            ))}
        </div>
      </div>
    );
  }
}

Routes.propTypes = {
  Routes: PropTypes.arrayOf(PropTypes.object)
};

export default Routes;
