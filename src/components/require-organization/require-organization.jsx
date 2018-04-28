import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addFlashMessage } from 'actions/flash-messages.js';
import { getHasCurrentOrganization } from 'selectors/organizations.js';

class RequireOrganization extends React.Component {
  componentDidMount() {
    this.checkOrganization(this.props);
  }

  componentWillReceiveProps(props) {
    this.checkOrganization(props);
  }

  checkOrganization(props){
    if (!props.hasOrganization) {
      props.addFlashMessage('Please select or add organization.', { type: 'info' });
    }
  }

  render() {
    if (this.props.hasOrganization) {
      return this.props.children;
    } else {
      return <Redirect to="/organizations/select" />;
    }
  }
}

RequireOrganization.propTypes = {
  hasOrganization:          PropTypes.bool.isRequired,
  addFlashMessage:          PropTypes.func.isRequired,
  children:                 PropTypes.node,
};

const select = (state) => ({
  hasOrganization: getHasCurrentOrganization(state),
});

const dispatches = (dispatch) => ({
  addFlashMessage:          (message, options = {}) => dispatch(addFlashMessage(message, options)),
});

export default connect(select, dispatches)(RequireOrganization);
