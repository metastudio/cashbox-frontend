import * as React from 'react';

import { Alert, Form } from 'react-bootstrap';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import {
  HorizontalFormInput,
  HorizontalSelect,
  HorizontalSubmitButton,
} from 'components/utils/form-inputs';

interface IOwnProps {
  action: string;
}

interface ICategoryFormData {
  name?: string;
  type?: string;
}

type IProps = IOwnProps & InjectedFormProps<ICategoryFormData, IOwnProps>;

const getOptions = () => {
  return [{ value: 'Income', label: 'Income' }, { value: 'Expense', label: 'Expense' }];
};

const CategoryForm: React.SFC<IProps> = ({ handleSubmit, submitting, error, action }) => (
  <Form horizontal onSubmit={ handleSubmit }>
    { error && <Alert bsStyle="danger">{ error }</Alert> }
    <Field name="name" label="Name" component={ HorizontalFormInput } />
    <Field
      name="type"
      component={ HorizontalSelect }
      collection={ getOptions() }
      label="Type"
      prompt="Select Type"
    />
    <HorizontalSubmitButton bsStyle="primary" submitting={ submitting }>
      { action } Category
    </HorizontalSubmitButton>
  </Form>
);

const ReduxCategoryForm = reduxForm<ICategoryFormData, IOwnProps>({
  form: 'categoryForm',
})(CategoryForm);

export { ReduxCategoryForm as default, ICategoryFormData };
