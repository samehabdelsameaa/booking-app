export default function(/**@type {ApisauceInstance} */ api) {
  const getPackages = () => api.get("/ground-service/packages");
  const getAdditionalServices = () => api.get("/ground-service/additional-services");
  const search = query => api.post("/ground-service/search", query);
  return {
    groundService: {
      getPackages,
      getAdditionalServices,
      search
    }
  };
}
