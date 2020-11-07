import { createActions } from "utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    testPay: { args: ["payload"] },
    checkPaymentApproved: { args: ["sessionId"] },
    getPaymentDetails: { args: ["sessionId"] },
    payAndBook3ds: { args: ["sessionId"], meta: { async: true } },
    reset: {},
    initSession: { args: ["departureAirport", "dates", "pax"] },
    fetchHotels: { args: ["filters"], meta: { async: true } },
    fetchHotelsPage: { args: ["filters"], meta: { async: true } },
    setCurrentStep: { args: ["payload"] },

    setDepartureFlight: { args: ["airport", "dates"] },
    setReturnFlight: { args: ["airport"] },

    routeToHotelId: { args: ["hotelId", "originalCode"] },
    getHotelDetails: { args: ["hotelId", "originalCode"], meta: { async: true } },
    setSelectedRooms: { args: ["hotelId", "selectedRooms"] },

    switchCityIndex: { args: ["cityIndex"] },
    setCityHotels: { args: ["hotels"] },
    setCitySearchCriterias: { args: ["searchCriterias"] },
    fetchTransportationPackages: { args: [], meta: { async: true } },
    setSelectedTransportationPackage: { args: ["package"] },
    fetchRoutes: { args: [], meta: { async: true } },
    setSelectedRoute: { args: ["route"] },
    fetchTransportationCompanies: { args: [], meta: { async: true } },
    setSelectedTransportationCompany: { args: ["company"] },
    sortTransportationCompaniesList: { args: ["sortByCriteria"] },
    setCityOrder: { args: ["startCity"] },

    fetchGroundServicesPackages: { args: [], meta: { async: true } },
    setSelectedGroundServicesPackage: {
      args: ["package"]
    },
    fetchGroundServicesCompanies: {
      args: [],
      meta: { async: true }
    },
    setSelectedGroundServicesCompany: { args: ["company"] },
    setSelectedRoomPreferences: { args: ["preferences", "roomTypeIndex"] },
    setPassengersContactsInfo: { args: ["passengersInfo", "contactsInfo"] },
    fetchPassengersForVisaCheck: { args: [], meta: { async: true } },
    getFlightsData: { args: ["promoCode"], meta: { async: true } },
    getSignature: { args: [], meta: { async: true } },
    setSelectedFlight: { args: ["data"] },

    clearSignature: { args: [] },
    fetchKnownPlaces: { meta: { async: true } },

    payAndBook: { args: ["payment"], meta: { async: true } },
    // addPaymentData: { args: ["data"] },
    getFlightPrice: { args: ["joureny"], meta: { async: true } },
    fetchMyBookings: { meta: { async: true } },
    fetchGsAdditionalServices: { meta: { async: true } },
    setSelectedAdditionalServices: { args: ["selectedServices"] },
    fetchTrAdditionalServices: { meta: { async: true } },
    setSelectedTrAdditionalServices: { args: ["selectedService"] },
    setNationality: { args: ["nationalityCode"] },
    setCountryOfResidence: { args: ["countryCode"] },
  },
  {
    prefix: "@app/reservation/"
  }
);

export const ActionTypes = Types;
export default Creators;
