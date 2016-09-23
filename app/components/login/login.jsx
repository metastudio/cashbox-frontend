import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { Panel } from 'react-bootstrap'

import { loginUser, addFlashMessage } from 'actions'

import Form from './form.jsx'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.afterLogin   = this.afterLogin.bind(this)
  }

  componentDidMount() {
    if (this.props.isAuthorized) {
      this.afterLogin()
    }
  }

  handleSubmit(values) {
    const { login } = this.props
    const { email, password } = values

    return new Promise((resolve, reject) => {

      login(email, password).then(({error, payload}) => error ? reject(payload) : resolve())
    })
  }

  afterLogin() {
    this.props.addFlashMessage('You successfully signed in.')
    this.props.addOrganization() // TODO if organizations empty
  }

  render() {
    return(
      <Panel>
        <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterLogin } />
      </Panel>
    )
  }
}

Login.propTypes = {
  isAuthorized:    React.PropTypes.bool,
  login:           React.PropTypes.func.isRequired,
  addOrganization: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
}

const select = (state) => ({
  isAuthorized: !!state.auth.token,
})

const dispatcher = (dispatch) => ({
  login:           (email, password) => dispatch(loginUser(email, password)),
  addOrganization: () => dispatch(routeActions.push('/organization')),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(Login)
