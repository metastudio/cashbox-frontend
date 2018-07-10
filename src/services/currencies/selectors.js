const selectCurrenciesStatus = (state) => state.currencies.status;
const selectCurrencies       = (state) => state.currencies.items;

export { selectCurrenciesStatus, selectCurrencies };
