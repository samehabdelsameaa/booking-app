import { createReducer } from "utils/reduxsauce";
import produce from "immer";
import { createBlacklistTransformation } from "utils/redux-persist-transformers";
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import storage from 'redux-persist/lib/storage/session'
import uuid from "uuid/v1";

import { persistedStore } from "store";
import { ActionTypes } from "./actions";
import config from "config";
import { getNearbyKnownPlacesFromCurrentLocation } from "utils/geo-caclculator";
import { sortBy, orderBy } from "lodash";
import { groundServicesPackages } from "./dummy/groundservice";
import { transportationPackages } from "./dummy/transportation";
import { parseQueryString, updateParams } from "utils/qs-parser";
import { qsEncrypt, generateKeys } from "utils/encryption";
import { initPassenger } from "./state/passengers";
import { defaultFilters, defaultPagination, configureBreadcrumb, makkah_step, madina_step } from "./state/defaults";
import { configureCities } from "./state/cities";
import { configureInitialState } from "./state";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

const qs_state = parseQueryString();

const { makkah, madina } = configureCities(qs_state, defaultFilters, defaultPagination);
let { breadcrumbSteps, cities } = configureBreadcrumb(qs_state, makkah, madina);

qs_state.cities = cities;
const initialState = configureInitialState(qs_state, transportationPackages, groundServicesPackages, breadcrumbSteps, makkah, madina);

// const testPay = (state, action) => {
//   return produce(state, draft => {

//   });
// }

const resetReducer = (state, action) => {
  return produce(state, draft => {
    draft.loadHotels = false;
    draft.nationality = initialState.nationality;
    draft.countryOfResidence = initialState.countryOfResidence;

    draft.currentStep = 1;
    draft.cityIndex = 0;
    if (draft.cities) {
      for (let i = 0; i < draft.cities.length; i++) {
        draft.cities[i].hotels = [];
        draft.cities[i].selectedHotel = {};
        draft.cities[i].selectedRooms = [];
        draft.cities[i].selectedRoomOptionalAmenities = {};
        draft.cities[i].hotelAmenities = [];
        draft.cities[i].pagination = {
          ...draft.cities[i].pagination,
          pageNumber: 1,
          pageSize: 10,
          hasMoreItems: true
        };
        draft.cities[i].knownPlaces = [];
        draft.cities[i].trackToken = "";
        draft.cities[i].priceRange = {};
      }
    }

    draft.flight.noFlightsAvailable = false;
    draft.flight.signature = "";
    draft.flight.promotionCode = "";
    draft.flight.data = {};
    draft.flight.returnAirport = "";
    draft.flight.selectedJourneys = [];

    draft.transportation.packages = [];
    draft.transportation.selectedPackage = {};
    draft.transportation.routes = [];
    draft.transportation.selectedRoute = {};
    draft.transportation.companies = [];
    draft.transportation.selectedCompany = {};
    draft.transportation.companiesSortingCriteria = "";
    draft.transportation.trackToken = "";

    draft.groundServices.packages = [];
    draft.groundServices.selectedPackage = {};
    draft.groundServices.companies = [];
    draft.groundServices.selectedCompany = {};
    draft.groundServices.trackToken = "";

    draft.passengers = [];

    draft.contactInfo = {
      email: "",
      phoneNumber: "",
      lastName: ""
    };
    draft.isLoading = false;
    draft.completedSteps = {};
  });
};

const initSession = (state, action) => {
  return produce(state, draft => {
    const { pax } = action;
    const allPax = [];
    let leadingGuest = true;
    pax.map((room, rIndex) => {
      const adults = new Array(room.adults).fill().map((a, index) => {
        var p = initPassenger("adult", rIndex, leadingGuest);
        leadingGuest = false;
        return p;
      });
      const children = new Array(room.children).fill().map((a, index) => initPassenger("child", rIndex, false));
      const infants = new Array(room.infants).fill().map((a, index) => initPassenger("infant", rIndex, false));

      allPax.push(...adults, ...children, ...infants);
    });

    draft.passengers = allPax;
  });
};

const getFlightsData = (state, action) => {
  return produce(state, draft => {
    // draft.flight.data = action.payload;
    // draft.isLoading  = false;
  });
};

const getFlightsDataSuccess = (state, action) => {
  return produce(state, draft => {
    const { departure, return: returnFlights } = action.payload;
    if (!departure && !returnFlights) {
      draft.flight.noFlightsAvailable = true;
    } else {
      draft.flight.data = { departure, return: returnFlights };
      draft.flight.noFlightsAvailable = false;
    }
  });
};

const getFlightsDataFail = (state, action) => {
  return produce(state, draft => {
    // draft.isLoading  = false;
  });
};

const getSignature = (state, action) => {
  return produce(state, draft => {
    // draft.flight.data = action.payload;
    // draft.isLoading  = false;
  });
};

const clearSignature = (state, action) => {
  return produce(state, draft => {
    draft.flight.signature = undefined;
  });
};

const getSignatureSuccess = (state, action) => {
  return produce(state, draft => {
    draft.flight.signature = action.payload.signature;
  });
};

const getSignatureFail = (state, action) => {
  return produce(state, draft => {
    draft.flight.data = action.payload;
    // draft.isLoading  = false;
  });
};

const fetchHotels = (state, action) => {
  return produce(state, draft => {
    draft.cities[0].pagination.hasMoreItems = true;
    // draft.isLoading  = false;
  });
};

const fetchHotelsSuccess = (state, action) => {
  return produce(state, draft => {
    if (!breadcrumbSteps.some(a => !!a.isCityStep)) {
      if (qs_state.startcity === config.madina) {
        cities = [madina, makkah];

        madina_step.id = 2;
        madina_step.cityIndex = 0;

        makkah_step.id = 3;
        makkah_step.cityIndex = 1;

        breadcrumbSteps.splice(0, 0, madina_step, makkah_step);
      } else {
        if (madina) {
          cities = [makkah, madina];
          breadcrumbSteps.splice(0, 0, makkah_step, madina_step);
        }
        else {
          cities = [makkah];
          breadcrumbSteps.splice(0, 0, makkah_step);
        }

      }
    } else {
      if (qs_state.startcity === config.madina) {
        cities = [madina, makkah];

        madina_step.id = 1;
        madina_step.cityIndex = 0;

        makkah_step.id = 2;
        makkah_step.cityIndex = 1;
        breadcrumbSteps[0] = madina_step;
        breadcrumbSteps[1] = makkah_step;
      } else {
        if (madina) {
          cities = [makkah, madina];

          breadcrumbSteps[0] = makkah_step;
          breadcrumbSteps[1] = madina_step;
        }
        else {
          cities = [makkah];
          breadcrumbSteps[0] = makkah_step;
        }

      }
    }
    if (draft.cities[0].cityName == cities[0].cityName && cities[1] && draft.cities[1] && draft.cities[1].cityName == cities[1].cityName) {
      draft.cities[draft.cityIndex].hotels = [...action.payload.hotels.items];
      draft.cities[draft.cityIndex].pagination.hasMoreItems = action.payload.hotels.metadata.hasNextPage;

      draft.cities[draft.cityIndex].priceRange = action.payload.metadata.priceRange;
      draft.cities[draft.cityIndex].trackToken = action.payload.metadata.trackToken;

      draft.cities[draft.cityIndex].pagination.pageNumber = action.payload.hotels.metadata.pageNumber;
    } else {
      cities[draft.cityIndex].hotels = [...action.payload.hotels.items];
      cities[draft.cityIndex].pagination.hasMoreItems = action.payload.hotels.metadata.hasNextPage;

      cities[draft.cityIndex].priceRange = action.payload.metadata.priceRange;
      cities[draft.cityIndex].trackToken = action.payload.metadata.trackToken;

      cities[draft.cityIndex].pagination.pageNumber = action.payload.hotels.metadata.pageNumber;
      draft.cities = cities;
    }

    // draft.cities[draft.cityIndex].hotels = [...action.payload.hotels.items];

    // draft.cities[draft.cityIndex].pagination.hasMoreItems =
    //   action.payload.hotels.metadata.hasNextPage;

    // draft.cities[draft.cityIndex].priceRange =
    //   action.payload.metadata.priceRange;

    // draft.cities[draft.cityIndex].pagination.pageNumber =
    //   action.payload.hotels.metadata.pageNumber;
  });
};

const fetchHotelsFailed = (state, action) => {
  return produce(state, draft => {
    draft.cities[draft.cityIndex].selectedHotel = false;
    // draft.isLoading  = false;
  });
};

const fetchHotelsPageSuccess = (state, action) => {
  return produce(state, draft => {
    // draft.cities[draft.cityIndex].searchCriterias = { ...action.payload.searchCriterias };
    // draft.cities[draft.cityIndex].pagination = { ...action.payload.pagination };
    // draft.cities[draft.cityIndex].filters = [...action.payload.filters];
    // const pageSize = action.payload.pagination.pageSize;
    // const startIndex = action.payload.pagination.pageNumber * pageSize;
    // const endIndex = startIndex + pageSize;
    // draft.cities[draft.cityIndex].hotels.push(...allHotels.slice(startIndex, endIndex));
    // draft.cities[draft.cityIndex].pagination.hasMoreItems = draft.cities[0].hotels.length < allHotels.length;

    draft.cities[draft.cityIndex].hotels.push(...action.payload.hotels.items);
    //update track token for pagination search request
    draft.cities[draft.cityIndex].trackToken = action.payload.metadata.trackToken;
    draft.cities[draft.cityIndex].pagination.hasMoreItems = action.payload.hotels.metadata.hasNextPage;
    draft.cities[draft.cityIndex].pagination.pageNumber = action.payload.hotels.metadata.pageNumber;
  });
};

const fetchHotelsPageFailed = (state, action) => {
  return produce(state, draft => {
    draft.cities[draft.cityIndex].pagination.hasMoreItems = false;
    // draft.isLoading  = false;
  });
};

const setDepartureFlight = (state, action) => {
  return produce(state, draft => {
    const { airport, dates } = action.payload;
    draft.flight.departureAirport = airport;
    draft.flight.departureDate = dates.in;
    draft.flight.returnDate = dates.out;
  });
};

const setReturnFlight = (state, action) => {
  return produce(state, draft => {
    const { airport } = action;
    // draft.flight.returnAirport = airport;
    // draft.flight.departureAirport = qs_state.depairport;
    // draft.flight.departureDate = qs_state.depdate;
    // draft.flight.returnDate = qs_state.retdate;
    // draft.flight.returnAirport = qs_state.retairport;
    // draft.flight.promotionCode = qs_state.fpc || "";
  });
};
const setSelectedFlight = (state, action) => {
  return produce(state, draft => {
    draft.flight.selectedJourneys = action.data;
  });
};
const setCurrentStep = (state, action) => {
  return produce(state, draft => {
    const { stepIndex, cityIndex, filters, removeQps, path: newPath, newSession } = action.payload;
    if (!!newSession) {
      //first step, and start session
      console.log("reset session");
      let sessionId = uuid();
      let key = generateKeys();
      let token = `${sessionId}/${key}`;
      window.sessionStorage.setItem("sessionToken", token);

      draft.sessionId = sessionId;
    }

    draft.currentStep = stepIndex;
    if (stepIndex != 0) {
      draft.completedSteps[stepIndex - 1] = true;
    }
    const qs = parseQueryString();
    if (qs.step != stepIndex || qs.city != cityIndex || newPath !== undefined) {
      const modifiedParams = {};
      const removeParams = [];

      if (cityIndex !== undefined) {
        const { selectedHotel } = state.cities[cityIndex];
        if (selectedHotel && selectedHotel.id && removeQps && !removeQps.includes("hotelId")) {
          modifiedParams.hotelId = selectedHotel.id;
        }
        modifiedParams.city = cityIndex;
      }

      if (removeQps) {
        removeParams.push(...removeQps);
      }

      modifiedParams.step = stepIndex;
      let path = newPath || state.steps[stepIndex].path;

      let updatedQs = "";
      if (filters) {
        modifiedParams.nat = filters.nationality || "EG";
        modifiedParams.co = filters.countryOfResidence || "EG";
        modifiedParams.startcity = filters.startWithCityCode;
        modifiedParams.step = 0; //first city
        modifiedParams.city = 0;
        modifiedParams.city1in = new Date(filters.citiesSearchCriteira[0].date.checkInDate).getTime();
        modifiedParams.city1out = new Date(filters.citiesSearchCriteira[0].date.checkOutDate).getTime();
        modifiedParams.city2in = new Date(filters.citiesSearchCriteira[1].date.checkInDate).getTime();
        modifiedParams.city2out = new Date(filters.citiesSearchCriteira[1].date.checkOutDate).getTime();
        modifiedParams.loadHotels = false;
        modifiedParams.pax = filters.pax;
      }

      if (!qs.depairport) {
        modifiedParams.depairport = state.flight.departureAirport;
        modifiedParams.depdate = state.flight.departureDate;
        modifiedParams.retdate = state.flight.returnDate;
      }

      // console.log("set airport in qs", state.flight.returnAirport);

      if (!!state.flight.returnAirport) {
        modifiedParams.retairport = state.flight.returnAirport;
      }

      updatedQs = updateParams(modifiedParams, removeParams);

      const encQs = qsEncrypt(updatedQs);
      if (!encQs) {
        path = "/";
        encQs = "";
        console.error("encryption failed");
      }

      if (path) {
        window.location = `${path}?${encQs}`;
      } else {
        window.location.search = encQs;
      }
    }
  });
};

const routeToHotelId = (state, action) => {
  return produce(state, draft => {
    //xxxxx: todo: check if this hotel is different from the previous selected hotel for this city, clear selected rooms for this city to allow user to select different rooms
  });
};

const setSelectedRooms = (state, action) => {
  return produce(state, draft => {
    draft.cities[draft.cityIndex].selectedRooms = [...action.selectedRooms];
  });
};

const getHotelDetails = (state, action) => {
  return produce(state, draft => {
    draft.cities[draft.cityIndex].selectedHotel = action.payload;

    const hotelKnownPlaces = state.cities[state.cityIndex].knownPlaces;
    const { latitude, longitude } = action.payload;
    const placesDistances = getNearbyKnownPlacesFromCurrentLocation(latitude, longitude, hotelKnownPlaces);
    draft.cities[draft.cityIndex].selectedHotel.knownPlacesDistances = placesDistances;
  });
};

const getHotelDetailsFail = (state, action) => {
  return produce(state, draft => {
    // push("/hotel");
    // dispatch(push("/hotel"));
  });
};

const switchCityIndex = (state, action) => {
  return produce(state, draft => {
    // draft.cityIndex = action.cityIndex;
    // draft.cities[action.cityIndex].pagination = defaultPagination;
    // if (qs.city != action.cityIndex) {
    //   const updatedQs = updateParams({ city: action.cityIndex });
    //   window.location.search = updatedQs;
    // }
  });
};

const setCityHotels = (state, action) => {
  return produce(state, draft => {
    draft.cities[draft.cityIndex].hotels = [...action.payload.hotels.items];
    draft.cities[draft.cityIndex].trackToken = action.payload.metadata.trackToken;

    draft.cities[draft.cityIndex].pagination.hasMoreItems = action.payload.hotels.metadata.hasNextPage;
    draft.cities[draft.cityIndex].pagination.pageNumber = action.payload.hotels.metadata.pageNumber;
  });
};

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const setCitySearchCriterias = (state, action) => {
  return produce(state, draft => {
    const { citiesSearchCriteira } = action.payload;
    draft.cities[0].searchCriterias = citiesSearchCriteira[0];
    if (draft.cities[1])
      draft.cities[1].searchCriterias = citiesSearchCriteira[1];
  });
};

const setCityOrder = (state, action) => {
  const { startCity } = action.payload;
  return produce(state, draft => {
    if (!breadcrumbSteps.some(a => !!a.isCityStep)) {
      if (startCity === config.makkah) {
        draft.cities = [makkah, madina];
        breadcrumbSteps.splice(0, 0, makkah_step, madina_step);
      } else if (startCity === config.madina) {
        draft.cities = [madina, makkah];

        madina_step.id = 1;
        madina_step.cityIndex = 0;

        makkah_step.id = 2;
        makkah_step.cityIndex = 1;

        breadcrumbSteps.splice(0, 0, madina_step, makkah_step);
      }

      draft.steps = breadcrumbSteps;
    }
  });
};

/* Transportation actions */

const fetchRoutes = (state, action) => {
  return produce(state, draft => { });
};

const fetchRoutesSuccess = (state, action) => {
  return produce(state, draft => {
    const routesLst = action.payload;
    let tempRoutes = [];
    // console.log("route length", routesLst.length);
    routesLst.map((x, index) => {
      let names = x.name.split("-");
      tempRoutes.push({
        code: x.code,
        id: index,
        routeImage: "./assets/images/transportation/route-bus.png",
        routeStartPoint: x.startCityCode,
        routeEndPoint: x.endCityAirportCode,
        routePoints: names.map((e, index) => {
          return {
            city: e,
            icon: index == 0 || index == names.length - 1 ? "flight" : e.trim() == "Makkah" ? "mecca" : e.trim() == "Madinah" ? "madinah" : "",
            id: index
          };
        })
      });
    });
    // console.log("transportationroutesList", routesList);
    draft.transportation.routes = tempRoutes;
    if (tempRoutes && tempRoutes.length == 1) {
      draft.transportation.selectedRoute = tempRoutes[0];
      draft.flight.returnAirport = tempRoutes[0].routeEndPoint;
    }
  });
};

const fetchRoutesFailed = (state, action) => {
  return produce(state, draft => { });
};

const fetchTransportationPackages = (state, action) => {
  return produce(state, draft => { });
};

const fetchTransportationPackagesSuccess = (state, action) => {
  return produce(state, draft => {
    const predefinedLst = action.payload.packageList;
    transportationPackages.forEach(e => {
      e["code"] = predefinedLst[e.packageClass.toLocaleLowerCase()];
    });
    draft.transportation.packages = transportationPackages;
    draft.transportation.selectedPackage = transportationPackages[1];
  });
};

const fetchTransportationPackagesFailed = (state, action) => {
  return produce(state, draft => { });
};

const setSelectedTransportationPackage = (state, action) => {
  return produce(state, draft => {
    draft.transportation.selectedPackage = action.package;
    draft.transportation.companies = [];
    draft.transportation.selectedCompany = {};

  });
};

const setSelectedRoute = (state, action) => {
  return produce(state, draft => {
    draft.transportation.selectedRoute = action.route;
    draft.flight.returnAirport = action.route.routeEndPoint;
  });
};

const fetchTransportationCompanies = (state, action) => {
  return produce(state, draft => {
    draft.isLoading = true;
  });
};

const fetchTransportationCompaniesSuccess = (state, action) => {
  return produce(state, draft => {
    draft.isLoading = false;
    const { items, metadata } = action.payload;
    draft.transportation.trackToken = metadata.trackToken;
    const vehiclesLst = items.map((e, index) => {
      return {
        id: index,
        vehicleImage: "./assets/images/ground/company.png",
        price: e.totalAmount,
        ...e
      };
    });
    // console.log("vehiclesLst", vehiclesLst);
    draft.transportation.companies = vehiclesLst;
  });
};

const fetchTransportationCompaniesFailed = (state, action) => {
  return produce(state, draft => { });
};

const setSelectedTransportationCompany = (state, action) => {
  return produce(state, draft => {
    draft.transportation.selectedCompany = action.company;
  });
};

const sortTransportationCompaniesList = (state, action) => {
  // console.log('loged from reducer', action);

  return produce(state, draft => {
    const x = sortCompanies(state.transportation.companies, action.sortByCriteria);
    draft.transportation.companies = sortCompanies(state.transportation.companies, action.sortByCriteria);
    // console.log("Sorted Companies", x);
    draft.transportation.companiesSortingCriteria = action.sortByCriteria;
  });
};

const sortCompanies = (xs, criteria) => {
  const userRatingValues = {
    1: "normal",
    2: "Good",
    3: "very Good",
    4: "Excellent",
    5: "amazing"
  };
  // console.log("criteria", criteria);
  switch (criteria) {
    case "topRated":
      return orderBy(xs, ["rating"]);
    case "PriceDesc":
      return orderBy(xs, ["price"]).reverse();
    case "PriceAsc":
      return orderBy(xs, ["price"]);
    case "Popular":
      let List = xs.slice(0);
      const byPopular = [];
      List.map((item, index) => {
        if (item.userRating.toLowerCase() === userRatingValues[index + 1].toLowerCase()) {
          byPopular.push(item);
        }
      });
      return byPopular;
    default:
      return xs;
  }
};

/*
 * Ground Services
 */

const fetchGroundServicesPackages = (state, action) => {
  return produce(state, draft => { });
};

const fetchGroundServicesPackagesSuccess = (state, action) => {
  return produce(state, draft => {
    const packagesData = action.payload.sort();
    packagesData.map((e, index) => {
      groundServicesPackages[index]["code"] = e.code;
    });
    //todo: what is the correct code here?
    draft.groundServices.packages = groundServicesPackages;
    draft.groundServices.selectedPackage = groundServicesPackages[1];
  });
};

const fetchGroundServicesPackagesFailed = (state, action) => {
  return produce(state, draft => { });
};

const setSelectedGroundServicePackage = (state, action) => {
  return produce(state, draft => {
    draft.groundServices.selectedPackage = action.package;
    draft.groundServices.companies = [];
    draft.groundServices.selectedCompany = {};

  });
};

const fetchGroundServiceCompanies = (state, action) => {
  return produce(state, draft => {
    draft.isLoading = true;
  });
};

const fetchPassengersForVisaCheck = (state, action) => {
  return produce(state, draft => {
    draft.isLoading = true;
    draft.passengers = state.passengers.map(pax => ({
      ...pax,
      status: "checking",
      visaFees: 0
    }));
  });
};

const fetchPassengersForVisaCheckSuccess = (state, action) => {
  return produce(state, draft => {
    draft.isLoading = false;
    draft.passengers = state.passengers.map((pax, i) => {
      if (pax.passportNo === action.payload[i].passportNumber) {
        return {
          ...pax,
          status: action.payload[i].status,
          visaFees: action.payload[i].visaFees
        };
      }
    });
  });
};

const fetchPassengersForVisaCheckFailed = (state, action) => {
  return produce(state, draft => {
    draft.isLoading = false;
  });
};

const fetchGroundServiceCompaniesSuccess = (state, action) => {
  return produce(state, draft => {
    draft.isLoading = false;
    draft.groundServices.trackToken = action.companies.metadata.trackToken;
    draft.groundServices.companies = action.companies.items;
  });
};

const fetchGroundServiceCompaniesFailed = (state, action) => {
  return produce(state, draft => {
    draft.groundServices.companies = [];
  });
};

const setSelectedGroundServiceCompany = (state, action) => {
  return produce(state, draft => {
    draft.groundServices.selectedCompany = action.company;
  });
};

const setSelectedRoomPreferences = (state, action) => {
  return produce(state, draft => {
    draft.cities[draft.cityIndex].selectedRooms[action.roomTypeIndex].selectedPreferences = action.preferences;
  });
};

const setPassengersContactsInfo = (state, action) => {
  console.log("reducers", action);

  return produce(state, draft => {
    draft.passengers = action.passengersInfo;
    draft.contactInfo = action.contactsInfo;
  });
};

const fetchKnownPlaces = (state, action) => {
  return produce(state, draft => {
    draft.cities[draft.cityIndex].knownPlaces = [...action.payload];
  });
};

const fetchKnownPlacesFailed = (state, action) => {
  return produce(state, draft => { });
};
const addPaymentData = (state, action) => {
  return produce(state, draft => {
    draft.payment = action.data;
  });
};
const payAndBookSuccess = (state, action) => {
  return produce(state, draft => { });
};
const payAndBookFailed = (state, action) => {
  return produce(state, draft => { });
};

const getFlightPriceSuccess = (state, action) => {
  return produce(state, draft => {

    const { total, type } = action.payload;
    if (type == "departure")
      draft.flight.departurePrice = total;
    else
      draft.flight.returnPrice = total;

  });
};
const getFlightPriceFail = (state, action) => {
  return produce(state, draft => { });
};

const fetchMyBookings = (state, action) => {
  return produce(state, draft => {
    draft.isLoading = true;
  });
};

const fetchMyBookingsFailed = (state, action) => {
  return produce(state, draft => {
    draft.isLoading = false;
  });
};

const fetchMyBookingsSuccess = (state, action) => {
  return produce(state, draft => {
    draft.isLoading = false;
    draft.myBookings = action.payload;
  });
};

const fetchGsAdditionalServices = (state, action) => {
  return produce(state, draft => { });
};

const fetchGsAdditionalServicesFailed = (state, action) => {
  return produce(state, draft => { });
};

const fetchGsAdditionalServicesSuccess = (state, action) => {
  return produce(state, draft => {
    action.payload.map(e => {
      e["qty"] = 0;
      e["duration"] = 0;
      return;
    });
    draft.groundServices.additionalServices = action.payload;
  });
};

const setSelectedAdditionalServices = (state, action) => {
  return produce(state, draft => {
    const item = action.selectedServices;
    let additionalServices = draft.groundServices.additionalServices;
    if (item[item.target] == 0) {
      additionalServices[item.index]["qty"] = 0;
      additionalServices[item.index]["duration"] = 0;
    } else if (item[item.target] == 1 && !item[item.otherProperty]) {
      additionalServices[item.index]["qty"] = 1;
      additionalServices[item.index]["duration"] = 1;
    } else {
      additionalServices[item.index][item.target] = item[item.target];
    }
    draft.groundServices.additionalServices = additionalServices;
  });
};

const fetchTrAdditionalServices = (state, action) => {
  return produce(state, draft => { });
};

const fetchTrAdditionalServicesFailed = (state, action) => {
  return produce(state, draft => { });
};

const fetchTrAdditionalServicesSuccess = (state, action) => {
  return produce(state, draft => {
    draft.transportation.additionalServices = action.payload;
  });
};

const setSelectedTrAdditionalServices = (state, action) => {
  return produce(state, draft => {
    let currentItem = state.transportation.selectedAdditionalServices.find(e => e === action.selectedService);
    if (currentItem) {
      let filteredElements = state.transportation.selectedAdditionalServices.filter(e => e !== action.selectedService);
      draft.transportation.selectedAdditionalServices = filteredElements;
    } else {
      draft.transportation.selectedAdditionalServices.push(action.selectedService);
    }
  });
};

const payAndBook3dsSuccess = (state, action) => {
  return produce(state, draft => { });
};

const payAndBook3dsFailed = (state, action) => {
  return produce(state, draft => { });
};

const setCountryOfResidence = (state, action) => {
  return produce(state, draft => {
    draft.countryOfResidence = action.countryCode
  });
};

const setNationality = (state, action) => {
  return produce(state, draft => {
    draft.nationality = action.nationalityCode
  });
};

const _reducer = createReducer(initialState, {
  [ActionTypes.RESET]: resetReducer,
  [ActionTypes.INIT_SESSION]: initSession,

  [ActionTypes.FETCH_HOTELS]: fetchHotels,
  [ActionTypes.FETCH_HOTELS_FAIL]: fetchHotelsFailed,
  [ActionTypes.FETCH_HOTELS_SUCCESS]: fetchHotelsSuccess,
  [ActionTypes.FETCH_HOTELS_PAGE_FAIL]: fetchHotelsPageFailed,
  [ActionTypes.FETCH_HOTELS_PAGE_SUCCESS]: fetchHotelsPageSuccess,
  [ActionTypes.SET_CURRENT_STEP]: setCurrentStep,

  [ActionTypes.ROUTE_TO_HOTEL_ID]: routeToHotelId,
  [ActionTypes.SET_SELECTED_ROOMS]: setSelectedRooms,

  [ActionTypes.GET_HOTEL_DETAILS_SUCCESS]: getHotelDetails,
  [ActionTypes.GET_HOTEL_DETAILS_FAIL]: getHotelDetailsFail,
  [ActionTypes.SWITCH_CITY_INDEX]: switchCityIndex,
  [ActionTypes.SET_CITY_HOTELS]: setCityHotels,
  // [ActionTypes.SET_CITY_SEARCH_CRITERIAS]: setCitySearchCriterias,

  [ActionTypes.FETCH_ROUTES]: fetchRoutes,
  [ActionTypes.FETCH_ROUTES_SUCCESS]: fetchRoutesSuccess,
  [ActionTypes.FETCH_ROUTES_FAIL]: fetchRoutesFailed,

  [ActionTypes.SET_SELECTED_ROUTE]: setSelectedRoute,

  [ActionTypes.FETCH_TRANSPORTATION_PACKAGES]: fetchTransportationPackages,
  [ActionTypes.FETCH_TRANSPORTATION_PACKAGES_SUCCESS]: fetchTransportationPackagesSuccess,
  [ActionTypes.FETCH_TRANSPORTATION_PACKAGES_FAIL]: fetchTransportationPackagesFailed,

  [ActionTypes.SET_SELECTED_TRANSPORTATION_PACKAGE]: setSelectedTransportationPackage,

  [ActionTypes.FETCH_TRANSPORTATION_COMPANIES]: fetchTransportationCompanies,
  [ActionTypes.FETCH_TRANSPORTATION_COMPANIES_SUCCESS]: fetchTransportationCompaniesSuccess,
  [ActionTypes.FETCH_TRANSPORTATION_COMPANIES_FAIL]: fetchTransportationCompaniesFailed,

  [ActionTypes.SET_SELECTED_TRANSPORTATION_COMPANY]: setSelectedTransportationCompany,

  [ActionTypes.SORT_TRANSPORTATION_COMPANIES_LIST]: sortTransportationCompaniesList,
  [ActionTypes.SET_CITY_SEARCH_CRITERIAS]: setCitySearchCriterias,
  [ActionTypes.SET_CITY_ORDER]: setCityOrder,

  [ActionTypes.FETCH_GROUND_SERVICES_PACKAGES]: fetchGroundServicesPackages,
  [ActionTypes.FETCH_GROUND_SERVICES_PACKAGES_SUCCESS]: fetchGroundServicesPackagesSuccess,
  [ActionTypes.FETCH_GROUND_SERVICES_PACKAGES_FAIL]: fetchGroundServicesPackagesFailed,

  [ActionTypes.SET_SELECTED_GROUND_SERVICES_PACKAGE]: setSelectedGroundServicePackage,

  [ActionTypes.FETCH_GROUND_SERVICES_COMPANIES]: fetchGroundServiceCompanies,
  [ActionTypes.FETCH_GROUND_SERVICES_COMPANIES_SUCCESS]: fetchGroundServiceCompaniesSuccess,
  [ActionTypes.FETCH_GROUND_SERVICES_COMPANIES_FAIL]: fetchGroundServiceCompaniesFailed,

  [ActionTypes.SET_SELECTED_GROUND_SERVICES_COMPANY]: setSelectedGroundServiceCompany,

  [ActionTypes.SET_SELECTED_ROOM_PREFERENCES]: setSelectedRoomPreferences,

  [ActionTypes.SET_PASSENGERS_CONTACTS_INFO]: setPassengersContactsInfo,
  [ActionTypes.FETCH_PASSENGERS_FOR_VISA_CHECK]: fetchPassengersForVisaCheck,
  [ActionTypes.FETCH_PASSENGERS_FOR_VISA_CHECK_SUCCESS]: fetchPassengersForVisaCheckSuccess,
  [ActionTypes.FETCH_PASSENGERS_FOR_VISA_CHECK_FAIL]: fetchPassengersForVisaCheckFailed,

  [ActionTypes.GET_FLIGHTS_DATA]: getFlightsData,
  [ActionTypes.GET_FLIGHTS_DATA_SUCCESS]: getFlightsDataSuccess,
  [ActionTypes.GET_FLIGHTS_DATA_FAIL]: getFlightsDataFail,

  [ActionTypes.GET_SIGNATURE]: getSignature,
  [ActionTypes.CLEAR_SIGNATURE]: clearSignature,
  [ActionTypes.GET_SIGNATURE_SUCCESS]: getSignatureSuccess,
  [ActionTypes.GET_SIGNATURE_FAIL]: getSignatureFail,

  [ActionTypes.FETCH_KNOWN_PLACES_SUCCESS]: fetchKnownPlaces,
  [ActionTypes.FETCH_KNOWN_PLACES_FAIL]: fetchKnownPlacesFailed,

  // [ActionTypes.ADD_PAYMENT_DATA]: addPaymentData,

  [ActionTypes.SET_DEPARTURE_FLIGHT]: setDepartureFlight,
  [ActionTypes.SET_RETURN_FLIGHT]: setReturnFlight,
  [ActionTypes.SET_SELECTED_FLIGHT]: setSelectedFlight,
  [ActionTypes.PAY_AND_BOOK_SUCCESS]: payAndBookSuccess,
  [ActionTypes.PAY_AND_BOOK_FAIL]: payAndBookFailed,
  [ActionTypes.GET_FLIGHT_PRICE_SUCCESS]: getFlightPriceSuccess,
  [ActionTypes.GET_FLIGHT_PRICE_FAIL]: getFlightPriceFail,

  [ActionTypes.FETCH_MY_BOOKINGS]: fetchMyBookings,
  [ActionTypes.FETCH_MY_BOOKINGS_FAIL]: fetchMyBookingsFailed,
  [ActionTypes.FETCH_MY_BOOKINGS_SUCCESS]: fetchMyBookingsSuccess,

  [ActionTypes.FETCH_GS_ADDITIONAL_SERVICES]: fetchGsAdditionalServices,
  [ActionTypes.FETCH_GS_ADDITIONAL_SERVICES_FAIL]: fetchGsAdditionalServicesFailed,
  [ActionTypes.FETCH_GS_ADDITIONAL_SERVICES_SUCCESS]: fetchGsAdditionalServicesSuccess,
  [ActionTypes.SET_SELECTED_ADDITIONAL_SERVICES]: setSelectedAdditionalServices,

  [ActionTypes.FETCH_TR_ADDITIONAL_SERVICES]: fetchTrAdditionalServices,
  [ActionTypes.FETCH_TR_ADDITIONAL_SERVICES_FAIL]: fetchTrAdditionalServicesFailed,
  [ActionTypes.FETCH_TR_ADDITIONAL_SERVICES_SUCCESS]: fetchTrAdditionalServicesSuccess,
  [ActionTypes.SET_SELECTED_TR_ADDITIONAL_SERVICES]: setSelectedTrAdditionalServices,
  [ActionTypes.SET_COUNTRY_OF_RESIDENCE]: setCountryOfResidence,
  [ActionTypes.SET_NATIONALITY]: setNationality,

  // [ActionTypes.TEST_PAY]: testPay,
  [ActionTypes.PAY_AND_BOOK3DS_SUCCESS]: payAndBook3dsSuccess,
  [ActionTypes.PAY_AND_BOOK3DS_FAIL]: payAndBook3dsFailed
});

const reservationBlacklistedProps = [
  "isLoading",
  "currentStep",
  "cityIndex",
  "nationality",
  "countryOfResidence",
  "steps",
  "flight.departureAirport",
  "flight.departureDate",
  "flight.returnDate",
  "flight.returnAirport",
  "visaLink"
];

const reservationsPersistConfig = {
  key: "reservations",
  storage: storage,
  blacklist: reservationBlacklistedProps.filter(a => !a.includes(".")),
  transforms: [
    createBlacklistTransformation(reservationBlacklistedProps, (key, new_state) => {
      if (key === "arrivalDate" && typeof new_state != "number") {
        return qs_state.cities && qs_state.cities[0].searchCriterias.date.checkInDate;
      } else if (key === "flight") {
        // console.log("black list flight", qs_state.retairport);
        return {
          ...new_state,
          departureAirport: qs_state.depairport,
          departureDate: qs_state.depdate,
          returnDate: qs_state.retdate,
          returnAirport: qs_state.retairport,
          promotionCode: qs_state.fpc || ""
        };
      } else {
        // console.log("key => ", key, "state => ", new_state, "type => ", typeof new_state, isString(new_state));
        return new_state;
      }
    })
  ]
};

export const reducer = persistReducer(reservationsPersistConfig, _reducer);
// export const reducer = _reducer;
