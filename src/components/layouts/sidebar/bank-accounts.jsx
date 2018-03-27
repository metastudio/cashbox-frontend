import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';
import { loadBankAccounts } from 'actions/bank-accounts.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';

import LoadingView from 'components/utils/loading-view';

class BankAccounts extends React.Component {

  componentDidMount() {
    const { orgId, loadBankAccounts } = this.props;
    if (orgId) {
      loadBankAccounts(orgId);
    }
  }

  render() {
    const bankAccounts = this.props.bankAccounts.map((bankAccount) => (
      <tr key={ bankAccount.id }>
        <td>{ bankAccount.name } ({ bankAccount.currency })</td>
        <td>{ bankAccount.balance }</td>
      </tr>
    ));

    if (this.props.orgId) {
      return (
        <LoadingView status={ this.props.status }>
          { this.props.status === statuses.SUCCESS &&
            <div>
              <h2><center>Accounts</center></h2>
              <Table striped responsive id="bankAccounts">
                <tbody>
                  { bankAccounts }
                </tbody>
              </Table>
            </div>
          }
        </LoadingView>
      );
    } else {
      return null;
    }
  }
}

BankAccounts.propTypes = {
  orgId:            PropTypes.number,
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