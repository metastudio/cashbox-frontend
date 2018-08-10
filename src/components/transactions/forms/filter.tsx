import * as React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { Alert, Form, ButtonGroup, Button, Col, Row } from 'react-bootstrap';

import { NoLabelCategoriesSelect } from 'components/categories/select-field';
import { NoLabelBankAccountsSelect } from 'components/bank-accounts/select-field';
import { NoLabelCustomersSelect } from 'components/customers/select-field';
import {
  NoLabelCurrencyInput,
  NoLabelFormInput,
  NoLabelDatePicker,
  SubmitButton,
} from 'components/utils/form-inputs';

interface IOwnProps {
  onReset: () => void;
}

type IProps = IOwnProps & InjectedFormProps<{}, IOwnProps>;

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
              name="q[amount_eq]"
              component={ NoLabelCurrencyInput }
              label="Amount"
              placeholder="Amount"
            />
          </Col>
          <Col sm={ 4 }>
            <Field
              name="q[comment_cont]"
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
              name="q[category_id_eq]"
              component={ NoLabelCategoriesSelect }
              placeholder="Category"
            />
          </Col>
          <Col sm={ 4 }>
            <Field
              name="q[bankAccount_id_eq]"
              component={ NoLabelBankAccountsSelect }
              placeholder="Bank Account"
            />
          </Col>
          <Col sm={ 4 }>
            <Field
              name="q[customer_id_eq]"
              component={ NoLabelCustomersSelect }
              label="Customer"
              placeholder="Customer"
            />
          </Col>
        </Row>
        <ButtonGroup className="pull-right">
          <SubmitButton submitting={ submitting }>Search</SubmitButton>
          <Button onClick={ this.handleReset }>Clear</Button>
        </ButtonGroup>
      </Form>
    );
  }
}

export default reduxForm<{}, IOwnProps>({
  form: 'transactionFilterForm',
})(TransactionsFilterForm);
