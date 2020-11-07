import { createLogic } from "redux-logic";
import { ActionTypes as GlobalActions } from "../app/actions";
import { ActionTypes } from "./actions";
import { push } from "connected-react-router";
import qs from "query-string";
import { parseQueryString, updateParams } from "utils/qs-parser";
import { groupBy, sum } from "utils";
import { qsEncrypt } from "utils/encryption";

export const getPaymentDetailsLogic = createLogic({
  type: [ActionTypes.GET_PAYMENT_DETAILS],
  latest: true,
  async process({ getState, action, api }, dispatch, done) {
    try {
      const { sessionId } = action;
      const res = await api.booking.getPaymentDetails(sessionId);
      if (!res.ok) {
        console.log("Failed", res);
      } else {
        console.log("Success", res);
      }
    } catch (err) { }
    done();
  }
});

export const checkPaymentApprovedLogic = createLogic({
  type: [ActionTypes.CHECK_PAYMENT_APPROVED],
  latest: true,
  async process({ getState, action, api }, dispatch, done) {
    try {
      const { sessionId } = action;
      const res = await api.booking.checkPaymentApproved(sessionId);
      if (!res.ok) {
        console.log("Failed", res);
      } else {
        console.log("Success", res);
      }
    } catch (err) { }
    done();
  }
});

export const testPayLogic = createLogic({
  type: [ActionTypes.TEST_PAY],
  latest: true,
  async process({ getState, action, api }, dispatch, done) {
    try {
      const data = {
        CardType: action.payload.card_type,
        Last4Digit: action.payload.last4,
        CardToken: action.payload.token,
        Currency: window.sessionStorage.getItem("currency")
      };
      const res = await api.booking.pay(data);
      if (!res.ok) {
        console.log(res);
      } else {
        console.log(res);
        var _3dsUrl = res.data.threeDsUrl;
        window.sessionStorage.setItem("booking_object", JSON.stringify({ data: 123 }));
        window.location.href = _3dsUrl;
      }
    } catch (err) { }
    done();
  }
});

export const payAndBookAfter3dsLogic = createLogic({
  type: [ActionTypes.PAY_AND_BOOK3DS],
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      dispatch({ type: GlobalActions.SET_IS_LOADING });

      var bookingObj = window.sessionStorage.getItem("booking_object");
      bookingObj.payment.sessionId = action.sessionId;

      const res = await api.hotels.payAndBookAfter3ds(bookingObj);
      if (!res.ok) {
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        dispatch({
          type: action.type + "_FAIL",
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        dispatch({
          type: action.type + "_SUCCESS",
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
      dispatch({
        type: action.type + "_FAIL",
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const fetchHotelsLogic = createLogic({
  type: [ActionTypes.FETCH_HOTELS, ActionTypes.FETCH_HOTELS_PAGE],
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      if (action.type !== ActionTypes.FETCH_HOTELS_PAGE) {
        dispatch({ type: GlobalActions.SET_IS_LOADING });
      }
      const qs_state = parseQueryString();
      const filters = {};
      filters.pageNumber = action.filters.pagination.pageNumber;
      filters.pageSize = action.filters.pagination.pageSize;
      filters.startWithCityCode = action.filters.cityIndex == 0 ? qs_state.startcity : action.filters.cityName;
      filters.Pax = action.filters.searchCriterias.visitors;
      filters.checkInDate = +action.filters.searchCriterias.date.checkInDate;
      filters.checkOutDate = +action.filters.searchCriterias.date.checkOutDate;
      filters.filters = action.filters.filters;
      filters.trackToken = action.filters.trackToken;

      const res = await api.hotels.fetchHotelsWithFilters(filters);
      if (!res.ok) {
        if (action.type !== ActionTypes.FETCH_HOTELS_PAGE) {
          dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        }
        dispatch({
          type: action.type + "_FAIL",
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        if (action.type !== ActionTypes.FETCH_HOTELS_PAGE) {
          dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        }
        dispatch({
          type: action.type + "_SUCCESS",
          payload: res.data
        });
      }
    } catch (err) {
      if (action.type !== ActionTypes.FETCH_HOTELS_PAGE) {
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
      }
      dispatch({
        type: action.type + "_FAIL",
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const switchCityIndexLogic = createLogic({
  type: ActionTypes.SWITCH_CITY_INDEX,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      // console.log("catching city select change");
    } catch { }
    done();
  }
});

export const fetchRoutesLogic = createLogic({
  type: [ActionTypes.FETCH_ROUTES],
  latest: true,
  async process({ getState, action, api }, dispatch, done) {
    try {
      dispatch({ type: GlobalActions.SET_IS_LOADING });
      const qs_state = parseQueryString();
      let query = {
        StartCityCode: qs_state.startcity || ""
      };
      const res = await api.transportation.getRoutes(query);
      if (!res.ok) {
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        dispatch({
          type: ActionTypes.FETCH_ROUTES_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        dispatch({
          type: ActionTypes.FETCH_ROUTES_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
      dispatch({
        type: ActionTypes.FETCH_ROUTES_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const fetchTransportationPackagesLogic = createLogic({
  type: [ActionTypes.FETCH_TRANSPORTATION_PACKAGES],
  latest: true,
  async process({ getState, action, api }, dispatch, done) {
    try {
      dispatch({ type: GlobalActions.SET_IS_LOADING });
      const res = await api.transportation.getPackages();
      if (!res.ok) {
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        dispatch({
          type: ActionTypes.FETCH_TRANSPORTATION_PACKAGES_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        dispatch({
          type: ActionTypes.FETCH_TRANSPORTATION_PACKAGES_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
      dispatch({
        type: ActionTypes.FETCH_TRANSPORTATION_PACKAGES_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const fetchTransportationCompaniesLogic = createLogic({
  type: [ActionTypes.FETCH_TRANSPORTATION_COMPANIES],
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      dispatch({ type: GlobalActions.SET_IS_LOADING });
      const transportation = getState().reservations.transportation;
      const pax = getState().reservations.cities[0].searchCriterias.visitors;
      let adultsQuantity = pax.map(e => e.adults).reduce((a, b) => a + b, 0);
      // console.log(transportation);
      let query = {
        SelectedPackageCode: transportation.selectedPackage.code,
        SelectedRouteCode: transportation.selectedRoute.code,
        StartDate: getState().reservations.arrivalDate,
        Quantity: 1,
        PaxCount: adultsQuantity
        // Model: { from: 2015, to: 2019 }
        //todo: add additional services here
      };
      // console.log(query);
      const res = await api.transportation.search(query);
      if (!res.ok) {
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        dispatch({
          type: ActionTypes.FETCH_TRANSPORTATION_COMPANIES_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        dispatch({
          type: ActionTypes.FETCH_TRANSPORTATION_COMPANIES_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
      dispatch({
        type: ActionTypes.FETCH_TRANSPORTATION_COMPANIES_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const fetchGroundServicesPackagesLogic = createLogic({
  type: [ActionTypes.FETCH_GROUND_SERVICES_PACKAGES],
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      dispatch({ type: GlobalActions.SET_IS_LOADING });

      const res = await api.groundService.getPackages();
      if (!res.ok) {
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        dispatch({
          type: ActionTypes.FETCH_GROUND_SERVICES_PACKAGES_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        dispatch({
          type: ActionTypes.FETCH_GROUND_SERVICES_PACKAGES_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
      dispatch({
        type: ActionTypes.FETCH_GROUND_SERVICES_PACKAGES_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const fetchGroundServicesCompaniesLogic = createLogic({
  type: [ActionTypes.FETCH_GROUND_SERVICES_COMPANIES],
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      dispatch({ type: GlobalActions.SET_IS_LOADING });

      const _state = getState().reservations;
      const pax = _state.cities[0].searchCriterias.visitors;
      const packageCode = _state.groundServices.selectedPackage.code;
      const { arrivalDate, nationality, countryOfResidence } = _state;
      const selectedAdditionalServices = _state.groundServices.additionalServices.filter(x => x.qty && x.duration);
      let adultsQuantity = pax.map(e => e.adults).reduce((a, b) => a + b, 0);
      let query = {
        ArrivalDate: arrivalDate,
        CountryOfResidence: nationality,
        Nationality: countryOfResidence,
        PackageCode: packageCode,
        Quantity: adultsQuantity,
        AdditionalServices: selectedAdditionalServices
      };
      const res = await api.groundService.search(query);
      if (!res.ok) {
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        dispatch({
          type: ActionTypes.FETCH_GROUND_SERVICES_COMPANIES_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        dispatch({
          type: ActionTypes.FETCH_GROUND_SERVICES_COMPANIES_SUCCESS,
          companies: res.data
        });
      }
    } catch (err) {
      dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
      dispatch({
        type: ActionTypes.FETCH_GROUND_SERVICES_COMPANIES_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const fetchPassengersForVisaCheckLogic = createLogic({
  type: [ActionTypes.FETCH_PASSENGERS_FOR_VISA_CHECK],
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      dispatch({ type: GlobalActions.SET_IS_LOADING });
      const passengersList = getState().reservations.passengers;
      const countries = getState().home.isoCountries;

      const paxsList = passengersList.map(({ passportNo, nationalityCode }) => ({
        passportNumber: passportNo,
        nationalityNumber: countries.find(a => a.twoCode.toLowerCase() == nationalityCode.toLowerCase()).numericCode
      }));

      const res = await api.booking.checkForVisaStatus(paxsList);
      if (!res.ok) {
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        dispatch({
          type: ActionTypes.FETCH_PASSENGERS_FOR_VISA_CHECK_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        dispatch({
          type: ActionTypes.FETCH_PASSENGERS_FOR_VISA_CHECK_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
      dispatch({
        type: ActionTypes.FETCH_PASSENGERS_FOR_VISA_CHECK_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const routeToHotelIdLogic = createLogic({
  type: [ActionTypes.ROUTE_TO_HOTEL_ID],
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    var updatedQsString = updateParams({
      hotelId: action.hotelId,
      originalCode: action.originalCode,
      setHotel: true
    });

    dispatch(push(`/hotel?${qsEncrypt(updatedQsString)}`));
    done();
  }
});

export const setSelectedRoomsLogic = createLogic({
  type: [ActionTypes.SET_SELECTED_ROOMS],
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    const { hotelId, selectedRooms } = action;
    // console.log("setting hotel selected rooms", hotelId, selectedRooms);
    let qsString = window.location.href ? window.location.href.split("?")[1] : "";
    const params = qs.parse(qsString);
    if (params) {
      const { city, hotelId } = params;
      // console.log("city, hotelId", city, hotelId);
    }

    done();
  }
});

export const getHotelDetailsLogic = createLogic({
  type: ActionTypes.GET_HOTEL_DETAILS,
  latest: true,
  async process({ getState, action, api }, dispatch, done) {
    try {
      dispatch({ type: GlobalActions.SET_IS_LOADING });
      const { hotelId, originalCode } = action;
      const cityIndex = getState().reservations.cityIndex;
      let filters = getState().reservations.cities[cityIndex];
      const hotel = filters.hotels[filters.hotels.findIndex(a => a.id == hotelId)];

      let query = {
        checkInDate: filters.searchCriterias.date.checkInDate,
        checkOutDate: filters.searchCriterias.date.checkOutDate,
        pax: filters.searchCriterias.visitors,
        hotelId: hotelId,
        originalCode: originalCode,
        StartWithCityCode: filters.cityName,
        config: hotel.config,
        vendor: hotel.vendor,
        provider: hotel.provider,
        trackToken: filters.trackToken
      };

      const res = await api.hotels.hotelDetails(query);
      if (!res.ok) {
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        dispatch({
          type: ActionTypes.GET_HOTEL_DETAILS_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        // console.log(res.data);
        dispatch({
          type: ActionTypes.GET_HOTEL_DETAILS_SUCCESS,
          payload: res.data
        });
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
      }
    } catch (err) {
      // console.log("error ", err);
      dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
      dispatch({
        type: ActionTypes.GET_HOTEL_DETAILS_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

let retryCount = 0;
const MAX_RETRY = 3;

export const getFlightsLogic = createLogic({
  type: ActionTypes.GET_FLIGHTS_DATA,
  latest: true,
  async process({ getState, action, api }, dispatch, done) {
    try {
      dispatch({ type: GlobalActions.SET_IS_LOADING });

      const state = getState().reservations.flight;

      if (!state.signature || state.signature === "") {
        const signatureRes = await api.flights.getSignature();
        if (!signatureRes.ok) {
          dispatch({
            type: ActionTypes.GET_SIGNATURE_FAIL,
            payload: signatureRes.data.Error || signatureRes.data.Message || "Unknown Error",
            error: true
          });
        } else {
          dispatch({
            type: ActionTypes.GET_SIGNATURE_SUCCESS,
            payload: signatureRes.data
          });
        }
      }
      const qs_state = parseQueryString();

      const signature = getState().reservations.flight.signature;
      const departureAirport = state.departureAirport;
      const returnAirport = state.returnAirport || qs_state.retairport;
      const departureDate = state.departureDate;
      const returnDate = state.returnDate;

      const gPassengers = groupBy(getState().reservations.passengers, "type");
      const passengers = Object.keys(gPassengers).map(a => {
        let t = a.toLowerCase();
        switch (t) {
          case "child":
            t = "CHD";
            break;
          case "infant":
            t = "INF";
            break;
          case "adult":
          default:
            t = "ADT";
            break;
        }

        return { PaxType: t, PaxCount: gPassengers[a].length };
      });
      const paxCount = sum(passengers, "PaxCount");
      const query = {
        ArrivalStation: returnAirport,
        DepartureStation: departureAirport,
        BeginDate: departureDate,
        EndDate: returnDate,
        Dow: "Daily",
        PaxCount: paxCount,
        PromotionCode: action.promoCode || "",
        CurrencyCode: window.sessionStorage.getItem("currency"),
        DisplayCurrencyCode: window.sessionStorage.getItem("currency"),
        PaxResidentCountry: getState().reservations.nationality,
        Paxs: passengers
      };
      const res = await api.flights.getFlightsData(query, signature);
      if (!res.ok) {
        //session expired
        if (retryCount <= MAX_RETRY && res.data && res.data.Error && res.data.Error.Code && res.data.Error.Code == 4000) {
          retryCount++;
          const signatureRes = await api.flights.getSignature();
          if (!signatureRes.ok) {
            dispatch({
              type: ActionTypes.GET_SIGNATURE_FAIL,
              payload: signatureRes.data.Error || signatureRes.data.Message || "Unknown Error",
              error: true
            });
          } else {
            dispatch({
              type: ActionTypes.GET_SIGNATURE_SUCCESS,
              payload: signatureRes.data
            });
          }
          dispatch({
            type: ActionTypes.GET_FLIGHTS_DATA,
            payload: action.payload
          });
          done();
          return;
        }
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
        dispatch({
          type: ActionTypes.GET_FLIGHTS_DATA_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({
          type: ActionTypes.GET_FLIGHTS_DATA_SUCCESS,
          payload: res.data
        });
        dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
      }
    } catch (err) {
      retryCount = 0;
      // console.log("error ", err);
      dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
      dispatch({
        type: ActionTypes.GET_FLIGHTS_DATA_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const getSignatureLogic = createLogic({
  type: ActionTypes.GET_SIGNATURE,
  latest: true,
  async process({ getState, action, api }, dispatch, done) {
    try {
      // dispatch({ type: GlobalActions.SET_IS_LOADING });
      const res = await api.flights.getSignature();
      if (!res.ok) {
        dispatch({
          type: ActionTypes.GET_SIGNATURE_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({
          type: ActionTypes.GET_SIGNATURE_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      // console.log("error ", err);
      dispatch({ type: GlobalActions.CLEAR_IS_LOADING });
      dispatch({
        type: ActionTypes.GET_SIGNATURE_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const fetchKnownPlacesLogic = createLogic({
  type: ActionTypes.FETCH_KNOWN_PLACES,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.lookups.getKnownPlaces();
      if (!res.ok) {
        dispatch({
          type: ActionTypes.FETCH_KNOWN_PLACES_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({
          type: ActionTypes.FETCH_KNOWN_PLACES_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.FETCH_KNOWN_PLACES_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const getFlightPriceLogic = createLogic({
  type: ActionTypes.GET_FLIGHT_PRICE,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      // const { departureFlight, returnFlight } = getState().reservations.flight;
      const { cities } = getState().reservations;

      let adults = { Type: "ADT", Count: 0 };
      let childs = { Type: "CHD", Count: 0 };
      let infants = { Type: "INFT", Count: 0 };
      cities[0].searchCriterias.visitors.forEach(e => {
        adults.Count += e.adults;
        childs.Count += e.children;
        infants.Count += e.infants;
      });
      const departureFlight = action.joureny;
      let requestObj = {
        Journeys: [
          {
            JourneySellKey: departureFlight.JourneySellKey,
            FareSellKey: departureFlight.fareSellKey,
            FlightDesignator: departureFlight.journey.segments[0].flightDesignator,
            DepartureDate: departureFlight.journey.segments[0].std,
            Arrival: departureFlight.arrival,
            Departure: departureFlight.departure,
            segments: departureFlight.journey.segments,
            SSR: departureFlight.journey.segments[0].paxSSRs
          }
        ],
        PaxDetails: [adults],
        ResidentCountry: getState().reservations.countryOfResidence,
        CurrencyCode: window.sessionStorage.getItem("currency"),
        BundleService: departureFlight.packageCode
      };
      const res = await api.flights.getTotalPrice(requestObj);
      if (!res.ok) {
        dispatch({
          type: ActionTypes.GET_FLIGHT_PRICE_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({
          type: ActionTypes.GET_FLIGHT_PRICE_SUCCESS,
          payload: { total: res.data, type: action.joureny.type }
        });
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.GET_FLIGHT_PRICE_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});
export const payAndBookLogic = createLogic({
  type: ActionTypes.PAY_AND_BOOK,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      console.log("action ", action);
      const { payment } = action;
      const {
        nationality,
        countryOfResidence,
        cities,
        transportation,
        groundServices,
        flight,
        contactInfo,
        passengers,
        sessionId
      } = getState().reservations;
      let _sessionId = "";
      if (Array.isArray(sessionId)) _sessionId = sessionId.join();
      else _sessionId = sessionId;

      let totalAmount = 0.0;
      cities.forEach(c => {
        totalAmount += c.selctedRooms.reduce((hotelTotal, a) => {
          return (
            hotelTotal +
            a.rooms.reuce((total, r) => {
              return total + r.amount;
            })
          );
        });
      });

      totalAmount += transportation.selectedCompany.totalAmount;
      totalAmount += groundServices.selectedCompany.totalAmount;
      //todo change to flight total
      totalAmount += flight.totalAmount || 0.0;

      let requestObj = {
        Metadata: {
          language: window.sessionStorage.getItem("language"),
          Culture: window.sessionStorage.getItem("cultureCode"),
          Nationality: nationality,
          CountryCode: countryOfResidence,
          SessionId: _sessionId,
          EstimatedTotal: totalAmount
        },
        ContactInfo: {
          Email: contactInfo.email,
          LastName: contactInfo.lastName,
          PhoneNumber: contactInfo.phoneNumber
        },
        Hotels: cities.map(e => {
          return {
            TrackToken: e.selectedHotel.trackToken,
            OriginalCode: e.selectedHotel.originalCode,
            UmrahHotelCode: e.selectedHotel.umrahHotelCode,
            Name: e.selectedHotel.hotelName,
            CheckInDate: e.searchCriterias.date.checkInDate,
            CheckOutDate: e.searchCriterias.date.checkOutDate,
            Vendor: e.selectedHotel.vendor,
            Provider: e.selectedHotel.provider,
            LocationName: e.cityName,
            LocationCode: e.cityCode,
            CountryCode: countryOfResidence,
            Policies: "",
            Config: e.selectedHotel.config || null,
            RoomGroups: e.selectedRooms,
            SecureTpExtensions: e.selectedHotel.secureTpExtensions || null
          };
        }),
        Transportation: {
          TrackToken: transportation.trackToken,
          Vendor: transportation.selectedCompany.vendor,
          Provider: transportation.selectedCompany.vendor,
          CategoryCode: transportation.selectedPackage.code,
          RouteCode: transportation.selectedRoute.code,
          CompanyCode: transportation.selectedCompany.companyCode,
          StartDate: cities[0].searchCriterias.date.checkInDate,
          //todo: user should be able to choose multi vehicle not only qty
          VehicleTypes: [transportation.selectedCompany].map(a => {
            return {
              vehicleTypeCode: a.vehicleTypeCode,
              categories: [
                {
                  categoryCode: a.packageCode,
                  availableQuantity: a.availableQuantity,
                  maxPaxCapacity: a.maxPaxCapacity,
                  displayRateInfo: a.displayRateInfo,
                  additionalServices: transportation.selectedAdditionalServices,
                  termsAndConditions: a.termsAndConditions,
                  quantity: a.count,
                  noOfPax: passengers.length,
                  model: a.model
                }
              ],
              config: a.config,
              tpExtensions: a.tpExtensions
            };
          })
        },
        GroundService: {
          TrackToken: groundServices.trackToken,
          UoCode: groundServices.selectedCompany.companyCode,
          nationality: nationality,
          countryOfResidence: countryOfResidence,
          Vendor: groundServices.selectedCompany.vendor,
          Provider: groundServices.selectedCompany.provider,
          Category: {
            ...groundServices.selectedCompany.category,
            quantity: passengers.length
          },
          AdditionalServices: groundServices.selectedAdditionalServices,
          Policies: null,
          TermsAndConditions: "",
          Config: groundServices.selectedCompany.config,
          TpExtensions: groundServices.selectedCompany.tbExtensions || null
        },
        Flight: {
          ArrivalDateAndTime: new Date(flight.selectedJourneys.returnFlight.arrivalDate).getTime(),
          ArrivalFlightNumber: flight.selectedJourneys.returnFlight.flightNo,
          ArrivalAirportCode: flight.selectedJourneys.returnFlight.returnAirportCode,
          ArrivalFlightDuration: 0, // flight.selectedJourneys.returnFlight.duration,
          ArrivalStops: flight.selectedJourneys.returnFlight.stops,
          ArrivalFlightClass: flight.selectedJourneys.returnFlight.package,
          DepartureDateAndTime: new Date(flight.selectedJourneys.departureFlight.departureDate).getTime(),
          DepartureFlightNumber: flight.selectedJourneys.departureFlight.flightNo,
          DepartureAirportCode: flight.selectedJourneys.departureFlight.departureAirportCode,
          DepartureFlightDuration: 0, //flight.selectedJourneys.departureFlight.duration,
          DepartureStops: flight.selectedJourneys.departureFlight.stops,
          DepartureFlightClass: flight.selectedJourneys.departureFlight.package,
          Journeys: [
            {
              JourneySellKey: flight.selectedJourneys.departureFlight.JourneySellKey,
              FareSellKey: flight.selectedJourneys.departureFlight.fareSellKey
            },
            {
              JourneySellKey: flight.selectedJourneys.returnFlight.JourneySellKey,
              FareSellKey: flight.selectedJourneys.returnFlight.fareSellKey
            }
          ],
          Signature: flight.signature
        },
        passengers: passengers.map(x => {
          return {
            isMainPax: x.isLeadGuest,
            address: x.address,
            birthDate: x.birthDate,
            city: x.city,
            country: x.country,
            countryCode: x.countryCode,
            district: x.district,
            email: x.email,
            fax: x.fax,
            firstName: x.firstName,
            gender: x.gender,
            homePhoneNumber: x.homePhoneNumber,
            homePhoneNumberCountryCode: x.homePhoneNumberCountryCode,
            lastName: x.lastName,
            middleName: x.middleName,
            nationalityCode: x.nationalityCode,
            passportExpiryDate: x.passportExpiryDate,
            passportIssuingDate: x.passportIssuingDate,
            passportNo: x.passportNo,
            phoneNumber: x.phoneNumber,
            phoneNumberCountryCode: x.phoneNumberCountryCode,
            state: x.state,
            status: x.status,
            title: x.title,
            type: x.type,
            visaFees: x.visaFees,
            zipCode: x.zipCode,
            RoomId: ""
          };
        }),
        Payment: {
          // Amount: "",
          // CardHolderName: "",
          CardType: payment.card_type,
          Last4Digit: payment.last4,
          CardToken: payment.token,
          Currency: window.sessionStorage.getItem("currency")
        }
      };
      console.log(JSON.stringify(requestObj));
      // debugger;
      const res = await api.booking.book(requestObj);
      if (!res.ok) {
        dispatch({
          type: ActionTypes.PAY_AND_BOOK_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        if (!!res.data.pending) {
          var _3dsUrl = res.data.threeDsUrl;
          window.sessionStorage.setItem("booking_object", JSON.stringify(requestObj));
          window.location.href = _3dsUrl;
        } else {
          dispatch({
            type: ActionTypes.PAY_AND_BOOK_SUCCESS,
            payload: res.data
          });
        }
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.PAY_AND_BOOK_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const fetchMyBookingsLogic = createLogic({
  type: ActionTypes.FETCH_MY_BOOKINGS,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.booking.myBookings();
      if (!res.ok) {
        dispatch({
          type: ActionTypes.FETCH_MY_BOOKINGS_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({
          type: ActionTypes.FETCH_MY_BOOKINGS_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.FETCH_MY_BOOKINGS_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const fetchGsAdditionalServicesLogic = createLogic({
  type: ActionTypes.FETCH_GS_ADDITIONAL_SERVICES,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.groundService.getAdditionalServices();
      if (!res.ok) {
        dispatch({
          type: ActionTypes.FETCH_GS_ADDITIONAL_SERVICES_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({
          type: ActionTypes.FETCH_GS_ADDITIONAL_SERVICES_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.FETCH_GS_ADDITIONAL_SERVICES_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const fetchTrAdditionalServicesLogic = createLogic({
  type: ActionTypes.FETCH_TR_ADDITIONAL_SERVICES,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.transportation.getAdditionalServices();
      if (!res.ok) {
        dispatch({
          type: ActionTypes.FETCH_TR_ADDITIONAL_SERVICES_FAIL,
          payload: res.data.Error || res.data.Message || "Unknown Error",
          error: true
        });
      } else {
        dispatch({
          type: ActionTypes.FETCH_TR_ADDITIONAL_SERVICES_SUCCESS,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.FETCH_TR_ADDITIONAL_SERVICES_FAIL,
        payload: err,
        error: true
      });
    }
    done();
  }
});

export const setPassengerInfoLogic = createLogic({
  type: ActionTypes.SET_PASSENGERS_CONTACTS_INFO,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      console.log("logic ", action);
    } catch (err) { }
    done();
  }
});

export default [
  fetchHotelsLogic,
  fetchRoutesLogic,
  fetchTransportationPackagesLogic,
  fetchTransportationCompaniesLogic,
  fetchGroundServicesPackagesLogic,
  fetchGroundServicesCompaniesLogic,
  fetchPassengersForVisaCheckLogic,
  getHotelDetailsLogic,
  switchCityIndexLogic,
  getFlightsLogic,
  routeToHotelIdLogic,
  setSelectedRoomsLogic,
  getSignatureLogic,
  fetchKnownPlacesLogic,
  payAndBookLogic,
  getFlightPriceLogic,
  fetchMyBookingsLogic,
  fetchGsAdditionalServicesLogic,
  setPassengerInfoLogic,
  fetchTrAdditionalServicesLogic,
  payAndBookAfter3dsLogic,
  checkPaymentApprovedLogic,
  getPaymentDetailsLogic,
  testPayLogic
];
