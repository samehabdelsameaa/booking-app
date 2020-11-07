import React from "react";
import PriceRangeSlider from "../../../components/RangeSlider/PriceRangeSlider";
import { CurrencyContext } from "containers/Providers/CurrencyProvider";

const PriceRangeFilter = props => {
  const {
    field: { name, value: selectedValue },
    form: { setFieldValue },
    min,
    max
  } = props;

  return max >= min ? (
    <div className="lf-price">
      <div className="lf-price__title">
        <CurrencyContext.Consumer>
          {currency =>
            `${currency.selectedCurrency.code} ${selectedValue[0] || min} - ${currency.selectedCurrency.code} ${selectedValue[1] || max} +`
          }
        </CurrencyContext.Consumer>
      </div>
      <PriceRangeSlider
        minOffset={min}
        maxOffset={max}
        getPriceRange={value => {
          setFieldValue(name, [value.min, value.max]);
        }}
      />
    </div>
  ) : null;
};

export default PriceRangeFilter;
