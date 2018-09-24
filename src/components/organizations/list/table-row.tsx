import * as React from 'react';

import { IOrganization } from 'services/organizations';

import { FaLink } from 'components/utils/fa';
import Destroy from '../destroy';

interface IProps {
  organization: IOrganization;
}

const OrganizationsTableRow: React.SFC<IProps> = ({ organization }) => (
  <tr>
    <td>{ organization.name }</td>
    <td>{ organization.defaultCurrency }</td>
    <td>
      <FaLink
        to={ `/organizations/${organization.id}/edit` }
        icon="edit"
        title="Edit"
      />
    </td>
    <td>
      <Destroy organization={ organization } />
    </td>
  </tr>
);

export default OrganizationsTableRow;
