import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addFlashMessage } from 'actions/flash-messages.js';
import { getHasCurrentOrganization, getCurrentOrganizationId } from 'selectors/organizations.js';
import { loadCurrentMember } from 'actions/members.js';
import { getCurrentMember } from 'selectors/members.js';

class RequireOrganization extends React.Component {
  componentDidMount() {
    this.checkOrganization(this.props);
  }

  componentWillReceiveProps(props) {
    this.checkOrganization(props);
  }

  checkOrganization(props) {
    const { orgId, addFlashMessage, loadMember, currentMember, hasOrganization } = props;
    if (!hasOrganization) {
      addFlashMessage('Please select or add organization.', { type: 'info' });
    } else if (!currentMember) {
      loadMember(orgId);
    }
  }

  render() {
    const { hasOrganization, currentMember, children } = this.props;
    if (hasOrganization && currentMember) {
      return children;
    } else {
      return <Redirect to="/organizations/select" />;
    }
  }
}

RequireOrganization.propTypes = {
  hasOrganization:          PropTypes.bool.isRequired,
  addFlashMessage:          PropTypes.func.isRequired,
  loadMember:               PropTypes.func.isRequired,
  children:                 PropTypes.node,
};

const select = (state) => ({
  hasOrganization: getHasCurrentOrganization(state),
  orgId:           getCurrentOrganizationId(state),
  currentMember:   getCurrentMember(state),
});

const dispatches = (dispatch) => ({
  addFlashMessage: (message, options = {}) => dispatch(addFlashMessage(message, options)),
  loadMember:      (orgId) => dispatch(loadCurrentMember(orgId)),
});

export default connect(select, dispatches)(RequireOrganization);
