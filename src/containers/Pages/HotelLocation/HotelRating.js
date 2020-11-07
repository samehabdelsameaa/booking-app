import React from 'react';
import PropTypes from 'prop-types';

const HotelRating = ({rating}) => {
    const ratingStars = [];
    if (rating) {
        for(let i =0; i < rating; i++){
            ratingStars.push(
                <svg width="17" height="17" key={i}>
                    <use href="#star"></use>
                </svg>
            )
        }
    }
    return ratingStars;
}

export default HotelRating;

HotelRating.propTypes = {
    rating: PropTypes.number
}