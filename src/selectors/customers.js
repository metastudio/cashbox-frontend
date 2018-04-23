import { find } from 'lodash';

const selectCustomers = (state) => state.customers.items;
const selectCustomerByName = (state) => {
  const name = state.invoice.item.customerName;
  return(find(state.customers.items, (customer) => customer.name == name));
};

export { selectCustomers, selectCustomerByName };
