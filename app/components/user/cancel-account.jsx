import React from 'react'
import { connect } from 'react-redux'

import {
  addFlashMessage,
  cancelAccount as cancelAccountAction
} from 'actions'

class CancelAccount extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    const { userId, cancelAccount } = this.props
    cancelAccount(userId).then(
      () => this.props.addFlashMessage('Account canceled successfull'),
      error => this.props.addFlashMessage(error.message, { type: 'danger' })
    )
  }
  
  render() {
    return(
      <div>
        <h3>Cancel my account</h3>
        <div>Unhappy?&nbsp;
          <a onClick={ this.handleClick } href='' >Cancel my account</a>
        </div>
      </div>
    )
  }
}

CancelAccount.propTypes = {
  userId:             React.PropTypes.number.isRequired,
  cancelAccount:      React.PropTypes.func.isRequired,
  addFlashMessage:    React.PropTypes.func.isRequired,
}

const select = (state) => ({
  userId: state.auth.user.id
})

const dispatcher = (dispatch) => ({
  cancelAccount: (userId) => new Promise((res, rej) => {
    dispatch(cancelAccountAction(userId, res, rej))
  }),
  addFlashMessage: (message, type=null) => dispatch(addFlashMessage(message, type))
})

export default connect(select, dispatcher)(CancelAccount)
