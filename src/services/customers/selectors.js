const selectCustomers       = (state) => state.customers.items;
const selectCustomersStatus = (state) => state.customers.status;

const selectCustomer       = (state) => state.customer.data;
const selectCustomerStatus = (state) => state.customer.status;

export {
  selectCustomers,
  selectCustomersStatus,

  selectCustomer,
  selectCustomerStatus,
};
