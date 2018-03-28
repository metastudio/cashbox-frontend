const selectBalancesTotalAmount     = (state) => state.balances.totalAmount;
const selectBalancesDefaultCurrency = (state) => state.balances.defaultCurrency;
const selectBalancesTotals          = (state) => state.balances.totals;

export {
  selectBalancesTotalAmount,
  selectBalancesDefaultCurrency,
  selectBalancesTotals
};
