import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Trans } from "@lingui/macro";
import withClickOutside from "react-click-outside";

import { FormGroup, Field, ErrorMessage, FormGroupWithNoWrap } from "components/Forms";
import etcActions from "store/etc/actions";

class OptionsDropdown extends React.PureComponent {
  state = { dropdownOpen: false };
  toggleDropdown = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });
  handleClickOutside = () => this.setState({ dropdownOpen: false });

  render() {
    const { dropdownOpen } = this.state;
    return (
      <div className="contacts-select">
        <div class={`select-drop ${dropdownOpen ? "open" : ""}`} onClick={this.toggleDropdown}>
          <span class="select-drop__text"><Trans id="select_an_option"> Select an option </Trans> </span>
          <div class="select-drop__results">
            <span class="select-drop__results-item">I did not receive a booking confirmation</span>
            <span class="select-drop__results-item">I’d like to cancel my booking</span>
            <span class="select-drop__results-item">I’d like to get more information about the property or destination</span>
            <span class="select-drop__results-item">I’d like to receive or share a copy of my booking confirmation</span>
            <span class="select-drop__results-item">I’d like to receive an e-receipt for my booking</span>
            <span class="select-drop__results-item">I’d like to send a special request to the property</span>
            <span class="select-drop__results-item">I’d like to change check-in or check-out date</span>
            <span class="select-drop__results-item">I'd like to modify the name of the lead guest</span>
            <span class="select-drop__results-item">I’d like to modify another detail of my booking</span>
            <span class="select-drop__results-item">I have a question related to payment</span>
            <span class="select-drop__results-item">I have a question about my booking</span>
            <span class="select-drop__results-item">I'd like to follow up with my refund</span>
            <span class="select-drop__results-item">Other</span>
          </div>
        </div>

        <div className="contacts-select__text">
            <Trans id="for_more_personalized_help"> For more personalized help </Trans>,
          <a href="#" className="contacts__link">
            <Trans id="sign_in"> sign in </Trans> {" "}
          </a>
            <Trans id="_or"> or </Trans> {" "}
          <a href="#" className="contacts__link">
            <Trans id="create_account"> Create account </Trans> 
          </a>
          .
        </div>
      </div>
    );
  }
}

const OptionsDropdownList = withClickOutside(OptionsDropdown);

class ContactForm extends React.PureComponent {
  render() {
    return (
      <div className="contacts">
        <div className="contacts-top">
          <div className="container contacts-top__container">
            <div className="contacts-info">
              <div className="contacts-info__title">
                <Trans id="contact_us">Contact Us</Trans>
              </div>
              <div className="contacts-info__subtitle">
                <Trans id="welcome_to_flynas_what_can_we_do"> Welcome to Flynas! What can we do for you? </Trans>
              </div>
            </div>
            <OptionsDropdownList />
            <div className="contacts-booking">
              <div className="contacts-booking__head">
                <Trans id="manage_your_booking_online"> Manage your booking online </Trans>
              </div>
              <div className="contacts-booking__body">
                <p> 
                  <Trans id="most_bookings_change_requests_can_be_fullfilled"> 
                    Most bookings change requests can be fulfilled online by yourself, using Flynas self-service booking management page.
                  </Trans>
                  </p>
                <button className="button contacts-booking__btn">
                  <Trans id="manage_my_account"> Manage my account </Trans> 
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container contacts-main">
          <div className="contacts-form">
            <div className="contacts-form__head">
              <div className="contacts-form__head-left"> <Trans id="pro_tip"> Pro tip </Trans> </div>
              <div className="contacts-form__head-right">
                <Trans id="our_customer_service"> 
                  Our customer service team is happy to help you at any time. However, for basic booking management, it`s faster and easier to
                  use our
                </Trans>
                <a href="#" className="contacts__link">
                  <Trans id="self_service_tool"> 
                    self-service tool
                  </Trans>
                </a>
                .
              </div>
            </div>
            <Formik
              initialValues={{ firstName: "", lastName: "", email: "", confirmEmail: "", bookingId: "", summerizeText: "", inquery: "" }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string().required(""),
                lastName: Yup.string().required(""),
                email: Yup.string()
                  .email("")
                  .required(""),
                confirmEmail: Yup.string()
                  .email("")
                  .oneOf([Yup.ref("email"), false], ""),
                bookingId: "",
                summerizeText: Yup.string()
                  .required("")
                  .min(5, ""),
                inquery: Yup.string()
                  .required("")
                  .min(5, "")
              })}
              onSubmit={async (values, actins) => {}}
              render={({ values, isSubmitting, setFieldValue, errors }) => (
                <Form className="form cnt-form" noValidate>
                  <div className="cnt-form__half-group">
                    <FormGroup label="First Name" showStar>
                      <Field
                        className="form-group__input"
                        placeholder="Enter your first name"
                        name="firstName"
                        hasError={!!errors["firstName"]}
                      />
                      <ErrorMessage name="firstName" />
                    </FormGroup>
                    <FormGroup label="Last Name" showStar>
                      <Field
                        className="form-group__input"
                        placeholder="Enter your last name"
                        name="lastName"
                        hasError={!!errors["lastName"]}
                      />
                      <ErrorMessage name="lastName" />
                    </FormGroup>
                  </div>
                  <FormGroup label="E-mail" showStar>
                    <Field className="form-group__input" placeholder="Enter your email" name="email" />
                    <ErrorMessage name="email" />
                  </FormGroup>
                  <FormGroup label="Confirm E-mail" showStar>
                    <Field className="form-group__input" placeholder="Repeat your e-mail" name="confirmEmail" />
                    <ErrorMessage name="confirmEmail" />
                  </FormGroup>
                  <FormGroup label="Booking ID">
                    <Field className="form-group__input" placeholder="Your booking ID" name="bookingId" />
                    <ErrorMessage name="bookingId" />
                  </FormGroup>
                  <FormGroup label="Summarize your inquiry" showStar>
                    <Field className="form-group__input" placeholder="I did not receive a booking confirmation" name="summInquery" />
                    <ErrorMessage name="summInquery" />
                  </FormGroup>
                  <FormGroupWithNoWrap label="Summarize your inquiry" showStar>
                    <Field
                      type="textarea"
                      className="form-group__textarea"
                      placeholder="Please type your request here, including any additional information or details."
                      name="details"
                    />
                    <ErrorMessage name="summInquery" />
                  </FormGroupWithNoWrap>
                  <div className="cnt-form__foot _text-center">
                    <div>
                      <Trans id="required-fields_indicated_with"> Required fields indicated with </Trans>
                      <span className="form-group__required">*</span>
                    </div>

                    <button type="submit" className="button cnt-form__btn">
                      <Trans id="send_email"> Send email </Trans>
                    </button>
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * <Formik
        initialValues={{ firstName: "", lastName: "", email: "", confirmEmail: "", bookingId: "", summerizeText: "", inquery: "" }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required(),
          lastName: Yup.string().required(),
          email: Yup.string()
            .email()
            .required(),
          confirmEmail: Yup.string()
            .email()
            .oneOf([Yup.ref("email"), false]),
          bookingId: "",
          summerizeText: Yup.string()
            .required()
            .min(5),
          inquery: ""
        })}
        onSubmit={async (values, actins) => {}}
        render={({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <Field label="firstName" name="firstName" />
            <Field label="lastName" name="lastName" />
            <Field label="email" name="email" />
            <Field label="confirmEmail" name="confirmEmail" />
            <Field label="bookingId" name="bookingId" />
            <Field label="summerizeText" name="summerizeText" />
            <Field label="inquery" name="inquery" type="textarea" />

            <NormalButton>Send Email</NormalButton>
          </Form>
        )}
      />
 * 
 */

const mapStateToProps = ({ etc: {} }) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({ ...etcActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactForm);
