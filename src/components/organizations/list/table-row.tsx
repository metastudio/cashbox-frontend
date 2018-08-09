import * as React from 'react';
import { Link } from 'react-router-dom';

import { IOrganization } from 'services/organizations';

interface IProps {
  organization: IOrganization;
}

const OrganizationsTableRow: React.SFC<IProps> = ({ organization }) => (
  <tr>
    <td>{ organization.name }</td>
    <td>{ organization.defaultCurrency }</td>
    <td><Link to={ `/organizations/${organization.id}/edit` } title="Edit"><i className="fa fa-edit" /></Link></td>
  </tr>
);

export default OrganizationsTableRow;
