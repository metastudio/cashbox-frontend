import * as React from 'react';
import * as Moment from 'moment';
import { Transaction, Member } from 'model-types';
import { formatMoney } from 'utils/money';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './../css/default.css';
import { formatBankAccountName } from 'utils/bank-account';

interface OwnProps {
  transaction:   Transaction;
  currentMember: Member;
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

  getNewTransactionClass = (transaction: Transaction, currentMember: Member): string => {
    if (transaction.createdAt > currentMember.lastVisitedAt) {
      return 'new-transaction';
    } else {
      return '';
    }
  }

  handleClick = (transactionId: number) => {
    this.props.history.push(`/transactions/${transactionId}/edit`);
  }

  render() {
    const { transaction, currentMember } = this.props;
    
    return(
      <>
        <tr
          key={ transaction.id }
          className={ this.getNewTransactionClass(transaction, currentMember) }
          onClick={ () => this.handleClick(transaction.id) }
        >
          <td className={ this.getColorClass(transaction) }>{ formatMoney(transaction.amount) }</td>
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
