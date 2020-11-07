import React from 'react';

const Register = (props) => {
    return (
        <div class="summary-register">
            <div class="summary__title summary__title--center _mb-ms">
                <div class="summary__title-svg summary__title-svg--sm">
                    <svg width="30" height="30">
                        <use href="#log-in"></use>
                    </svg>
                </div>
                <div>
                    Login to your account
									</div>
            </div>
            <div class="summary-register__body">
                <div class="summary-register__head _text-center">
                    <div class="summary-register__title">Would you like to create a flynas account?</div>
                    <div class="summary-register__text">Doing so means your details will be saved and it will be easier to book next time!</div>
                </div>

                <div class="grid grid--1 grid--md-2 grid--space-xl _md-flex-row-reverse">
                    <div class="gcell _pb-none _md-hide">
                        <div class="popup__title">
                            Sign In with one click
											</div>
                    </div>
                    <div class="gcell _pb-none popup__line">
                        <div class="_md-pr-ms _pt-ms">
                            <form class="form popup__form" method="post">
                                <div class="form-group">
                                    <label class="form-group__label" for="sign-in-mail">
                                        E-mail
															<span class="form-group__required">*</span>
                                    </label>
                                    <div class="form-group__wrap">
                                        <div class="form-group__icon">
                                            <svg width="27" height="26">
                                                <use href="#mail"></use>
                                            </svg>
                                        </div>
                                        <input type="email" class="form-group__input" value="" required placeholder="Your e-mail" name="email" id="sign-in-mail" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-group__label" for="sign-in-pass">
                                        Password
															<span class="form-group__required">*</span>
                                    </label>
                                    <div class="form-group__wrap">
                                        <div class="form-group__icon">
                                            <svg width="27" height="26">
                                                <use href="#icon-lock"></use>
                                            </svg>
                                        </div>
                                        <input type="password" class="form-group__input" value="" required placeholder="Create a password" name="password" id="sign-in-pass" />
                                    </div>
                                </div>
                                <div class="form-group__forgot">
                                    <button class="button button--link">Forgot your password?</button>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="button button--full-width">
                                        <span class="button__text">Sign in</span>
                                    </button>
                                </div>
                                <div class="form__policy">
                                    By signing in, I agree to
														<a href="">Terms of Use</a> and
														<a href="">Pravicy Policy
														</a>.
													</div>
                            </form>
                        </div>
                    </div>
                    <div class="gcell _pb-none">
                        <div class="_md-plr-def">
                            <div class="_md-pr-lg _md-mr-md _md-pt-none">
                                <div class="popup__title _md-show">
                                    Sign In with one click
													</div>
                                <div class="popup__image _md-show">
                                    <img src="./assets/images/popup/sign-in.png" alt="" />
                                </div>
                                <div class="popup__sub-title">
                                    No account yet?
													</div>
                                <button type="button" class="button button--outline button--full-width">
                                    <span class="button__text">Create account</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;