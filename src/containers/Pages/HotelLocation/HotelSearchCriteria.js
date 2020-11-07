import React from "react";
import CalenadarDropDownFilter from "./CalenadarDropDownFilter";
import { Formik, Field, Form } from "formik";
import { Trans } from "@lingui/macro";
import PaxDetailsDropdown from "../../Home/SearchForm/PaxDetails";
import config from "config";
import className from "classnames";

const HotelSearchCriteria = ({
  onFilterUpdated,
  initialCheckInDate,
  currentCity,
  checkInDate,
  checkOutDate,
  visitors,
  setSearchCriteriaRef
}) => {  
  return (
    <Formik
      ref={form => setSearchCriteriaRef && setSearchCriteriaRef(form)}
      initialValues={{
        pax: visitors,
        date: { checkInDate: +new Date(checkInDate), checkOutDate: +new Date(checkOutDate) }
      }}
      onSubmit={values => {
        onFilterUpdated(values);
      }}
      render={({ values, ...props }) => {
        const isMakkah = currentCity && currentCity.toLowerCase() == config.makkah;
        return (
          <Form className="form loc-head__form">
            <div className="loc-head__hotel _flex _items-center">
              <div className={className("loc-head__hotel-icon ", { madinah: !isMakkah }, { makkah: isMakkah })}>
                <svg width="40" height="40">
                  {isMakkah ? <use href="#makkah"></use> : <use href="#madina"></use>}
                </svg>
              </div>
              <div className="loc-head__hotel-name">
                {" "}
                 <Trans id="select"> Select </Trans> <Trans id={currentCity}> {currentCity} </Trans> <Trans id="hotel"> Hotel </Trans> {" "}
              </div>
            </div>

            <Field name="date" component={CalenadarDropDownFilter} initialCheckInDate={initialCheckInDate} />
            <Field name="pax" component={PaxDetailsDropdown} />

            <div className="form-group fs-submit">
              <button className="button" type="submit">
                <span>
                  <Trans id="update"> Update </Trans>
                </span>
              </button>
            </div>
          </Form>
        );
      }}
    />
  );
};

export default HotelSearchCriteria;
