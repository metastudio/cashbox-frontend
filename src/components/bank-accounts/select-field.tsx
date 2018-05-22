import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Select, { Option } from 'react-select';
import { WrappedFieldProps } from 'redux-form';

import * as statuses from 'constants/statuses.js';
import { BankAccount } from 'model-types';
import { loadBankAccounts } from 'actions/bank-accounts.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectBankAccountsStatus, selectBankAccounts } from 'selectors/bank-accounts.js';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group.jsx';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

import 'react-select/dist/react-select.css';
import 'components/utils/form-inputs/async-select-fix.css';
import { formatBankAccountName } from 'utils/bank-account';

interface OwnProps {
  emptyTitle?: string;
}

interface StateProps {
  status:       string;
  orgId:        number;
  bankAccounts: BankAccount[] | null;
}

interface DispatchProps {
  load: (orgId: number) => void;
}

type Props = OwnProps & WrappedFieldProps & StateProps & DispatchProps;

class BankAccountsSelect extends React.Component<Props> {
  loadData = (props: Props) => {
    if (props.status === statuses.INVALID) {
      props.load(props.orgId);
    }
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(props: Props) {
    this.loadData(props);
  }

  handleChange = (value: Option<string>) => {
    this.props.input.onChange(value && value.value);
  }

  options = (): Option[] => {
    const { status, bankAccounts, emptyTitle } = this.props;
    if (status !== statuses.SUCCESS || !bankAccounts) {
      return [];
    }
    return (emptyTitle ? [{ value: '', label: emptyTitle }] : [])
      .concat(bankAccounts.map(ba => ({ value: String(ba.id), label: formatBankAccountName(ba) })));
  }

  render () {
    const { status, orgId, input, meta, ...inputProps } = this.props;

    return (
      <Select
        { ...inputProps }
        name={ input.name }
        value={ String(input.value) }
        onChange={ this.handleChange }
        onBlur={ () => input.onBlur(input.value) }
        isLoading={ status !== statuses.SUCCESS }
        options={ this.options() }
      />
    );
  }
}

const mapState = (state: {}) => ({
  orgId:        getCurrentOrganizationId(state),
  status:       selectBankAccountsStatus(state),
  bankAccounts: selectBankAccounts(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => dispatch(loadBankAccounts(orgId)),
});

const BankAccountsSelectContainer =
  connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch)(BankAccountsSelect);

const HorizontalBankAccountsSelect = wrapHorizontalFormGroup(BankAccountsSelectContainer);
const VerticalBankAccountsSelect   = wrapVerticalFormGroup(BankAccountsSelectContainer);

export { BankAccountsSelectContainer as BankAccountsSelect, HorizontalBankAccountsSelect, VerticalBankAccountsSelect };
