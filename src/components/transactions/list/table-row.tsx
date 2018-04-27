import * as React from 'react';
import * as Moment from 'moment';
import { Transaction } from 'model-types';
import { formatMoney } from 'utils/money';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './../css/default.css';
import BankAccountName from '../../bank-accounts/bank-account-name';

interface OwnProps {
  transaction: Transaction;
}

type Props =  RouteComponentProps<{ id: number }> & OwnProps;

class TransactionsTableRow extends React.Component<Props> {
  getColorClass = (t: Transaction): string => {
    if (t.category && t.category.name === 'Transfer') {
      return 'transfer';
    } else {
      return Number(t.amount.fractional) > 0 ? 'positive' : 'negative';
    }
  }

  handleClick = (transactionId: number) => {
    this.props.history.push(`/transactions/${transactionId}/edit`);
  }

  render() {
    const { transaction } = this.props;
    
    return(
      <>
        <tr key={ transaction.id } onClick={ () => this.handleClick(transaction.id) }>
          <td className={ this.getColorClass(transaction) }>{ formatMoney(transaction.amount) }</td>
          <td>{ transaction.category.name }</td>
          <td>{ <BankAccountName bankAccount={ transaction.bankAccount } /> }</td>
          <td>{ transaction.customer && transaction.customer.name }</td>
          <td>{ transaction.comment }</td>
          <td>{ Moment(transaction.date).format('L') }</td>
        </tr>
      </>
    );
  }
}

export default withRouter(TransactionsTableRow);
