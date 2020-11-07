import config from "config";

export const defaultFilters = [
  { name: "nightsCount", values: [] },
  { name: "priceRange", values: [0, 0] },
  { name: "comfortLevel", values: [] },
  { name: "selectedAmenities", values: [] }
];

export const defaultPagination = {
  pageNumber: 1,
  pageSize: 10,
  hasMoreItems: true
};

export const makkah_step = {
  id: 1,
  isCityStep: true,
  title: "Mecca Hotel",
  name: config.makkah,
  icon: config.makkah,
  status: false,
  cityIndex: 0,
  path: "location"
};
export const madina_step = {
  id: 2,
  isCityStep: true,
  title: "Medinah Hotel",
  name: config.madina,
  icon: config.madina,
  status: true,
  cityIndex: 1,
  path: "location"
};

export const configureBreadcrumb = (qs_state, makkah, madina) => {
  const breadcrumbSteps = [
    // {
    //   id: 1,
    //   title: "Homepage",
    //   name: "home",
    //   icon: "homepage",
    //   status: true,
    //   path: "/"
    // },
    {
      id: 3,
      title: "Transportation",
      name: "transportation",
      icon: "bus",
      status: true,
      path: "transportation"
    },
    {
      id: 4,
      title: "Ground Service",
      name: "ground-service",
      icon: "ground-service",
      status: true,
      path: "ground-services"
    },
    {
      id: 5,
      title: "Flights",
      name: "flights",
      icon: "flight",
      status: true,
      classname: "breadcrumbs__icon--flight",
      path: "flight"
    },

    {
      id: 6,
      title: "Passenger Details",
      name: "passengers",
      icon: "passengers-details",
      status: true,
      path: "passengers"
    },
    // {
    //   id: 7,
    //   title: "E-visa",
    //   name: "visa",
    //   icon: "visa",
    //   status: true,
    //   path: "/evisa"
    // },
    {
      id: 7,
      title: "Review & Pay",
      name: "review",
      icon: "credit-cards",
      status: true,
      path: "review"
    }
  ];
  let cities = [];
  if (!breadcrumbSteps.some(a => !!a.isCityStep)) {
    if (qs_state.startcity === config.madina) {
      cities = [madina, makkah];

      madina_step.id = 1;
      madina_step.cityIndex = 0;

      makkah_step.id = 2;
      makkah_step.cityIndex = 1;

      breadcrumbSteps.splice(0, 0, madina_step, makkah_step);
    } //default state is makkah
    else {
      if (!madina) {
        cities = [makkah];
        breadcrumbSteps.splice(0, 0, makkah_step);
      }
      else {
        cities = [makkah, madina];
        breadcrumbSteps.splice(0, 0, makkah_step, madina_step);
      }
    }
  }

  return { breadcrumbSteps, cities };
};
