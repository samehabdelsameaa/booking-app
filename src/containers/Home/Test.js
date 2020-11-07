import React, { Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Trans } from "@lingui/react";
import styled from "styled-components";

import appActions from "store/app/actions";
import authActions from "store/auth/actions";
import accountsAction from "store/accounts/actions";
import FeaturedHotelCard from "components/Hotel/FeaturedHotelCard";
import SignIn from "../User/SignIn";
import Signup from "../User/Signup";
import Map from "components/Map";

const FeaturedHotels = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px dashed blue;
  height: 100px;
  padding: 15px;
`;
const FeaturedHotelWrapper = styled.div`
  margin: 10px;
`;

class Test extends React.PureComponent {
  render() {
    const { featuredHotels, ...props } = this.props;

    return (
      <Fragment>
        <div>
          <button onClick={() => props.changeLocale("en")}>en</button>
          <button onClick={() => props.changeLocale("ar")}>ar</button>
          <button onClick={() => props.changeLocale("fr")}>fr</button>
          <button onClick={() => props.changeLocale("es")}>es</button>
        </div>
        <br />
        <h1>
          <Trans id="welcome_to_umrah_services"> Welcome To Umrah services </Trans> 
        </h1>

        {props.isLoggedIn ? (
          <button onClick={() => props.logout()}><Trans id="logout"> Logout </Trans></button>
        ) : (
          <button onClick={() => props.login("username", "password")}><Trans id="login"> Login </Trans></button>
        )}
        <FeaturedHotels>
          {featuredHotels.map((hotel, index) => (
            <FeaturedHotelWrapper key={index}>
              <FeaturedHotelCard {...hotel} />
            </FeaturedHotelWrapper>
          ))}
        </FeaturedHotels>
        <SignIn />
        <Signup />
        <button onClick={() => this.props.ping()}>Ping: {this.props.pingResult}</button>
        <Map />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth: { isLoggedIn }, hotels: { featuredHotels }, global: { lastPing: pingResult } }) => ({
  isLoggedIn,
  featuredHotels,
  pingResult
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...appActions, ...authActions, ...accountsAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
