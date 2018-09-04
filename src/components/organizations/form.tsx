import * as React from 'react';

import { Alert, Form } from 'react-bootstrap';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { HorizontalCurrencySelect } from 'components/currencies/select-field';
import {
  HorizontalFormInput,
  HorizontalSubmitButton,
} from 'components/utils/form-inputs';

interface IOwnProps {
  action: string;
}

interface IOrganizationFormData {
  name?:            string;
  defaultCurrency?: string;
}

type IProps = IOwnProps & InjectedFormProps<IOrganizationFormData, IOwnProps>;

const OrganizationForm: React.SFC<IProps> = ({ handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="name" label="Name" component={ HorizontalFormInput } />
    <Field name="defaultCurrency" label="Currency" component={ HorizontalCurrencySelect } required />
    <HorizontalSubmitButton bsStyle="primary" submitting={ submitting }>Create</HorizontalSubmitButton>
  </Form>
);

const ReduxOrganizationForm = reduxForm<IOrganizationFormData, IOwnProps>({
  form: 'organizationForm',
})(OrganizationForm);

export { ReduxOrganizationForm as default, IOrganizationFormData };
