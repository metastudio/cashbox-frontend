import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Panel, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

import { addFlashMessage } from 'actions/flash-messages.js';
import { loadOrganizations, setCurrentOrganization } from 'actions/organizations.js';
import { getOrganizationsItems } from 'selectors/organizations.js';

class SelectOrganization extends React.Component {
  constructor(props) {
    super(props);
    this.handleOrganizationClick = this.handleOrganizationClick.bind(this);
  }

  componentDidMount() {
    this.props.loadOrganizations();
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
    const organizations = this.props.organizations.map((organization) => (
      <ListGroupItem key={ organization.id } onClick={ () => this.handleOrganizationClick(organization) }>
        { organization.name } - { organization.defaultCurrency }
      </ListGroupItem>
    ));

    return (
      <Row>
        <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
          <h2 className="text-center">Select organization</h2>
          <Panel>
            <ListGroup id="organizations">
              { organizations }
            </ListGroup>
          </Panel>
          <p className="text-center">or</p>
          <p className="text-center"><Button bsStyle="primary" href="/organizations/new">Create a new Organization</Button></p>
        </Col>
      </Row>
    );
  }
}

SelectOrganization.propTypes = {
  setOrganization:   PropTypes.func.isRequired,
  addFlashMessage:   PropTypes.func.isRequired,
  loadOrganizations: PropTypes.func.isRequired,
  organizations:     PropTypes.arrayOf(PropTypes.object).isRequired,
  history:           PropTypes.object.isRequired,
};

const select = (state) => ({
  organizations: getOrganizationsItems(state),
});

const dispatcher = (dispatch) => ({
  loadOrganizations:  () => dispatch(loadOrganizations()),
  setOrganization:    (orgId) => new Promise((res, rej) => dispatch(setCurrentOrganization(orgId, res, rej))),
  addFlashMessage:    (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(select, dispatcher)(SelectOrganization));
