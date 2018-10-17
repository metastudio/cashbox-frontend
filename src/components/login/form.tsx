import * as React from 'react';

import { Alert, Form } from 'react-bootstrap';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { HorizontalFormInput, HorizontalSubmitButton } from 'components/utils/form-inputs';

interface ILoginFormData {
  email?:    string;
  password?: string;
}

type IProps = InjectedFormProps<ILoginFormData>;

const LoginForm: React.SFC<IProps> = ({ handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field
      name="email"
      label="Email address"
      placeholder="Enter email"
      type="email"
      component={ HorizontalFormInput }
    />
    <Field
      name="password"
      label="Password"
      placeholder="Enter password"
      type="password"
      component={ HorizontalFormInput }
    />
    <HorizontalSubmitButton submitting={ submitting }>Login</HorizontalSubmitButton>
  </Form>
);

const ReduxLoginForm = reduxForm<ILoginFormData>({
  form: 'loginForm',
})(LoginForm);

export { ReduxLoginForm as default, ILoginFormData };
