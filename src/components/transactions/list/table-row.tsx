import * as React from 'react';
import * as Moment from 'moment';
import { connect, Dispatch } from 'react-redux';
import { Transaction } from 'model-types';
import { formatMoney } from 'utils/money';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { loadTransaction } from 'actions/transactions.js';
import { selectTransactionStatus } from 'selectors/transactions.js';
import './../css/default.css';

interface OwnProps {
  transaction: Transaction;
}

interface StateProps {
  orgId:  number;
  status: string;
}

interface DispatchProps {
  load: (orgId: number, transactionId: number) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class TransactionsTableRow extends React.Component<Props> {
  getColorClass = (t: Transaction): string => {
    if (t.category && t.category.name === 'Transfer') {
      return 'transfer';
    } else {
      return  Number(t.amount.fractional) > 0 ? 'positive' : 'negative';
    }
  }

  handleClick = (transactionId: number) => {
    const { orgId, load } = this.props;
    load(orgId, transactionId);
  }

  render() {
    const { transaction } = this.props;
    
    return(
      <>
        <tr key={ transaction.id } onClick={ () => this.handleClick(transaction.id) }>
          <td className={ this.getColorClass(transaction) }>{ formatMoney(transaction.amount) }</td>
          <td>{ transaction.category.name }</td>
          <td>{ transaction.bankAccount.name }</td>
          <td>{ transaction.customer && transaction.customer.name }</td>
          <td>{ transaction.comment }</td>
          <td>{ Moment(transaction.date).format('L') }</td>
        </tr>
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:       getCurrentOrganizationId(state),
  status:      selectTransactionStatus(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number, transactionId: number) => dispatch(loadTransaction(orgId, transactionId)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(TransactionsTableRow);
