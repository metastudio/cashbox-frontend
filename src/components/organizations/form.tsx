import * as React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { Alert, Form } from 'react-bootstrap';

import {
  HorizontalFormInput,
  HorizontalSubmitButton,
} from 'components/utils/form-inputs';
import { HorizontalCurrencySelect } from 'components/currencies/select-field';

interface IOrganizationFormData {
  name?:            string;
  defaultCurrency?: string;
}

type IProps = InjectedFormProps<IOrganizationFormData>;

const OrganizationForm: React.SFC<IProps> = ({ handleSubmit, submitting, error }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="name" label="Name" component={ HorizontalFormInput } />
    <Field name="defaultCurrency" label="Currency" component={ HorizontalCurrencySelect } required />
    <HorizontalSubmitButton bsStyle="primary" submitting={ submitting }>Create</HorizontalSubmitButton>
  </Form>
);

const ReduxOrganizationForm = reduxForm<IOrganizationFormData>({
  form: 'organization-form',
})(OrganizationForm);

export { ReduxOrganizationForm as default, IOrganizationFormData };
