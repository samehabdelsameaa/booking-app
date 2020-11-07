import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    fetchAirports: { meta: { async: true } },
    searchHotels: { args: ["filters"], meta: { async: true } },
    fetchIsoCountries: { meta: { async: true } },
    fetchAmenities: { meta: { async: true } }
  },
  {
    prefix: "@app/home/"
  }
);

export const ActionTypes = Types;
export default Creators;
