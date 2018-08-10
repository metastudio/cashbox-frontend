import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router';

import { ITransaction, destroyTransaction } from 'services/transactions';
import { addFlashMessage } from 'services/flash-messages';
import { selectCurrentOrganizationId } from 'services/organizations';

import { confirm } from 'components/utils/confirm';

interface IOwnProps {
  transaction: ITransaction;
}

interface IStateProps {
  orgId: number;
}

interface IDispatchProps {
  destroy:      (orgId: number, transactionId: number) => Promise<{}>;
  flashMessage: (message: string) => void;
}

type IProps = RouteComponentProps<{ id: string }> & IOwnProps & IStateProps & IDispatchProps;

class DestroyButton extends React.Component<IProps> {
  private handleDestroy = () => {
    const { orgId, transaction, destroy } = this.props;
    if (!transaction) { return; }

    confirm('Are you sure?').then(() => {
      destroy(orgId, transaction.id).then(() => {
        const { flashMessage, history } = this.props;

        flashMessage('Transaction successfully removed');
        history.push('/transactions');
      });
    });
  }

  public render() {
    return(
      <Button bsStyle="danger" onClick={ this.handleDestroy }>Remove</Button>
    );
  }
}

const mapState = (state: {}) => ({
  orgId: selectCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  destroy: (orgId: number, transactionId: number) =>
    new Promise((res, rej) => { dispatch(destroyTransaction(orgId, transactionId, res, rej)); }),
  flashMessage: (msg: string) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(DestroyButton));
