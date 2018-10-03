import * as React from 'react';

import { connect } from 'react-redux';
import Select from 'react-select';
import { GroupedOptionsType } from 'react-select/lib/types';
import { Dispatch } from 'redux';
import { WrappedFieldProps } from 'redux-form';

import { Status } from 'model-types';
import {
  formatBankAccountName,
  IBankAccount,
  loadVisibleBankAccounts,
  selectVisibleBankAccounts,
  selectVisibleBankAccountsCurrencies,
  selectVisibleBankAccountsStatus,
} from 'services/bank-accounts';
import { Currency } from 'services/currencies';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group';
import { wrapNoLabelFormGroup } from 'components/utils/form-inputs/no-label-form-group';
import { ReactSelectStyles } from 'components/utils/form-inputs/react-select-styles';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

interface IOwnProps {
  disabled?: boolean;
  isMulti?:  boolean;
}

interface IStateProps {
  status:       string;
  orgId:        number;
  currencies:   Currency[];
  bankAccounts: IBankAccount[];
}

interface IDispatchProps {
  load: (orgId: number) => void;
}

type IProps = IOwnProps & WrappedFieldProps & IStateProps & IDispatchProps;

class BankAccountsSelect extends React.Component<IProps> {
  private loadData = (props: IProps) => {
    if (props.status === Status.Invalid) {
      props.load(props.orgId);
    }
  }

  private handleChange = (values: IBankAccount | IBankAccount[]) => {
    if (values instanceof Array) {
      this.props.input.onChange(values.map(v => v.id));
    } else {
      this.props.input.onChange(values && values.id);
    }
  }

  private options = (): GroupedOptionsType<IBankAccount> => {
    const { status, currencies, bankAccounts } = this.props;
    if (status !== Status.Success) {
      return [];
    }

    return currencies.map(currency => ({
      label: currency,
      options: bankAccounts.filter(ba => ba.currency === currency),
    }));
  }

  private formatValue = (ba: IBankAccount) => String(ba.id);

  public componentDidMount() {
    this.loadData(this.props);
  }

  public componentDidUpdate() {
    this.loadData(this.props);
  }

  public render () {
    const { disabled, isMulti, status, orgId, input, meta, bankAccounts, ...inputProps } = this.props;

    let selectedBankAccount = null;
    if (input.value && status === Status.Success && bankAccounts) {
      if (input.value instanceof Array) {
        selectedBankAccount = bankAccounts.filter(ba => input.value.includes(ba.id));
      } else {
        selectedBankAccount = bankAccounts.find(ba => ba.id === input.value);
      }
    }

    return (
      <Select<IBankAccount>
        isClearable
        { ...inputProps }
        isDisabled={ disabled }
        isMulti={ isMulti }
        name={ input.name }
        value={ selectedBankAccount }
        onChange={ this.handleChange }
        isLoading={ status !== Status.Success }
        options={ this.options() }
        styles={ ReactSelectStyles }
        getOptionLabel={ formatBankAccountName }
        getOptionValue={ this.formatValue }
      />
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  orgId:        selectCurrentOrganizationId(state),
  status:       selectVisibleBankAccountsStatus(state),
  currencies:   selectVisibleBankAccountsCurrencies(state),
  bankAccounts: selectVisibleBankAccounts(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: (orgId: number) => dispatch(loadVisibleBankAccounts(orgId)),
});

const BankAccountsSelectContainer =
  connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(BankAccountsSelect);

const HorizontalBankAccountsSelect =
  wrapHorizontalFormGroup<IOwnProps & WrappedFieldProps>(BankAccountsSelectContainer);
const VerticalBankAccountsSelect =
  wrapVerticalFormGroup<IOwnProps & WrappedFieldProps>(BankAccountsSelectContainer);
const NoLabelBankAccountsSelect =
  wrapNoLabelFormGroup<IOwnProps & WrappedFieldProps>(BankAccountsSelectContainer);

export {
  BankAccountsSelectContainer as BankAccountsSelect,
  HorizontalBankAccountsSelect,
  VerticalBankAccountsSelect,
  NoLabelBankAccountsSelect,
};
