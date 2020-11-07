import React from "react";
import { Trans } from '@lingui/macro';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import reservationActions from "store/reservation/actions";

class FlightPromoCodeForm extends React.Component {
  state = {
    promoCode: ""
  };
  applyPromoCode = () => {
    const { getFlightsData } = this.props;
    getFlightsData(this.state.promoCode);
  };
  setPromoCode = e => {
    this.setState({ promoCode: e.target.value });
  };

  render() {
    return (
      <div className="flight-top__right">
        <div className="flight-code">
          <form className="flight-code__form" method="post">
            <input
              type="text"
              className="form-group__input flight-code__input"
              placeholder="Promo code"
              name="flight-promo-code"
              onChange={this.setPromoCode}
            />
            <button
              type="button"
              onClick={this.applyPromoCode}
              className="button flight-code__btn"
            >
              <span className="button__text"><Trans id="apply"> Apply </Trans></span>
            </button>
          </form>
          <div className="flight-code__text">
            {" "}
            *<Trans id="enter_your_promo_code"> Enter your promo code here to available discounts </Trans>{" "}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ reservations: { flight } }) => {
  return { flight };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...reservationActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightPromoCodeForm);
