import * as React from 'react';
import { Link } from 'react-router-dom';

import { Organization } from 'services/organizations';

interface Props {
  organization: Organization;
}

const OrganizationsTableRow: React.SFC<Props> = ({ organization }) => (
  <tr>
    <td>{ organization.name }</td>
    <td>{ organization.defaultCurrency }</td>
    <td><Link to={ `/organizations/${organization.id}/edit` } title="Edit"><i className="fa fa-edit" /></Link></td>
  </tr>
);

export default OrganizationsTableRow;
