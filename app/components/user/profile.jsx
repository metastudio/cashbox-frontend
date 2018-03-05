import React from 'react'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import { Col, Grid } from 'react-bootstrap'

import { 
  addFlashMessage,
  updateProfile as updateProfileAction,
  updateAccount as updateAccountAction
} from 'actions'

import ProfileForm from './profile-form.jsx'
import AccountForm from './account-form.jsx'
import CancelAccount from './cancel-account.jsx'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.handleProfileSubmit = this.handleProfileSubmit.bind(this)
    this.afterProfileCreate  = this.afterProfileCreate.bind(this)
    this.handleAccountSubmit = this.handleAccountSubmit.bind(this)
    this.afterAccountCreate  = this.afterAccountCreate.bind(this)
  }

  handleAccountSubmit(values) {
    const { userId, updateAccount } = this.props
    return updateAccount(
      userId,
      {
        email: values.email,
        currentPassword: values.currentPassword,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation
      }
    )
  }

  handleProfileSubmit(values) {
    const { userId, updateProfile } = this.props
    return updateProfile(
      userId,
      {
        fullName: values.fullName,
        profileAttributes: { phone_number: values.phoneNumber }
      }
    )
  }

  afterProfileCreate() {
    this.props.addFlashMessage('Profile successfully updated.')
  }

  afterAccountCreate() {
    this.props.addFlashMessage('Account successfully updated.')
  }

  render() {
    return (
      <div className="col-sm-6">
        <Grid>
          <Col sm={6}>
            <h2>Profile :</h2>
            <ProfileForm onSubmit={this.handleProfileSubmit} onSubmitSuccess={ this.afterProfileCreate } initialValues={ this.props.initialValues } />
            <CancelAccount />
          </Col>
          <Col sm={6}>
            <h2>Account Settings:</h2>
            <AccountForm 
              onSubmit={this.handleAccountSubmit}
              onSubmitSuccess={ this.afterAccountCreate }
              initialValues={ this.props.initialValues }
            />
          </Col>
        </Grid>
      </div>
    )
  }
}

Profile.propTypes = {
  updateProfile:      React.PropTypes.func.isRequired,
  updateAccount:      React.PropTypes.func.isRequired,
  addFlashMessage:    React.PropTypes.func.isRequired,
  initialValues:      React.PropTypes.object,
  userId:             React.PropTypes.number.isRequired
}

const select = (state) => ({
  initialValues: {
    fullName: state.auth.user.fullName,
    phoneNumber: state.auth.user.phoneNumber,
    email: state.auth.user.email
  },
  userId: state.auth.user.id
})

const dispatcher = (dispatch) => ({
  updateProfile: (userId, data) => new Promise((res, rej) => {
    dispatch(updateProfileAction(userId, data, res, rej))
  }),
  updateAccount: (userId, data) => new Promise((res, rej) => {
    dispatch(updateAccountAction(userId, data,res, rej))
  }),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(Profile)
