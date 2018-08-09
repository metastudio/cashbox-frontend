import * as React from 'react';
import { Table } from 'react-bootstrap';

import { IMember } from 'services/members';

import Row from './table-row';

interface IProps {
  members: IMember[];
}

const MembersTable: React.SFC<IProps> = ({ members }) => (
  <Table striped responsive hover id="members">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      { members.map(m => <Row member={ m } key={ m.id } />) }
    </tbody>
  </Table>
);

export default MembersTable;
