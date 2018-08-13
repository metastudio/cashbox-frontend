import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import { WrappedFieldProps } from 'redux-form';
import { GroupedOptionsType } from 'react-select/lib/types';

import { Status } from 'model-types';
import {
  IBankAccount,
  loadVisibleBankAccounts,
  selectVisibleBankAccountsStatus,
  selectVisibleBankAccounts,
  formatBankAccountName,
  selectVisibleBankAccountsCurrencies,
} from 'services/bank-accounts';
import { selectCurrentOrganizationId } from 'services/organizations';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';
import { wrapNoLabelFormGroup } from '../utils/form-inputs/no-label-form-group';
import { Currency } from 'services/currencies';

interface IOwnProps {
  disabled?: boolean;
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

  private handleChange = (ba: IBankAccount) => {
    this.props.input.onChange(ba && ba.id);
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

  private styles = () => ({
    menu: (styles: {}) => ({
      ...styles,
      zIndex: 3,
    }),
  })

  private formatValue = (ba: IBankAccount) => String(ba.id);

  public componentDidMount() {
    this.loadData(this.props);
  }

  public componentDidUpdate() {
    this.loadData(this.props);
  }

  public render () {
    const { disabled, status, orgId, input, meta, bankAccounts, ...inputProps } = this.props;

    let selectedBankAccount;
    if (input.value && status === Status.Success && bankAccounts) {
      selectedBankAccount = bankAccounts.find(ba => ba.id === input.value);
    }

    return (
      <Select<IBankAccount>
        isClearable
        { ...inputProps }
        isDisabled={ disabled }
        name={ input.name }
        value={ selectedBankAccount }
        onChange={ this.handleChange }
        isLoading={ status !== Status.Success }
        options={ this.options() }
        styles={ this.styles() }
        getOptionLabel={ formatBankAccountName }
        getOptionValue={ this.formatValue }
      />
    );
  }
}

const mapState = (state: {}): IStateProps => ({
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
