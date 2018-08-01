import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { formatBankAccountName } from 'services/bank-accounts';
import { Transaction } from 'services/transactions';
import { formatDate } from 'utils/date';

import { MoneyAmount } from 'components/utils/money';

import './../css/default.css';

interface OwnProps {
  transaction: Transaction;
}

type Props =  RouteComponentProps<{ id: number }> & OwnProps;

class TransactionsTableRow extends React.Component<Props> {
  amountClass = (t: Transaction): string => {
    let className = '';
    if (t.category && t.category.name === 'Transfer') {
      className = 'transfer';
    } else {
      className = Number(t.amount.fractional) > 0 ? 'positive' : 'negative';
    }
    return className + ' text-right';
  }

  rowClass = (transaction: Transaction): string => {
    return !transaction.isViewed ? 'new-transaction' : '';
  }

  handleClick = (transactionId: number) => {
    this.props.history.push(`/transactions/${transactionId}/edit`);
  }

  render() {
    const { transaction } = this.props;

    return(
      <>
        <tr
          className={ this.rowClass(transaction) }
          onClick={ () => this.handleClick(transaction.id) }
        >
          <td className={ this.amountClass(transaction) }>
            <MoneyAmount amount={ transaction.amount } />
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
