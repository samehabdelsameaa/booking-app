import React from 'react';
import { Trans } from '@lingui/macro';

const ReviewGroundServices = ({selectedPackage: { type, description: groundServicesList }, selectedCompany: { companyName, companyLogo }}) => {    
    return (
        <div className="review-ground review-block">
            <div className="review-block__info">
                <div className="review-head">
                    <div className="review-head__left">
                        <svg width="30" height="30">
                            <use href="#ground-service"></use>
                        </svg>
                        <span><Trans id="ground_service"> Ground Service </Trans></span>
                    </div>
                </div>
                <div className="review__top">
                    <div className="review__selected">
                        <div className="review__selected-item">
                            <div className="review__selected-text"> <Trans id="selected_type"> Selected type </Trans>: </div>
                            <div className="review__selected-label">
                                {type}
                            </div>
                        </div>
                    </div>
                    <div className="review__company">
                        <div className="review-ground__view">
                            <div className="review-ground__img">
                                <img src={companyLogo} alt="company-logo" />
                            </div>
                        </div>
                        <div className="review-ground__text">{companyName}</div>
                    </div>
                </div>
                <div className="review-ground__body">
                    <div className="grid grid--1 grid--xs-2 grid--md-3 grid--hspace-md">
                        {
                            groundServicesList && groundServicesList.map( ({item, status}, index) => (
                                (status !== false) && 
                                <div className="gcell" key={index}>
                                    <div className="review-ground__item">
                                        <svg width="14" height="14" className="review-ground__icon">
                                            <use href={`#${item.icon}`}></use>
                                        </svg>
                                        <span>{item.label}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewGroundServices;