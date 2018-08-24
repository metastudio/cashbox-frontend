import * as React from 'react';

import { Alert, Button, ButtonGroup, Col, Form, Row } from 'react-bootstrap';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { NoLabelBankAccountsSelect } from 'components/bank-accounts/select-field';
import { NoLabelCategoriesSelect } from 'components/categories/select-field';
import { NoLabelCustomersSelect } from 'components/customers/select-field';
import {
  NoLabelDatePicker,
  NoLabelFormInput,
  NoLabelMoneyInput,
  SubmitButton,
} from 'components/utils/form-inputs';

interface ITransactionFilterFormData {
  q: {
    amountEq?:        string;
    commentCont?:     string;
    period?:          string;
    categoryIdEq?:    number;
    bankAccountIdEq?: number;
    customerIdEq?:    number;
  };
}

interface IOwnProps {
  onReset: () => void;
}

type IProps = IOwnProps & InjectedFormProps<ITransactionFilterFormData, IOwnProps>;

const transactionFilterFormName = 'transactionFilterForm';

class TransactionsFilterForm extends React.PureComponent<IProps> {
  private handleReset = () => {
    const { reset, onReset } = this.props;

    reset();
    if (onReset) { onReset(); }
  }

  public render() {
    const { handleSubmit, submitting, error } = this.props;

    return (
      <Form onSubmit={ handleSubmit }>
        { error && <Alert bsStyle="danger">{ error }</Alert> }

        <Row>
          <Col sm={ 4 }>
            <Field
              name="q[amountEq]"
              component={ NoLabelMoneyInput }
              label="Amount"
              placeholder="Amount"
            />
          </Col>
          <Col sm={ 4 }>
            <Field
              name="q[commentCont]"
              component={ NoLabelFormInput }
              label="Comment"
              placeholder="Comment"
            />
          </Col>
          <Col sm={ 4 }>
            <Field
              name="q[period]"
              component={ NoLabelDatePicker }
              label="Date"
              placeholder="Date"
            />
          </Col>
        </Row>
        <Row>
          <Col sm={ 4 }>
            <Field
              name="q[categoryIdEq]"
              component={ NoLabelCategoriesSelect }
              placeholder="Category"
            />
          </Col>
          <Col sm={ 4 }>
            <Field
              name="q[bankAccountIdEq]"
              component={ NoLabelBankAccountsSelect }
              placeholder="Bank Account"
            />
          </Col>
          <Col sm={ 4 }>
            <Field
              name="q[customerIdEq]"
              component={ NoLabelCustomersSelect }
              label="Customer"
              placeholder="Customer"
            />
          </Col>
        </Row>
        <ButtonGroup className="pull-right">
          <SubmitButton submitting={ submitting }>Search</SubmitButton>
          <Button onClick={ this.handleReset }>Reset</Button>
        </ButtonGroup>
      </Form>
    );
  }
}

const ReduxTransactionFilterForm = reduxForm<ITransactionFilterFormData, IOwnProps>({
  form: transactionFilterFormName,
})(TransactionsFilterForm);

export {
  ReduxTransactionFilterForm as default,
  ITransactionFilterFormData,
  transactionFilterFormName,
};
