export default function (/**@type {ApisauceInstance} */ api) {
  const getAirports = () => api.get("lookups/airports");
  const getKnownPlaces = () => api.get("lookups/knownplaces");
  const getISOCountries = () => api.get("lookups/isocountries");
  const getAmenities = () => api.get("lookups/amenities");

  return {
    lookups: {
      getAirports,
      getKnownPlaces,
      getISOCountries,
      getAmenities
    }
  };
}
