import { BankAccount } from 'model-types';

const formatBankAccountName = (bankAccount: BankAccount): string => {
  return `${bankAccount.name} (${bankAccount.currency})`;
};

export default formatBankAccountName;
