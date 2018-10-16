import * as React from 'react';

import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';

import { loginUser, selectIsAuthorized } from 'services/auth';
import { IGlobalState } from 'services/global-state';
import { prepareSubmissionError } from 'utils/errors';

import Form, { ILoginFormData } from './form';

interface IStateProps {
  isAuthorized: boolean;
}

interface IDispatchProps {
  login: typeof loginUser.request;
}

type IProps = IStateProps & IDispatchProps;

class Login extends React.PureComponent<IProps> {
  private handleSubmit = (values: ILoginFormData) => {
    const { login } = this.props;
    const { email, password } = values;

    return new Promise((resolve, reject) => {
      login(email, password, resolve, reject);
    }).catch(prepareSubmissionError);
  }

  public render() {
    if (this.props.isAuthorized) {
      return <Redirect to="/" />;
    }

    return(
      <Panel>
        <Panel.Body>
          <Form onSubmit={ this.handleSubmit } />
        </Panel.Body>
      </Panel>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  isAuthorized: selectIsAuthorized(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  login: (email, password, res, rej) => dispatch(loginUser.request(email, password, res, rej)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(Login);
