import * as React from 'react';
import { Table } from 'react-bootstrap';

import { BankAccount, formatBankAccountName } from 'services/bank-accounts';

import { MoneyAmount } from 'components/utils/money';

interface Props {
  bankAccounts: BankAccount[];
}

const SidebarBankAccountsTable: React.SFC<Props> = ({ bankAccounts }) => {

  const accounts = bankAccounts.map((bankAccount) => {
    return (
      <tr key={ bankAccount.id }>
        <td>{ formatBankAccountName(bankAccount) }</td>
        <td className="text-right">
          <MoneyAmount colorize="onlyNegative" amount={ bankAccount.balance } />
        </td>
      </tr>
    );
  });

  return (
    <Table striped responsive id="bankAccounts">
      <thead>
        <tr>
          <th>Account</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        { accounts }
      </tbody>
    </Table>
  );
};

export default SidebarBankAccountsTable;
