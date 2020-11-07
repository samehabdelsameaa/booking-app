import React from "react";
import { Trans } from '@lingui/macro';
import { withRouter } from "react-router";

class Faq extends React.PureComponent {
  navigateToContactus = () => {
    const { history } = this.props;
    history.push("/contactus");
  };

  render() {
    const { navigateToContactus } = this;
    return (
      <div className="faq">
        <div className="faq-top">
          <div className="faq-top__wrap">
            <div className="container faq-top__container">
              <div className="faq-info">
                <div className="faq-info__title"><Trans id="faq"> FAQ </Trans></div>
                <div className="faq-info__subtitle"><Trans id="got_a_question"> Got a question? We've got answers. </Trans></div>
                <div className="faq-info__text _sm-show">
                  <Trans id="to_save_you_time"> 
                    To save you time, we've put answers to the most common inquiries here. Just click on the category and look for your
                    question.
                  </Trans>
                </div>
              </div>
              <div className="faq-light" />
            </div>
          </div>
        </div>
        <div className="container faq-main">
          <div className="acc">
            {/* <!--todo add class "active" for "acc-item" to open accordion --> */}
            <div className="acc-item">
              <div className="acc-head">
                <div className="acc-head__icon">
                  <svg width="26" height="26" className="acc__icon acc__icon--open">
                    <use href="#plus" />
                  </svg>
                  <svg width="26" height="26" className="acc__icon acc__icon--close">
                    <use href="#error" />
                  </svg>
                </div>
                {/* <!-- todo this is simple text without inner accordion --> */}
                <div className="acc-head__text">Making a new booking</div>
              </div>
              <div className="acc-body">
                <div className="acc-body__text">
                  All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas immediately.
                  Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass the phone to you
                  or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost of the call. All you
                  need to do is provide us the receipt.
                </div>
              </div>
            </div>

            <div className="acc-item ">
              <div className="acc-head">
                <div className="acc-head__icon">
                  <svg width="26" height="26" className="acc__icon acc__icon--open">
                    <use href="#plus" />
                  </svg>
                  <svg width="26" height="26" className="acc__icon acc__icon--close">
                    <use href="#error" />
                  </svg>
                </div>
                <div className="acc-head__text">Payments and refunds</div>
              </div>
              <div className="acc-body">
                {/* <!--todo markup for inner accordion / add "data-inner" for "acc" --> */}
                <div className="acc" data-inner>
                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">When do I get a confirmation email?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Where can I check my booking details and status?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">How do I know if my reservation is confirmed?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item active">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Why is there no record at the property?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Can I have the official confirmation from the property for visa purposes?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="acc-item active">
              <div className="acc-head">
                <div className="acc-head__icon">
                  <svg width="26" height="26" className="acc__icon acc__icon--open">
                    <use href="#plus" />
                  </svg>
                  <svg width="26" height="26" className="acc__icon acc__icon--close">
                    <use href="#error" />
                  </svg>
                </div>
                <div className="acc-head__text">Check booking status</div>
              </div>
              <div className="acc-body">
                {/* <!--todo markup for inner accordion / add "data-inner" for "acc" --> */}
                <div className="acc" data-inner>
                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">When do I get a confirmation email?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Where can I check my booking details and status?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">How do I know if my reservation is confirmed?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item active">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Why is there no record at the property?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Can I have the official confirmation from the property for visa purposes?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="acc-item ">
              <div className="acc-head">
                <div className="acc-head__icon">
                  <svg width="26" height="26" className="acc__icon acc__icon--open">
                    <use href="#plus" />
                  </svg>
                  <svg width="26" height="26" className="acc__icon acc__icon--close">
                    <use href="#error" />
                  </svg>
                </div>
                <div className="acc-head__text">General hotel information</div>
              </div>
              <div className="acc-body">
                {/* <!--todo markup for inner accordion / add "data-inner" for "acc" --> */}
                <div className="acc" data-inner>
                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">When do I get a confirmation email?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Where can I check my booking details and status?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">How do I know if my reservation is confirmed?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item active">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Why is there no record at the property?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Can I have the official confirmation from the property for visa purposes?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="acc-item ">
              <div className="acc-head">
                <div className="acc-head__icon">
                  <svg width="26" height="26" className="acc__icon acc__icon--open">
                    <use href="#plus" />
                  </svg>
                  <svg width="26" height="26" className="acc__icon acc__icon--close">
                    <use href="#error" />
                  </svg>
                </div>
                <div className="acc-head__text">Cancel a booking</div>
              </div>
              <div className="acc-body">
                {/* <!--todo markup for inner accordion / add "data-inner" for "acc" --> */}
                <div className="acc" data-inner>
                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">When do I get a confirmation email?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Where can I check my booking details and status?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">How do I know if my reservation is confirmed?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item active">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Why is there no record at the property?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Can I have the official confirmation from the property for visa purposes?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="acc-item ">
              <div className="acc-head">
                <div className="acc-head__icon">
                  <svg width="26" height="26" className="acc__icon acc__icon--open">
                    <use href="#plus" />
                  </svg>
                  <svg width="26" height="26" className="acc__icon acc__icon--close">
                    <use href="#error" />
                  </svg>
                </div>
                <div className="acc-head__text">Special requests</div>
              </div>
              <div className="acc-body">
                {/* <!--todo markup for inner accordion / add "data-inner" for "acc" --> */}
                <div className="acc" data-inner>
                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">When do I get a confirmation email?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Where can I check my booking details and status?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">How do I know if my reservation is confirmed?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item active">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Why is there no record at the property?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Can I have the official confirmation from the property for visa purposes?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="acc-item ">
              <div className="acc-head">
                <div className="acc-head__icon">
                  <svg width="26" height="26" className="acc__icon acc__icon--open">
                    <use href="#plus" />
                  </svg>
                  <svg width="26" height="26" className="acc__icon acc__icon--close">
                    <use href="#error" />
                  </svg>
                </div>
                <div className="acc-head__text">Change a booking</div>
              </div>
              <div className="acc-body">
                {/* <!--todo markup for inner accordion / add "data-inner" for "acc" --> */}
                <div className="acc" data-inner>
                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">When do I get a confirmation email?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Where can I check my booking details and status?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">How do I know if my reservation is confirmed?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item active">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Why is there no record at the property?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Can I have the official confirmation from the property for visa purposes?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="acc-item ">
              <div className="acc-head">
                <div className="acc-head__icon">
                  <svg width="26" height="26" className="acc__icon acc__icon--open">
                    <use href="#plus" />
                  </svg>
                  <svg width="26" height="26" className="acc__icon acc__icon--close">
                    <use href="#error" />
                  </svg>
                </div>
                <div className="acc-head__text">Technical issues</div>
              </div>
              <div className="acc-body">
                {/* <!--todo markup for inner accordion / add "data-inner" for "acc" --> */}
                <div className="acc" data-inner>
                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">When do I get a confirmation email?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Where can I check my booking details and status?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">How do I know if my reservation is confirmed?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item active">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Why is there no record at the property?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Can I have the official confirmation from the property for visa purposes?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="acc-item ">
              <div className="acc-head">
                <div className="acc-head__icon">
                  <svg width="26" height="26" className="acc__icon acc__icon--open">
                    <use href="#plus" />
                  </svg>
                  <svg width="26" height="26" className="acc__icon acc__icon--close">
                    <use href="#error" />
                  </svg>
                </div>
                <div className="acc-head__text">Writing reviews</div>
              </div>
              <div className="acc-body">
                {/* <!--todo markup for inner accordion / add "data-inner" for "acc" --> */}
                <div className="acc" data-inner>
                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">When do I get a confirmation email?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Where can I check my booking details and status?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">How do I know if my reservation is confirmed?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item active">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Why is there no record at the property?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Can I have the official confirmation from the property for visa purposes?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="acc-item ">
              <div className="acc-head">
                <div className="acc-head__icon">
                  <svg width="26" height="26" className="acc__icon acc__icon--open">
                    <use href="#plus" />
                  </svg>
                  <svg width="26" height="26" className="acc__icon acc__icon--close">
                    <use href="#error" />
                  </svg>
                </div>
                <div className="acc-head__text">Login</div>
              </div>
              <div className="acc-body">
                {/* <!--todo markup for inner accordion / add "data-inner" for "acc" --> */}
                <div className="acc" data-inner>
                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">When do I get a confirmation email?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Where can I check my booking details and status?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">How do I know if my reservation is confirmed?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item active">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Why is there no record at the property?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Can I have the official confirmation from the property for visa purposes?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="acc-item ">
              <div className="acc-head">
                <div className="acc-head__icon">
                  <svg width="26" height="26" className="acc__icon acc__icon--open">
                    <use href="#plus" />
                  </svg>
                  <svg width="26" height="26" className="acc__icon acc__icon--close">
                    <use href="#error" />
                  </svg>
                </div>
                <div className="acc-head__text">Gift Cards</div>
              </div>
              <div className="acc-body">
                {/* <!--todo markup for inner accordion / add "data-inner" for "acc" --> */}
                <div className="acc" data-inner>
                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">When do I get a confirmation email?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>
                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Where can I check my booking details and status?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">How do I know if my reservation is confirmed?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item active">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Why is there no record at the property?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Can I have the official confirmation from the property for visa purposes?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="acc-item ">
              <div className="acc-head">
                <div className="acc-head__icon">
                  <svg width="26" height="26" className="acc__icon acc__icon--open">
                    <use href="#plus" />
                  </svg>
                  <svg width="26" height="26" className="acc__icon acc__icon--close">
                    <use href="#error" />
                  </svg>
                </div>
                <div className="acc-head__text">FlynasCash</div>
              </div>
              <div className="acc-body">
                {/* <!--todo markup for inner accordion / add "data-inner" for "acc" --> */}
                <div className="acc" data-inner>
                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">When do I get a confirmation email?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Where can I check my booking details and status?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">How do I know if my reservation is confirmed?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item active">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Why is there no record at the property?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>

                  <div className="acc-item ">
                    <div className="acc-head">
                      <div className="acc-head__icon">
                        <svg width="20" height="20" className="acc__icon">
                          <use href="#question" />
                        </svg>
                      </div>
                      <div className="acc-head__text">Can I have the official confirmation from the property for visa purposes?</div>
                    </div>
                    <div className="acc-body">
                      <div className="acc-body__text">
                        All bookings are instantly confirmed. If the property has no record of your booking, please contact Flynas
                        immediately. Our contact details are displayed on the booking voucher. Ask the property to call us directly and pass
                        the phone to you or you can dial us yourself. Long distance charges may apply, but we will refund you for the cost
                        of the call. All you need to do is provide us the receipt.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="faq-main__tooltip">If you can't find what you're looking for in our FAQ, feel free to contact us.</div>

          <div className="faq-contact fc">
            <div className="grid grid--1 grid--ms-2 grid--def-3 grid--space-lg fc__grid">
              <div className="gcell">
                <div className="fc__item">
                  <div className="fc__head">
                    <div className="fc__icon">
                      <svg width="45" height="40">
                        <use href="#user" />
                      </svg>
                    </div>
                    <div className="fc__title">Flynas Self Service</div>
                  </div>
                  <div className="fc__body">
                    <p>The most common requests can be handled by yourself. Just sign in and you can:</p>
                    <ul className="fc-list">
                      <li className="fc-list__item">
                        <span>Make a change to your booking</span>
                      </li>
                      <li className="fc-list__item">
                        <span>Send a special request directlyto the hotel</span>
                      </li>
                      <li className="fc-list__item">
                        <span>Resend the hotel voucher to anyone</span>
                      </li>
                      <li className="fc-list__item">
                        <span>Get a receipt</span>
                      </li>
                      <li className="fc-list__item">
                        <span>Cancel your booking</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="gcell">
                <div className="fc__item">
                  <div className="fc__head">
                    <div className="fc__icon">
                      <svg width="45" height="40">
                        <use href="#mail" />
                      </svg>
                    </div>
                    <div className="fc__title">Email us</div>
                  </div>
                  <div className="fc__body">
                    <p>If you prefer to send us an email, we will strive to answer you in less than 24 hours.</p>
                  </div>
                  <div className="fc__foot">
                    <button className="button fc__btn" onClick={navigateToContactus}>
                      Fill out the form
                    </button>
                  </div>
                </div>
              </div>

              <div className="gcell">
                <div className="fc__item">
                  <div className="fc__head">
                    <div className="fc__icon">
                      <svg width="45" height="40">
                        <use href="#headset" />
                      </svg>
                    </div>
                    <div className="fc__title">Call Us 24/7</div>
                  </div>
                  <div className="fc__body">
                    <p>For issues not covered by the FAQs or Manage My Bookings, you can call us any time, 24 hours a day.</p>
                    <p>
                      You'll need your Flynas Booking ID, which can be found on your confirmation voucher, and the last 4 digits of the
                      credit card used to make your booking.
                    </p>
                  </div>
                  <div className="fc__foot">
                    <button className="button fc__btn">Call Us 24/7</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Faq);
