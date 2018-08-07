import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import { WrappedFieldProps } from 'redux-form';

import { Status } from 'model-types';
import {
  BankAccount,
  loadVisibleBankAccounts,
  selectVisibleBankAccountsStatus,
  selectVisibleBankAccounts,
  formatBankAccountName,
} from 'services/bank-accounts';
import { selectCurrentOrganizationId } from 'services/organizations';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

interface StateProps {
  status:       string;
  orgId:        number;
  bankAccounts: BankAccount[] | null;
}

interface DispatchProps {
  load: (orgId: number) => void;
}

type Props = WrappedFieldProps & StateProps & DispatchProps;

class BankAccountsSelect extends React.Component<Props> {
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

  handleChange = (ba: BankAccount) => {
    this.props.input.onChange(ba && String(ba.id));
  }

  options = (): BankAccount[] => {
    const { status, bankAccounts } = this.props;
    if (status !== Status.Success || !bankAccounts) {
      return [];
    }
    return bankAccounts;
  }

  styles = () => ({
    menu: (styles: {}) => ({
      ...styles,
      zIndex: 3,
    })
  })

  render () {
    const { status, orgId, input, meta, bankAccounts, ...inputProps } = this.props;

    let selectedBankAccount = undefined;
    if (input.value && status === Status.Success && bankAccounts) {
      selectedBankAccount = bankAccounts.find((ba) => String(ba.id) === String(input.value));
    }

    return (
      <Select<BankAccount>
        { ...inputProps }
        name={ input.name }
        value={ selectedBankAccount }
        onChange={ this.handleChange }
        isLoading={ status !== Status.Success }
        options={ this.options() }
        styles={ this.styles() }
        getOptionLabel={ formatBankAccountName }
        getOptionValue={ (ba) => String(ba.id) }
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
  connect<StateProps, DispatchProps>(mapState, mapDispatch)(BankAccountsSelect);

const HorizontalBankAccountsSelect = wrapHorizontalFormGroup(BankAccountsSelectContainer);
const VerticalBankAccountsSelect   = wrapVerticalFormGroup(BankAccountsSelectContainer);

export { BankAccountsSelectContainer as BankAccountsSelect, HorizontalBankAccountsSelect, VerticalBankAccountsSelect };
