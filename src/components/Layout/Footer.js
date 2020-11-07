import React from "react";
import { Trans } from "@lingui/react";
import { connect } from "react-redux";

class Footer extends React.Component {
  render() {
    const hideFooter = this.props.pathname && this.props.pathname.startsWith("/location");
    return !!hideFooter ? null : (
      <div className="section">
        <div className="footer ft">
          <div className="container ft-container">
            <div className="ft-top">
              <div className="grid">
                <div className="gcell gcell--12 gcell--md-3">
                  <div className="ft-name">
                    <div className="ft-name__title">
                      <Trans id="flynas">Flynas</Trans>
                    </div>
                    {/* <div className="ft-name__subtitle">
                    <Trans id="embrace_umrah">EMBRACE UMRAH</Trans>
                  </div> */}
                  </div>
                </div>
                <div className="gcell gcell--12 gcell--sm-6 gcell--md-4 _sm-show">
                  <div className="ft-menu">
                    <ul className="ft-menu__list">
                      <li className="ft-menu__item">
                        <a href="/aboutus" className="ft-menu__link">
                          <Trans id="about_company">About company</Trans>
                        </a>
                      </li>
                      <li className="ft-menu__item">
                        <a href="/achievements" className="ft-menu__link">
                          <Trans id="our_achievements">Our Achievements</Trans>
                        </a>
                      </li>
                      <li className="ft-menu__item">
                        <a href="/news" className="ft-menu__link">
                          <Trans id="news">News</Trans>
                        </a>
                      </li>
                      <li className="ft-menu__item">
                        <a href="/services" className="ft-menu__link">
                          <Trans id="services">Services</Trans>
                        </a>
                      </li>
                      <li className="ft-menu__item">
                        <a href="/faq" className="ft-menu__link">
                          <Trans id="how_to_book">How to book</Trans>
                        </a>
                      </li>
                      <li className="ft-menu__item">
                        <a href="/contactus" className="ft-menu__link">
                          <Trans id="contacts">Contacts</Trans>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="gcell gcell--12  gcell--sm-2 gcell--md-2 gcell--def-3 gcell--socials">
                  <div className="socials">
                    <div className="mb-copyright _sm-hide">
                      <span>
                      &copy;<Trans id="all_rights_reserved"> All rights reserved</Trans>
                      </span>
                    </div>
                    <div className="socials__links">
                      <a href="#" className="socials__link">
                        <svg width="17" height="17">
                          <use href="#twitter" />
                        </svg>
                      </a>
                      <a href="#" className="socials__link">
                        <svg width="17" height="17">
                          <use href="#facebook" />
                        </svg>
                      </a>
                      <a href="#" className="socials__link">
                        <svg width="17" height="17">
                          <use href="#instagram" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="gcell gcell--12 gcell--sm-4 gcell--md-3 gcell--def-2 _sm-show">
                  <div className="contacts-item">
                    <a href="tel:090899898933" className="contacts-item__link">
                      <svg width="15" height="15">
                        <use href="#phone" />
                      </svg>
                      <span>090 899 89 89 33</span>
                    </a>
                    <a href="#" className="contacts-item__link">
                      <svg width="15" height="15">
                        <use href="#envelope" />
                      </svg>
                      <span>service@flynas.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="ft-bottom _sm-show">
              <span>
                &copy;<Trans id="year_flynas">2019 Flynas</Trans>
              </span>
              <span>
              &copy;<Trans id="all_rights_reserved"> All rights reserved</Trans>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  router: {
    location: { pathname }
  }
}) => ({ pathname });
export default connect(mapStateToProps, null)(Footer);
