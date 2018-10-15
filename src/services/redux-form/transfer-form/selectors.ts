// import { memoize } from 'lodash';
import { formValueSelector } from 'redux-form';

import { TRANSFER_FORM } from 'constants/forms';
import { ID } from 'model-types';
import { IBankAccount, selectVisibleBankAccountById } from 'services/bank-accounts';
import { IGlobalState } from 'services/global-state';
import { parseMoneyValue } from 'utils/money';

import { ITransferFormState } from './types';

interface IStateWithTransferForm {
  form: {
    transferForm?: ITransferFormState;
  };
}

const transferFormSelector = formValueSelector<IStateWithTransferForm>(TRANSFER_FORM);

function selectTransferFormFromBankAccountId(
  state: IStateWithTransferForm,
): ID | undefined {
  return transferFormSelector(state, 'fromBankAccountId');
}
function selectTransferFormToBankAccountId(
  state: IStateWithTransferForm,
): ID | undefined {
  return transferFormSelector(state, 'toBankAccountId');
}
function selectTransferFormFromAmount(
  state: IStateWithTransferForm,
): number | undefined {
  return parseMoneyValue(transferFormSelector(state, 'fromAmount'));
}
function selectTransferFormExchangeRate(
  state: IStateWithTransferForm,
): number | undefined {
  return parseMoneyValue(transferFormSelector(state, 'exchangeRate'));
}

function selectTransferFormFromBankAccount(state: IGlobalState): IBankAccount | undefined {
  const fromBankAccountId = selectTransferFormFromBankAccountId(state);
  if (!fromBankAccountId) { return undefined; }

  return selectVisibleBankAccountById(state, fromBankAccountId);
}

function selectTransferFormToBankAccount(state: IGlobalState): IBankAccount | undefined {
  const toBankAccountId = selectTransferFormToBankAccountId(state);
  if (!toBankAccountId) { return undefined; }

  return selectVisibleBankAccountById(state, toBankAccountId);
}

export {
  selectTransferFormFromBankAccount,
  selectTransferFormToBankAccount,

  selectTransferFormFromAmount,
  selectTransferFormExchangeRate,
};
