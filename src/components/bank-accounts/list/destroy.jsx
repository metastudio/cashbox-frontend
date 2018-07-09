import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { addFlashMessage } from 'services/flash-messages';
import { deleteBankAccount } from 'services/bank-accounts';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { confirm } from 'components/utils/confirm';

class DestroyBankAccount extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteBankAccountClick = this.handleDeleteBankAccountClick.bind(this);
  }

  handleDeleteBankAccountClick() {
    const { orgId, bankAccount, deleteBankAccount } = this.props;

    confirm('Are you sure?').then( () => {
      deleteBankAccount(orgId, bankAccount.id).then(bankAccount => {
        this.props.addFlashMessage('Bank account ' + bankAccount.name + ' successfully deleted.');
        this.props.history.push('/bank_accounts');
      }).catch(error => {
        this.props.addFlashMessage(`Unable to delete bank account: ${error.message}`, { type: 'danger' });
      });
    });
  }

  render() {
    return (
      <Link
        title="Delete"
        to={ '/bank_accounts' }
        onClick={ this.handleDeleteBankAccountClick }>
        <i className="fa fa-trash-o" />
      </Link>
    );
  }
}

DestroyBankAccount.propTypes = {
  orgId:             PropTypes.number.isRequired,
  deleteBankAccount: PropTypes.func.isRequired,
  bankAccount:       PropTypes.object.isRequired,
  addFlashMessage:   PropTypes.func.isRequired,
  history:           PropTypes.object.isRequired,
};

const select = (state) => ({
  orgId: getCurrentOrganizationId(state),
});

const dispatcher = (dispatch) => ({
  deleteBankAccount: (organizationId, bankAccountId) => new Promise((res, rej) => dispatch(deleteBankAccount(organizationId, bankAccountId, res, rej))),
  addFlashMessage:   (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(select, dispatcher)(DestroyBankAccount));
