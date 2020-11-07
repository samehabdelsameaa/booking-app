export default function(/**@type {ApisauceInstance} */ api) {
  const fetchHotelsWithFilters = filters => api.post("/hotels/search", filters);
  const hotelDetails = filters => api.post("/hotels/rooms", filters);

  return {
    hotels: {
      fetchHotelsWithFilters,
      hotelDetails,      
    }
  };
}
