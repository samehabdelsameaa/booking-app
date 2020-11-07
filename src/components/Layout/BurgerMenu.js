import React from "react";
import { Trans } from '@lingui/macro';
import LanguageSelect from "./LanguageSelect";
import CurrencySelect from "./CurrencySelect";
import LoginStatus from './LoginStatus';

const BurgerMenu = ({ menuOpened, toggleMenu, ...props }) => (
  <div
    className={`modal-wrap ${menuOpened ? " modal-ready" : ""}`}
    style={{ overflow: "hidden auto" }}
  >
    <div className="modal-container">
      <div className="modal-content">
        <div className="popup popup--full">
          <div className="popup-logo">
            <div className="popup-logo__title"><Trans id="flynas"> Flynas </Trans></div>
          </div>

          <div className="grid grid--1">
            <div className="form-group">
              <div className="form-group__wrap form-group__wrap--shadow">
                <LanguageSelect />
              </div>
            </div>

            <div className="form-group">
              <div className="form-group__wrap form-group__wrap--shadow">
                <CurrencySelect />
              </div>
            </div>
          </div>

          <div className="hd-login">
            <LoginStatus />
          </div>

          <div className="socials">
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

          <div className="mb-copyright">
           <span>&copy;<Trans id="all_rights_reserved"> All rights reserved</Trans></span>
          </div>

          <button
            title="Close (ESC)"
            type="button"
            className="modal-close"
            onClick={toggleMenu}
          >
            <span className="svg">
              <svg width="30" height="30">
                <use href="#cancel" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className="modal-preloader"><Trans id="loading"> Loading.... </Trans></div>
    </div>
  </div>
);

export default BurgerMenu;

class MobileLanguageSelector extends React.PureComponent {
  render() {
    return (
      <div className="hd-langs">
        <span className="hd-langs__icon">
          <img alt="" src="media/assets/images/hd-flags/uk.png" />
        </span>
        <span className="hd-langs__text"><Trans id="language"> Language </Trans></span>
        <div className="hd-dropdown hd-dropdown--langs">
          <div className="langs hd-drop">
            <div className="hd-drop__group">
              <div className="hd-drop__title hd-drop__title--bg">
                <Trans id="suggested_languages"> Suggested languages </Trans>
              </div>
              <ul className="hd-drop__list">
                {/* <!--todo add class selected for current lang--> */}
                <li className="hd-drop__list-item selected">
                  <a href="#" className="hd-drop__list-link">
                    <span className="flag">
                      <img alt="" src="media/assets/images/hd-flags/uk.png" />
                    </span>
                    <span>English</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="hd-drop__group langs-all">
              <div className="hd-drop__title hd-drop__title--bg">
                <Trans id="all_languages"> All languages </Trans>
              </div>
              <ul className="hd-drop__list">
                <li className="hd-drop__list-item">
                  <a href="#" className="hd-drop__list-link">
                    <span className="flag">
                      <img
                        alt=""
                        src="media/assets/images/hd-flags/flag-1.png"
                      />
                    </span>
                    <span>Italiano</span>
                  </a>
                </li>

                <li className="hd-drop__list-item">
                  <a href="#" className="hd-drop__list-link">
                    <span className="flag">
                      <img
                        alt=""
                        src="media/assets/images/hd-flags/flag-2.png"
                      />
                    </span>
                    <span>العربية</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
