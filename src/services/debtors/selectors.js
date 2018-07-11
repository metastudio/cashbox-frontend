const selectDebtors = (state) => state.debtors.items;
const selectTotal = (state) => state.debtors.total;
const selectSummByCurrencies = (state) => state.debtors.summByCurrencies;

export { selectDebtors, selectTotal, selectSummByCurrencies };
