import React from "react";
import { Trans } from '@lingui/macro';
import Map from "components/Map";
import MapMarkerCard from "../HotelLocation/MapMarkerCard";

const icon = "/assets/images/markers/marker-selected.svg";
const fallbackIcon = "/assets/images/markers/marker.svg";

class HotelMap extends React.Component {
  render() {
    const { lat, long, cityName, zoomLevel, mapInfo, locationsMarkers, nearByAreas, knownPlacesDistances } = this.props;
    return (
      <div className="hotel-map" id="mapLocation">
        <div className="container container--md">
          <div className="hotel__title">
            <svg width="40" height="40">
              <use href="#map-marker"></use>
            </svg>
            <span><Trans id="what_s_around"> What's Around </Trans> </span>
          </div>
          <div className="hotel-map__map" style={{ position: "relative" }}>
            {lat && long ? (
              <Map
                city={cityName}
                lat={parseFloat(lat)}
                long={parseFloat(long)}
                zoom={zoomLevel}
                landMarks={locationsMarkers}
                render={() => <MapMarkerCard mapData={mapInfo} />}
                icon={icon}
                fallbackIcon={fallbackIcon}
              />
            ) : (
              ""
            )}
          </div>
          <div className="hotel-places">
            {knownPlacesDistances &&
              knownPlacesDistances.map(({ id, distanceInkilo, distanceInMile }, i) => {
                let placeName = nearByAreas.find(item => item.code === id).placeName;
                return (
                  <div className="hotel-places__item" key={i}>
                    <svg width="16" height="16">
                      <use href="#location"></use>
                    </svg>
                    <div>
                      <span className="hotel-places__text"> {placeName} </span>{" "}
                      <span className="hotel-places__text hotel-places__text--light">
                        {` ( ${distanceInkilo} km / ${distanceInMile} mi )`}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default HotelMap;
