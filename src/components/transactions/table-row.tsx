import * as React from 'react';
import * as Moment from 'moment';

import { Transaction } from 'model-types';
import { formatMoney } from 'utils/money';
import './css/default.css';

interface Props {
  transaction: Transaction;
}

const TransactionsTableRow: React.SFC<Props> = ({ transaction }) => {

  const getColorClass = (t: Transaction): string => {
    if (t.category && t.category.name === 'Transfer') {
      return 'transfer';
    } else {
      return Number(t.amount.fractional) > 0 ? 'positive' : 'negative';
    }
  };

  return(
    <tr key={ transaction.id }>
      <td className={ getColorClass(transaction) }>{ formatMoney(transaction.amount) }</td>
      <td>{ transaction.category.name }</td>
      <td>{ transaction.bankAccount.name }</td>
      <td>{ transaction.customer && transaction.customer.name }</td>
      <td>{ transaction.comment }</td>
      <td>{ Moment(transaction.date).format('L') }</td>
    </tr>
  );
};

export default TransactionsTableRow;
