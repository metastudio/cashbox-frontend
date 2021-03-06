import * as React from 'react';

import { Alert, Form } from 'react-bootstrap';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import {
  HorizontalFormInput,
  HorizontalSubmitButton,
  HorizontalTextarea,
} from 'components/utils/form-inputs';

interface IOwnProps {
  action: string;
}

interface ICustomerFormData {
  name?:           string;
  invoiceDetails?: string;
}

type IProps = IOwnProps & InjectedFormProps<ICustomerFormData, IOwnProps>;

const CustomerForm: React.SFC<IProps> = ({ handleSubmit, submitting, error, action }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="name" label="Name" component={ HorizontalFormInput } />
    <Field
      name="invoiceDetails"
      component={ HorizontalTextarea }
      type="textarea"
      label="Invoice Details"
    />
    <HorizontalSubmitButton submitting={ submitting }>{ action } Customer</HorizontalSubmitButton>
  </Form>
);

const reduxCustomerForm = reduxForm<ICustomerFormData, IOwnProps>({
  form: 'customerForm',
})(CustomerForm);

export { reduxCustomerForm as default, ICustomerFormData };
