import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Trans } from "@lingui/macro";

import { FormGroup, Field, ErrorMessage, FormGroupWithNoWrap } from "components/Forms";

class ManageBooking extends React.PureComponent {
  render() {
    return (
      <div className="mb">
        <div className="mb-top">
          <div className="mb-top__wrap">
            <div className="container mb-top__container">
              <div className="mb-info">
                <div className="mb-info__title"><Trans id="manage_my_booking">Manage My Booking</Trans></div>
                <div className="mb-info__subtitle"><Trans id="retrieve_your_booking_information"> Retrive your booking information. </Trans></div>
              </div>
              <div className="mb-light" />
            </div>
          </div>
        </div>
        <div className="container mb-main">
          <div className="manage-booking">
            <div className="manage-booking__head"><Trans id="manage_your_booking_online"> Manage your booking online </Trans></div>
            <div className="manage-booking__body">
              <Formik
                initialValues={{ bookingRef: "", lastName: "", email: "" }}
                validationSchema={Yup.object().shape({
                  bookingRef: Yup.string().required("Booking reference is required"),
                  lastName: Yup.string().test(function(lastName) {
                    const { email } = this.parent;
                    if (!email) return lastName != null;
                    return true;
                  })
                })}
                onSubmit={async (values, actins) => {}}
                render={({ values, isSubmitting, setFieldValue, errors }) => {
                  console.log(errors);
                  return (
                    <Form className="form mb-form" noValidate>
                      <FormGroup>
                        <Field
                          type="text"
                          className="form-group__input"
                          placeholder="Booking reference"
                          name="bookingRef"
                          hasError={!!errors["bookingRef"]}
                        />
                        <ErrorMessage name="bookingRef" />
                      </FormGroup>
                      <div className="mb-form__half-group">
                        <FormGroup>
                          <Field
                            type="text"
                            className="form-group__input"
                            placeholder="Enter your last name"
                            name="lastName"
                            hasError={!!errors["lastName"]}
                          />
                          <ErrorMessage name="lastName" />
                        </FormGroup>
                        <span> Or </span>
                        <FormGroup>
                          <Field
                            type="email"
                            className="form-group__input"
                            placeholder="Enter your e-mail"
                            name="email"
                            hasError={!!errors["email"]}
                          />
                          <ErrorMessage name="email" />
                        </FormGroup>
                      </div>

                      <div className="mb-form__foot _text-center">
                        <button type="submit" className="button mb-form__btn">
                          <Trans id="continue"> Continue </Trans>
                        </button>
                      </div>
                    </Form>
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ManageBooking;
