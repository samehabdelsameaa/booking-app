export const routesList = [
  {
    id: 1,
    routeImage: "./assets/images/transportation/route-bus.png",
    routeStartPoint: "Jeddah",
    routeEndPoint: "Jeddah",
    routePoints: [
      { id: 1, city: "Jeddah", icon: "flight" },
      { id: 2, city: "mecca", icon: "mecca" },
      { id: 3, city: "Madinah", icon: "madinah" },
      { id: 4, city: "Jeddah", icon: "flight" }
    ]
  },
  {
    id: 2,
    routeImage: "./assets/images/transportation/route-bus.png",
    routeStartPoint: "Jeddah",
    routeEndPoint: "Jeddah",
    routePoints: [
      { id: 1, city: "Jeddah", icon: "flight" },
      { id: 2, city: "mecca", icon: "mecca" },
      { id: 3, city: "Madinah", icon: "madinah" },
      { id: 4, city: "Jeddah", icon: "flight" }
    ]
  },
  {
    id: 3,
    routeImage: "./assets/images/transportation/route-bus.png",
    routeStartPoint: "Jeddah",
    routeEndPoint: "Jeddah",
    routePoints: [
      { id: 1, city: "Jeddah", icon: "flight" },
      { id: 2, city: "mecca", icon: "mecca" },
      { id: 3, city: "Madinah", icon: "madinah" },
      { id: 4, city: "Jeddah", icon: "flight" }
    ]
  }
];

export const transportationPackages = [
  {
    id: 0,
    packageClass: "economy",
    roundTrip: true,
    VehicleTypes: {
      isAvailable: false,
      count: 10
    },
    mazarat: false,
    meal: false
  },
  {
    id: 1,
    packageClass: "standard",
    roundTrip: true,
    VehicleTypes: {
      isAvailable: true,
      count: 7
    },
    mazarat: true,
    meal: false
  },
  {
    id: 2,
    packageClass: "ultimate",
    roundTrip: true,
    VehicleTypes: {
      isAvailable: true,
      count: 7
    },
    mazarat: true,
    meal: true
  }
];

export const companies = [
  {
    id: 1,
    vehcileType: "suv",
    vehicleImage: "./assets/images/ground/company.png",
    companyName: "Company xyz for pilgrims and tourism transportation service",
    price: 2200.78,
    rating: 4,
    userRating: "Very Good"
  },
  {
    id: 2,
    vehcileType: "suv",
    vehicleImage: "./assets/images/ground/company.png",
    companyName: "Company xyz for pilgrims and tourism transportation service",
    price: 3500.78,
    rating: 3,
    userRating: "Good"
  },
  {
    id: 3,
    vehcileType: "bus",
    vehicleImage: "./assets/images/ground/company.png",
    companyName: "Company xyz for pilgrims and tourism transportation service",
    price: 2500.78,
    rating: 4,
    userRating: "Very Good"
  },
  {
    id: 4,
    vehcileType: "minivan",
    vehicleImage: "./assets/images/ground/company.png",
    companyName: "Company xyz for pilgrims and tourism transportation service",
    price: 1500.78,
    rating: 5,
    userRating: "Excellent"
  }
];

export const transportationPackagesItems = [
  { label: "Round trip", icon: "" },
  { label: "Vehicle types count", icon: "" },
  { label: "Mazarat", icon: "" },
  { label: "Meal", icon: "" }
];
