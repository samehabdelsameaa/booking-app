import React, { Component } from "react";
import { Trans } from "@lingui/macro";
import RoomGroupItem from "./RoomGroup";

class HotelRooms extends Component {
  _totalSelectedRoomCountOfType = (selectedGroups, adt, chd, inf) => {
    return selectedGroups
      .map(rg => {
        const paxInfo = rg.paxInfo;

        let _adults = paxInfo.find(a => a.type == "adt");
        _adults = !!_adults ? _adults.quantity : 0;
        let _children = paxInfo.find(a => a.type == "chd");
        _children = !!_children ? _children.quantity : 0;
        let _infants = paxInfo.find(a => a.type == "inf");
        _infants = !!_infants ? _infants.quantity : 0;

        const match = _adults == adt && _children == chd && _infants == inf;
        if (match)
          return rg.rooms.reduce(
            (total, { selectedQty }) => total + selectedQty,
            0
          );
        else return 0;
      })
      .reduce((total, i) => total + i, 0);
  };

  onToggleRoom = (room, qty, _roomGroup) => {
    const {
      hotelId,
      setSelectedRooms,
      selectedRooms,
      roomsWithPax
    } = this.props;

    //find count of rooms required that matches this room pax, and don't accept greater than it
    let adults = room.tpExtensions.find(a => a.key == "adults").value;
    let children = room.tpExtensions.find(a => a.key == "children").value;
    let infants = room.tpExtensions.find(a => a.key == "infants").value;

    const requiredRoomCount = roomsWithPax.filter(
      a => a.adults == adults && a.children == children && a.infants == infants
    ).length;
    let countOfRoomsThatSelected = parseInt(
      this._totalSelectedRoomCountOfType(
        selectedRooms,
        adults,
        children,
        infants
      )
    );

    const roomGroup = selectedRooms
      .map((rg, rgIndex) => {
        const found = rg.groupId == _roomGroup.groupId;
        if (!found) return undefined;
        const _roomIndex = rg.rooms.findIndex(x => x.roomId == room.roomId);
        return { ...rg, rooms: rg.rooms, roomIndex: _roomIndex, rgIndex };
      })
      .find(a => !!a);

    if (roomGroup != undefined && roomGroup.rooms && roomGroup.rooms.length) {
      const { roomIndex, rgIndex } = roomGroup;
      qty = isNaN(parseInt(qty)) ? 0 : parseInt(qty);
      const selectedRoom = roomIndex > -1 && roomGroup.rooms[roomIndex];
      if (
        qty == 0 &&
        !selectedRoom &&
        requiredRoomCount > countOfRoomsThatSelected
      ) {
        room = { ...room, selectedQty: 1 };
        selectedRooms[rgIndex].rooms.push(room);
      } else if (qty == 0 && !!selectedRoom) {
        //room already selected, unselect it
        selectedRooms[rgIndex].rooms.splice(roomIndex, 1);
      } else if (qty > 0 && selectedRoom && qty == selectedRoom.selectedQty) {
        //the action is to remove here
        selectedRooms[rgIndex].rooms.splice(roomIndex, 1);
      } else {
        if (requiredRoomCount > countOfRoomsThatSelected) {
          qty = isNaN(parseInt(qty))
            ? 1
            : parseInt(qty) == 0
            ? 1
            : parseInt(qty);
          //replace the room new qty
          selectedRoom.selectedQty = qty.toString();
          selectedRooms[rgIndex].rooms[roomIndex] = selectedRoom;
        } else {
          //dont select the room
          return;
        }
      }
    } else {
      if (requiredRoomCount > countOfRoomsThatSelected) {
        qty = isNaN(parseInt(qty)) ? 1 : parseInt(qty) == 0 ? 1 : parseInt(qty);
        //add the room to selected room
        room = { ...room, selectedQty: qty.toString() };
        const _rgIndex = selectedRooms.findIndex(
          a => a.groupId == _roomGroup.groupId
        );
        if (_rgIndex != -1) {
          selectedRooms[_rgIndex].rooms = [room];
        } else {
          const { rooms, ...roomGroupData } = _roomGroup;
          selectedRooms.push({ ...roomGroupData, rooms: [room] });
        }
      } else {
        //dont select the room
        return;
      }
    }

    //update selected room in the store
    setSelectedRooms(hotelId, selectedRooms);
  };

  render() {
    const { roomGroups, selectedRooms } = this.props;
    const roomNo =
      roomGroups && roomGroups.length > 0
        ? roomGroups
            .map(e => {
              return e.rooms.length;
            })
            .reduce((sum, x) => sum + x)
        : 0;
    return (
      <div className="hotel-rooms">
        <div className="container container--md">
          <div className="hotel-rooms__text _text-center">
            {roomNo ? (
              <React.Fragment>
                <Trans id="you_have"> You have </Trans>
                {roomNo} {" "}
                <Trans id="available_room_options_to_choose_from">
                   available room options to choose from at this hotel{" "}
                </Trans>{" "}
              </React.Fragment>
            ) : (
              <React.Fragment><Trans id="you_dont_have_available_rooms"> You don't have available rooms</Trans></React.Fragment>
            )}
          </div>
          {roomGroups &&
            roomGroups.map((rg, i) => {
              return (
                <RoomGroupItem
                  key={i}
                  roomGroup={rg}
                  onToggleRoom={this.onToggleRoom}
                  selectedRooms={selectedRooms}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default HotelRooms;
