import React from "react";
import HotelRating from "containers/Pages/HotelLocation/HotelRating";
import { FieldArray } from "formik";

const RatingCheckList = ({
  field: { id, name, value: selectedValue, onChange, onBlur },
  form: { setFieldValue },
  options,
  title,
  ...radioProps
}) => (
  <div className="lf-group">
    <div className="size--ms weight--bold _mb-def">{title}:</div>
    <div className="lf-checkboxes lf-checkboxes--comfort">
      {options.map(e => (
        <label className="form-check" key={e.value}>
          <input
            type="checkbox"
            name={name}
            id={e.id}
            onChange={onChange}
            value={e.value}
            {...radioProps}
          />
          <span>
            <HotelRating rating={e.value} />
          </span>
        </label>
      ))}
    </div>
  </div>
);
export default RatingCheckList;