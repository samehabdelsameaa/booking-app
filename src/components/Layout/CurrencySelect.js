import React from "react";
import { Trans } from "@lingui/react";
import withClickOutside from "react-click-outside";
import keys from "ramda/es/keys";
import map from "ramda/es/map";
import { CurrencyContext } from "containers/Providers/CurrencyProvider";

const CurrencyRow = ({ code, name, symbole, selected, onSelect, ...props }) => (
  <li className={`hd-drop__list-item currency__item ${selected ? " selected" : ""}`} onClick={() => onSelect(code)}>
    <a href="#" className="hd-drop__list-link">
      <span className="currency__text">
        <span className="currency__abbr">{code}</span>
        {"  "}
        <span>{name}</span>
      </span>
    </a>
  </li>
);

const PriceDisplayRow = ({ priceDisplayOption: { value, label }, selected, onSelect }) => (
  <li className={`hd-drop__list-item currency__item ${selected ? " selected" : ""}`} onClick={() => onSelect(value)}>
    <a href="#" className="hd-drop__list-link">
      <span className="currency__text">
        <span>
          <Trans id={value}> {label}</Trans>
        </span>
      </span>
    </a>
  </li>
);

class CurrencySelect extends React.PureComponent {
  static defaultProps = {
    priceDisplayOptions: [{ value: "basePrice", label: "Base price per night" }, { value: "totalAmount", label: "Total amount" }]
  };

  state = {
    dropdownOpen: false
  };

  toggleDropdown = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });
  handleClickOutside = () => this.setState({ dropdownOpen: false });

  render() {
    const {
      props: { priceDisplayOptions },
      state: { dropdownOpen },
      toggleDropdown
    } = this;

    return (
      <CurrencyContext.Consumer>
        {({ selectedCurrency, supportedCurrencies, changeCurrency, priceDisplay, changePriceDisplay, suggestedCurrency }) => {
          const popularCurrencies = [];
          const otherCurrencies = [];

          map(code => {
            const c = supportedCurrencies[code];
            if (c.popular) popularCurrencies.push(c);
            else otherCurrencies.push(c);
          }, keys(supportedCurrencies));

          return (
            <div className={`hd-currency ${dropdownOpen ? "open" : ""}`} onClick={toggleDropdown}>
              <span className="hd-currency__text">
                <Trans id="currency">Currency</Trans>
                {/* {selectedCurrency && <small>{selectedCurrency.code}</small>} */}
              </span>
              <div className="hd-dropdown hd-dropdown--currency">
                <div className="currency hd-drop">
                  <div className="hd-drop__group">
                    <div className="hd-drop__title hd-drop__title--bg">
                      <Trans id="price_display">Price display</Trans>
                    </div>
                    <ul className="hd-drop__list">
                      {priceDisplayOptions.map(p => (
                        <PriceDisplayRow
                          key={p.value}
                          priceDisplayOption={p}
                          onSelect={changePriceDisplay}
                          selected={p.value.toLowerCase() === priceDisplay.toLowerCase()}
                        />
                      ))}
                    </ul>
                  </div>
                  {suggestedCurrency && (
                    <div className="hd-drop__group">
                      <div className="hd-drop__title hd-drop__title--bg">
                        <Trans id="suggested_currencies">Suggested currencies</Trans>
                      </div>
                      <ul className="hd-drop__list">
                        <CurrencyRow
                          key={suggestedCurrency.code}
                          {...suggestedCurrency}
                          onSelect={changeCurrency}
                          selected={selectedCurrency.code === suggestedCurrency.code}
                        />
                      </ul>
                    </div>
                  )}
                  <div className="hd-drop__group">
                    <div className="hd-drop__title hd-drop__title--bg">
                      <Trans id="popular_currencies">Popular currencies</Trans>
                    </div>
                    <ul className="hd-drop__list">
                      {map(code => {
                        const c = popularCurrencies[code];
                        return <CurrencyRow key={c.code} {...c} onSelect={changeCurrency} selected={c.code === selectedCurrency.code} />;
                      }, keys(popularCurrencies))}
                    </ul>
                  </div>
                  <div className="hd-drop__group">
                    <div className="hd-drop__title hd-drop__title--bg">
                      <Trans id="all_currencies">All currencies</Trans>
                    </div>
                    <ul className="hd-drop__list">
                      {map(code => {
                        const c = otherCurrencies[code];
                        return <CurrencyRow key={c.code} {...c} onSelect={changeCurrency} selected={c.code === selectedCurrency.code} />;
                      }, keys(otherCurrencies))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </CurrencyContext.Consumer>
    );
  }
}

export default withClickOutside(CurrencySelect);
