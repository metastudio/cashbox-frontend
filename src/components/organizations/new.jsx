import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Panel, Row, Col } from 'react-bootstrap';

import { addFlashMessage } from 'actions/flash-messages.js';
import { createOrganization } from 'actions/organizations.js';

import Form from './form.jsx';

class NewOrganization extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterCreate  = this.afterCreate.bind(this);
  }

  handleSubmit(values) {
    const { createOrganization } = this.props;
    return createOrganization({
      name: values.name,
      defaultCurrency: values.defaultCurrency
    });
  }

  afterCreate() {
    this.props.addFlashMessage('Organization successfully created.');
    this.props.history.push('/organizations/select');
  }

  render() {
    return(
      <Row>
        <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
          <Panel>
            <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterCreate } />
          </Panel>
        </Col>
      </Row>
    );
  }
}

NewOrganization.propTypes = {
  createOrganization: PropTypes.func.isRequired,
  addFlashMessage:    PropTypes.func.isRequired,
  history:            PropTypes.object.isRequired,
};

const dispatcher = (dispatch) => ({
  createOrganization: (data) => new Promise((res, rej) => dispatch(createOrganization(data, res, rej))),
  addFlashMessage:    (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(null, dispatcher)(NewOrganization));
