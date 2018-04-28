import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';
import { formatMoney } from 'utils/money';
import { addFlashMessage } from 'actions/flash-messages.js';
import { loadBankAccounts, deleteBankAccount } from 'actions/bank-accounts.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';

import LoadingView from 'components/utils/loading-view';

class BankAccounts extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteBankAccountClick = this.handleDeleteBankAccountClick.bind(this);
  }

  componentDidMount() {
    const { orgId, loadBankAccounts } = this.props;
    loadBankAccounts(orgId);
  }

  handleDeleteBankAccountClick(bankAccountId) {
    const { orgId, deleteBankAccount } = this.props;
    deleteBankAccount(orgId, bankAccountId).then(bankAccount => {
      this.props.addFlashMessage('Bank account ' + bankAccount.name + ' successfully deleted.');
      this.props.history.push('/bank_accounts');
    }).catch(error => {
      this.props.addFlashMessage(`Unable to delete bank account: ${error.message}`, { type: 'danger' });
    });
  }

  render() {
    const bankAccounts = this.props.bankAccounts.map((bankAccount) => (
      <tr key={ bankAccount.id }>
        <td>{ bankAccount.name }</td>
        <td>{ bankAccount.currency }</td>
        <td>{ bankAccount.description }</td>
        <td>{ formatMoney(bankAccount.balance) }</td>
        <td>{ bankAccount.invoiceDetails }</td>
        <td><Link to={ `/bank_accounts/${bankAccount.id}/edit` } className="btn btn-primary">Edit</Link></td>
        <td><Button bsStyle="danger" onClick={ () => this.handleDeleteBankAccountClick(bankAccount.id) }>Delete</Button></td>
      </tr>
    )
    );

    return (
      <LoadingView status={ this.props.status }>
        <Link to="/bank_accounts/new" className="btn btn-primary">Add...</Link>
        { this.props.status === statuses.SUCCESS &&
          <Table striped responsive hover id="bankAccounts">
            <thead>
              <tr>
                <th>Name</th>
                <th>Currency</th>
                <th>Description</th>
                <th>Balance</th>
                <th>Invoice Details</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { bankAccounts }
            </tbody>
          </Table>
        }
      </LoadingView>
    );
  }
}

BankAccounts.propTypes = {
  orgId:             PropTypes.number.isRequired,
  loadBankAccounts:  PropTypes.func.isRequired,
  deleteBankAccount: PropTypes.func.isRequired,
  status:            PropTypes.string.isRequired,
  bankAccounts:      PropTypes.arrayOf(PropTypes.object).isRequired,
  addFlashMessage:   PropTypes.func.isRequired,
  history:           PropTypes.object.isRequired,
};

const select = (state) => ({
  orgId:        getCurrentOrganizationId(state),
  bankAccounts: state.bankAccounts.items,
  status:       state.bankAccounts.status,
});

const dispatcher = (dispatch) => ({
  loadBankAccounts:  (organizationId) => dispatch(loadBankAccounts(organizationId)),
  deleteBankAccount: (organizationId, bankAccountId) => new Promise((res, rej) => dispatch(deleteBankAccount(organizationId, bankAccountId, res, rej))),
  addFlashMessage:   (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(select, dispatcher)(BankAccounts));
