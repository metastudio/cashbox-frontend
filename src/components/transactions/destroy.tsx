import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router';

import { ITransaction, destroyTransaction } from 'services/transactions';
import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';

import { withCurrentOrgId, ICurrentOrgIdProps } from 'components/organizations/current-organization';
import { confirm } from 'components/utils/confirm';

interface IOwnProps {
  transaction: ITransaction;
}

interface IDispatchProps {
  destroy:      (orgId: number, transactionId: number) => Promise<{}>;
  flashMessage: AddFlashMessageAction;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IRouteProps & IOwnProps & IDispatchProps & ICurrentOrgIdProps;

class DestroyButton extends React.Component<IProps> {
  private handleDestroy = () => {
    const { orgId, transaction, destroy } = this.props;
    if (!transaction) { return; }

    confirm('Are you sure?').then(() => {
      destroy(orgId, transaction.id).then(() => {
        const { flashMessage, history, location: { search } } = this.props;

        flashMessage('Transaction successfully removed');
        history.push({ search, pathname: '/transactions' });
      });
    });
  }

  public render() {
    return(
      <Button bsStyle="danger" onClick={ this.handleDestroy }>Remove</Button>
    );
  }
}

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  destroy: (orgId, transId) => new Promise((res, rej) => dispatch(destroyTransaction(orgId, transId, res, rej))),
  flashMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter<IOwnProps & IRouteProps>(
  withCurrentOrgId(
    connect<{}, IDispatchProps, IOwnProps>(undefined, mapDispatch)(DestroyButton),
  ),
);
