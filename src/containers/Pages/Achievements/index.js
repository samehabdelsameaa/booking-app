import React from "react";
import { Trans, I18n } from "@lingui/react";
import { t } from "@lingui/macro";

class Achievements extends React.PureComponent {
  render() {
    return (
      <div className="achievements">
        <div className="achievements-top">
          <div className="achievements-top__wrap"></div>
        </div>
        <div className="achievements-info">
          <div className="achievements-info__container">
            <div className="achievements-info__wrap">
              <div className="achievements__line"></div>
              <div className="achievements__title"><Trans id="our_achievements"> Our Achievements </Trans></div>
              <div className="achievements__text">
                <Trans id="flynas_has_sponsored_the_hajj">
                  Flynas has sponsored the Hajj Grands symposium number (43) Hajj, entitled "The Honor of Place and Time in Safety and
                  Security" organized by the Ministry of Hajj and Umrah every year during the Hajj season. We have been honored to be the
                  official Air Carrier of the symposium. Where we provided air transport to nearly 100 guests of the symposium from Ministers,
                  Muftis, Scientists and participants from all over the world.
                </Trans>
              </div>
              <img alt="" className="section-img section-img--left" src="/assets/images/achievements/flynas.png" />
            </div>
          </div>
        </div>
        <div className="achievements-meet">
          <div className="achievements-meet__container">
            <div className="achievements-meet__wrap">
              <div className="achievements-item">
                <div className="achievements-item__head">
                  <div className="achievements-item__icon">
                    <svg width="70" height="70">
                      <use href="#service-1"></use>
                    </svg>
                  </div>
                  <div className="achievements__subtitle"><Trans id="arrival_and_departure_service">  Arrival and Departure Service </Trans> </div>
                </div>
                <div className="achievements__text">
                  <div className="achievements__text">
                    <Trans id="flynas_as_one_of_the_main_organizer">   
                      Flynas as one of the main organizer for Individual Hajj in1439, has developed packages incorporated services including
                      meet &amp; assist on Arrival/ Departure and Accommodation. Transportations Between Airports, Makkah &amp; Madinah, Masha'eer,
                      thru Unified portal System.
                    </Trans>
                  </div>
                  <div className="achievements__line achievements__line--bottom"></div>
                </div>
              </div>

              <img alt="" className="section-img section-img--right" src="/assets/images/achievements/meet-assist.png" />
            </div>
          </div>
        </div>
        <div className="achievements-permission">
          <div className="achievements-permission__container">
            <div className="achievements-permission__wrap">
              <div className="achievements-item">
                <div className="achievements-item__head">
                  <div className="achievements-item__icon">
                    <svg width="70" height="70">
                      <use href="#permission"></use>
                    </svg>
                  </div>
                  <div className="achievements__subtitle">
                    <Trans id="flynas_hajj_and_umrah"> Flynas Hajj &amp; Umrah </Trans>
                  </div>
                </div>
                <div className="achievements__text">
                  <div className="achievements__text achievements__text--sm">
                    <Trans id="signing_Memorandum_of_Understanding"> 
                      Signing Memorandum of Understanding between the Ministry of Hajj &amp; Umrah and Flynas Hajj &amp; Umrah comes in line with the
                      Vision 2030 which serves DIOUF AL RAHMAN Program and aims increase the number of pilgrims to improve the quality of
                      services, allow the pilgrim to create packages by himself.
                    </Trans>
                  </div>
                  <div className="achievements__line achievements__line--bottom"></div>
                </div>
              </div>
              <img alt="" className="section-img section-img--left" src="/assets/images/achievements/permission.png" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Achievements;
