import React from 'react'
import { connect } from 'react-redux'

import { 
  addFlashMessage,
  updateAccount as updateAccountAction
} from 'actions'

import {
  userInitialValuesSelector,
  userIdSelector
} from 'selectors'

import AccountForm from './account-form.jsx'

class AccountWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterCreate  = this.afterCreate.bind(this)
  }

  handleSubmit(values) {
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

  afterCreate() {
    this.props.addFlashMessage('Account successfully updated.')
  }

  render() {
    return(
      <div>
        <h2>Account Settings:</h2>
        <AccountForm 
          onSubmit={this.handleSubmit}
          onSubmitSuccess={ this.afterCreate }
          initialValues={ this.props.initialValues }
        />
      </div>
    )
  }
}

AccountWrapper.propTypes = {
  updateAccount:      React.PropTypes.func.isRequired,
  addFlashMessage:    React.PropTypes.func.isRequired,
  initialValues:      React.PropTypes.object,
  userId:             React.PropTypes.number.isRequired
}

const select = (state) => ({
  initialValues: userInitialValuesSelector(state),
  userId: userIdSelector(state),
})

const dispatcher = (dispatch) => ({
  
  updateAccount: (userId, data) => new Promise((res, rej) => {
    dispatch(updateAccountAction(userId, data,res, rej))
  }),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(AccountWrapper)
