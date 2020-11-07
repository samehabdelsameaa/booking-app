import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Trans } from '@lingui/macro';

const BreadcrumbItem = ({ item: { title, popup, navigatable, status, icon }, name, navigateTo, index, active, classname, ...rest }) => {
  return (
    <span
      className={classNames('breadcrumbs__item', { 'active': active })}
      style={{ cursor: 'pointer' }}
      name={name}
      title={popup}
      onClick={() => navigateTo({ index, name, ...rest })}

    >
      <span className={classNames('breadcrumbs__icon', { 'disabled': status }, classname)}>
        <svg width="27" height="27">
          <use href={`#${icon}`}></use>
        </svg>
      </span>
      <div> <Trans id={name}> { title } </Trans> </div>
    </span>
  );
};

BreadcrumbItem.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  popup: PropTypes.string,
  navigatable: PropTypes.bool,
  active: PropTypes.bool,
  status: PropTypes.bool,
  icon: PropTypes.string,
  onclick: PropTypes.func
}

export default BreadcrumbItem;

