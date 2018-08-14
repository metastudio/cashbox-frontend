import * as React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { Alert, Form } from 'react-bootstrap';

import { ITransfer } from 'services/transactions';

import { HorizontalBankAccountsSelect } from 'components/bank-accounts/select-field';
import {
  HorizontalFormInput,
  HorizontalDatePicker,
  HorizontalCurrencyInput,
  HorizontalSubmitButton,
} from 'components/utils/form-inputs';

interface IOwnProps {
  transfer?: ITransfer;
  action:    'Create' | 'Update';
}

interface ITransferFormData {
  toAmount?:          string;
  fromAmount?:        string;
  fromBankAccountId?: number;
  toBankAccountId?:   number;
  exchangeRate?:      string;
  comission?:         string;
  comment?:           string;
  date?:              string;
}

type IProps = IOwnProps & InjectedFormProps<ITransferFormData, IOwnProps>;

const TransferForm: React.SFC<IProps> = ({ handleSubmit, submitting, error, action, transfer }) => {
  const isPersisted = transfer && transfer.id;

  return (
    <Form horizontal onSubmit={ handleSubmit }>
      { error && <Alert bsStyle="danger">{ error }</Alert> }

      <Field
        name="toAmount"
        label="Amount"
        component={ HorizontalCurrencyInput }
        required
      />
      { isPersisted && <Field name="fromAmount" label="From Amount" component={ HorizontalCurrencyInput } disabled /> }
      <Field
        name="fromBankAccountId"
        component={ HorizontalBankAccountsSelect }
        label="From"
        disabled={ isPersisted }
        required
      />
      <Field
        name="toBankAccountId"
        label="To"
        component={ HorizontalBankAccountsSelect }
        disabled={ isPersisted }
        required
      />
      { !isPersisted && <Field name="exchangeRate" label="Exchange Rate" component={ HorizontalFormInput } /> }
      { !isPersisted && <Field name="comission" label="Comission" component={ HorizontalCurrencyInput } /> }
      <Field name="comment" label="Comment" component={ HorizontalFormInput } />
      <Field name="date" label="Date" component={ HorizontalDatePicker } required />

      <HorizontalSubmitButton submitting={ submitting }>{ action } Transfer</HorizontalSubmitButton>
    </Form>
  );
};

const ReduxTransferForm = reduxForm<ITransferFormData, IOwnProps>({
  form: 'transferForm',
})(TransferForm);

export { ReduxTransferForm as default, ITransferFormData };
