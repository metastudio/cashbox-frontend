import * as React from 'react';

import { RouteComponentProps, withRouter } from 'react-router-dom';

import { isTransfer, ITransaction, ITransfer } from 'services/transactions';
import { formatDate } from 'utils/date';
import { locationWithKeys } from 'utils/url-helpers';

import { FaButton, FaLink } from 'components/utils/fa';
import { MoneyAmount } from 'components/utils/money';

import BankAccountFilterLink from 'components/bank-accounts/filter-link';
import CategoryFilterLink from 'components/categories/filter-link';
import CustomerFilterLink from 'components/customers/filter-link';

import Destroy from '../destroy';

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
    const { transaction, location: { search } } = this.props;

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
          <td>
            <FaLink
              to={ { search, pathname: `/transactions/${transaction.id}/edit` } }
              icon="edit"
              title="Edit Transactoin"
            />
          </td>
          <td>
            <FaLink
              to={ locationWithKeys({ search, pathname: '/transactions/new' }, { copyId: String(transaction.id) }) }
              icon="clone"
              title="Copy Transactoin"
            />
          </td>
          <td>
            <Destroy transaction={ transaction }>
              <FaButton icon="trash-o" title="Remove Transaction"/>
            </Destroy>
          </td>
        </tr>
      </>
    );
  }
}

export default withRouter(TransactionsTableRow);
