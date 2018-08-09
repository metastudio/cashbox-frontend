import * as React from 'react';

import { IMember } from 'services/members';

interface IProps {
  member: IMember;
}

const MembersTable: React.SFC<IProps> = ({ member }) => (
  <tr>
    <td>{ member.user.fullName }</td>
    <td>{ member.user.email }</td>
    <td>{ member.role }</td>
  </tr>
);

export default MembersTable;
