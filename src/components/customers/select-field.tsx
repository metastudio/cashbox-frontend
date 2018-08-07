import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import { WrappedFieldProps } from 'redux-form';

import { Status } from 'model-types';
import { Customer, loadCustomers, selectCustomers, selectCustomersStatus } from 'services/customers';
import { selectCurrentOrganizationId } from 'services/organizations';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

interface StateProps {
  orgId:       number;
  status:      Status;
  customers?:  Customer[];
}

interface DispatchProps {
  load: (orgId: number) => void;
}

type Props = WrappedFieldProps & StateProps & DispatchProps;

class CustomersSelect extends React.Component<Props> {
  loadData = (props: Props) => {
    if (props.status === Status.Invalid) {
      props.load(props.orgId);
    }
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentDidUpdate() {
    this.loadData(this.props);
  }

  handleChange = (customer: Customer) => {
    this.props.input.onChange(customer && String(customer.id));
  }

  options = (): Customer[] => {
    const { status, customers } = this.props;
    if (status !== Status.Success || !customers) { return []; }

    return customers;
  }

  styles = () => ({
    menu: (styles: {}) => ({
      ...styles,
      zIndex: 3,
    })
  })

  render() {
    const { orgId, status, input, meta, customers, ...inputProps } = this.props;

    let selectedCustomer = undefined;
    if (input.value && status === Status.Success && customers) {
      selectedCustomer = customers.find((c) => String(c.id) === String(input.value));
    }

    return (
      <Select<Customer>
        { ...inputProps }
        name={ input.name }
        value={ selectedCustomer }
        onChange={ this.handleChange }
        isLoading={ status !== Status.Success }
        options={ this.options() }
        styles={ this.styles() }
        getOptionLabel={ (c) => c.name }
        getOptionValue={ (c) => String(c.id) }
      />
    );
  }
}

const mapState = (state: {}) => ({
  orgId:     selectCurrentOrganizationId(state),
  status:    selectCustomersStatus(state),
  customers: selectCustomers(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  load: (orgId: number) => new Promise<Customer[]>((res, rej) => dispatch(loadCustomers(orgId, res, rej))),
});

const CustomersSelectContainer =
  connect<StateProps, DispatchProps>(mapState, mapDispatch)(CustomersSelect);

const HorizontalCustomersSelect = wrapHorizontalFormGroup(CustomersSelectContainer);
const VerticalCustomersSelect   = wrapVerticalFormGroup(CustomersSelectContainer);

export { CustomersSelectContainer as CustomersSelect, HorizontalCustomersSelect, VerticalCustomersSelect };
