import React from "react";
import { FieldArray } from "formik";
import HotelRating from "containers/Pages/HotelLocation/HotelRating";

const CheckBoxesList = ({ values, options, title, name, ...Props }) => {
  return (
    <FieldArray
        name={name}
        {...Props}
        render={arrayHelpers => (
        <React.Fragment>
            {options &&
            options.map(field => (
                <label className="form-check" key={field.id}>
                    <input
                        name={name}
                        type="checkbox"
                        value={field.id}
                        checked={values.includes(field.id)}
                        onChange={e => {
                        if (e.target.checked) arrayHelpers.push(field.id);
                        else {
                            const idx = values.indexOf(field.id);
                            arrayHelpers.remove(idx);
                        }
                        }}
                    />
                    <span>
                        {Props.labelType === "rate" ? <HotelRating rating={field.value} /> : Props.labelType === "text" ? field.label : null}
                    </span>
                </label>
            ))}
        </React.Fragment>
        )}
    />
  );
};

export default CheckBoxesList;
