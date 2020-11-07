import React, { Component } from "react";
import { Formik, Field, Form } from "formik";
import { Trans, t } from '@lingui/macro';
import { I18n } from "@lingui/react";
import RadiobuttonGroup from "../../../components/Forms/RadiobuttonGroup";
import FilterCheckList from "../../../components/Forms/FilterCheckList";
import PriceRangeFilter from "./PriceRangeFilter";
import HotelsSummary from "./HotelsSummary";

const fields = [
  { id: 1, label: "Normal", value: 1 },
  { id: 2, label: "Good", value: 2 },
  { id: 3, label: "very Good", value: 3 },
  { id: 4, label: "excellent", value: 4 },
  { id: 5, label: "luxury", value: 5 }
];

const stayTimes = [
  { id: 1, label: "For nights", value: "For night" },
  { id: 2, label: "For 3 nights", value: "For 3 night" }
];

class HotelFilters extends Component {
  getInitialValue = (filters, key) => {
    return filters[filters.findIndex(a => a.name === key)].values;
  };

  render() {
    const {
      hotelAmenities,
      filters,
      setFormRef,
      minPrice,
      maxPrice,
      amenities
    } = this.props;
    return (
      <div className="loc-filter__left _def-show">
        <div className="loc-filter__title weight--bold color--rose size--md">
          <Trans id="filter_by"> Filtered by </Trans>:
        </div>
        <Formik
          ref={form => setFormRef && setFormRef(form)}
          initialValues={{
            nightsCount: this.getInitialValue(filters, "nightsCount"),
            priceRange: [minPrice, maxPrice], //this.getInitialValue(filters, "priceRange"),
            comfortLevel: this.getInitialValue(filters, "comfortLevel"),
            selectedAmenities: this.getInitialValue(
              filters,
              "selectedAmenities"
            )
          }}
          validate={(values, props) => this.props.onFilterUpdated(values)}
        >
          {({ values, handleSubmit, ...props }) => {
            return (
              <Form>
                <Field
                  name="priceRange"
                  component={PriceRangeFilter}
                  title=""
                  min={minPrice}
                  max={maxPrice}
                  values={[minPrice, maxPrice]}
                />

                <I18n>
                  {({ i18n }) => (
                    <FilterCheckList
                      name="selectedAmenities"
                      title={i18n._(t`comfort_level`)}
                      options={amenities}
                      values={values.selectedAmenities || []}
                      labelType="text"
                    />
                  )}
                </I18n>

                <I18n>
                  {({ i18n }) => (
                    <FilterCheckList
                      name="selectedAmenities"
                      title={i18n._(t`facilities`)}
                      options={amenities}
                      values={values.selectedAmenities || []}
                      labelType="text"
                    />
                  )}
                </I18n>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default HotelFilters;
