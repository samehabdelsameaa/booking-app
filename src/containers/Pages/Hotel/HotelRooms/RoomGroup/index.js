import React, { Component } from "react";
import classNames from "classnames";
import { CurrencyContext } from "containers/Providers/CurrencyProvider";
import { Trans, NumberFormat } from "@lingui/macro";
import RoomQtyDropdown from "./RoomQtyDropdown";
import { RoomOptionalAminities } from "./RoomOptionalAminities";

class RoomGroup extends React.Component {
  render() {
    const { roomGroup, selectedRooms, onToggleRoom } = this.props;
    const matchedRoomGroup = selectedRooms.find(a => a.groupId == roomGroup.groupId);

    const itemOptions =
      roomGroup &&
      roomGroup.rooms &&
      roomGroup.rooms.map((room, index) => {
        const theRoom =
          matchedRoomGroup &&
          matchedRoomGroup.rooms
            .map(_r => {
              const found = _r.roomId == room.roomId;
              return {
                found,
                selectedQty: _r.selectedQty
              };
            })
            .find(a => !!a.found);
            
        const isSelected = theRoom && theRoom.found;
        const selectedQty = theRoom && theRoom.selectedQty;
        return (
          <Room
            key={index}
            selected={isSelected}
            onToggleRoom={(room, qty) => onToggleRoom(room, qty, roomGroup)}
            room={room}
            selectedQty={isSelected ? selectedQty : "0"}
          />
        );
      });
    return itemOptions;
  }
}

class Room extends React.Component {
  render() {
    const { room, selected, selectedQty, onToggleRoom } = this.props;
    const { name, quantity, breakfast, refundable, maxGuests, description, amount, OptionOrder } = room;
    return (
      <div
        className={classNames(
          "room-item",
          {
            "room-item--dark": OptionOrder % 2 === 0 ? true : false
          },
          {
            active: selected
          }
        )}
      >
        <div className="room-row">
          <div className="room-column room-options">
            <div className="room-options__title"> {name} </div>
            <div className="room-options__tag-group">
              <div className="room-options__tag room-options__tag--meal">
                <Trans id="breakfast_for"> Breakfast for </Trans> {breakfast}
              </div>
            </div>
            <div className="room-options__tag-group">
              {refundable ? (
                <>
                  <div className="room-options__tag room-options__tag--refundable">
                    {" "}
                    <Trans id="refundable"> Refundable </Trans>{" "}
                  </div>
                </>
              ) : (
                <div className="room-options__tag room-options__tag--non-refundable">
                  {" "}
                  <Trans id="Non_refundable"> Non-refundable </Trans>{" "}
                </div>
              )}
            </div>
          </div>
          <div className="room-column room-guests">
            {quantity > 1 && (
              <div className="room-guests__select">
                <RoomQtyDropdown
                  options={new Array(quantity + 1).fill().map((_, a) => ({ id: a, value: a, label: a }))}
                  initialValue={selectedQty}
                  selectedOption={selectedQty}
                  onChange={val => {
                    onToggleRoom(room, quantity > 1 ? val : undefined);
                  }}
                />
              </div>
            )}
          </div>
          <div className="room-column room-total">
            <div className="room-total__text">{description}</div>
            <div className="room-total__price">
              <CurrencyContext.Consumer>
                {currency => {
                  return (
                    <>
                      {currency.selectedCurrency.code}
                      <span>
                        <NumberFormat
                          value={amount}
                          format={{
                            style: "decimal",
                            maximumFractionDigits: 2
                          }}
                        />
                      </span>
                    </>
                  );
                }}
              </CurrencyContext.Consumer>
            </div>
            <div className="room-total__note">
              ( <Trans id="includes_taxes_and_fees"> Includes taxes and fees </Trans> )
              <svg width="15" height="15">
                <use href="#info"></use>
              </svg>
            </div>
          </div>
          <div className="room-column room-submit">
            <button
              onClick={() => {
                onToggleRoom(room, quantity > 1 ? selectedQty : undefined);
              }}
              className="button hotel__link"
            >
              <Trans id="select_this_room"> Select this Room </Trans>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class RoomGroupItem extends Component {
  constructor(props) {
    super();
    this.state = {
      isOpen: false
    };
  }

  showRoomAminities = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const roomIsOpen = classNames("room", { "room--open": this.state.isOpen });
    const { roomGroup, selectedRooms, onToggleRoom } = this.props;
    const firstRoom = roomGroup && roomGroup.rooms && roomGroup.rooms[0];
    return (
      <div className={roomIsOpen}>
        <div className="room-body">
          <div className="grid">
            <div className="gcell gcell--12 gcell--ms-4 gcell--md-3">
              <div className="room__left">
                <div className="room__title"> {firstRoom.roomName} </div>
                <span className="room__view">
                  <span className="room__img">
                    {firstRoom && <img src={`${firstRoom.images[0].imageUrl}?w=269&h=183&mode=stretch`} alt="" />}
                  </span>
                </span>
                <span className="room__open-dd">
                  <svg width="17" height="17">
                    <use href="#hotel-bell"></use>
                  </svg>
                  <Trans id="show_room_amenities"> Show room amenities </Trans>
                  <svg width="8" height="10" className="room-arrow" onClick={this.showRoomAminities}>
                    <use href="#sort-down"></use>
                  </svg>
                </span>
              </div>
            </div>

            <div className="gcell gcell--12  gcell--ms-8 gcell--md-9">
              <div className="room__right">
                <div className="room-row _sm-show">
                  <div className="room-column room-options">
                    <div className="room-column__title">
                      <Trans id="room_options"> Room Options </Trans>
                    </div>
                  </div>
                  <div className="room-column room-guests"></div>
                  <div className="room-column room-total">
                    <div className="room-column__title">
                      <Trans id="total"> Total </Trans>
                    </div>
                  </div>
                  <div className="room-column room-submit"></div>
                </div>
                <RoomGroup roomGroup={roomGroup} onToggleRoom={onToggleRoom} selectedRooms={selectedRooms} />
              </div>
            </div>
          </div>
        </div>
        <div className="amenities room-dropdown">
          <div className="grid">
            <div className="gcell gcell--12 gcell--md-3">
              <div className="amenities__info"></div>
            </div>
            <div className="gcell gcell--12 gcell--md-9 gcell--def-8">
              <div className="amenities__list">
                <RoomOptionalAminities optionalAminities={firstRoom.amenities ? firstRoom.amenities : []} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomGroupItem;
