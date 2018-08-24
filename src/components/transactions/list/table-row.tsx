import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ITransaction, ITransfer, isTransfer } from 'services/transactions';
import { formatDate } from 'utils/date';

import { MoneyAmount } from 'components/utils/money';
import BankAccountFilterLink from 'components/bank-accounts/filter-link';
import CategoryFilterLink from 'components/categories/filter-link';
import CustomerFilterLink from 'components/customers/filter-link';

import './../index.css';

interface IOwnProps {
  transaction: ITransaction;
}

type IProps =  RouteComponentProps<{ id: number }> & IOwnProps;

class TransactionsTableRow extends React.PureComponent<IProps> {
  private rowClass = (transaction: ITransaction): string => {
    return !transaction.isViewed ? 'new-transaction' : '';
  }

  private handleRowClick = (e: React.MouseEvent) => {
    if (e.defaultPrevented) { return; }

    const { transaction, history, location: { search } } = this.props;
    history.push({ search, pathname: `/transactions/${transaction.id}` });
  }

  private bankAccountTitle = (transaction: ITransaction) => {
    if (isTransfer(transaction)) {
      return (
        <>
          <BankAccountFilterLink bankAccount={ (transaction as ITransfer).transferOut.bankAccount } />
          { ' ' }
          &rarr;
          { ' ' }
          <BankAccountFilterLink bankAccount={ transaction.bankAccount } />
        </>
      );
    }

    return <BankAccountFilterLink bankAccount={ transaction.bankAccount } />;
  }

  public render() {
    const { transaction } = this.props;

    return(
      <>
        <tr className={ this.rowClass(transaction) } onClick={ this.handleRowClick }>
          <td className="text-right">
            <MoneyAmount colorize transfer={ isTransfer(transaction) } amount={ transaction.amount } />
          </td>
          <td><CategoryFilterLink category={ transaction.category } /></td>
          <td>{ this.bankAccountTitle(transaction) }</td>
          <td>{ transaction.customer && <CustomerFilterLink customer={ transaction.customer } /> }</td>
          <td>{ transaction.comment }</td>
          <td>{ formatDate(transaction.date) }</td>
        </tr>
      </>
    );
  }
}

export default withRouter(TransactionsTableRow);
