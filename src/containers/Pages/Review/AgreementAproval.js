import React, { Component } from "react";
import { Trans } from "@lingui/macro";

class AgreementAproval extends Component {
  state = { isEnabled: false };
  setButtonEnabled = () => this.setState({ isEnabled: !this.state.isEnabled });

  render() {
    // const { completeBooking } = this.props;
    return (
      <div className={`form-group sm-contacts__submit ${this.state.isEnabled ? "agreed" : ""}`}>
        <label className="form-check sm-contacts__checkbox" htmlFor="sm-cnt-agreement">
          <input type="checkbox" name="sm-cnt-agreement" value="1" id="sm-cnt-agreement" onClick={() => this.setButtonEnabled()} />
          <span>
            <Trans id="yes_i_accept_the"> Yes, I accept the </Trans>
            <a href="/" className="sm-contacts__link">
              <Trans id="terms_of_use"> Terms of Use </Trans>
            </a>{" "}
            <Trans id="and_the"> and the </Trans>
            <a href="/" className="sm-contacts__link">
              <Trans id="privacy_policy"> Pravicy Policy </Trans>
            </a>
            .
          </span>
        </label>

        <button
          id="pay-button"
          type="submit"
          form="payment-form"
          className="button sm-contacts__btn"
          disabled=""
          // onClick={() => completeBooking()}
        >
          <Trans id="complete_booking"> Complete booking </Trans>
        </button>
      </div>
    );
  }
}

export default AgreementAproval;
