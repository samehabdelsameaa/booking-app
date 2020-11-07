import { createLogic } from "redux-logic";
import { ActionTypes } from "./actions";
import { ActionTypes as ReservationActions } from "../reservation/actions";
import config from "config";
import { persistedStore } from "store";

export const fetchAirports = createLogic({
  type: ActionTypes.FETCH_AIRPORTS,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.lookups.getAirports();
      if (!res.ok) {
        dispatch({
          type: ActionTypes.FETCH_AIRPORTS_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({
          type: ActionTypes.FETCH_AIRPORTS_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.FETCH_AIRPORTS_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const searchForHotels = createLogic({
  type: ActionTypes.SEARCH_HOTELS,
  latest: true,
  async process({ getState, action, api }, dispatch, done) {

    try {
      const filters = {};
      filters.pageNumber = 1;
      filters.pageSize = 10;
      filters.startWithCityCode = action.filters.startWithCityCode;
      filters.pax = action.filters.pax.map(p => ({
        adults: p.adults,
        children: p.children,
        infants: p.infants
      }));
      filters.checkInDate = +new Date(action.filters.departureDate).setHours(0, 0, 0, 0);
      dispatch({
        type: ReservationActions.SET_CITY_ORDER,
        payload: {
          startCity: filters.startWithCityCode
        }
      });
      const checkOutDate = new Date(filters.checkInDate);
      checkOutDate.setHours(0, 0, 0, 0);
      const nightsCount =
        action.filters.nights[action.filters.nights.findIndex(a => a.cityCode === action.filters.startWithCityCode)].nightCount;

      checkOutDate.setDate(checkOutDate.getDate() + nightsCount);
      filters.checkOutDate = +checkOutDate;

      //Set city search criteria logic
      let startCity = filters.startWithCityCode;
      let departureDate = action.filters.departureDate;
      let nights = action.filters.nights;
      let pax = action.filters.pax;

      const makkah_searchCriteria = {
        visitors: pax
      };
      const madina_searchCriteria = {
        visitors: pax
      };

      const makkahNights = nights.find(a => a.cityCode === config.makkah).nightCount;
      const madinaNights = nights.find(a => a.cityCode === config.madina).nightCount;

      const totalNights = makkahNights + madinaNights;
      const firstDate = new Date(departureDate);
      const lastDate = new Date(departureDate).addDays(totalNights);

      let citiesSearchCriteira = [];
      if (startCity === config.makkah) {
        const checkoutDate = new Date(firstDate).addDays(makkahNights);

        makkah_searchCriteria.date = {
          checkInDate: firstDate.getTime(),
          checkOutDate: checkoutDate.getTime()
        };

        madina_searchCriteria.date = {
          checkInDate: checkoutDate.getTime(),
          checkOutDate: lastDate.getTime()
        };
        citiesSearchCriteira = [makkah_searchCriteria, madina_searchCriteria];
        // draft.cities[0].searchCriterias = makkah_searchCriteria;
        // draft.cities[1].searchCriterias = madina_searchCriteria;
      } else if (startCity === config.madina) {
        const checkoutDate = new Date(firstDate).addDays(madinaNights);
        madina_searchCriteria.date = {
          checkInDate: firstDate.getTime(),
          checkOutDate: checkoutDate.getTime()
        };

        makkah_searchCriteria.date = {
          checkInDate: checkoutDate.getTime(),
          checkOutDate: lastDate.getTime()
        };
        citiesSearchCriteira = [madina_searchCriteria, makkah_searchCriteria];
      }
      //End
      dispatch({
        type: ReservationActions.SET_DEPARTURE_FLIGHT,
        payload: {
          airport: action.filters.airportCode,
          dates: { in: firstDate.getTime(), out: lastDate.getTime() }
        }
      });
      //update filters to be displayed later in location page
      dispatch({
        type: ReservationActions.SET_CITY_SEARCH_CRITERIAS,
        payload: {
          citiesSearchCriteira: citiesSearchCriteira
        }
      });
      //update breadcrumb, and city array

      filters.citiesSearchCriteira = citiesSearchCriteira;

      dispatch({
        type: ReservationActions.SET_CURRENT_STEP,
        payload: { stepIndex: 0, city: 0, filters: filters, newSession: true }
      });

      dispatch({
        type: ReservationActions.RESET
      });

    } catch (err) {
      console.log("error ", err);
      dispatch({
        type: ActionTypes.SEARCH_HOTELS_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const fetchIsoCountries = createLogic({
  type: ActionTypes.FETCH_ISO_COUNTRIES,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.lookups.getISOCountries();
      if (!res.ok) {
        dispatch({
          type: ActionTypes.FETCH_ISO_COUNTRIES_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({
          type: ActionTypes.FETCH_ISO_COUNTRIES_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.FETCH_ISO_COUNTRIES_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const fetchAmenities = createLogic({
  type: ActionTypes.FETCH_AMENITIES,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.lookups.getAmenities();
      if (!res.ok) {
        dispatch({
          type: ActionTypes.FETCH_AMENITIES_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({
          type: ActionTypes.FETCH_AMENITIES_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.FETCH_AMENITIES_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export default [fetchAirports, searchForHotels, fetchIsoCountries, fetchAmenities];
