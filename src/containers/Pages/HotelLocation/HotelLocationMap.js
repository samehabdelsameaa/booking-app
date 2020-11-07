import React from "react";
import Map from "../../../components/Map";

const icon = "/assets/images/markers/marker-selected.svg";
const fallbackIcon = "/assets/images/markers/marker.svg";

class HotelLocationMap extends React.Component {
  render() {
    const { cityName, latitude, longitude, zoomLevel, mapInfo, markerIcon, isFloatWindowOpen } = this.props;
    return (
      <Map
        city={cityName}
        lat={latitude}
        long={longitude}
        zoom={zoomLevel}
        landMarks={mapInfo}
        id={markerIcon}
        icon={icon}
        fallbackIcon={fallbackIcon}
        isFloatWindowOpen={isFloatWindowOpen}
      />
    );
  }
}

export default HotelLocationMap;
