import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Panel, Row, Col } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';
import { addFlashMessage } from 'actions/flash-messages.js';
import { loadBankAccount, updateBankAccount } from 'services/bank-accounts';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { prepareSubmissionError } from 'utils/errors';

import LoadingView from 'components/utils/loading-view';
import Form from './form.jsx';

class EditBankAccount extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterUpdate  = this.afterUpdate.bind(this);
  }

  componentDidMount() {
    const { orgId, loadBankAccount } = this.props;
    loadBankAccount(orgId, this.props.match.params.bankAccountId);
  }

  handleSubmit(values) {
    const { orgId, bankAccount, updateBankAccount } = this.props;
    return updateBankAccount(orgId, bankAccount.id, {
      name: values.name,
      description: values.description,
      invoiceDetails: values.invoiceDetails,
      currency: values.currency,
    }).catch(prepareSubmissionError);
  }

  afterUpdate() {
    this.props.addFlashMessage('Bank account successfully updated.');
    this.props.history.push('/bank_accounts');
  }

  render() {
    return(
      <LoadingView status={ this.props.status }>
        { this.props.status === statuses.SUCCESS &&
          <Row>
            <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
              <h1>Edit Bank Account</h1>
              <Panel>
                <Panel.Body>
                  <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterUpdate } initialValues={ this.props.bankAccount } action="Update"/>
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        }
      </LoadingView>
    );
  }
}

EditBankAccount.propTypes = {
  match:            PropTypes.object.isRequired,
  orgId:             PropTypes.number.isRequired,
  bankAccount:       PropTypes.object,
  status:            PropTypes.string.isRequired,
  loadBankAccount:   PropTypes.func.isRequired,
  updateBankAccount: PropTypes.func.isRequired,
  addFlashMessage:   PropTypes.func.isRequired,
  history:           PropTypes.object.isRequired,
};

const select = (state) => ({
  orgId:         getCurrentOrganizationId(state),
  bankAccount:   state.bankAccount.data,
  status:        state.bankAccount.status,
});

const dispatcher = (dispatch) => ({
  loadBankAccount:   (orgId, bankAccountId) => dispatch(loadBankAccount(orgId, bankAccountId)),
  updateBankAccount: (orgId, bankAccountId, data) => new Promise((res, rej) => dispatch(updateBankAccount(orgId, bankAccountId, data, res, rej))),
  addFlashMessage:   (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect(select, dispatcher)(EditBankAccount));
