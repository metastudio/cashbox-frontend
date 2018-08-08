import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { formatBankAccountName } from 'services/bank-accounts';
import { ITransaction } from 'services/transactions';
import { formatDate } from 'utils/date';

import { MoneyAmount } from 'components/utils/money';

import './../css/default.css';

interface IOwnProps {
  transaction: ITransaction;
}

type IProps =  RouteComponentProps<{ id: number }> & IOwnProps;

class TransactionsTableRow extends React.Component<IProps> {
  private rowClass = (transaction: ITransaction): string => {
    return !transaction.isViewed ? 'new-transaction' : '';
  }

  private handleClick = (transactionId: number) => {
    this.props.history.push(`/transactions/${transactionId}/edit`);
  }

  public render() {
    const { transaction } = this.props;

    const isTransfer = transaction.category && transaction.category.name === 'Transfer';

    return(
      <>
        <tr
          className={ this.rowClass(transaction) }
          onClick={ () => this.handleClick(transaction.id) }
        >
          <td className="text-right">
            <MoneyAmount colorize transfer={ isTransfer } amount={ transaction.amount } />
          </td>
          <td>{ transaction.category.name }</td>
          <td>{ formatBankAccountName(transaction.bankAccount) }</td>
          <td>{ transaction.customer && transaction.customer.name }</td>
          <td>{ transaction.comment }</td>
          <td>{ formatDate(transaction.date) }</td>
        </tr>
      </>
    );
  }
}

export default withRouter(TransactionsTableRow);
