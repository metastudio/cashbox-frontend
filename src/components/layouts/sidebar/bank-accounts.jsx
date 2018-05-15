import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';
import { loadBankAccounts } from 'actions/bank-accounts.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { formatMoney } from 'utils/money';
import 'components/transactions/css/default.css';

import LoadingView from 'components/utils/loading-view';
import { formatBankAccountName } from 'utils/bank-account';

class BankAccounts extends React.Component {

  componentDidMount() {
    const { orgId, loadBankAccounts } = this.props;
    if (orgId) {
      loadBankAccounts(orgId);
    }
  }

  getColorClass = (bankAccount) => {
    return Number(bankAccount.balance.fractional) > 0 ? 'positive' : 'negative';
  }

  render() {
    const bankAccounts = this.props.bankAccounts.map((bankAccount) => (
      <tr key={ bankAccount.id }>
        <td>{ formatBankAccountName(bankAccount) }</td>
        <td className={ this.getColorClass(bankAccount) }>{ formatMoney(bankAccount.balance) }</td>
      </tr>
    ));

    if (this.props.orgId) {
      return (
        <LoadingView status={ this.props.status }>
          { this.props.status === statuses.SUCCESS &&
            <div>
              <h2>Accounts</h2>
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
