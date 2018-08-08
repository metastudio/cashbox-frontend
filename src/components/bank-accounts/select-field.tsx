import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import { WrappedFieldProps } from 'redux-form';

import { Status } from 'model-types';
import {
  IBankAccount,
  loadVisibleBankAccounts,
  selectVisibleBankAccountsStatus,
  selectVisibleBankAccounts,
  formatBankAccountName,
} from 'services/bank-accounts';
import { selectCurrentOrganizationId } from 'services/organizations';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

interface IStateProps {
  status:       string;
  orgId:        number;
  bankAccounts: IBankAccount[] | null;
}

interface IDispatchProps {
  load: (orgId: number) => void;
}

type IProps = WrappedFieldProps & IStateProps & IDispatchProps;

class BankAccountsSelect extends React.Component<IProps> {
  private loadData = (props: IProps) => {
    if (props.status === Status.Invalid) {
      props.load(props.orgId);
    }
  }

  private handleChange = (ba: IBankAccount) => {
    this.props.input.onChange(ba && String(ba.id));
  }

  private options = (): IBankAccount[] => {
    const { status, bankAccounts } = this.props;
    if (status !== Status.Success || !bankAccounts) {
      return [];
    }
    return bankAccounts;
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
    const { status, orgId, input, meta, bankAccounts, ...inputProps } = this.props;

    let selectedBankAccount;
    if (input.value && status === Status.Success && bankAccounts) {
      selectedBankAccount = bankAccounts.find(ba => String(ba.id) === String(input.value));
    }

    return (
      <Select<IBankAccount>
        { ...inputProps }
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

const mapState = (state: {}) => ({
  orgId:        selectCurrentOrganizationId(state),
  status:       selectVisibleBankAccountsStatus(state),
  bankAccounts: selectVisibleBankAccounts(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  load: (orgId: number) => dispatch(loadVisibleBankAccounts(orgId)),
});

const BankAccountsSelectContainer =
  connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(BankAccountsSelect);

const HorizontalBankAccountsSelect = wrapHorizontalFormGroup(BankAccountsSelectContainer);
const VerticalBankAccountsSelect   = wrapVerticalFormGroup(BankAccountsSelectContainer);

export { BankAccountsSelectContainer as BankAccountsSelect, HorizontalBankAccountsSelect, VerticalBankAccountsSelect };
