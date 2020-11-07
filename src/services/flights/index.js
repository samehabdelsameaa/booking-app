export default function(/**@type {ApisauceInstance} */ api) {
  
  const getFlightsData = (query, signature) => {
    api.addAsyncRequestTransform(request => async () => {
      request.headers["signature"] = signature;
    });
    return api.post("/flight/GetAvailability", query);
  };

  const getSignature = query => api.post("/flight/Login", query);
  const getTotalPrice = query => api.post("/flight/GetItineraryPriceRequest", query);

  return {
    flights: {
      getFlightsData,
      getSignature,
      getTotalPrice
    }
  };
}
