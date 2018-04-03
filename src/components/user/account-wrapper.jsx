import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addFlashMessage } from 'actions/flash-messages.js';
import { updateAccount as updateAccountAction } from 'actions/users.js';

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
    );
  }

  afterCreate() {
    this.props.addFlashMessage('Account successfully updated.');
  }

  render() {
    return(
      <div className="col-xs-12">
        <h2>Account Settings:</h2>
        <AccountForm
          onSubmit={this.handleSubmit}
          onSubmitSuccess={ this.afterCreate }
          initialValues={ this.props.initialValues }
        />
      </div>
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
