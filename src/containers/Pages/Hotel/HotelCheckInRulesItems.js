import React from 'react';
import PropTypes from 'prop-types';

const HotelCheckInRulesItems = ({ checkInRulesItems }) => {
    const checkInRules = checkInRulesItems && checkInRulesItems.map( (item, i) => {
                    return(
                        <li className="hotel-simple__list-item" key={i}>
                            <span>{item.label}</span>
                        </li>
                    )
                })

    return  (
        <ul className="hotel-simple__list hotel-simple__list--column">
            { checkInRules  }
        </ul>
    )
}

HotelCheckInRulesItems.propTypes = {
    checkInRulesItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
        })
    )
}

export default HotelCheckInRulesItems;