import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Status, ID } from 'model-types';
import {
  ITransaction,
  loadTransaction,
  selectTransaction, selectTransactionStatus,
} from 'services/transactions';

import LoadingView from 'components/utils/loading-view';

interface IOwnProps {
  orgId:         ID;
  transactionId: ID;
  children:      (transaction: ITransaction) => React.ReactNode;
  spinner?:      React.ReactNode | (() => React.ReactNode);
}

interface IStateProps {
  status:      Status;
  transaction: ITransaction | null;
}

interface IDispatchProps {
  load: (orgId: number, transactionId: number) => void;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

class LoadedTransaction extends React.PureComponent<IProps> {
  private loadData = () => {
    const { orgId, transactionId, load, status, transaction } = this.props;
    if (status === Status.Invalid || (transaction && transaction.id !== this.props.transactionId)) {
      load(orgId, transactionId);
    }
  }

  private renderChildren = () => {
    const { transaction, children } = this.props;
    if (!transaction) { return null; }

    return children(transaction);
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate() {
    this.loadData();
  }

  public render() {
    const { status, spinner } = this.props;

    return(
      <LoadingView status={ status } spinner={ spinner }>
        { this.renderChildren }
      </LoadingView>
    );
  }
}

const mapState = (state: {}): IStateProps => ({
  status:      selectTransactionStatus(state),
  transaction: selectTransaction(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: (orgId, transId) => dispatch(loadTransaction(orgId, transId)),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  mapState, mapDispatch,
)(LoadedTransaction);
