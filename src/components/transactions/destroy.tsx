import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dispatch } from 'redux';

import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';
import { destroyTransaction, ITransaction } from 'services/transactions';

import { ICurrentOrgIdProps, withCurrentOrgId } from 'components/organizations/current-organization';
import { confirm } from 'components/utils/confirm';

interface IOwnProps {
  transaction: ITransaction;
  children:    React.ReactElement<{ onClick: (e: MouseEvent) => void }>;
}

interface IDispatchProps {
  destroy:      (orgId: number, transactionId: number) => Promise<{}>;
  flashMessage: AddFlashMessageAction;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IRouteProps & IOwnProps & IDispatchProps & ICurrentOrgIdProps;

class DestroyButton extends React.Component<IProps> {
  private handleDestroy = (e: MouseEvent) => {
    e.preventDefault();

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
    return React.cloneElement(this.props.children, { onClick: this.handleDestroy });
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
