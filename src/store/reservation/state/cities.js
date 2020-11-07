export const configureCities = (qs_state, defaultFilters, defaultPagination) => {
  const makkah = {
    cityName: "Makkah",
    cityCode: "SA1",
    latitude: 21.4233733,
    longitude: 39.821831,
    zoomLevel: 12.5,
    hotels: [],
    selectedHotel: {},
    selectedRooms: [],
    selectedRoomOptionalAmenities: {},
    hotelAmenities: [],
    searchCriterias: {
      date: {
        checkInDate: qs_state.startcity != "madina" ? qs_state.city1in : qs_state.city2in,
        checkOutDate: qs_state.startcity != "madina" ? qs_state.city1out : qs_state.city2out
      },
      visitors: qs_state.pax
    },
    filters: defaultFilters,
    pagination: defaultPagination,
    knownPlaces: []
  };

  const madina = {
    cityName: "Madinah",
    cityCode: "SA4",
    latitude: 24.4644423,
    longitude: 39.5991302,
    zoomLevel: 14.12,
    hotels: [],
    selectedHotel: {},
    selectedRooms: [],
    selectedRoomOptionalAmenities: {},
    hotelAmenities: [],
    searchCriterias: {
      date: {
        checkInDate: qs_state.startcity == "madina" ? qs_state.city1in : qs_state.city2in,
        checkOutDate: qs_state.startcity == "madina" ? qs_state.city1out : qs_state.city2out
      },
      visitors: qs_state.pax
    },
    filters: defaultFilters,
    pagination: defaultPagination,
    knownPlaces: []
  };
  const { checkInDate, checkOutDate } = madina.searchCriterias.date;
  if (checkInDate == checkOutDate)
    return { makkah };
  else
    return { makkah, madina };
};
