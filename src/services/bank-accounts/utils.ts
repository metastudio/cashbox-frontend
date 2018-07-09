import { BankAccount } from './types';

const formatBankAccountName = (bankAccount: BankAccount): string => {
  return `${bankAccount.name} (${bankAccount.currency})`;
};

export { formatBankAccountName };
