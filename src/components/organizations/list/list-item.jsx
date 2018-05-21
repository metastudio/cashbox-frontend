import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ListGroupItem } from 'react-bootstrap';

import { addFlashMessage } from 'actions/flash-messages.js';
import { setCurrentOrganization } from 'actions/organizations.js';

class OrganizationsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleOrganizationClick = this.handleOrganizationClick.bind(this);
  }

  handleOrganizationClick(organization) {
    this.props.setOrganization(organization).then(organization => {
      this.props.addFlashMessage('Organization ' + organization.name + ' selected.');
      this.props.history.push('/');
    }).catch(error => {
      this.props.addFlashMessage(`Unable to select organization: ${error.message}`, { type: 'danger' });
    });
  }

  render() {
    const { organization } = this.props;
    return (
      <ListGroupItem key={ organization.id } onClick={ () => this.handleOrganizationClick(organization) }>
        { organization.name } - { organization.defaultCurrency }
      </ListGroupItem>
    );
  }
}

OrganizationsListItem.propTypes = {
  organization:    PropTypes.object.isRequired,
  setOrganization: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  history:         PropTypes.object.isRequired,
};

const dispatcher = (dispatch) => ({
  setOrganization: (orgId) => new Promise((res, rej) => dispatch(setCurrentOrganization(orgId, res, rej))),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(null, dispatcher)(OrganizationsListItem));
