import React from "react";

import Logo from "./Logo";
import MohLogo from "./PartnerLogo";
import TopNav from "./TopNav";

const Header = ({toggleMobileMenu, ...props}) => {
  return (
    <React.Fragment>
      <div className="header hd _def-hide mobile-hd">
        <div className="container--max">
          <div className="hd-wrap">
            <div className="hd-left">
              <a href="/" className="hd-left__logo">
                <img alt="" src="./assets/images/main/logo.png" />
              </a>
            </div>
            <div className="mobile-hd__content">
              <span className="_text-center">
                <img alt="" src="./assets/images/main/hd-img.png" />
              </span>
            </div>
            <div className="mobile-hd__btn" onClick={toggleMobileMenu}>
              <span className="mobile-hd__icon mobile-hd__icon--open">
                <svg width="24" height="24">
                  <use href="#menu-open" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="header hd _def-show">
        <div className="container--max">
          <div className="hd-wrap">
            <Logo />
            <TopNav />
            <div className="hd-right">
              <MohLogo />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
