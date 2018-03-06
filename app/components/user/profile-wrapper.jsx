import React from 'react'
import { connect } from 'react-redux'

import { 
  addFlashMessage,
  updateProfile as updateProfileAction,
} from 'actions'

import {
  userInitialValuesSelector,
  userIdSelector
} from 'selectors'

import ProfileForm from './profile-form.jsx'

class ProfileWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterCreate  = this.afterCreate.bind(this)
  }

  handleSubmit(values) {
    const { userId, updateProfile } = this.props
    return updateProfile(
      userId,
      {
        fullName: values.fullName,
        profileAttributes: { phone_number: values.phoneNumber }
      }
    )
  }

  afterCreate() {
    this.props.addFlashMessage('Profile successfully updated.')
  }

  render() {
    return(
      <div>
        <h2>Profile :</h2>
        <ProfileForm onSubmit={this.handleSubmit} onSubmitSuccess={ this.afterCreate } initialValues={ this.props.initialValues } />
      </div>
    )
  }
}

ProfileWrapper.propTypes = {
  addFlashMessage:    React.PropTypes.func.isRequired,
  initialValues:      React.PropTypes.object,
  updateProfile:      React.PropTypes.func.isRequired,
  userId:             React.PropTypes.number.isRequired
}

const select = (state) => ({
  initialValues: userInitialValuesSelector(state),
  userId: userIdSelector(state),
})

const dispatcher = (dispatch) => ({
  updateProfile: (userId, data) => new Promise((res, rej) => {
    dispatch(updateProfileAction(userId, data, res, rej))
  }),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type))
})

export default connect(select, dispatcher)(ProfileWrapper)
