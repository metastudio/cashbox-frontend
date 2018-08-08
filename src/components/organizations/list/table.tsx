import * as React from 'react';
import { Table } from 'react-bootstrap';

import { IOrganization } from 'services/organizations';

import Row from './table-row';

interface IProps {
  organizations: IOrganization[];
}

const OrganizationsTable: React.SFC<IProps> = ({ organizations }) => (
  <Table striped responsive hover id="organizations">
    <thead>
      <tr>
        <th>Name</th>
        <th>Currency</th>
        <th/>
      </tr>
    </thead>
    <tbody>
      { organizations.map(o => o ? <Row organization={ o } key={ o.id } /> : null) }
  </tbody>
  </Table>
);

export default OrganizationsTable;
