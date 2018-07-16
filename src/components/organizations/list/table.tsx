import * as React from 'react';
import { Table } from 'react-bootstrap';

import { Organization } from 'services/organizations';

import Row from './table-row';

interface Props {
  organizations: Organization[];
}

const OrganizationsTable: React.SFC<Props> = ({ organizations }) => (
  <Table striped responsive hover id="organizations">
    <thead>
      <tr>
        <th>Name</th>
        <th>Currency</th>
        <th/>
      </tr>
    </thead>
    <tbody>
      { organizations.map((o) => o ? <Row organization={ o } key={ o.id } /> : null) }
  </tbody>
  </Table>
);

export default OrganizationsTable;
