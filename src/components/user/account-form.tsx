import * as React from 'react';

import { Alert, Form } from 'react-bootstrap';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { VerticalFormInput, VerticalSubmitButton } from 'components/utils/form-inputs';

interface IAccountFormData {
  email?:                string;
  currentPassword?:      string;
  password?:             string;
  passwordConfirmation?: string;
}

type IProps = InjectedFormProps<IAccountFormData>;

function validate(values: IAccountFormData) {
  const errors = {};
  if (values.password !== values.passwordConfirmation) {
    // tslint:disable-next-line
    errors['passwordConfirmation'] = 'doesn\'t match password';
  }
  return errors;
}

const AccountForm: React.SFC<IProps> = ({ handleSubmit, submitting, error }) => {
  return(
    <Form onSubmit={ handleSubmit }>
      { error && <Alert bsStyle="danger">{ error }</Alert> }

      <Field
        name="email"
        component={ VerticalFormInput }
        label="Email"
        required
      />
      <Field
        name="currentPassword"
        component={ VerticalFormInput }
        type="password"
        label="Current password"
        help="we need your current password to confirm your changes"
        required
      />
      <Field
        name="password"
        component={ VerticalFormInput }
        type="password"
        label="Password"
        help="leave it blank if you don't want to change it"
      />
      <Field
        name="passwordConfirmation"
        component={ VerticalFormInput }
        type="password"
        label="Password confirmation"
      />
      <VerticalSubmitButton submitting={ submitting } >Update account</VerticalSubmitButton>
    </Form>
  );
};

const ReduxAccountForm = reduxForm<IAccountFormData>({
  validate,
  form: 'accountForm',
})(AccountForm);

export { ReduxAccountForm as default, IAccountFormData };
