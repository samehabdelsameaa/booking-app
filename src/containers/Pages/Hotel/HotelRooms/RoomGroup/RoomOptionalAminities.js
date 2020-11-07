import React from "react";

export const RoomOptionalAminities = ({ optionalAminities }) => {
  const aminities = optionalAminities.map((aminity, index) => {
    return (
      <div className="amenities__list-item" key={index}>
        <span> {aminity} </span>
      </div>
    );
  });
  return aminities;
};

export const RoomAminitiesInfo = ({ aminitiesInfo }) => {
  const aminities =
    aminitiesInfo &&
    aminitiesInfo.map((aminityItem, index) => {
      return (
        <div className="amenities__group" key={index}>
          <span className="amenities__title">{aminityItem.label}</span>
          <span className="amenities__text"> {aminityItem.value} </span>
        </div>
      );
    });
  return aminities;
};

export const RoomMaxGuests = ({ count }) => {
  const maxGuests = [];
  if (count) {
    for (let i = 0; i < count; i++) {
      maxGuests.push(
        <svg width="19" height="19" key={i}>
          <use href="#avatar"></use>
        </svg>
      );
    }
  }
  return maxGuests;
};
