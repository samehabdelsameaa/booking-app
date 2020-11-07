import React from "react";
import {
  //Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import axios from "axios";

import { PersistGate } from "redux-persist/integration/react";

import setAuthorizationToken from "utils/setAuthorizationToken";
import defaultTheme from "theme/default";
import { store, persistedStore, history } from "store";
import { DEFAULT_CURRENCY } from "store/constants";

import appActions from "store/app/actions";
import authActions from "store/auth/actions";

import Layout from "components/Layout";
import Home from "containers/Home";
import LanguageProvider from "containers/Providers/LanguageProvider";
import DirectionProvider from "containers/Providers/DirectionProvider";
import CurrencyProvider from "containers/Providers/CurrencyProvider";
import ConfirmEmail from "containers/User/ConfirmEmail";
import Profile from "containers/User/Profile";
import CheckYourEmail from "containers/User/CheckYourEmail";
import ResetPasswordByEmail from "containers/User/ResetPasswordByEmail";
import SupportedCurrencies from "store/SupportedCurrencies";
import ScrollToTop from "./ScrollToTop";

import ContactForm from "../Pages/ContactForm";
import AboutUs from "../Pages/AboutUs";
import Faq from "../Pages/Faq";
import Achievements from "../Pages/Achievements";
import ManageBooking from "../Pages/ManageBooking";
import HotelLocation from "../Pages/HotelLocation";
// import NotFound from "../Pages/404";
import TestPage from "../Pages/Test";
import TestMap from "../Pages/Map";
import PassengersInfo from "../Pages/PassengersInfo";
// import PaymentForm from "../PaymentForm";

import { PaymentSuccess, PaymentFailed } from "../Pages/Payment";
import SuccessTest from "../Pages/Test/SuccessTest";

//import MapPage from "components/Map";

import SignIn from "../User/SignIn";
import Signup from "../User/Signup";
import { UserContext } from "../Providers/UserProvider";
import CookieGDPR from "./CookieGDPR";
import MobileMenu from "components/Layout/MobileMenu";
import HotelDetails from "../Pages/Hotel";
import Flight from "../Pages/Flight";

import LoaderTestSample from "../Pages/PreloaderPage/LoaderTestSample";
import Transportation from "../Pages/Transportation";
import GroundServices from "../Pages/GroundServices";
import Review from "../Pages/Review";
import ConfirmationSuccess from "../Pages/Confirmation/ConfirmationSuccess";
import ConfirmationFailure from "../Pages/Confirmation/ConfirmationFailure";
import LoadingScreen from "./Loading";
import RoomSummary from "../Pages/RoomSummary";
import PassengersVisaCheck from "../Pages/Evisa";
import PrintableReview from "../Pages/PrintableReview";
import MyBookings from "../Pages/MyBookings";
import MyBookingsDetails from "../Pages/MyBookings/MyBookingsDetails";
import MyProfile from "../Pages/MyProfile";

history.listen((location, action) => {
  //todo: use this for query string sync
  // console.log("route changed ", location, action);
});

class App extends React.Component {
  componentDidMount() {

  }

  render = () => {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <ThemeProvider theme={defaultTheme}>
            <LanguageProvider>
              <DirectionProvider>
                <CurrencyProvider>
                  {/* <Router history={history}> */}
                  <ConnectedRouter history={history}>
                    <Layout>
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/contactus" component={ContactForm} />
                        <Route path="/aboutus" component={AboutUs} />
                        <Route path="/faq" component={Faq} />
                        <Route path="/achievements" component={Achievements} />
                        <Route path="/account/checkYourEmail" component={CheckYourEmail} />
                        <Route path="/account/profile" component={Profile} />
                        <Route exact path="/account" component={Profile} />
                        <Route path="/account/confirm" component={ConfirmEmail} />
                        <Route path="/account/resetPassword" component={ResetPasswordByEmail} />
                        <Route path="/test" component={TestPage} />
                        <Route path="/map" component={TestMap} />
                        <Route path="/passengers" component={PassengersInfo} />
                        <Route path="/manage-booking" component={ManageBooking} />
                        <Route path="/location" component={HotelLocation} />
                        <Route path="/hotel" component={HotelDetails} />

                        <Route path="/flight" component={Flight} />
                        <Route path="/transportation" component={Transportation} />
                        <Route path="/room-summary" component={RoomSummary} />
                        <Route path="/review" component={Review} />
                        <Route path="/confirmation" component={ConfirmationSuccess} />
                        <Route path="/confirmation2" component={ConfirmationFailure} />
                        <Route path="/ground-services" component={GroundServices} />
                        <Route path="/evisa" component={PassengersVisaCheck} />
                        <Route path="/load" component={LoaderTestSample} />
                        {/* <Route path="/pay" component={PaymentForm} /> */}
                        <Route path="/print" component={PrintableReview} />
                        <Route path="/my-bookings" component={MyBookings} />
                        <Route path="/my-profile" component={MyProfile} />
                        <Route path="/bookings-details" component={MyBookingsDetails} />
                        {/* <Route path="/pay/success" component={PaymentSuccess} /> */}
                        <Route path="/pay/success" component={SuccessTest} />
                        <Route path="/pay/failed" component={PaymentFailed} />
                        <Redirect from="*" to="/" />
                        {/*todo: add extra routes here */}
                      </Switch>
                      <CookieGDPR />
                      <ScrollToTop />
                      <UserContext.Consumer>
                        {({
                          signinModalOpened,
                          closeSigninModal,
                          createAccountModalOpened,
                          closeCreateAccountModal,
                          switchToSignInModal,
                          switchToCreateAccountModal,
                          login,
                          signinFailed,
                          signinErrors,
                          resetSigninErrors,
                          forgotPassword,
                          forgotPasswordErrors,
                          forgotPasswordFailed,
                          resetForgotPasswordErrors
                        }) => (
                            <React.Fragment>
                              <SignIn
                                signinModalOpened={signinModalOpened}
                                closeSigninModal={closeSigninModal}
                                switchToCreateAccountModal={switchToCreateAccountModal}
                                login={login}
                                signinFailed={signinFailed}
                                signinErrors={signinErrors}
                                resetSigninErrors={resetSigninErrors}
                                forgotPassword={forgotPassword}
                                forgotPasswordErrors={forgotPasswordErrors}
                                forgotPasswordFailed={forgotPasswordFailed}
                                resetForgotPasswordErrors={resetForgotPasswordErrors}
                              />
                              <Signup
                                createAccountModalOpened={createAccountModalOpened}
                                closeCreateAccountModal={closeCreateAccountModal}
                                switchToSignInModal={switchToSignInModal}
                              />
                              <LoadingScreen>
                                <div>welcomeeeee</div>
                              </LoadingScreen>
                            </React.Fragment>
                          )}
                      </UserContext.Consumer>
                    </Layout>
                    {/* </Router> */}
                  </ConnectedRouter>
                </CurrencyProvider>
              </DirectionProvider>
            </LanguageProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  };
}

try {
  if (sessionStorage.jwtToken) {
    //set jwt token by default on page refresh
    setAuthorizationToken(sessionStorage.jwtToken);
    store.dispatch(authActions.setAuthToken(sessionStorage.jwtToken));
  }

  //get user ip on every page refresh
  axios
    .get("https://api.ipify.org")
    .then(res => sessionStorage.setItem("userIp", res.data))
    .catch(err => {
      console.log("Failed to resolve IP");
    });

  //get user culture only if it's not exist
  if (!sessionStorage.culture) {
    let culture = window.navigator.language.split("-")[0];
    sessionStorage.setItem("culture", culture);
    store.dispatch(appActions.changeLocale(culture));
  } else {
    store.dispatch(appActions.changeLocale(sessionStorage.culture));
  }

  //get user currency only if it's not exist
  if (!sessionStorage.currency) {
    sessionStorage.setItem("currency", SupportedCurrencies[DEFAULT_CURRENCY].code);
  } else {
    store.dispatch(appActions.changeCurrency(sessionStorage.currency));
  }
} catch (error) {
  console.log("Startup error @App ", error);
}
export default App;
