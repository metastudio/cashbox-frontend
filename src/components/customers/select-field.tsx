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
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

interface IStateProps {
  orgId:       number;
  status:      Status;
  customers?:  ICustomer[];
}

interface IDispatchProps {
  load: (orgId: number) => void;
}

type IProps = WrappedFieldProps & IStateProps & IDispatchProps;

class CustomersSelect extends React.Component<IProps> {
  private loadData = (props: IProps) => {
    if (props.status === Status.Invalid) {
      props.load(props.orgId);
    }
  }

  private handleChange = (customer: ICustomer) => {
    this.props.input.onChange(customer && customer.id);
  }

  private options = (): ICustomer[] => {
    const { status, customers } = this.props;
    if (status !== Status.Success || !customers) { return []; }

    return customers;
  }

  private styles = () => ({
    menu: (styles: {}) => ({
      ...styles,
      zIndex: 3,
    }),
  })

  private formatLabel = (c: ICustomer) => c.name;
  private formatValue = (c: ICustomer) => String(c.id);

  public componentDidMount() {
    this.loadData(this.props);
  }

  public componentDidUpdate() {
    this.loadData(this.props);
  }

  public render() {
    const { orgId, status, input, meta, customers, ...inputProps } = this.props;

    let selectedCustomer = null;
    if (input.value && status === Status.Success && customers) {
      selectedCustomer = customers.find(c => c.id === input.value);
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
        styles={ this.styles() }
        getOptionLabel={ this.formatLabel }
        getOptionValue={ this.formatValue }
      />
    );
  }
}

const mapState = (state: IGlobalState) => ({
  orgId:     selectCurrentOrganizationId(state),
  status:    selectCustomersStatus(state),
  customers: selectCustomers(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  load: (orgId: number) => new Promise<ICustomer[]>((res, rej) => dispatch(loadCustomers(orgId, res, rej))),
});

const CustomersSelectContainer =
  connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(CustomersSelect);

const HorizontalCustomersSelect = wrapHorizontalFormGroup(CustomersSelectContainer);
const VerticalCustomersSelect   = wrapVerticalFormGroup(CustomersSelectContainer);
const NoLabelCustomersSelect    = wrapNoLabelFormGroup(CustomersSelectContainer);

export {
  CustomersSelectContainer as CustomersSelect,
  HorizontalCustomersSelect,
  VerticalCustomersSelect,
  NoLabelCustomersSelect,
};
