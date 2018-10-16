import * as React from 'react';

import { connect } from 'react-redux';
import Select from 'react-select';
import { Dispatch } from 'redux';
import { WrappedFieldProps } from 'redux-form';

import { Status } from 'model-types';
import { ICustomer, loadCustomers, selectCustomers, selectCustomersStatus } from 'services/customers';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group';
import { wrapNoLabelFormGroup } from 'components/utils/form-inputs/no-label-form-group';
import { ReactSelectStyles } from 'components/utils/form-inputs/react-select-styles';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

interface IOwnProps {
  isMulti?: boolean;
}

interface IStateProps {
  orgId:      number;
  status:     Status;
  customers?: ICustomer[];
}

interface IDispatchProps {
  load: typeof loadCustomers.request;
}

type IProps = IOwnProps & WrappedFieldProps & IStateProps & IDispatchProps;

class CustomersSelect extends React.Component<IProps> {
  private loadData = (props: IProps) => {
    if (props.status === Status.Invalid) {
      props.load(props.orgId);
    }
  }

  private handleChange = (values: ICustomer) => {
    if (values instanceof Array) {
      this.props.input.onChange(values.map(v => v.id));
    } else {
      this.props.input.onChange(values && values.id);
    }
  }

  private options = (): ICustomer[] => {
    const { status, customers } = this.props;
    if (status !== Status.Success || !customers) { return []; }

    return customers;
  }

  private formatLabel = (c: ICustomer) => c.name;
  private formatValue = (c: ICustomer) => String(c.id);

  public componentDidMount() {
    this.loadData(this.props);
  }

  public componentDidUpdate() {
    this.loadData(this.props);
  }

  public render() {
    const { orgId, status, isMulti, input, meta, customers, ...inputProps } = this.props;

    let selectedCustomer = null;
    if (input.value && status === Status.Success && customers) {
      if (input.value instanceof Array) {
        selectedCustomer = customers.filter(c => input.value.includes(c.id));
      } else {
        selectedCustomer = customers.find(c => c.id === input.value);
      }
    }

    return (
      <Select<ICustomer>
        isClearable
        { ...inputProps }
        name={ input.name }
        value={ selectedCustomer }
        onChange={ this.handleChange }
        isLoading={ status !== Status.Success }
        options={ this.options() }
        styles={ ReactSelectStyles }
        getOptionLabel={ this.formatLabel }
        getOptionValue={ this.formatValue }
        isMulti={ isMulti }
      />
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  orgId:     selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
  status:    selectCustomersStatus(state),
  customers: selectCustomers(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: orgId => dispatch(loadCustomers.request(orgId)),
});

const CustomersSelectContainer =
  connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(CustomersSelect);

const HorizontalCustomersSelect =
  wrapHorizontalFormGroup<IOwnProps & WrappedFieldProps>(CustomersSelectContainer);
const VerticalCustomersSelect =
  wrapVerticalFormGroup<IOwnProps & WrappedFieldProps>(CustomersSelectContainer);
const NoLabelCustomersSelect =
  wrapNoLabelFormGroup<IOwnProps & WrappedFieldProps>(CustomersSelectContainer);

export {
  CustomersSelectContainer as CustomersSelect,
  HorizontalCustomersSelect,
  VerticalCustomersSelect,
  NoLabelCustomersSelect,
};
