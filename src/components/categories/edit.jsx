import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Panel, Row, Col } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';
import { addFlashMessage } from 'actions/flash-messages.js';
import { loadCategory, updateCategory } from 'actions/categories.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { prepareSubmissionError } from 'utils/errors';

import LoadingView from 'components/utils/loading-view';
import Form from './form.jsx';

class EditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterUpdate  = this.afterUpdate.bind(this);
  }

  componentDidMount() {
    const { orgId, loadCategory } = this.props;
    loadCategory(orgId, this.props.match.params.categoryId);
  }

  handleSubmit(values) {
    const { orgId, category, updateCategory } = this.props;
    return updateCategory(orgId, category.id, {
      name: values.name,
      type: values.type,
    }).catch(prepareSubmissionError);
  }

  afterUpdate() {
    this.props.addFlashMessage('Category successfully updated.');
    this.props.history.push('/categories');
  }

  render() {
    return(
      <LoadingView status={ this.props.status }>
        { this.props.status === statuses.SUCCESS &&
          <Row>
            <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
              <Panel>
                <Panel.Body>
                  <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterUpdate } initialValues={ this.props.category } />
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        }
      </LoadingView>
    );
  }
}

EditCategory.propTypes = {
  match:           PropTypes.object.isRequired,
  orgId:           PropTypes.number.isRequired,
  category:        PropTypes.object,
  status:          PropTypes.string.isRequired,
  loadCategory:    PropTypes.func.isRequired,
  updateCategory:  PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  history:         PropTypes.object.isRequired,
};

const select = (state) => ({
  orgId:    getCurrentOrganizationId(state),
  category: state.category.data,
  status:   state.category.status,
});

const dispatcher = (dispatch) => ({
  loadCategory:    (orgId, categoryId) => dispatch(loadCategory(orgId, categoryId)),
  updateCategory:  (orgId, categoryId, data) => new Promise((res, rej) => dispatch(updateCategory(orgId, categoryId, data, res, rej))),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(select, dispatcher)(EditCategory));
