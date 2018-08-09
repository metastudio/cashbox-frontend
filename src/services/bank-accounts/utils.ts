import { IBankAccount } from './types';

const formatBankAccountName = (bankAccount: IBankAccount): string => {
  return `${bankAccount.name} (${bankAccount.currency})`;
};

export { formatBankAccountName };
