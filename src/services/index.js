import apisauce from "apisauce";
import config from "../config";

import appApi from "./app";
import accountsApi from "./accounts";
import authApi from "./auth";
import homeApi from "./home";
import hotelsApi from "./hotels";
import bookingApi from "./booking";
import lookupsApi from "./lookups";
import groundServiceApi from "./groundservice";
import transportationApi from "./transportation";
import flightsApi from "./flights";

const apiURI = config.useLocalApi ? config.devApiRoot : config.apiRoot;
const create = (baseURL = apiURI) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache"
    },
    timeout: 30000 //30 sec
  });

  //add access token on each request
  api.addAsyncRequestTransform(request => async () => {
    const token = sessionStorage.getItem("jwtToken");
    const culture = sessionStorage.getItem("culture");
    const cultureCode = sessionStorage.getItem("cultureCode");
    const userIp = sessionStorage.getItem("userIp");

    request.headers["culture"] = culture || "en";
    request.headers["cultureCode"] = cultureCode || "en-US";
    request.headers["userIp"] = userIp || "";

    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete request.headers["Authorization"];
    }
  });

  const app = appApi(api);
  const accounts = accountsApi(api);
  const auth = authApi(api);
  const home = homeApi(api);
  const hotels = hotelsApi(api);
  const booking = bookingApi(api);
  const flights = flightsApi(api);
  const lookups = lookupsApi(api);
  const groundService = groundServiceApi(api);
  const transportation = transportationApi(api);

  return {
    setHeader: api.setHeader,
    setHeaders: api.setHeaders,
    ...app,
    ...accounts,
    ...auth,
    ...home,
    ...hotels,
    ...booking,
    ...flights,
    ...lookups,
    ...groundService,
    ...transportation
  };
};

export default { create };
