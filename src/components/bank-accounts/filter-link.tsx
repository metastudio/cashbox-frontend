import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { formatBankAccountName, IBankAccount } from 'services/bank-accounts';
import { locationWithQuery } from 'utils/url-helpers';

interface IOwnProps {
  bankAccount: IBankAccount;
}

type IProps = RouteComponentProps<{}> & IOwnProps;

const BankAccountFilterLink: React.SFC<IProps> = ({ bankAccount, location }) => {
  return (
    <Link
      to={ locationWithQuery(location, { q: { bankAccountIdIn: [bankAccount.id] } }) }
      className="filter-link"
    >
      { formatBankAccountName(bankAccount) }
    </Link>
  );
};

export default withRouter<IProps>(BankAccountFilterLink);
