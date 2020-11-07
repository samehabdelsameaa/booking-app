export default function(/**@type {ApisauceInstance} */ api) {
  const getPackages = () => api.get("/transportation/packages");
  const getRoutes = query => api.post("/transportation/routes", query);
  const search = query => api.post("/transportation/search", query);
  const getAdditionalServices = () => api.get("/transportation/additional-services");

  return {
    transportation: {
      getPackages,
      getRoutes,
      search,
      getAdditionalServices
    }
  };
}
