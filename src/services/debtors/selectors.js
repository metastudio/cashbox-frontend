const selectDebtors = (state) => state.debtors.items;
const selectTotal = (state) => state.debtors.total;
const selectTotalsByCurrency = (state) => state.debtors.totalsByCurrency;

export { selectDebtors, selectTotal, selectTotalsByCurrency };
