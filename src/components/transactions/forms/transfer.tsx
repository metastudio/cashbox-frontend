import * as React from 'react';

import { Alert, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { TRANSFER_FORM } from 'constants/forms';
import { IBankAccount } from 'services/bank-accounts';
import {
  ITransferFormData,
  selectTransferFormFromBankAccount,
  selectTransferFormToBankAccount,
} from 'services/redux-form/transfer-form';
import { ITransfer } from 'services/transactions';

import { HorizontalBankAccountsSelect } from 'components/bank-accounts/select-field';
import {
  HorizontalDatePicker,
  HorizontalFormInput,
  HorizontalMoneyInput,
  HorizontalSubmitButton,
} from 'components/utils/form-inputs';
import { IGlobalState } from 'services/global-state';

interface IOwnProps {
  transfer?: ITransfer;
  action:    'Create' | 'Update';
}

interface IStateProps {
  fromBankAccount?: IBankAccount;
  toBankAccount?:   IBankAccount;
}

type IProps = IOwnProps & InjectedFormProps<ITransferFormData, IOwnProps> & IStateProps;

class TransferForm extends React.PureComponent<IProps> {
  private isPersisted = (): boolean => {
    const { transfer } = this.props;

    return !!(transfer && transfer.id);
  }
  private isCurrencyMismatch = (): boolean => {
    const { fromBankAccount, toBankAccount } = this.props;
    if (!fromBankAccount || !toBankAccount) { return false; }

    return fromBankAccount.currency !== toBankAccount.currency;
  }

  private renderFromAmountField = (): React.ReactNode => {
    return (
      <Field
        name="fromAmount"
        label={ this.isCurrencyMismatch() ? 'From Amount' : 'Amount' }
        component={ HorizontalMoneyInput }
        required
      />
    );
  }

  private renderToAmountField = (): React.ReactNode => {
    if (!this.isCurrencyMismatch()) { return null; }

    return (
      <Field
        name="toAmount"
        label="To Amount"
        component={ HorizontalMoneyInput }
      />
    );
  }

  private renderExchangeRateField = (): React.ReactNode => {
    if (this.isPersisted()) { return null; }
    if (!this.isCurrencyMismatch()) { return null; }

    return (
      <Field
        name="exchangeRate"
        label="Exchange Rate"
        component={ HorizontalFormInput }
        required={ this.isCurrencyMismatch() }
      />
    );
  }

  public render() {
    const { handleSubmit, submitting, error, action } = this.props;
    const isPersisted      = this.isPersisted();

    return (
      <Form horizontal onSubmit={ handleSubmit }>
        { error && <Alert bsStyle="danger">{ error }</Alert> }

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
        { this.renderFromAmountField() }
        { this.renderToAmountField() }
        { this.renderExchangeRateField() }
        { !isPersisted && <Field name="comission" label="Comission" component={ HorizontalMoneyInput } /> }
        <Field name="comment" label="Comment" component={ HorizontalFormInput } />
        <Field name="date" label="Date" component={ HorizontalDatePicker } required />

        <HorizontalSubmitButton submitting={ submitting }>{ action } Transfer</HorizontalSubmitButton>
      </Form>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  fromBankAccount: selectTransferFormFromBankAccount(state),
  toBankAccount:   selectTransferFormToBankAccount(state),
});

const TransferFormContainer = connect<IStateProps, {}, IOwnProps>(mapState)(TransferForm);

const ReduxTransferForm = reduxForm<ITransferFormData, IOwnProps>({
  form: TRANSFER_FORM,
})(TransferFormContainer);

export { ReduxTransferForm as default, ITransferFormData };
