const selectBalancesStatus          = (state) => state.balances.status;
const selectBalancesTotalAmount     = (state) => state.balances.totalAmount;
const selectBalancesDefaultCurrency = (state) => state.balances.defaultCurrency;
const selectBalancesTotals          = (state) => state.balances.totals;

export {
  selectBalancesStatus,
  selectBalancesTotalAmount,
  selectBalancesDefaultCurrency,
  selectBalancesTotals,
};
