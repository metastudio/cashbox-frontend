import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import {
  BankAccount,
  formatBankAccountName,
  selectVisibleBankAccountsWithCurrency
} from 'services/bank-accounts';

import { MoneyAmount } from 'components/utils/money';

interface OwnProps {
  currency: string;
}

interface StateProps {
  bankAccounts: BankAccount[];
}

type Props = OwnProps & StateProps;

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

const mapState = (state: {}, props: OwnProps) => ({
  bankAccounts: selectVisibleBankAccountsWithCurrency(state, props.currency),
});

export default connect<StateProps, {}, OwnProps>(mapState)(SidebarBankAccountsTable);
