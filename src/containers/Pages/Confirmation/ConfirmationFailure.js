import React from 'react';
import { Trans } from '@lingui/macro';

const ConfirmationFailure = (props) => {
    return (
        <div className="section _flex-grow main">
            <div className="confirmation confirmation--error">
                <div className="confirmation__content">
                    <div className="confirmation__container">
                        <div className="confirmation__wrap">
                            <div className="confirmation__title confirmation__title--error">
                                <svg width="40" height="40">
                                    <use href="#confirm-error"></use>
                                </svg>
                                <span>
                                    <Trans id="an_error_occured"> An error occurred, Your Booking failed! </Trans> 
                                </span>
                            </div>
                            <div className="confirmation__text">
                                <Trans id="you_have_problem_filling_out">
                                    For More Information, please Conatct Our Support: 
                                </Trans>
                                {" "}
                                <a href="mailto:support@flynas.com" style={{color:'#01bab4'}}>support@flynas.com</a>
							</div>
                            <img alt="" className="section-img section-img--left" src="./assets/images/confirm/confirm-img.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationFailure;