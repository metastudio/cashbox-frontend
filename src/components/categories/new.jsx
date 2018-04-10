import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Panel, Row, Col } from 'react-bootstrap';

import { addFlashMessage } from 'actions/flash-messages.js';
import { createCategory, clearCategory } from 'actions/categories.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { prepareSubmissionError } from 'utils/errors';

import Form from './form.jsx';

class NewCategory extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterCreate  = this.afterCreate.bind(this);
  }

  componentDidMount() {
    this.props.clearCategory();
  }

  handleSubmit(values) {
    const { orgId, createCategory } = this.props;
    return createCategory(orgId, {
      name: values.name,
      type: values.type,
    }).catch(prepareSubmissionError);
  }

  afterCreate() {
    this.props.addFlashMessage('Category successfully created.');
    this.props.history.push('/categories');
  }

  render() {
    return(
      <Row>
        <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
          <Panel>
            <Panel.Body>
              <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterCreate } />
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    );
  }
}

NewCategory.propTypes = {
  orgId:           PropTypes.number.isRequired,
  createCategory:  PropTypes.func.isRequired,
  clearCategory:   PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  history:         PropTypes.object.isRequired,
};

const select = (state) => ({
  orgId: getCurrentOrganizationId(state),
});

const dispatcher = (dispatch) => ({
  createCategory:  (orgId, data) => new Promise((res, rej) => dispatch(createCategory(orgId, data, res, rej))),
  clearCategory:   () => dispatch(clearCategory()),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(select, dispatcher)(NewCategory));
