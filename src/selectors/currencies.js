const selectRates = (state) => state.currenciesRates.items;
const selectRatesUpdatedOn = (state) => state.currenciesRates.updatedOn;

export { selectRates, selectRatesUpdatedOn };
