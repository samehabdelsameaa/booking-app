import React, { Component } from "react";
import { Trans } from "@lingui/macro";
import { Formik, Form, Field } from "formik";
import CheckBoxesList from "./CheckBoxesList";
import { DropdownList } from "components/Forms";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import roomSummaryActions from "store/reservation/actions";

const roomPreferences = [
  { id: 1, label: "Early Check-in", value: "55" },
  { id: 2, label: "Late Check-out", value: "25" },
  { id: 3, label: "Honeymoon", value: "24" },
  { id: 4, label: "Adjoining/connecting rooms", value: "45" },
  { id: 5, label: "High Floor", value: "05" }
];

const beddingPrefernces = [
  { id: 1, label: "King Bed", value: "1" },
  { id: 2, label: "King Bed 2", value: "2" },
  { id: 3, label: "King Bed 3", value: "3" },
  { id: 4, label: "King Double Bed", value: "4" }
];

const beddingPreferencesDropDown = ({
  field: { name, value: selectedValue },
  form: { setFieldValue }
}) => (
  <DropdownList
    initialValue={selectedValue && selectedValue[0]}
    render={({ dropdownOpen }, toggleDropdown, setSelected) => (
      <div
        className={`select-drop  prf-form__select ${
          dropdownOpen ? "open" : ""
        }`}
        onClick={toggleDropdown}
      >
        <span className="select-drop__text">{selectedValue}</span>
        <div className="select-drop__results">
          {beddingPrefernces &&
            beddingPrefernces.map((item, index) => (
              <span
                className="select-drop__results-item"
                key={index}
                value={item.label}
                onClick={e => {
                  setSelected(e);
                  setFieldValue(name, [e.target.getAttribute("value")]);
                }}
              >
                {item.label}
              </span>
            ))}
        </div>
      </div>
    )}
  />
);

class RoomPreferencesForm extends Component {
  render() {
    const {
      setPreferencesRef,
      onSelectedPreferences,
      selectedHotel
    } = this.props;
    const options = selectedHotel.optionalAmenities;
    return (
      <Formik
        ref={el => setPreferencesRef && setPreferencesRef(el)}
        initialValues={{
          roomPreferences: [],
          additionalRequests: ""
        }}
        onSubmit={values => {
          onSelectedPreferences(values);
        }}
      >
        {({ values, handleSubmit, ...props }) => {
          return (
            <Form className="prf-form">
              <div className="form-group prf-form__checkboxes">
                <CheckBoxesList
                  name="roomPreferences"
                  options={
                    options
                      ? options.map(e => {
                          return {
                            id: e.code,
                            value: e.code,
                            label: e.name
                          };
                        })
                      : []
                  }
                  values={values.roomPreferences || []}
                  labelType="text"
                />
              </div>

              {/* <div className="prf-form__subtitle">
                <Trans id="bedding_preference"> Bedding Preference </Trans>
              </div> */}
              {/* <Field name="bedPreferences" component={beddingPreferencesDropDown} value={values.bedPreferences || []} /> */}

              <div className="prf-form__subtitle">
                {" "}
                <Trans id="if_you_have_additional_requests">
                  {" "}
                  If you have additional requests, please type below{" "}
                </Trans>{" "}
              </div>
              <Field
                name="additionalRequests"
                component="textarea"
                placeholder=""
                className="form-group__textarea prf-form__textarea"
              />

              <div>
                <Trans id="we_pass_on_all_special_requests_to_the_property">
                  We pass on all special requests to the property, but cannot
                  guarantee they can be accommodated. Some requests are subject
                  to availability at check-in, and may incur additional charges.
                </Trans>
              </div>

              <div className="form-group prf-form__submit">
                <button
                  type="button"
                  className="button button--outline prf-form__btn"
                >
                  {" "}
                  <Trans id="cancel"> Cancel </Trans>{" "}
                </button>
                <button type="submit" className="button prf-form__btn">
                  {" "}
                  <Trans id="save_changes"> Save Changes </Trans>{" "}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  }
}
const mapStateToProps = ({ reservations: { cities, cityIndex } }) => {
  const { selectedHotel } = cities[cityIndex];
  return {
    selectedHotel
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...roomSummaryActions }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomPreferencesForm);
