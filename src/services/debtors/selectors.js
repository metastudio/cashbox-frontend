const selectDebtors = (state) => state.debtors.items;
const selectTotal = (state) => state.debtors.total;
const selectTotalsByCurrency = (state) => state.debtors.totalsByCurrency;
const selectDebtorsStatus = (state) => state.debtors.status;

export { selectDebtors, selectTotal, selectTotalsByCurrency, selectDebtorsStatus };
