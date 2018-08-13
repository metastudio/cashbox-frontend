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
    const { orgId, transactionId, load } = this.props;
    load(orgId, transactionId);
  }

  private renderChildren = () => {
    const { transaction, children } = this.props;
    if (!transaction) { return null; }

    return children(transaction);
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate(prevProps: IProps) {
    const { transactionId: prevTransactionId } = prevProps;
    const { status, transaction } = this.props;
    if (status === Status.Invalid || (transaction && transaction.id !== prevTransactionId)) {
      this.loadData();
    }
  }

  public render() {
    const { status } = this.props;

    return(
      <LoadingView status={ status }>
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
