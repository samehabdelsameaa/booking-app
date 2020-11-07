import React from "react";

import LanguageSelect from "./LanguageSelect";
import CurrencySelect from "./CurrencySelect";
import LoginStatus from "./LoginStatus";
import ManageMyBooking from "./ManageMyBooking";

const TopNav = props => (
  <div className="container hd-main">
    <div className="grid hd-main__grid">
      <div className="gcell gcell--12 gcell--md-6">
        <div className="hd-langs-curr">
          <LanguageSelect />
          <CurrencySelect />
        </div>
      </div>
      <div className="gcell gcell--12 gcell--md-6">
        <div className="hd-login">
          {/* <ManageMyBooking /> */}
          <LoginStatus />
        </div>
      </div>
    </div>
  </div>
);

export default TopNav;
