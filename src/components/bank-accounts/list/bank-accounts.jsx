import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';
import { loadBankAccounts } from 'services/bank-accounts';
import { getCurrentOrganizationId } from 'selectors/organizations.js';

import LoadingView from 'components/utils/loading-view';
import TableBody from './table-body.jsx';

class BankAccounts extends React.Component {
  componentDidMount() {
    const { orgId, loadBankAccounts } = this.props;
    loadBankAccounts(orgId);
  }

  render() {
    const { status, bankAccounts } = this.props;

    if (status !== statuses.SUCCESS || !bankAccounts) {
      return <LoadingView status={ status } />;
    }

    return (
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
        <TableBody bankAccounts={ bankAccounts } />
      </Table>
    );
  }
}

BankAccounts.propTypes = {
  orgId:            PropTypes.number.isRequired,
  loadBankAccounts: PropTypes.func.isRequired,
  status:           PropTypes.string.isRequired,
  bankAccounts:     PropTypes.arrayOf(PropTypes.object).isRequired,
};

const select = (state) => ({
  orgId:        getCurrentOrganizationId(state),
  bankAccounts: state.bankAccounts.items,
  status:       state.bankAccounts.status,
});

const dispatcher = (dispatch) => ({
  loadBankAccounts: (organizationId) => dispatch(loadBankAccounts(organizationId)),
});

export default connect(select, dispatcher)(BankAccounts);
