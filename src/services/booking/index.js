export default function(/**@type {ApisauceInstance} */ api) {
  const checkForVisaStatus = filters => api.post("booking/visa", filters);
  const myBookings = () => api.get("booking/my-bookings");
  const book = request => api.post("booking/book", request);
  const pay = request => api.post("booking/pay", request);
  const checkPaymentApproved = sessionId => api.get(`booking/test-pay/${sessionId}`);
  const getPaymentDetails = sessionId => api.get(`booking/get-pay/${sessionId}`);

  return {
    booking: {
      checkForVisaStatus,
      myBookings,
      book,
      pay,
      checkPaymentApproved,
      getPaymentDetails
    }
  };
}
