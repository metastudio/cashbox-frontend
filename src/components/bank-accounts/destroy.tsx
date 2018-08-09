import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

import { IBankAccount, deleteBankAccount as deleteBankAccountAction } from 'services/bank-accounts';
import { addFlashMessage, IFlashMessageOptions } from 'services/flash-messages';

import { confirm } from 'components/utils/confirm';
import { selectCurrentOrganizationId } from 'services/organizations';

interface IOwnProps {
  bankAccount: IBankAccount;
}

interface IStateProps {
  orgId: number;
}

interface IDispatchProps {
  deleteBankAccount: (orgId: number, bankAccountId: number) => Promise<{}>;
  message:           (msg: string, type?: IFlashMessageOptions) => void;
}

type Props = IOwnProps & IStateProps & IDispatchProps & RouteComponentProps<{}>;

class DestroyBankAccount extends React.Component<Props> {
  private handleDeleteBankAccountClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const { orgId, bankAccount, message, history, deleteBankAccount } = this.props;

    confirm(`Are you sure you want to remove bank account "${bankAccount.name}"?`).then(() => {
      deleteBankAccount(orgId, bankAccount.id).then(() => {
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

const mapState = (state: object) => ({
  orgId: selectCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  deleteBankAccount:
    (orgId: number, bankAccountId: number) => (
      new Promise((res, rej) => dispatch(deleteBankAccountAction(orgId, bankAccountId, res, rej)))
    ),
  message: (msg: string, type?: IFlashMessageOptions) => dispatch(addFlashMessage(msg, type)),
});

export default withRouter(connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(DestroyBankAccount));
