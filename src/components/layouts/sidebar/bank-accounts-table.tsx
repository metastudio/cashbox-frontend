import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import {
  IBankAccount,
  selectVisibleBankAccountsWithCurrency,
} from 'services/bank-accounts';

import BankAccountFilterLink from 'components/bank-accounts/filter-link';
import { MoneyAmount } from 'components/utils/money';

interface IOwnProps {
  currency: string;
}

interface IStateProps {
  bankAccounts: IBankAccount[];
}

type IProps = IOwnProps & IStateProps;

const SidebarBankAccountsTable: React.SFC<IProps> = ({ bankAccounts }) => {

  const accounts = bankAccounts.map((bankAccount) => {
    return (
      <tr key={ bankAccount.id }>
        <td><BankAccountFilterLink bankAccount={ bankAccount } /></td>
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
          <th className="col-xs-8">Account</th>
          <th className="col-xs-4">Amount</th>
        </tr>
      </thead>
      <tbody>
        { accounts }
      </tbody>
    </Table>
  );
};

const mapState = (state: {}, props: IOwnProps) => ({
  bankAccounts: selectVisibleBankAccountsWithCurrency(state, props.currency),
});

export default connect<IStateProps, {}, IOwnProps>(mapState)(SidebarBankAccountsTable);
