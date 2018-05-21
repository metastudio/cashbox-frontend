import * as React from 'react';
import * as Moment from 'moment';
import { Transaction } from 'model-types';
import { formatMoney } from 'utils/money';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './../css/default.css';
import { formatBankAccountName } from 'utils/bank-account';

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

  handleClick = (transactionId: number) => {
    this.props.history.push(`/transactions/${transactionId}/edit`);
  }

  render() {
    const { transaction } = this.props;

    return(
      <>
        <tr key={ transaction.id } onClick={ () => this.handleClick(transaction.id) }>
          <td className={ this.amountClass(transaction) }>{ formatMoney(transaction.amount) }</td>
          <td>{ transaction.category.name }</td>
          <td>{ formatBankAccountName(transaction.bankAccount) }</td>
          <td>{ transaction.customer && transaction.customer.name }</td>
          <td>{ transaction.comment }</td>
          <td>{ Moment(transaction.date).format('L') }</td>
        </tr>
      </>
    );
  }
}

export default withRouter(TransactionsTableRow);
