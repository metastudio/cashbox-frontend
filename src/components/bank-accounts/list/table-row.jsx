import * as React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { formatMoney } from 'utils/money';
import DestroyButton from './destroy.jsx';

class BankAccountsTableRow extends React.Component {

  render() {
    const { bankAccount } = this.props;
    return(
      <tr key={ bankAccount.id }>
        <td>{ bankAccount.name }</td>
        <td>{ bankAccount.currency }</td>
        <td>{ bankAccount.description }</td>
        <td>{ formatMoney(bankAccount.balance) }</td>
        <td>{ bankAccount.invoiceDetails }</td>
        <td><Link to={ `/bank_accounts/${bankAccount.id}/edit` }><i className="fa fa-edit" /></Link></td>
        <td><DestroyButton bankAccount={ bankAccount } /></td>
      </tr>
    );
  }
}

BankAccountsTableRow.propTypes = {
  bankAccount: PropTypes.object.isRequired,
};

export default withRouter(BankAccountsTableRow);
