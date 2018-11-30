import * as React from 'react';

import { Alert, Button, ButtonGroup, Col, Collapse, Form, Row } from 'react-bootstrap';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { NoLabelBankAccountsSelect } from 'components/bank-accounts/select-field';
import { NoLabelCategoriesSelect } from 'components/categories/select-field';
import { NoLabelCustomersSelect } from 'components/customers/select-field';
import {
  NoLabelFormInput,
  NoLabelMoneyInput,
  SubmitButton,
  VerticalDatePicker,
} from 'components/utils/form-inputs';

import { NoLabelFilterPeriodSelect } from './period-select';

interface ITransactionFilterFormData {
  amountEq?:        string;
  commentCont?:     string;
  period?:          string;
  categoryIdIn?:    number[];
  bankAccountIdIn?: number[];
  customerIdIn?:    number[];
  dateFrom?:        string;
  dateTo?:          string;
}

interface IOwnProps {
  onReset: () => void;
}

interface IState {
  isCustomPeriod: boolean;
}

type IProps = IOwnProps & InjectedFormProps<ITransactionFilterFormData, IOwnProps>;

const transactionFilterFormName = 'transactionFilterForm';

class TransactionsFilterForm extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isCustomPeriod: false,
  };

  private handleReset = () => {
    const { reset, onReset } = this.props;

    reset();
    if (onReset) { onReset(); }
  }

  private onPeriodChange = (_e: React.FormEvent<HTMLSelectElement>, value: string) => {
    this.setState({
      isCustomPeriod: value === 'custom',
    });
  }

  public componentDidMount() {
    this.setState({
      isCustomPeriod: false,
    });
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
              onChange={ this.onPeriodChange }
            />
          </Col>
        </Row>
        <Row>
          <Col sm={ 4 }>
            <Field
              name="categoryIdIn"
              component={ NoLabelCategoriesSelect }
              placeholder="Category"
              isMulti
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
              name="customerIdIn"
              component={ NoLabelCustomersSelect }
              label="Customer"
              placeholder="Customer"
              isMulti
            />
          </Col>
        </Row>
        <Collapse in={ this.state.isCustomPeriod }>
          <Row>
            <Col sm={ 6 }>
              <Field
                name="dateFrom"
                component={ VerticalDatePicker }
                label="From"
                placeholder="dd/mm/yyyy"
              />
            </Col>
            <Col sm={ 6 }>
              <Field
                name="dateTo"
                component={ VerticalDatePicker }
                label="To"
                placeholder="dd/mm/yyyy"
              />
            </Col>
          </Row>
        </Collapse>
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
