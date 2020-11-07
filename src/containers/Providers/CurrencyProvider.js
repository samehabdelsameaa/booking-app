import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import appActions from "store/app/actions";
import { DEFAULT_CURRENCY } from "store/constants";

export const CurrencyContext = React.createContext();

class CurrencyProvider extends React.PureComponent {
  render() {
    const { children, selectedCurrency, priceDisplay = "basePrice", supportedCurrencies, changeCurrency, changePriceDisplay } = this.props;
    const suggestedCurrency = supportedCurrencies[DEFAULT_CURRENCY];
    return (
      <CurrencyContext.Provider
        value={{
          selectedCurrency,
          priceDisplay,
          supportedCurrencies,
          changeCurrency,
          changePriceDisplay,
          suggestedCurrency
        }}
      >
        {React.Children.only(children)}
      </CurrencyContext.Provider>
    );
  }
}

const mapStateToProps = ({ global: { currency, priceDisplay, supportedCurrencies } }) => ({
  selectedCurrency: currency,
  priceDisplay,
  supportedCurrencies
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...appActions }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyProvider);
