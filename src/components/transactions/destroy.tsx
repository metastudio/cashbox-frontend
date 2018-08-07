import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router';

import { Transaction, destroyTransaction } from 'services/transactions';
import { addFlashMessage } from 'services/flash-messages';
import { selectCurrentOrganizationId } from 'services/organizations';

import { confirm } from 'components/utils/confirm';

interface OwnProps {
  transaction: Transaction;
}

interface StateProps {
  orgId: number;
}

interface DispatchProps {
  destroy:      (orgId: number, transactionId: number) => Promise<{}>;
  flashMessage: (message: string) => void;
}

type RouteProps = RouteComponentProps<{ id: string }>;
type Props = RouteProps & OwnProps & StateProps & DispatchProps;

class DestroyButton extends React.Component<Props> {
  handleDestroy = () => {
    const { orgId, transaction, destroy } = this.props;
    if (!transaction) { return; }

    confirm('Are you sure?').then( () => {
      destroy(orgId, transaction.id).then(() => {
        const { flashMessage, history } = this.props;

        flashMessage('Transaction successfully removed');
        history.push('/transactions');
      });
    });
  }

  render() {
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

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(DestroyButton));
