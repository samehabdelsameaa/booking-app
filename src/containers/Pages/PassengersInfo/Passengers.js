import React from "react";
import { Field, Formik, Form } from "formik";
import { Trans } from "@lingui/macro";
import * as Yup from "yup";
import { DropdownList } from "components/Forms";
import CountriesSelect, {
  CitiesSelect,
  getListOfCityInCertainCountry
} from "./CountriesSelect";
import DateSelect from "./DateSelect";
import DialCodes from "./DialCodes";

const PassengerGender = ({
  field: { name, value: selectedValue },
  form: { setFieldValue, setFieldTouched, errors, touched },
  index
}) => {
  let options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ];
  let fieldName = name
    .split(".")
    .slice(-1)
    .pop();
  const styles =
    errors.passengers &&
      errors.passengers[index][fieldName] &&
      touched.passengers &&
      touched.passengers[index] &&
      touched.passengers[index][fieldName]
      ? {
        border: "1px solid #e3050f",
        backgroundColor: "rgba(227, 5, 15, 0.05)"
      }
      : {};

  return (
    <DropdownList
      initialValue={selectedValue}
      render={({ dropdownOpen }, toggleDropdown, setSelected) => (
        <div className="form-group__wrap">
          <div
            className={`select-drop sm-contacts__select ${
              dropdownOpen ? "open" : ""
              }`}
            onClick={toggleDropdown}
            style={styles}
            tabIndex="0"
            onBlur={() => setFieldTouched(name, true)}
          >
            <span className="select-drop__text">
              {selectedValue || "Gender"}
            </span>
            <div className="select-drop__results">
              {options.map(({ label, value }, index) => (
                <span
                  className="select-drop__results-item"
                  value={value}
                  key={index}
                  onClick={e => {
                    setSelected(e);
                    setFieldValue(name, e.target.getAttribute("value"));
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    />
  );
};

const PassengerMainPax = ({
  field: { name, value: selectedValue },
  form: { setFieldValue, handleChange },
  isDisabled = false,
  toggleCheckBox
}) => {
  return (
    <label className="form-check">
      <input
        type="checkbox"
        name={name}
        checked={selectedValue}
        onChange={e => {
          toggleCheckBox(name);
          setFieldValue(name, !selectedValue);
        }}
        disabled={isDisabled}
      />
      <span>
        {" "}
        <Trans id="main_passenger"> Main Passenger </Trans>{" "}
      </span>
    </label>
  );
};

const PassengerTitle = ({
  field: { name, value: selectedValue },
  form: { setFieldValue }
}) => {
  let options = [
    { label: "Mr", value: "Mr" },
    { label: "Ms", value: "Ms" },
    { label: "Mrs", value: "Mrs" }
  ];

  return (
    <DropdownList
      initialValue={selectedValue}
      render={({ dropdownOpen }, toggleDropdown, setSelected) => (
        <div className="form-group__wrap">
          <div
            className={`select-drop sm-contacts__select ${
              dropdownOpen ? "open" : ""
              }`}
            onClick={toggleDropdown}
          >
            <span className="select-drop__text">{selectedValue || "Mr"}</span>
            <div className="select-drop__results">
              {options.map(({ label, value }, index) => (
                <span
                  className="select-drop__results-item"
                  value={value}
                  key={index}
                  onClick={e => {
                    setSelected(e);
                    setFieldValue(name, e.target.getAttribute("value"));
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    />
  );
};

const validationSchema = Yup.object().shape({
  contactInfo: Yup.object().shape({
    email: Yup.string()
      .required()
      .email(),
    lastName: Yup.string().required(),
    phoneNumber: Yup.string().required()
  }),
  passengers: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        firstName: Yup.string().required("Required"),
        middleName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        nationalityCode: Yup.string().required("Required"),
        birthDate: Yup.string().required("Required"),
        gender: Yup.string().required("Required"),

        country: Yup.string().required("Required"),
        countryCode: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        state: Yup.string().required("Required"),
        zipCode: Yup.string().required("Required"),
        district: Yup.string().required("Required"),

        phoneNumber: Yup.string().required("Required"),
        phoneNumberCountryCode: Yup.string().required("Required"),
        homePhoneNumber: Yup.string().required("Required"),
        homePhoneNumberCountryCode: Yup.string().required("Required"),

        passportNo: Yup.string().required("Required"),
        passportIssuingDate: Yup.string().required("Required"),
        passportExpiryDate: Yup.string().required("Required"),
        fax: Yup.string(),
        email: Yup.string()
          .required("Required")
          .email()
      })
    )
    .required("Must have Passengers")
});

class Passengers extends React.Component {
  state = {
    isDropDownEnabled: true,
    selectedCountry: "",
    isCitiesAvailable: true,
    mainPax: ""
  };

  getPaxType = type => {
    const paxTypes = { ADT: "adult", CHD: "child", INF: "infant" };
    return Object.keys(paxTypes).find(
      key => paxTypes[key] === type.toLowerCase()
    );
  };

  enableCitySelect = countryName => {
    let isCitiesAvailable = getListOfCityInCertainCountry(countryName);
    if (
      countryName &&
      countryName !== "" &&
      isCitiesAvailable &&
      isCitiesAvailable.length > 0
    ) {
      this.setState({
        isDropDownDisabled: false,
        selectedCountry: countryName,
        isCitiesAvailable: true
      });
    } else {
      this.setState({
        isCitiesAvailable: false
      });
    }
  };

  handleToggleCheckBox = index => {
    this.setState({
      mainPax: index
    });
  };

  render() {
    const { passengers, contactInfo } = this.props;
    const { onFormChanged, countriesList, submitForm, setFormRef } = this.props;
    const dialCodes = countriesList.filter(x => x.dialCode != null);
    return (
      <Formik
        initialValues={{
          passengers,
          contactInfo
        }}
        ref={r => setFormRef(r)}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log("submit form", values);
          submitForm && submitForm(values);
        }}
        render={({
          values,
          isSubmitting,
          setFieldValue,
          errors,
          isValid,
          touched,
          ...props
        }) => {
          return (
            <Form noValidate>
              {passengers &&
                passengers.map(
                  ({ isLeadGuest, type, roomSequence, ...rest }, index) => (
                    <div
                      className="sm-contacts__group sm-contacts__group--mb"
                      key={index}
                    >
                      <div className="sm-contacts__head">
                        <div className="sm-contacts__title sm-contacts__title--bold sm-contacts__title--rose">
                          <Trans id="person"> Person </Trans> {index + 1} -{" "}
                          <Trans id="room_no"> Room NO.</Trans>{" "}
                          {roomSequence + 1}
                        </div>
                      </div>

                      <div className="sm-contacts__body">
                        <div className="sm-contacts__title sm-contacts__title--sm _mb-lg">
                          {isLeadGuest ? (
                            <Trans id="lead_guest"> Lead Guest </Trans>
                          ) : (
                              <Trans id="guest"> Guest </Trans>
                            )}
                          {/* <Field 
                          index={index}
                          component={PassengerMainPax}
                          name={`passengers[${index}].isMainPax`}
                          value={values.passengers[index].isMainPax}
                          isDisabled={ `passengers[${index}].isMainPax` === this.state.mainPax }
                          toggleCheckBox={ (index) => {
                              this.handleToggleCheckBox(index);
                              setFieldValue(this.state.mainPax, false);
                            }
                          }
                        /> */}
                          , {<Trans id={type}> {type} </Trans>}
                        </div>

                        <div className="grid grid--1 grid--sm-2 grid--md-4 grid--space-def grid--hspace-xl grid--inline">
                          <div className="gcell">
                            <div className="form-group">
                              <label
                                className="form-group__label"
                                htmlFor="sm-cnt-title"
                              >
                                <Trans id="title"> Title </Trans>
                              </label>
                              <Field
                                index={index}
                                component={PassengerTitle}
                                name={`passengers[${index}].title`}
                                value={values.passengers[index].title || "Mr"}
                              />
                            </div>
                          </div>
                          <div className="gcell">
                            <div className="form-group">
                              <label
                                className="form-group__label"
                                htmlFor="sm-cnt-first-name"
                              >
                                <Trans id="first_name"> First Name </Trans>
                              </label>
                              <div>
                                <div className="form-group__wrap">
                                  <Field
                                    className={`form-group__input ${
                                      errors.passengers &&
                                        errors.passengers[index].firstName !==
                                        undefined &&
                                        touched.passengers &&
                                        touched.passengers[index] &&
                                        touched.passengers[index].firstName &&
                                        touched.passengers[index].firstName !==
                                        undefined
                                        ? "has-error"
                                        : ""
                                      }`}
                                    placeholder="Enter first name"
                                    name={`passengers[${index}].firstName`}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="gcell">
                            <div className="form-group">
                              <label
                                className="form-group__label"
                                htmlFor="sm-cnt-middle-name"
                              >
                                <Trans id="middle_name"> Middle Name </Trans>
                              </label>
                              <div>
                                <div className="form-group__wrap">
                                  <Field
                                    className={`form-group__input ${
                                      errors.passengers &&
                                        errors.passengers[index].middleName !==
                                        undefined &&
                                        touched.passengers &&
                                        touched.passengers[index] &&
                                        touched.passengers[index].middleName &&
                                        touched.passengers[index].middleName !==
                                        undefined
                                        ? "has-error"
                                        : ""
                                      }`}
                                    placeholder="Enter Middle name"
                                    name={`passengers[${index}].middleName`}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="gcell">
                            <div className="form-group">
                              <label
                                className="form-group__label"
                                htmlFor="sm-cnt-last-name"
                              >
                                <Trans id="last_name"> Last Name </Trans>
                              </label>
                              <div className="form-group__wrap">
                                <Field
                                  type="text"
                                  className={`form-group__input ${
                                    errors.passengers &&
                                      errors.passengers[index].lastName !==
                                      undefined &&
                                      touched.passengers &&
                                      touched.passengers[index] &&
                                      touched.passengers[index].lastName &&
                                      touched.passengers[index].lastName !==
                                      undefined
                                      ? "has-error"
                                      : ""
                                    }`}
                                  placeholder="Enter Last name"
                                  name={`passengers[${index}].lastName`}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="gcell">
                            <div className="form-group">
                              <label
                                className="form-group__label"
                                htmlFor="sm-cnt-birth"
                              >
                                <Trans id="birth_date"> Birth Date </Trans>
                              </label>
                              <div className="form-group__wrap">
                                <Field
                                  index={index}
                                  component={DateSelect}
                                  name={`passengers[${index}].birthDate`}
                                  value={
                                    values.passengers[index].birthDate || ""
                                  }
                                  allowYears={true}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="gcell">
                            <div className="form-group">
                              <label
                                className="form-group__label"
                                htmlFor="sm-cnt-nationality"
                              >
                                <Trans id="nationality"> Nationality </Trans>
                              </label>
                              <div className="form-group__wrap">
                                <Field
                                  index={index}
                                  placeholder="Select Country"
                                  component={CountriesSelect}
                                  name={`passengers[${index}].nationalityCode`}
                                  value={
                                    values.passengers[index].nationalityCode ||
                                    ""
                                  }
                                  options={countriesList}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="gcell">
                            <div className="form-group">
                              <label
                                className="form-group__label"
                                htmlFor="sm-cnt-gender"
                              >
                                <Trans id="gender"> Gender </Trans>
                              </label>
                              <div className="form-group__wrap">
                                <Field
                                  index={index}
                                  placeholder="Gender"
                                  component={PassengerGender}
                                  name={`passengers[${index}].gender`}
                                  value={values.passengers[index].gender || ""}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <hr style={{ color: "#eee" }} />

                        {/* address  */}

                        <div className="grid grid--1 grid--sm-2 grid--md-2 grid--space-def grid--hspace-xl grid--inline _sm-mt-md">
                          <div className="gcell">
                            <div className="grid grid--1 grid--sm-2 grid--md-2 grid--hspace-xl">
                              <div className="gcell">
                                <div className="form-group">
                                  <label
                                    className="form-group__label"
                                    htmlFor="sm-cnt-country"
                                  >
                                    <Trans id="country"> Country </Trans>
                                  </label>
                                  <div className="form-group__wrap">
                                    <Field
                                      index={index}
                                      placeholder="Country"
                                      component={CountriesSelect}
                                      isCitySelectEnabled={countryName => {
                                        setFieldValue(
                                          "passengers[" + index + "].city",
                                          ""
                                        );
                                        setFieldValue(
                                          "passengers[" + index + "].country",
                                          countryName
                                        );
                                        this.enableCitySelect(countryName);
                                      }}
                                      name={`passengers[${index}].countryCode`}
                                      value={
                                        values.passengers[index].countryCode ||
                                        ""
                                      }
                                      options={countriesList}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="gcell">
                                <div className="form-group">
                                  <label
                                    className="form-group__label"
                                    htmlFor="sm-cnt-city"
                                  >
                                    <Trans id="city"> City </Trans>
                                  </label>
                                  <div className="form-group__wrap">
                                    {this.state.isCitiesAvailable === true ? (
                                      <Field
                                        index={index}
                                        placeholder="City"
                                        component={CitiesSelect}
                                        name={`passengers[${index}].city`}
                                        value={
                                          values.passengers[index].city || ""
                                        }
                                        isDisabled={
                                          this.state.isDropDownDisabled
                                        }
                                        selectedCountry={
                                          this.state.selectedCountry
                                        }
                                      />
                                    ) : (
                                        <Field
                                          type="text"
                                          className={`form-group__input ${
                                            errors.passengers &&
                                              errors.passengers[index].city !==
                                              undefined &&
                                              touched.passengers &&
                                              touched.passengers[index] &&
                                              touched.passengers[index].city &&
                                              touched.passengers[index].city !==
                                              undefined
                                              ? "has-error"
                                              : ""
                                            }`}
                                          placeholder="City"
                                          name={`passengers[${index}].city`}
                                        />
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="gcell">
                            <div className="form-group">
                              <label
                                className="form-group__label"
                                htmlFor="sm-cnt-address"
                              >
                                <Trans id="address"> Address </Trans>
                              </label>
                              <div className="form-group__wrap">
                                <Field
                                  type="text"
                                  className={`form-group__input ${
                                    errors.passengers &&
                                      errors.passengers[index].address !==
                                      undefined &&
                                      touched.passengers &&
                                      touched.passengers[index] &&
                                      touched.passengers[index].address &&
                                      touched.passengers[index].address !==
                                      undefined
                                      ? "has-error"
                                      : ""
                                    }`}
                                  placeholder="Address"
                                  name={`passengers[${index}].address`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid--1 grid--sm-2 grid--md-3 grid--space-def grid--hspace-xl grid--inline _sm-mt-md">
                          <div className="gcell">
                            <div className="form-group">
                              <label
                                className="form-group__label"
                                htmlFor="sm-cnt-state"
                              >
                                <Trans id="state"> State </Trans>
                              </label>
                              <div className="form-group__wrap">
                                <Field
                                  type="text"
                                  className={`form-group__input ${
                                    errors.passengers &&
                                      errors.passengers[index].state !==
                                      undefined &&
                                      touched.passengers &&
                                      touched.passengers[index] &&
                                      touched.passengers[index].state &&
                                      touched.passengers[index].state !==
                                      undefined
                                      ? "has-error"
                                      : ""
                                    }`}
                                  placeholder="State"
                                  name={`passengers[${index}].state`}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="gcell">
                            <div className="form-group">
                              <label
                                className="form-group__label"
                                htmlFor="sm-cnt-zip-code"
                              >
                                <Trans id="zip_code"> Zip Code </Trans>
                              </label>
                              <div className="form-group__wrap">
                                <Field
                                  type="text"
                                  className={`form-group__input ${
                                    errors.passengers &&
                                      errors.passengers[index].zipCode !==
                                      undefined &&
                                      touched.passengers &&
                                      touched.passengers[index] &&
                                      touched.passengers[index].zipCode &&
                                      touched.passengers[index].zipCode !==
                                      undefined
                                      ? "has-error"
                                      : ""
                                    }`}
                                  placeholder="Zip Code"
                                  name={`passengers[${index}].zipCode`}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="gcell">
                            <div className="form-group">
                              <label
                                className="form-group__label"
                                htmlFor="sm-cnt-district"
                              >
                                <Trans id="district"> District </Trans>
                              </label>
                              <div className="form-group__wrap">
                                <Field
                                  type="text"
                                  className={`form-group__input ${
                                    errors.passengers &&
                                      errors.passengers[index].district !==
                                      undefined &&
                                      touched.passengers &&
                                      touched.passengers[index] &&
                                      touched.passengers[index].district &&
                                      touched.passengers[index].district !==
                                      undefined
                                      ? "has-error"
                                      : ""
                                    }`}
                                  placeholder="District"
                                  name={`passengers[${index}].district`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <hr style={{ color: "#eee" }} />

                        <div className="grid grid--1 grid--sm-2 grid--md-2 grid--space-def grid--hspace-xl grid--inline _sm-mt-md">
                          <div className="gcell">
                            <div className="grid grid--1 grid--sm-2 grid--md-2 grid--hspace-xl">
                              <div className="gcell">
                                <div className="form-group">
                                  <label
                                    className="form-group__label"
                                    htmlFor="sm-cnt-dial-code"
                                  >
                                    <Trans id="phone_dial_code">
                                      {" "}
                                      Phone Country Code{" "}
                                    </Trans>
                                  </label>
                                  <div className="form-group__wrap">
                                    <Field
                                      index={index}
                                      placeholder="Dial Code"
                                      component={DialCodes}
                                      options={dialCodes
                                        .map(e => {
                                          return parseInt(e.dialCode);
                                        })
                                        .sort((a, b) => a - b)}
                                      name={`passengers[${index}].phoneNumberCountryCode`}
                                      value={
                                        values.passengers[index]
                                          .phoneNumberCountryCode || ""
                                      }
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="gcell">
                                <div className="form-group">
                                  <label
                                    className="form-group__label"
                                    htmlFor="sm-cnt-phone-number"
                                  >
                                    <Trans id="phone_number">
                                      {" "}
                                      Phone Number{" "}
                                    </Trans>
                                  </label>
                                  <div className="form-group__wrap">
                                    <Field
                                      type="text"
                                      className={`form-group__input ${
                                        errors.passengers &&
                                          errors.passengers[index].phoneNumber !==
                                          undefined &&
                                          touched.passengers &&
                                          touched.passengers[index] &&
                                          touched.passengers[index].phoneNumber &&
                                          touched.passengers[index]
                                            .phoneNumber !== undefined
                                          ? "has-error"
                                          : ""
                                        }`}
                                      placeholder="Phone Number"
                                      name={`passengers[${index}].phoneNumber`}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="gcell">
                            <div className="grid grid--1 grid--sm-2 grid--md-2 grid--hspace-xl">
                              <div className="gcell">
                                <div className="form-group">
                                  <label
                                    className="form-group__label"
                                    htmlFor="sm-cnt-dial-code"
                                  >
                                    <Trans id="home_phone_dial_code">
                                      {" "}
                                      Home Phone Country Code{" "}
                                    </Trans>
                                  </label>
                                  <div className="form-group__wrap">
                                    <Field
                                      index={index}
                                      placeholder="Dial Code"
                                      component={DialCodes}
                                      options={dialCodes
                                        .map(e => {
                                          return parseInt(e.dialCode);
                                        })
                                        .sort((a, b) => a - b)}
                                      name={`passengers[${index}].homePhoneNumberCountryCode`}
                                      value={
                                        values.passengers[index]
                                          .homePhoneNumberCountryCode || ""
                                      }
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="gcell">
                                <div className="form-group">
                                  <label
                                    className="form-group__label"
                                    htmlFor="sm-cnt-home-phone-number"
                                  >
                                    <Trans id="home_phone_number">
                                      {" "}
                                      Home Phone Number{" "}
                                    </Trans>
                                  </label>
                                  <div className="form-group__wrap">
                                    <Field
                                      type="text"
                                      className={`form-group__input ${
                                        errors.passengers &&
                                          errors.passengers[index]
                                            .homePhoneNumber !== undefined &&
                                          touched.passengers &&
                                          touched.passengers[index] &&
                                          touched.passengers[index]
                                            .homePhoneNumber &&
                                          touched.passengers[index]
                                            .homePhoneNumber !== undefined
                                          ? "has-error"
                                          : ""
                                        }`}
                                      placeholder="Home Phone number"
                                      name={`passengers[${index}].homePhoneNumber`}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid--1 grid--sm-2 grid--md-4 grid--space-def grid--hspace-xl grid--inline _sm-mt-md">
                          <div className="gcell">
                            <div className="form-group">
                              <label
                                className="form-group__label"
                                htmlFor="sm-cnt-pass-number"
                              >
                                <Trans id="passport_number">
                                  {" "}
                                  Passport Number{" "}
                                </Trans>
                              </label>
                              <div className="form-group__wrap">
                                <Field
                                  type="text"
                                  className={`form-group__input ${
                                    errors.passengers &&
                                      errors.passengers[index].passportNo !==
                                      undefined &&
                                      touched.passengers &&
                                      touched.passengers[index] &&
                                      touched.passengers[index].passportNo &&
                                      touched.passengers[index].passportNo !==
                                      undefined
                                      ? "has-error"
                                      : ""
                                    }`}
                                  placeholder="Passport number"
                                  name={`passengers[${index}].passportNo`}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="gcell">
                            <div className="form-group">
                              <label
                                className="form-group__label"
                                htmlFor="sm-cnt-pass-issuing"
                              >
                                <Trans id="passport_issuing_date">
                                  {" "}
                                  Passport Issuing Date{" "}
                                </Trans>
                              </label>
                              <div className="form-group__wrap">
                                <Field
                                  index={index}
                                  component={DateSelect}
                                  name={`passengers[${index}].passportIssuingDate`}
                                  value={
                                    values.passengers[index]
                                      .passportIssuingDate || ""
                                  }
                                  allowYears={true}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="gcell">
                            <div className="form-group">
                              <label
                                className="form-group__label"
                                htmlFor="sm-cnt-pass-expiry"
                              >
                                <Trans id="passport_expiry_date">
                                  {" "}
                                  Passport Expiry Date{" "}
                                </Trans>
                              </label>
                              <div className="form-group__wrap">
                                <Field
                                  index={index}
                                  component={DateSelect}
                                  name={`passengers[${index}].passportExpiryDate`}
                                  value={
                                    values.passengers[index]
                                      .passportExpiryDate || ""
                                  }
                                  enableDaysAfterToday={true}
                                  enableDaysBeforeToday={false}
                                  allowYears={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid--1 grid--sm-2 grid--md-3 grid--space-def grid--hspace-xl grid--inline _sm-mt-md">
                          <div className="gcell">
                            <div className="form-group">
                              <label
                                className="form-group__label"
                                htmlFor="sm-cnt-fax"
                              >
                                <Trans id="fax"> Fax </Trans>{" "}
                                (<Trans id="optional"> Optional </Trans>)
                              </label>
                              <div className="form-group__wrap">
                                <Field
                                  type="text"
                                  className={`form-group__input ${
                                    errors.passengers &&
                                      errors.passengers[index].fax !==
                                      undefined &&
                                      touched.passengers &&
                                      touched.passengers[index] &&
                                      touched.passengers[index].fax &&
                                      touched.passengers[index].fax !== undefined
                                      ? "has-error"
                                      : ""
                                    }`}
                                  placeholder="Enter Your Fax"
                                  name={`passengers[${index}].fax`}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="gcell">
                            <div className="form-group">
                              <label
                                className="form-group__label"
                                htmlFor="sm-cnt-email"
                              >
                                <Trans id="e_mail"> E-mail </Trans>
                              </label>
                              <div className="form-group__wrap">
                                <Field
                                  type="text"
                                  className={`form-group__input ${
                                    errors.passengers &&
                                      errors.passengers[index].email !==
                                      undefined &&
                                      touched.passengers &&
                                      touched.passengers[index] &&
                                      touched.passengers[index].email &&
                                      touched.passengers[index].email !==
                                      undefined
                                      ? "has-error"
                                      : ""
                                    }`}
                                  placeholder="Enter your Email"
                                  name={`passengers[${index}].email`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              <div className="sm-contacts__group">
                <div className="sm-contacts__head">
                  <div className="sm-contacts__title sm-contacts__title--bold">
                    <Trans id="how_we_use_your_information">
                      {" "}
                      How we use your information?{" "}
                    </Trans>
                  </div>
                  <div className="sm-contacts__text">
                    <span>
                      <Trans id="all_information_provided_by_the_users">
                        Note: All the information provided by the users is
                        protected by the GDPR and will only be used within the
                        Terms &amp; Conditions and Privacy Statement of Saudia
                        Holidays.
                      </Trans>
                    </span>
                  </div>
                </div>

                <div className="sm-contacts__body">
                  <div className="sm-contacts__title sm-contacts__title--sm _mb-xl">
                    <Trans id="please_provide_contact_details_for_your_itinerary">
                      Please provide contact details for your Itinerary.
                      Confirmation of the booking and all communication will be
                      communicated through the information you provide here.
                    </Trans>
                  </div>
                  <div className="grid grid--1 grid--sm-2 grid--md-3  grid--space-xl">
                    <div className="gcell">
                      <div className="form-group">
                        <label
                          className="form-group__label"
                          htmlFor="sm-cnt-email"
                        >
                          <Trans id="e_mail"> E-mail </Trans>{" "}
                        </label>
                        <div className="form-group__wrap">
                          <div className="form-group__icon">
                            <svg width="23" height="23">
                              <use href="#mail"></use>
                            </svg>
                          </div>
                          <Field
                            type="email"
                            className={`form-group__input ${
                              errors.contactInfo &&
                                errors.contactInfo.email &&
                                touched.contactInfo &&
                                touched.contactInfo.email !== undefined
                                ? "has-error"
                                : ""
                              }`}
                            placeholder="flynas@gmail.com"
                            name="contactInfo.email"
                            id="sm-cnt-email"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="gcell">
                      <div className="form-group">
                        <label
                          className="form-group__label"
                          htmlFor="sm-cnt-phone-2"
                        >
                          <Trans id="last_name"> Last Name </Trans>{" "}
                        </label>
                        <div className="form-group__wrap">
                          <Field
                            type="text"
                            className={`form-group__input ${
                              errors.contactInfo &&
                                errors.contactInfo.lastName &&
                                touched.contactInfo &&
                                touched.contactInfo.lastName !== undefined
                                ? "has-error"
                                : ""
                              }`}
                            placeholder="Nick Name"
                            name="contactInfo.lastName"
                            id="sm-cnt-last-name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="gcell">
                      <div className="form-group">
                        <label
                          className="form-group__label"
                          htmlFor="sm-cnt-phone"
                        >
                          <Trans id="contact_number"> Contact number </Trans>{" "}
                        </label>
                        <div className="form-group__wrap">
                          <div className="form-group__icon">
                            <svg width="23" height="23">
                              <use href="#phone-call"></use>
                            </svg>
                          </div>
                          <Field
                            type="tel"
                            className={`form-group__input ${
                              errors.contactInfo &&
                                errors.contactInfo.phoneNumber &&
                                touched.contactInfo &&
                                touched.contactInfo.phoneNumber !== undefined
                                ? "has-error"
                                : ""
                              }`}
                            placeholder="(996) Saudi Arabian"
                            name="contactInfo.phoneNumber"
                            id="sm-cnt-phone-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

export default Passengers;
