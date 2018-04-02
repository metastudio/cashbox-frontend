import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';
import { addFlashMessage } from 'actions/flash-messages.js';
import { loadMembers } from 'actions/members.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';

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
    )
    );

    return (
      <LoadingView status={ this.props.status }>
        { this.props.status === statuses.SUCCESS &&
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
        }
      </LoadingView>
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
  orgId:   getCurrentOrganizationId(state),
  members: state.members.items,
  status:  state.members.status,
});

const dispatcher = (dispatch) => ({
  loadMembers:     (organizationId) => dispatch(loadMembers(organizationId)),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default connect(select, dispatcher)(Members);
