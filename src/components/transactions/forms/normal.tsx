import * as React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { Alert, Form, Checkbox } from 'react-bootstrap';

import { CategoryType } from 'services/categories';

import { HorizontalCategoriesSelect } from 'components/categories/select-field';
import { HorizontalBankAccountsSelect } from 'components/bank-accounts/select-field';
import { HorizontalCustomersSelect } from 'components/customers/select-field';
import {
  HorizontalFormInput,
  HorizontalDatePicker,
  HorizontalMoneyInput,
  HorizontalSubmitButton,
} from 'components/utils/form-inputs';

interface IOwnProps {
  type:              CategoryType;
  action:            'Create' | 'Update';
  leaveOpenValue?:    boolean;
  onLeaveOpenChange?: (e: React.FormEvent<Checkbox>) => void;
}

interface ITransactionFormData {
  amount?:        string;
  categoryId?:    number;
  customerId?:    number;
  bankAccountId?: number;
  comment?:       string;
  date?:          string;
}

type IProps = IOwnProps & InjectedFormProps<ITransactionFormData, IOwnProps>;

class TransactionForm extends React.PureComponent<IProps> {
  private renderLeaveOpen = () => {
    const { leaveOpenValue, onLeaveOpenChange } = this.props;

    if (leaveOpenValue === undefined || onLeaveOpenChange === undefined) { return null; }

    return (
      <Checkbox
        inline
        value={ leaveOpenValue ? 'true' : '' }
        onChange={ onLeaveOpenChange }
        className="pull-right"
      >
        Leave open
      </Checkbox>
    );
  }

  public render() {
    const { handleSubmit, type, submitting, error, action } = this.props;

    return (
      <Form horizontal onSubmit={ handleSubmit }>
        { error && <Alert bsStyle="danger">{ error }</Alert> }
        <Field name="amount" label="Amount" component={ HorizontalMoneyInput } />
        <Field name="categoryId" label="Category" component={ HorizontalCategoriesSelect } type={ type } />
        <Field name="customerId" label="Customer name" component={ HorizontalCustomersSelect } />
        <Field name="bankAccountId" label="Bank account" component={ HorizontalBankAccountsSelect } />
        <Field name="comment" label="Comment" component={ HorizontalFormInput } />
        <Field name="date" label="Date" component={ HorizontalDatePicker } />

        <HorizontalSubmitButton submitting={ submitting } additionalContent={ this.renderLeaveOpen() }>
          { action } Transaction
        </HorizontalSubmitButton>
      </Form>
    );
  }
}

const ReduxTransactionForm = reduxForm<ITransactionFormData, IOwnProps>({
  form: 'transactionForm',
})(TransactionForm);

export { ReduxTransactionForm as default, ITransactionFormData };
