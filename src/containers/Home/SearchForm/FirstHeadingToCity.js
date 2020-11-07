import React from "react";
import { Trans } from "@lingui/macro";

const options = [{ id: 1, label: "MECCA", value: "makkah" }, { id: 2, label: "MADINAH", value: "madina" }];

const FirstHeadingToCity = ({ field: { name, value: selectedValue, onChange, onBlur }, form, title, isVisible, ...radioProps }) => (
  <div className="fs-goal" style={{visibility: isVisible === true ? 'visible' : 'hidden'}} >
    <span className="form-group__label fs-goal__label">
      {title}
      <Trans id="first_heading_to"> First Heading to </Trans>: 
      <span className="info-tooltip" style={{display:'inline-block'}} >
        <svg width="12" height="12" className="info-tooltip__icon">
          <use href="#info-ground"></use>
        </svg>
        <span className="info-tooltip__content">
          <Trans id="travelling_starting_point_tooltip_info_text"> Choose your journey's start city </Trans>
        </span>
      </span>
    </span>
    
    {options.map(e => (
      <label className="fs-goal__item" key={e.value}>
        <input
          type="radio"
          name={name}
          className="fs-goal__input"
          id={e.value}
          value={e.value}
          checked={e.value === selectedValue}
          onChange={onChange}
          onBlur={onBlur}
          {...radioProps}
        />
        <span>{e.label}</span>
      </label>
    ))}
  </div>
);

export default FirstHeadingToCity;
