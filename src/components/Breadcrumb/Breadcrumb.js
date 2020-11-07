import React, { Component } from "react";
import BreadcrumbItem from "./BreadcrumbItem";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import reservationActions from "store/reservation/actions";

class Breadcrumb extends Component {
  componentDidMount() {
    this.setState({ isActive: this.props.activeLink });
  }

  render() {
    const { steps, currentStep, navigateTo, completedSteps } = this.props;
    return (
      <div className="breadcrumbs">
        <div className="container breadcrumbs__container">
          <div className="breadcrumbs__content">
            {steps &&
              steps.map(
                (
                  { name, title, popup, navigatable, status, icon, ...rest },
                  index
                ) => (
                  <BreadcrumbItem
                    item={{ title, popup, navigatable, status, icon }}
                    key={index}
                    index={index}
                    active={currentStep === index}
                    name={name}
                    {...rest}
                    navigateTo={step => {
                      if (
                        (step &&
                          completedSteps.hasOwnProperty(step.index - 1)) ||
                        step.index == 0
                      )
                        navigateTo(step);
                    }}
                  />
                )
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ reservations: { completedSteps } }) => {
  return {
    completedSteps
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...reservationActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);

// export default Breadcrumb;
