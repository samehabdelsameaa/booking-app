import React, { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import UserProvider from "containers/Providers/UserProvider";
import BurgetMenu from "./BurgerMenu";
import MobileMenu from "./MobileMenu";
import PrintableReview from "../../containers/Pages/PrintableReview";

class Layout extends React.PureComponent {
  state = {
    mobileMenuOpened: false
  };

  toggleMobileMenu = () => this.setState({ mobileMenuOpened: !this.state.mobileMenuOpened });

  render() {
    const {
      state: { mobileMenuOpened },
      props: { hideFooter },
      toggleMobileMenu
    } = this;

    return (
      <UserProvider>
        <React.Fragment>
          <BurgetMenu menuOpened={mobileMenuOpened} toggleMenu={toggleMobileMenu} />
          <div className="wrapper">
            {window.location.pathname == "/print" ? (
              <PrintableReview />
            ) : (
              <>
                {/* <div className="section _flex-grow"> */}
                <Header toggleMobileMenu={toggleMobileMenu} />
                <div className="section _flex-grow main">
                  {this.props.children}
                  {/* </div> */}
                </div>
                <Footer />
              </>
            )}
          </div>
        </React.Fragment>
      </UserProvider>
    );
  }
}

export default Layout;
