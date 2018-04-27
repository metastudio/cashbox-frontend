import * as React from 'react';

import { BankAccount } from 'model-types';

interface Props {
  bankAccount: BankAccount;
}

const BankAccountName: React.SFC<Props> = ({ bankAccount }) => (
  <>
    { `${bankAccount.name} (${bankAccount.currency})` }
  </>
);

export default BankAccountName;
