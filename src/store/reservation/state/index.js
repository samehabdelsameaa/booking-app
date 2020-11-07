export const configureInitialState = (
  qs_state,
  transportationPackagesMetadata,
  groundservicePackagesMetadata,
  breadcrumbSteps,
  makkah,
  madina
) => {
  return {
    // isPaymentApproved: undefined,
    // paymentDetails: undefined,
    // paymentSessionId: "",
    arrivalDate: qs_state.cities[0].searchCriterias.date.checkInDate, //new Date(2019, 11, 21).getTime(),
    flight: {
      noFlightsAvailable: false,
      signature: "",
      departureAirport: qs_state.depairport,
      departureDate: qs_state.depdate,
      returnDate: qs_state.retdate,
      returnAirport: qs_state.retairport,
      promotionCode: qs_state.fpc || "",
      CurrencyCode: "",
      DisplayCurrencyCode: "",
      PaxResidentCountry: ""
    },
    steps: breadcrumbSteps,
    loadHotels: qs_state.loadHotels,
    currentStep: qs_state.step,
    cityIndex: qs_state.city,
    nationality: qs_state.nat,
    countryOfResidence: qs_state.co,
    cities: qs_state.cities || (madina ? [makkah, madina] : [makkah]),
    transportation: {
      packagesMetadata: transportationPackagesMetadata,
      packages: [],
      selectedPackage: {},
      routes: [],
      selectedRoute: {},
      companies: [],
      companiesSortingCriteria: "",
      selectedCompany: {},
      additionalServices: [],
      selectedAdditionalServices: []
    },
    groundServices: {
      packagesMetadata: groundservicePackagesMetadata,
      packages: [],
      selectedPackage: {},
      companies: [],
      selectedCompany: {},
      additionalServices: [],
      selectedAdditionalServices: []
    },
    passengers: [],
    contactInfo: {
      email: "",
      phoneNumber: "",
      lastName: ""
    },
    isLoading: false,
    visaLink: "https://eservices.haj.gov.sa/eservices3/pages/VisaInquiry/SearchVisa.xhtml",
    myBookings: [],
    completedSteps: {}
  };
};
