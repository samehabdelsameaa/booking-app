import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import animateScrollTo from "animated-scroll-to";
import AirportDropdown from "./AirportDropdown";
import CalendarDropdown from "./CalendarDropdown";
import PaxDetails from "./PaxDetails";

import NightsReseidenceDropdown from "./NightsReseidenceDropdown";
import FirstHeadingToCity from "./FirstHeadingToCity";
import homepageActions from "store/home/actions";
import reservationActions from "store/reservation/actions";

const SearchFormSchema = Yup.object().shape({
  airportCode: Yup.string().required(),
  departureDate: Yup.string().required(),
  pax: Yup.array().required(),
  nights: Yup.object().required(),
  startWithCityCode: Yup.string().required()
});

class SearchForm extends React.PureComponent {
  componentDidMount() {
    this.props.fetchAirports();
    this.props.fetchIsoCountries();
    this.props.fetchAmenities();

    // const date = new Date().setDate(new Date().getDate() + 1);
    // this.setState({ departureDate: new Date(date) });
  }

  state = {
    departureDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    pax: [{ adults: 1, children: 0, infants: 0 }],
    nights: { makkah: 1, madina: 0 }
  };

  render() {
    const {
      state: { departureDate, nights, pax },
      props: { airports, searchHotels }
    } = this;
    
    return (
      <Formik
        initialValues={{
          airportCode: "",
          departureDate,
          pax,
          nights,
          startWithCityCode: "makkah"
        }}
        validationSchema={SearchFormSchema}
        onSubmit={async (values, actions) => {
          const airportValid = airports.find(a => a.code == values.airportCode);
          if (!airportValid) {
            actions.setSubmitting(false);
            return;
          }

          let citiesWithNights = values.nights;
          let cities = Object.keys(citiesWithNights);
          let nights = cities.map(e => {
            return {
              cityCode: e,
              nightCount: citiesWithNights[e]
            };
          });
          const { airportCode, departureDate, pax: visitors, ...restValues } = values;
          const filters = { departureDate: +departureDate, pax: visitors, ...restValues };
          let seachValues = { ...filters, nights, airportCode };

          searchHotels(seachValues);

          actions.setSubmitting(false);
        }}
        render={({ isSubmitting, values }) => (
          <Form
            className="form form-search fs"
            onKeyDown={e => {
              if ((e.charCode || e.keyCode) == 13) {
                e.preventDefault();
              }
            }}
          >
            <div
              className="fs-body"
              onClick={() => {
                const el = document.querySelector(".fs-body");
                const { top: elTop } = el.getBoundingClientRect();
                if (elTop > 30) {
                  //if the element is far from the top by 30 pixels
                  //to avoid scrolling when we already scrolled and difference is very small
                  animateScrollTo(el, { speed: 700 });
                }
              }}
            >
              <Field name="airportCode" component={AirportDropdown} airports={airports} />
              <Field name="departureDate" component={CalendarDropdown} />
              <Field name="nights" component={NightsReseidenceDropdown} />
              <Field name="startWithCityCode" component={FirstHeadingToCity} isVisible={values.nights.madina > 0} />
              <Field name="pax" component={PaxDetails} title="visitors" />

              <div className="form-group fs-submit">
                <button className="button fs-submit__btn" type="submit" disabled={isSubmitting}>
                  <span>
                    <Trans id="search"> Search </Trans>
                  </span>
                </button>
              </div>
            </div>
          </Form>
        )}
      />
    );
  }
}

const mapStateToProps = ({ home: { airports, hotels, isoCountries } }) => ({
  airports,
  hotels,
  isoCountries
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...homepageActions, ...reservationActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
