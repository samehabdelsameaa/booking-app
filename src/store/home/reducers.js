import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { ActionTypes } from "./actions";
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import storage from 'redux-persist/lib/storage/session'
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

const initialState = {
  airports: [],
  departureDate: +new Date(),
  isoCountries: [],
};

const fetchAirports = (state, action) => {
  return produce(state, draft => {
    draft.airports = [...action.payload];
  });
};

const fetchAirportsFailed = (state, action) => {
  return produce(state, draft => { });
};

const searchHotels = (state, action) => {
  return produce(state, draft => {
    draft.departureDate = action.filters.departureDate;
  });
};

const searchHotelsSuccess = (state, action) => {
  return produce(state, draft => {
    //actually we don't want to do anything here, hotel data will be passed to the reservation reducer, so logic will dispatch anbother action do to so, we don't dispatch action from reducer because this is anti-pattern, we don't want to make any side effect in reducers.
  });
};

const searchHotelsFailed = (state, action) => {
  return produce(state, draft => { });
};

const fetchISOCountries = (state, action) => {
  return produce(state, draft => {
    draft.isoCountries = [...action.payload];
  });
};

const fetchISOCountriesFailed = (state, action) => {
  return produce(state, draft => { });
};

const fetchAmenities = (state, action) => {
  return produce(state, draft => {
    draft.amenities = [...action.payload];
  });
};

const fetchAmenitiesFailed = (state, action) => {
  return produce(state, draft => { });
};
const _reducer = createReducer(initialState, {
  [ActionTypes.FETCH_AIRPORTS_SUCCESS]: fetchAirports,
  [ActionTypes.FETCH_AIRPORTS_FAIL]: fetchAirportsFailed,
  [ActionTypes.SEARCH_HOTELS]: searchHotels,
  [ActionTypes.SEARCH_HOTELS_SUCCESS]: searchHotelsSuccess,
  [ActionTypes.SEARCH_HOTELS_FAIL]: searchHotelsFailed,
  [ActionTypes.FETCH_ISO_COUNTRIES_SUCCESS]: fetchISOCountries,
  [ActionTypes.FETCH_ISO_COUNTRIES_FAIL]: fetchISOCountriesFailed,
  [ActionTypes.FETCH_AMENITIES_SUCCESS]: fetchAmenities,
  [ActionTypes.FETCH_AMENITIES_FAIL]: fetchAmenitiesFailed,
});

const homePersistConfig = {
  key: "home",
  storage: storage
};

export const reducer = persistReducer(homePersistConfig, _reducer);
