import * as React from 'react';

import { Alert, Button, ButtonGroup, Col, Form, Row } from 'react-bootstrap';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { NoLabelBankAccountsSelect } from 'components/bank-accounts/select-field';
import { NoLabelCategoriesSelect } from 'components/categories/select-field';
import { NoLabelCustomersSelect } from 'components/customers/select-field';
import {
  NoLabelFormInput,
  NoLabelMoneyInput,
  SubmitButton,
} from 'components/utils/form-inputs';

import { NoLabelFilterPeriodSelect } from './period-select';

interface ITransactionFilterFormData {
  amountEq?:        string;
  commentCont?:     string;
  period?:          string;
  categoryIdEq?:    number;
  bankAccountIdIn?: number[];
  customerIdEq?:    number;
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
              name="amountEq"
              component={ NoLabelMoneyInput }
              label="Amount"
              placeholder="Amount"
            />
          </Col>
          <Col sm={ 4 }>
            <Field
              name="commentCont"
              component={ NoLabelFormInput }
              label="Comment"
              placeholder="Comment"
            />
          </Col>
          <Col sm={ 4 }>
            <Field
              name="period"
              component={ NoLabelFilterPeriodSelect }
              label="Period"
              placeholder="Period"
            />
          </Col>
        </Row>
        <Row>
          <Col sm={ 4 }>
            <Field
              name="categoryIdEq"
              component={ NoLabelCategoriesSelect }
              placeholder="Category"
            />
          </Col>
          <Col sm={ 4 }>
            <Field
              name="bankAccountIdIn"
              component={ NoLabelBankAccountsSelect }
              placeholder="Bank Account"
              isMulti
            />
          </Col>
          <Col sm={ 4 }>
            <Field
              name="customerIdEq"
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
