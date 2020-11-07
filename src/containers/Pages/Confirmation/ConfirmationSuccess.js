import React from 'react';
import { connect } from 'react-redux';
import { Trans } from '@lingui/macro';
import 'sass/confirmation-styles.scss';

const ConfirmationSuccess = ({visaLink}) => {
    
    return (
        <div className="section _flex-grow main">
            <div className="confirmation">
                <div className="confirmation__content">
                    <div className="confirmation__container">
                        <div className="confirmation__wrap">
                            <div className="confirmation__title confirmation__title--success">
                                <svg width="40" height="40">
                                    <use href="#checked"></use>
                                </svg>
                                <span> <Trans id="reserve_held_successfully"> Reserve held successfully </Trans> </span>
                            </div>
                            <div className="confirmation__text">
                                <Trans id="your_reservation_has_been_successfully_reserved"> 
                                    Your reservation has been successfully reserved. We wish you the best rest.
                                </Trans>
                            </div>
                            <div className="confirmation__text confirmation__text--md">
                                <Trans id="thank_you_for_choosing_us">Thank you for choosing us. </Trans> 
							</div>
                            <div className="confirmation__bottom">
                                <span className="confirmation__bottom-text"><Trans id="please_click_here_to_complete_your_e_visa"> Please click here to complete your E-Visa process </Trans></span>
                                <a href={visaLink} className="button confirmation__link" style={{textDecoration:'none'}}>
                                    <span ><Trans id="maqam"> Maqam </Trans></span>
                                </a>
                            </div>
                            <img alt="" className="section-img section-img--left" src="./assets/images/confirm/confirm-img.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ reservations: { visaLink } }) => ({
    visaLink,
});

export default connect(
    mapStateToProps
)(ConfirmationSuccess);