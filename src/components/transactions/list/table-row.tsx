import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { formatBankAccountName } from 'services/bank-accounts';
import { ITransaction, isTransfer } from 'services/transactions';
import { formatDate } from 'utils/date';

import { MoneyAmount } from 'components/utils/money';

import './../index.css';

interface IOwnProps {
  transaction: ITransaction;
}

type IProps =  RouteComponentProps<{ id: number }> & IOwnProps;

class TransactionsTableRow extends React.PureComponent<IProps> {
  private rowClass = (transaction: ITransaction): string => {
    return !transaction.isViewed ? 'new-transaction' : '';
  }

  private handleRowClick = () => {
    const { transaction, history } = this.props;
    history.push(`/transactions/${transaction.id}`);
  }

  public render() {
    const { transaction } = this.props;

    return(
      <>
        <tr className={ this.rowClass(transaction) } onClick={ this.handleRowClick }>
          <td className="text-right">
            <MoneyAmount colorize transfer={ isTransfer(transaction) } amount={ transaction.amount } />
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
