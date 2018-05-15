import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Async, Option } from 'react-select';
import { WrappedFieldProps } from 'redux-form';

import { BankAccount } from 'model-types';
import { loadBankAccounts } from 'actions/bank-accounts.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';

import { wrapHorizontalFormGroup } from 'components/utils/form-inputs/horizontal-form-group.jsx';
import { wrapVerticalFormGroup } from 'components/utils/form-inputs/vertical-form-group';

import 'react-select/dist/react-select.css';
import 'components/utils/form-inputs/async-select-fix.css';
import { formatBankAccountName } from 'utils/bank-account';

interface OwnProps {
  emptyTitle?: string;
}

interface StateProps {
  orgId: number;
}

interface DispatchProps {
  load: (orgId: number) => Promise<BankAccount[]>;
}

type Props = OwnProps & WrappedFieldProps & StateProps & DispatchProps;

const BankAccountsSelect: React.SFC<Props> = ({ orgId, input, load, emptyTitle, ...inputProps }) => {
  const loadOptions = () => (
    load(orgId).then((bankAccounts) => ({
      options: (emptyTitle ? [{ value: '', label: emptyTitle }] : [])
    .concat(bankAccounts.map(ba => ({ value: String(ba.id), label: formatBankAccountName(ba) })))
    }))
  );

  delete inputProps.meta;

  const handleChange = (value: Option<string>) => {
    input.onChange(value && value.value);
  };

  return (
    <Async
      { ...inputProps }
      name={ input.name }
      value={ String(input.value) }
      onChange={ handleChange }
      onBlur={ () => input.onBlur(input.value) }
      cache={ {} }
      loadOptions={ loadOptions }
    />
  );
};

const mapState = (state: {}) => ({
  orgId: getCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => new Promise<BankAccount[]>((res, rej) => dispatch(loadBankAccounts(orgId, res, rej))),
});

const BankAccountsSelectContainer =
  connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch)(BankAccountsSelect);

const HorizontalBankAccountsSelect = wrapHorizontalFormGroup(BankAccountsSelectContainer);
const VerticalBankAccountsSelect   = wrapVerticalFormGroup(BankAccountsSelectContainer);

export { BankAccountsSelectContainer as BankAccountsSelect, HorizontalBankAccountsSelect, VerticalBankAccountsSelect };
