import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addFlashMessage } from 'actions/flash-messages.js';
import { updateProfile as updateProfileAction } from 'actions/users.js';

import {
  selectUserInitialValues,
  selectUserId
} from 'selectors/users.js';

import ProfileForm from './profile-form.jsx';

class ProfileWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.afterCreate  = this.afterCreate.bind(this);
  }

  handleSubmit(values) {
    const { userId, updateProfile } = this.props;
    return updateProfile(
      userId,
      {
        fullName: values.fullName,
        profileAttributes: { phoneNumber: values.phoneNumber }
      }
    );
  }

  afterCreate() {
    this.props.addFlashMessage('Profile successfully updated.');
  }

  render() {
    return(
      <div>
        <h2>Profile :</h2>
        <ProfileForm onSubmit={this.handleSubmit} onSubmitSuccess={ this.afterCreate } initialValues={ this.props.initialValues } />
      </div>
    );
  }
}

ProfileWrapper.propTypes = {
  addFlashMessage: PropTypes.func.isRequired,
  initialValues:   PropTypes.object,
  updateProfile:   PropTypes.func.isRequired,
  userId:          PropTypes.number.isRequired
};

const select = (state) => ({
  initialValues: selectUserInitialValues(state),
  userId: selectUserId(state),
});

const dispatcher = (dispatch) => ({
  updateProfile: (userId, data) => new Promise((res, rej) => {
    dispatch(updateProfileAction(userId, data, res, rej));
  }),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type))
});

export default connect(select, dispatcher)(ProfileWrapper);