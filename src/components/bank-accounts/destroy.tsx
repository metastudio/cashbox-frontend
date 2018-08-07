import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

import { BankAccount, deleteBankAccount as deleteBankAccountAction } from 'services/bank-accounts';
import { addFlashMessage, FlashMessageOptions } from 'services/flash-messages';

import { confirm } from 'components/utils/confirm';
import { selectCurrentOrganizationId } from 'services/organizations';

interface OwnProps {
  bankAccount: BankAccount;
}

interface StateProps {
  orgId: number;
}

interface DispatchProps {
  deleteBankAccount: (orgId: number, bankAccountId: number) => Promise<{}>;
  message:           (msg: string, type?: FlashMessageOptions) => void;
}

type Props = OwnProps & StateProps & DispatchProps & RouteComponentProps<{}>;

class DestroyBankAccount extends React.Component<Props> {
  handleDeleteBankAccountClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const { orgId, bankAccount, message, history, deleteBankAccount } = this.props;

    confirm(`Are you sure you want to remove bank account "${bankAccount.name}"?`).then(() => {
      deleteBankAccount(orgId, bankAccount.id).then(() => {
        message(`Bank Account "${bankAccount.name}" has been removed.`);
        history.push('/bank_accounts');
      }).catch(error => {
        message(`Unable to delete bank account: ${error.message}`, { type: 'danger' });
      });
    });
  }

  render() {
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
  message: (msg: string, type?: FlashMessageOptions) => dispatch(addFlashMessage(msg, type)),
});

export default withRouter(connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch)(DestroyBankAccount));
