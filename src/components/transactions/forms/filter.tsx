import * as React from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { Alert, Form, ButtonGroup, Button, Col, Row } from 'react-bootstrap';

import { NoLabelCategoriesSelect } from 'components/categories/select-field';
import { NoLabelBankAccountsSelect } from 'components/bank-accounts/select-field';
import { NoLabelCustomersSelect } from 'components/customers/select-field';
import {
  NoLabelMoneyInput,
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
          <Button onClick={ this.handleReset }>Clear</Button>
        </ButtonGroup>
      </Form>
    );
  }
}

export default reduxForm<{}, IOwnProps>({
  form: 'transactionFilterForm',
})(TransactionsFilterForm);
