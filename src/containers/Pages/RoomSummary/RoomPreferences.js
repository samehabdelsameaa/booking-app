import React from "react";
import { DropdownList } from "components/Forms";
import { Trans } from "@lingui/macro";
import RoomPreferencesForm from "./RoomPreferencesForm";

class RoomPreferences extends React.Component {
  state = { currentRoomIndex: 0 };

  toggleDropDown = index => {
    const { currentRoomIndex } = this.state;
    currentRoomIndex === index ? this.setState({ currentRoomIndex: null }) : this.setState({ currentRoomIndex: index });
  };

  render() {
    const { selectedRooms, onSelectedPreferences, setPreferencesRef, roomPreferences, beddingPrefernces } = this.props;
    const { currentRoomIndex } = this.state;

    return (
      <div className="preferences">
        <div className="preferences__title">
          <span>
            <Trans id="room_preferences"> Room Preferences </Trans>
          </span>
          <svg width="30" height="30">
            <use href="#question"></use>
          </svg>
        </div>
        <div className="preferences__content">
          {selectedRooms &&
            selectedRooms.map((selectedRoom, index) => (
              <React.Fragment key={index}>
                <RoomPreferencesItem
                  index={index}
                  selectedRoom={selectedRoom}
                  onSelectedPreferences={values => onSelectedPreferences(values, index)}
                  roomPreferences={roomPreferences}
                  beddingPrefernces={beddingPrefernces}
                  setPreferencesRef={setPreferencesRef}
                  isOpen={currentRoomIndex === index}
                  onToggle={index => this.toggleDropDown(index)}
                  roomsPolicies={selectedRoom.policies}
                />
              </React.Fragment>
            ))}

        </div>
      </div>
    );
  }
}

export default RoomPreferences;

const RoomPreferencesItem = ({
  selectedRoom: { name, amenities },
  index,
  onSelectedPreferences,
  setPreferencesRef,
  beddingPrefernces,
  roomPreferences,
  isOpen,
  onToggle,
  roomsPolicies
}) => (
    <div className={`summary-dropdown ${isOpen ? "open" : ""}`}>
      <span className="summary-dropdown__btn" onClick={() => onToggle(index)}>
        <span className="summary-dropdown__icon">
          <svg width="8" height="8" className="summary-dropdown__svg">
            <use href="#sort-down"></use>
          </svg>
        </span>
        <span>
          <Trans id="room"> Room </Trans> {index + 1}:{name}
        </span>
      </span>

      <div className="summary-dropdown__content">
        <div>
          <Trans id="describe_any_special_requests">
            Please describe any special requests (for example, early check-in, high floor, etc.). TravelNow will pass your special request on to
            the property, but such requests are not guaranteed and may not be available in the room type and room rate requested. You may wish
            to directly contact the property before your stay to confirm your special request.
          </Trans>
      </div>
        <RoomPreferencesForm
          setPreferencesRef={setPreferencesRef}
          onSelectedPreferences={onSelectedPreferences}
          roomPreferences={roomPreferences}
          beddingPrefernces={beddingPrefernces}
        />
        <div className={`summary-dropdown ${isOpen ? "open" : ""}`}>
          <span className="summary-dropdown__btn">
            <span>
              <Trans id="room_amenities"> Room amenities </Trans>
            </span>
          </span>

          <div className="summary-dropdown__content">
            <div className="amenities preferences-amenities">
              <div className="grid">
                <div className="gcell gcell--12 gcell--md-4">
                  <div className="amenities__info">
                    <div className="amenities__group">
                      <span className="amenities__title">2 Twin Beds</span>
                    </div>
                    <div className="amenities__group">
                      <span className="amenities__text">344 sq feet (32 sq meters)</span>
                      <br />
                    </div>
                    <div className="amenities__group amenities__group--mt-lg">
                      <span className="amenities__title">Internet</span>
                      <span className="amenities__text"> - WiFi</span>
                    </div>
                    <div className="amenities__group">
                      <span className="amenities__title">Entertainment</span>
                      <span className="amenities__text"> - LCD television with digital channels</span>
                    </div>
                    <div className="amenities__group">
                      <span className="amenities__title">Food & Drink</span>
                      <span className="amenities__text"> - Refrigerator, minibar, coffee/tea maker, and 24-hour room service</span>
                    </div>
                    <div className="amenities__group">
                      <span className="amenities__title">Sleep</span>
                      <span className="amenities__text"> - Blackout drapes/curtains and turndown service</span>
                    </div>
                    <div className="amenities__group">
                      <span className="amenities__title">Bathroom</span>
                      <span className="amenities__text">
                        {" "}
                        - Private bathroom, bathrobes, and a bathtub or shower with a hydromassage showerhead
                    </span>
                    </div>
                    <div className="amenities__group">
                      <span className="amenities__title">Practical</span>
                      <span className="amenities__text"> - Safe, desk, and phone; free cribs/infant beds available on request</span>
                    </div>
                    <div className="amenities__group">
                      <span className="amenities__title">Comfort</span>
                      <span className="amenities__text">- Air conditioning and daily housekeeping</span>
                    </div>
                    <div className="amenities__group">
                      <span className="amenities__title">Accessibility</span>
                      <span className="amenities__text"> - Wheelchair accessible and doorbell/phone notification</span>
                    </div>
                    <div className="amenities__group amenities__group--mt-lg">
                      <span className="amenities__text">Non-Smoking</span>
                      <br />
                      <br />
                      <span className="amenities__text">Room is accessed via exterior corridors</span>
                      <br />
                      <br />
                      <span className="amenities__text">Connecting/adjoining rooms can be requested, subject to availability</span>
                    </div>
                  </div>
                </div>
                <div className="gcell gcell--12 gcell--md-8">
                  <div className="amenities__list">
                    {amenities &&
                      amenities.map((amenity, index) => (
                        <div className="amenities__list-item" key={index}>
                          <span> {amenity} </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DropdownList
          render={({ dropdownOpen }, toggleDropdown) => {
            return (
              <div className={`summary-dropdown ${dropdownOpen ? "open" : ""}`}>
                <span className="summary-dropdown__btn" onClick={toggleDropdown}>
                  <span className="summary-dropdown__icon">
                    <svg width="8" height="8" className="summary-dropdown__svg">
                      <use href="#sort-down"></use>
                    </svg>
                  </span>
                  <span><Trans id="special_check_in_instructions"> Special check-in instructions </Trans></span>
                </span>

                <div className="summary-dropdown__content">
                  <div className="_mb-ms">
                    <Trans id="a_valid_permit_to_perform_hajj_must_be_presented_at_the_airport">
                      A valid permit to perform Hajj must be presented at the airport and hotel check-in from July 25-August 25, 2019.
                      Guests without valid permits will not be able to check-in. For permit-related questions, please contact the hotel or
                      airline directly. Contact information is provided on the reservation confirmation received after booking.
                    </Trans>
                  </div>
                </div>
              </div>
            );
          }}
        />

        <DropdownList
          render={({ dropdownOpen }, toggleDropdown) => (
            <div className={`summary-dropdown ${dropdownOpen ? "open" : ""}`}>
              <span className="summary-dropdown__btn" onClick={toggleDropdown}>
                <span className="summary-dropdown__icon">
                  <svg width="8" height="8" className="summary-dropdown__svg">
                    <use href="#sort-down"></use>
                  </svg>
                </span>
                <span><Trans id="check_in_instructions"> Check-in instructions </Trans> </span>
              </span>

              <div className="summary-dropdown__content prf-instructions">
                {
                  roomsPolicies && roomsPolicies.map(({ name, description, isNoShow, criteria, dateCriteria, type }, i) => {
                    return <React.Fragment key={i}>
                      <div className="prf-instructions__title">{name}</div>
                      <div className="_mb-md">{description}</div>
                      <ul className="menu-list prf-instructions__list">
                        {type && criteria ? getPoliciesCriterias(criteria, dateCriteria, type) : null}
                      </ul>
                      <div style={{marginBottom:10,paddingBottom:20, borderBottom: '1px solid #eee'}}>{isNoShow === true ? "show will be available in this room" : "show will not be available in this room"}.</div>
                    </React.Fragment>
                  })
                }
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );


const getPoliciesCriterias = (policiesCritrias, policiesCriteriasDates, policyType) => {
  let criterias = {};

  policiesCritrias.forEach((policyName) => {
    let key = policyName["key"], value = policyName["value"];
    if (!criterias[key]) criterias[key] = value;
  });

  const policiesList =
    <React.Fragment>
      {(policyType === "Cancellation") ?
        <React.Fragment>
          <li className="menu-list__item prf-instructions__list-item">
            <span>{`You will be charged almost about ${criterias.CancellationChargeValue && criterias.CancellationChargeValue} %  ${criterias.CancellationChargeType && criterias.CancellationChargeType} of single night cost`} </span>
          </li>
          <li className="menu-list__item prf-instructions__list-item">
            <span>{`You are allowed to cancel within ${criterias.CancellationDeadline && criterias.CancellationDeadline} ${criterias.CancellationChargeUnit && criterias.CancellationChargeUnit}.`} </span>
          </li>
          <li className="menu-list__item prf-instructions__list-item">
            <span>{`Your fees of cancellation is ${criterias.CancellationAmount && criterias.CancellationAmount} ${criterias.CancellationChargeCurrency && criterias.CancellationChargeCurrency}.`} </span>
          </li>
          <li className="menu-list__item prf-instructions__list-item">
            <span>{`Your Cancellation Process will be effective from ${policiesCriteriasDates.startDate && policiesCriteriasDates.startDate} till ${policiesCriteriasDates.endDate && policiesCriteriasDates.endDate}.`} </span>
          </li>
        </React.Fragment>
        : (policyType === "Tax") ?
          <React.Fragment>
            <li className="menu-list__item prf-instructions__list-item">
              <span>{`You will be charged for ${criterias.CancellationChargeValue && criterias.CancellationChargeValue} ${criterias.CancellationChargeType && criterias.CancellationChargeType} VAT.`} </span>
            </li>
            <li className="menu-list__item prf-instructions__list-item">
              <span>{`Effective date for payement from ${policiesCriteriasDates.startDate && policiesCriteriasDates.startDate} till ${policiesCriteriasDates.endDate && policiesCriteriasDates.endDate}.`} </span>
            </li>
          </React.Fragment>
          : null
      }

    </React.Fragment>

  return policiesList;
}