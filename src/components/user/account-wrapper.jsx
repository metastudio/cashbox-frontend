import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';

import { addFlashMessage } from 'services/flash-messages';
import { updateAccount as updateAccountAction } from 'actions/users.js';
import { prepareSubmissionError } from 'utils/errors';

import {
  selectUserInitialValues,
  selectUserId
} from 'selectors/users.js';

import AccountForm from './account-form.jsx';

class AccountWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterCreate  = this.afterCreate.bind(this);
  }

  handleSubmit(values) {
    const { userId, updateAccount } = this.props;
    return updateAccount(
      userId,
      {
        email: values.email,
        currentPassword: values.currentPassword,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation
      }
    ).catch(prepareSubmissionError);
  }

  afterCreate() {
    this.props.addFlashMessage('Account successfully updated.');
  }

  render() {
    return(
      <Panel>
        <Panel.Heading>Account Settings:</Panel.Heading>
        <Panel.Body>
          <AccountForm
            onSubmit={this.handleSubmit}
            onSubmitSuccess={ this.afterCreate }
            initialValues={ this.props.initialValues }
          />
        </Panel.Body>
      </Panel>
    );
  }
}

AccountWrapper.propTypes = {
  updateAccount:      PropTypes.func.isRequired,
  addFlashMessage:    PropTypes.func.isRequired,
  initialValues:      PropTypes.object,
  userId:             PropTypes.number.isRequired
};

const select = (state) => ({
  initialValues: selectUserInitialValues(state),
  userId: selectUserId(state),
});

const dispatcher = (dispatch) => ({

  updateAccount: (userId, data) => new Promise((res, rej) => {
    dispatch(updateAccountAction(userId, data, res, rej));
  }),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
});

export default connect(select, dispatcher)(AccountWrapper);
