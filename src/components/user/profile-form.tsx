import * as React from 'react';

import { Alert, Form } from 'react-bootstrap';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { VerticalFormInput, VerticalSubmitButton } from 'components/utils/form-inputs';

interface IProfileFormData {
  fullName?: string;
  profile?:  {
    phoneNumber?: string;
  };
}

type IProps = InjectedFormProps<IProfileFormData>;

const ProfileForm: React.SFC<IProps> = ({ handleSubmit, submitting, error }) => {
  return(
    <Form onSubmit={ handleSubmit }>
      { error && <Alert bsStyle="danger">{ error }</Alert> }
      <Field
        name="fullName"
        label="Full name"
        placeholder="Enter full name"
        component={ VerticalFormInput }
        required
      />
      <Field
        name="profile.phoneNumber"
        component={ VerticalFormInput }
        label="Phone number"
        placeholder="Enter phone number"
      />
      <VerticalSubmitButton submitting={ submitting } >Update profile</VerticalSubmitButton>
    </Form>
  );
};

const ReduxProfileForm = reduxForm<IProfileFormData>({
  form: 'profileForm',
})(ProfileForm);

export { ReduxProfileForm as default, IProfileFormData };
