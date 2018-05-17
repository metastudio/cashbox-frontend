import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import BankAccounts from './list/bank-accounts';

class BankAccountsList extends React.Component {
  render() {
    return (
      <div>
        <Link to="/bank-accounts/new" className="btn btn-default pull-right">New Bank Account</Link>
        <h1>Bank Accounts</h1>
        
      </div>
    );
  }
}

export default withRouter(BankAccountsList);
