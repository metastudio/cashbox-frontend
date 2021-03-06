import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { ICustomer } from 'services/customers';
import { locationWithQuery } from 'utils/url-helpers';

interface IOwnProps {
  customer: ICustomer;
}

type IProps = RouteComponentProps<{}> & IOwnProps;

const CustomerFilterLink: React.SFC<IProps> = ({ customer, location }) => {
  return (
    <Link
      to={ locationWithQuery(location, { q: { customerIdIn: [customer.id] } }) }
      className="filter-link"
    >
      { customer.name }
    </Link>
  );
};

export default withRouter<IProps>(CustomerFilterLink);
