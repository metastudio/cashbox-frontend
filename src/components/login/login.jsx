import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Panel } from 'react-bootstrap'

import { addFlashMessage } from 'actions/flash-messages.js';
import { loginUser } from 'services/auth';
import { prepareSubmissionError } from 'utils/errors';

import Form from './form.jsx'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(values) {
    const { login } = this.props
    const { email, password } = values

    return login(email, password).catch(prepareSubmissionError);
  }

  render() {
    if (this.props.isAuthorized) {
      return <Redirect to="/" />;
    } else {
      return(
        <Panel>
          <Panel.Body>
            <Form onSubmit={ this.handleSubmit } onSubmitSuccess={ this.afterLogin } />
          </Panel.Body>
        </Panel>
      );
    }
  }
}

Login.propTypes = {
  isAuthorized: PropTypes.bool,
  login:        PropTypes.func.isRequired,
}

const select = (state) => ({
  isAuthorized: !!state.auth.token,
})

const dispatcher = (dispatch) => ({
  login: (email, password) => new Promise((res, rej) => dispatch(loginUser(email, password, res, rej))),
})

export default connect(select, dispatcher)(Login)
