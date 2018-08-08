import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';
import { addFlashMessage } from 'services/flash-messages';
import { loadMembers, selectMembersStatus, selectMembers } from 'services/members';
import { selectCurrentOrganizationId } from 'services/organizations';

import LoadingView from 'components/utils/loading-view';

class Members extends React.Component {
  componentDidMount() {
    const { orgId, loadMembers } = this.props;
    loadMembers(orgId);
  }

  render() {
    const members = this.props.members.map((member) => (
      <tr key={ member.id }>
        <td>{ member.user.fullName }</td>
        <td>{ member.user.email }</td>
        <td>{ member.role }</td>
      </tr>
    ));

    if (this.props.status !== statuses.SUCCESS || !members) {
      return <LoadingView status={ this.props.status } />;
    }

    return (
      <div>
        <h1>Members</h1>
        <Table striped responsive hover id="members">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            { members }
          </tbody>
        </Table>
      </div>
    );
  }
}

Members.propTypes = {
  orgId:           PropTypes.number.isRequired,
  loadMembers:     PropTypes.func.isRequired,
  status:          PropTypes.string.isRequired,
  members:         PropTypes.arrayOf(PropTypes.object).isRequired,
  addFlashMessage: PropTypes.func.isRequired,
};

const select = (state) => ({
  orgId:   selectCurrentOrganizationId(state),
  status:  selectMembersStatus(state),
  members: selectMembers(state),
});

const dispatcher = (dispatch) => ({
  loadMembers:     (organizationId) => dispatch(loadMembers(organizationId)),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default connect(select, dispatcher)(Members);
