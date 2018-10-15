import * as React from 'react';

import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID } from 'model-types';
import { deleteBankAccount as deleteBankAccountAction, IBankAccount } from 'services/bank-accounts';
import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';

import { confirm } from 'components/utils/confirm';

interface IOwnProps {
  bankAccount: IBankAccount;
}

interface IStateProps {
  orgId: ID;
}

interface IDispatchProps {
  deleteBankAccount: typeof deleteBankAccountAction.request;
  message:           AddFlashMessageAction;
}

type Props = IOwnProps & IStateProps & IDispatchProps & RouteComponentProps<{}>;

class DestroyBankAccount extends React.Component<Props> {
  private handleDeleteBankAccountClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const { orgId, bankAccount, message, history, deleteBankAccount } = this.props;

    confirm(`Are you sure you want to remove bank account "${bankAccount.name}"?`).then(() => {
      new Promise((res, rej) => {
        deleteBankAccount(orgId, bankAccount.id, res, rej);
      }).then(() => {
        message(`Bank Account "${bankAccount.name}" has been removed.`);
        history.push('/bank_accounts');
      }).catch((error) => {
        message(`Unable to delete bank account: ${error.message}`, { type: 'danger' });
      });
    });
  }

  public render() {
    const { bankAccount } = this.props;
    return (
      <Link
        title="Delete"
        to={ `/bank_accounts/${bankAccount.id}` }
        onClick={ this.handleDeleteBankAccountClick }
      >
        <i className="fa fa-trash-o" />
      </Link>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  orgId: selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  deleteBankAccount: (orgId, bankAccountId) => dispatch(deleteBankAccountAction.request(orgId, bankAccountId)),
  message:           (msg, type) => dispatch(addFlashMessage(msg, type)),
});

export default withRouter(connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(DestroyBankAccount));
