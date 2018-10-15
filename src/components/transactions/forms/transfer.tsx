import * as React from 'react';

import { Alert, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { TRANSFER_FORM } from 'constants/forms';
import { IBankAccount } from 'services/bank-accounts';
import {
  ITransfer,
  selectTransferFormFromBankAccount,
  selectTransferFormToBankAccount,
} from 'services/transactions';

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

type IProps = IOwnProps & InjectedFormProps<ITransferFormData, IOwnProps> & IStateProps;

class TransferForm extends React.PureComponent<IProps> {
  private isPersisted = (): boolean => {
    const { transfer } = this.props;

    return !!(transfer && transfer.id);
  }
  private isDifferentCurrencies = (): boolean => {
    const { fromBankAccount, toBankAccount } = this.props;
    if (!fromBankAccount || !toBankAccount) { return false; }

    return fromBankAccount.currency !== toBankAccount.currency;
  }

  private renderExchangeRateField = (): React.ReactNode => {
    const isPersisted      = this.isPersisted();
    const isDiffCurrencies = this.isDifferentCurrencies();
    if (isPersisted)       { return null; }
    if (!isDiffCurrencies) { return null; }

    return <Field name="exchangeRate" label="Exchange Rate" component={ HorizontalFormInput } />;
  }

  public render() {
    const { handleSubmit, submitting, error, action } = this.props;
    const isPersisted      = this.isPersisted();

    return (
      <Form horizontal onSubmit={ handleSubmit }>
        { error && <Alert bsStyle="danger">{ error }</Alert> }

        <Field
          name="toAmount"
          label="Amount"
          component={ HorizontalMoneyInput }
          required
        />
        { isPersisted && <Field name="fromAmount" label="From Amount" component={ HorizontalMoneyInput } disabled /> }
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
