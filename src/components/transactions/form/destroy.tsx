import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router';

import { Transaction } from 'model-types';
import { destroyTransaction } from 'actions/transactions.js';
import { addFlashMessage } from 'actions/flash-messages.js';

import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectTransaction } from 'selectors/transactions.js';

interface StateProps {
  orgId:       number;
  transaction: Transaction | null;
}

interface DispatchProps {
  destroy:      (orgId: number, transactionId: number) => Promise<{}>;
  flashMessage: (message: string) => void;
}

type RouteProps = RouteComponentProps<{ id: string }>;
type Props = RouteProps & StateProps & DispatchProps;

class DestroyButton extends React.Component<Props> {
  handleDestroy = () => {
    const { orgId, transaction, destroy } = this.props;
    if (!transaction) { return; }

    destroy(orgId, transaction.id).then(() => {
      const { flashMessage, history } = this.props;

      flashMessage('Transaction successfully removed');
      history.push('/transactions');
    });
  }

  render() {
    return(
      <Button bsStyle="danger" onClick={ this.handleDestroy }>Remove</Button>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:       getCurrentOrganizationId(state),
  transaction: selectTransaction(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  destroy: (orgId: number, transactionId: number) =>
    new Promise((res, rej) => { dispatch(destroyTransaction(orgId, transactionId, res, rej)); }),
  flashMessage: (msg: string) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(DestroyButton));
