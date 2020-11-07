import React from "react";
import { NumberFormat, Trans } from "@lingui/macro";
import { CurrencyContext } from "containers/Providers/CurrencyProvider";

const HotelRating = ({ rating, ...props }) => (
  <span className="rating__icons" data-rating={rating}>
    {new Array(5).fill().map((_, i) => (
      <svg key={i} width="17" height="17" style={{marginRight:1}}>
        <use href="#star" />
      </svg>
    ))}
  </span>
);

class HandPickedCard extends React.PureComponent {
  render() {
    const {
      hotel: { id, category, title, rating, ratingText, price }
    } = this.props;
    return (
      <div className="products__item">
        <a href="#" className="products__link">
          <span className="products__view">
            <span className="products__img">
              {/*image size  width="288" height="208"*/}
              <img width={288} height={288} alt={title} src={`./assets/images/catalog/catalog-img-${id}.jpg`} />
            </span>
          </span>
          <span className="products__middle">
            <span className="products__middle-img">
              <img src="./assets/images/catalog/product-corners.png" alt="" className="corners-img" />
              <img src="./assets/images/catalog/product-corners-hover.png" alt="" className="corners-img-hover _md-show" />
            </span>
          </span>
          <span className="products__bottom">
            <span className="products__category">{category}</span>
            <span className="products__title">{title}</span>
            <span className="products__rating rating">
              <HotelRating rating={rating} />
              <span className="rating__count">{61}</span>
            </span>
            {/* <span className="products__desc">{shortDescription}</span> */}
            <span className="products__nights">
              <span className="products__nights-item">
                Mekkah
                <span> (5 <Trans id="nights"> Nights </Trans>)</span>
              </span>
              <span className="products__nights-item">
                Madina
                <span> (5 <Trans id="nights"> Nights </Trans>)</span>
              </span>
            </span>
            <span className="products__icons">
              <svg width="35" height="35">
                <use href="#aeroplane"></use>
              </svg>
              <svg width="35" height="35">
                <use href="#double-bed"></use>
              </svg>
              <svg width="30" height="30">
                <use href="#bus"></use>
              </svg>
            </span>
            <span className="products__bt-info">
              <span className="products__info">
                <span className="price _flex">
                  <span className="price__info"><Trans id="starts_from"> starts from </Trans> </span>
                  <CurrencyContext.Consumer>
                    {({ selectedCurrency, priceDisplay }) => (
                      <React.Fragment>
                        <span className="price__number">
                          <NumberFormat
                            value={price}
                            format={{
                              currency: selectedCurrency.code,
                              currencyDisplay: "symbol",
                              style: "currency",
                              minimumFractionDigits: selectedCurrency.rounding
                            }}
                          />
                        </span>
                      </React.Fragment>
                    )}
                  </CurrencyContext.Consumer>
                </span>
                <span className="button products__read">
                  <svg width="21" height="17">
                    <use href="#arrow-right" />
                  </svg>
                </span>
              </span>
            </span>
          </span>
        </a>
      </div>
    );
  }
}

export default HandPickedCard;
