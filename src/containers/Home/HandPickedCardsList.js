import React from "react";
import { Trans } from "@lingui/react";
import HandPickedCard from "./HandPickedCard";

class HandPickedCardsList extends React.PureComponent {
  render() {
    const hotels = [
      {
        id: 1,
        category: "Hotel",
        title: "Suite Tower Rialto",
        rating: 4,
        ratingText: "very good",
        shortDescription: "4 guests, 1 bedroom, 2 beds, 1 bath Wi-fi, Kitchen, Elevatot",
        price: 322,
        priceRate: "per night"
      },
      {
        id: 2,
        category: "Hotel",
        title: "Suite Tower Rialto",
        rating: 4,
        ratingText: "very good",
        shortDescription: "4 guests, 1 bedroom, 2 beds, 1 bath Wi-fi, Kitchen, Elevatot",
        price: 342,
        priceRate: "per night"
      },
      {
        id: 3,
        category: "Hotel",
        title: "Suite Tower Rialto",
        rating: 3,
        ratingText: "very good",
        shortDescription: "4 guests, 1 bedroom, 2 beds, 1 bath Wi-fi, Kitchen, Elevatot",
        price: 566,
        priceRate: "per night"
      },
      {
        id: 4,
        category: "Hotel",
        title: "Suite Tower Rialto",
        rating: 5,
        ratingText: "very good",
        shortDescription: "4 guests, 1 bedroom, 2 beds, 1 bath Wi-fi, Kitchen, Elevatot",
        price: 322,
        priceRate: "per night"
      },
      {
        id: 5,
        category: "Hotel",
        title: "Suite Tower Rialto",
        rating: 4,
        ratingText: "very good",
        shortDescription: "4 guests, 1 bedroom, 2 beds, 1 bath Wi-fi, Kitchen, Elevatot",
        price: 875,
        priceRate: "per night"
      },
      {
        id: 6,
        category: "Hotel",
        title: "Suite Tower Rialto",
        rating: 2,
        ratingText: "very good",
        shortDescription: "4 guests, 1 bedroom, 2 beds, 1 bath Wi-fi, Kitchen, Elevatot",
        price: 234,
        priceRate: "per night"
      }
    ];
    return (
      <div className="products">
        <div className="container">
          <div className="products__main-title"> 
            <Trans id="hand_picked_packages"> Hand Picked Packages </Trans>
          </div>
          <div className="grid  grid--space-md grid--sm-space-def grid--lg-space-def products__grid">
            {hotels.map((h, i) => (
              <div key={i} className="gcell gcell--12 gcell--psw-6 gcell--md-4">
                <HandPickedCard hotel={h} />
              </div>
            ))}
          </div>

          {/* <div className="read-more">
            <button className="button button--secondary read-more__btn">
              <span className="btn-text">
                <Trans id="load_more">Load more</Trans>
              </span>
              <span className="btn-effect" />
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}
export default HandPickedCardsList;
