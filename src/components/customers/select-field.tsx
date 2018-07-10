import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Select, { Option } from 'react-select';
import { WrappedFieldProps } from 'redux-form';

import { Status, Customer } from 'model-types';
import { loadCustomers } from 'actions/customers.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectCustomers, selectCustomersStatus } from 'selectors/customers.js';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group.jsx';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

import 'react-select/dist/react-select.css';
import 'components/utils/form-inputs/async-select-fix.css';

interface OwnProps {
  emptyTitle?: string;
}

interface StateProps {
  orgId:       number;
  status:      Status;
  customers?:  Customer[];
}

interface DispatchProps {
  load: (orgId: number) => void;
}

type Props = OwnProps & WrappedFieldProps & StateProps & DispatchProps;

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

  handleChange = (value: Option<string>) => {
    this.props.input.onChange(value && value.value);
  }

  options = (): Option[] => {
    const { status, customers, emptyTitle } = this.props;
    if (status !== Status.Success || !customers) { return []; }

    return (emptyTitle ? [{ value: '', label: emptyTitle }] : [])
      .concat(customers.map(c => ({ value: String(c.id), label: c.name })));
  }

  render() {
    const { orgId, status, input, meta, ...inputProps } = this.props;

    return (
      <Select
        { ...inputProps }
        name={ input.name }
        value={ String(input.value) }
        onChange={ this.handleChange }
        onBlur={ () => input.onBlur(input.value) }
        isLoading={ status !== Status.Success }
        options={ this.options() }
      />
    );
  }
}

const mapState = (state: {}) => ({
  orgId:     getCurrentOrganizationId(state),
  status:    selectCustomersStatus(state),
  customers: selectCustomers(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => new Promise<Customer[]>((res, rej) => dispatch(loadCustomers(orgId, res, rej))),
});

const CustomersSelectContainer =
  connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch)(CustomersSelect);

const HorizontalCustomersSelect = wrapHorizontalFormGroup(CustomersSelectContainer);
const VerticalCustomersSelect   = wrapVerticalFormGroup(CustomersSelectContainer);

export { CustomersSelectContainer as CustomersSelect, HorizontalCustomersSelect, VerticalCustomersSelect };
