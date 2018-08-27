import * as React from 'react';

import { isEqual } from 'lodash';
import { Col, Collapse, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { clearFields, initialize } from 'redux-form';

import { ITransactionsFilter } from 'services/transactions';

import { formatMoneyParam, formatMoneyValue } from 'utils/money';
import { IQuery, stringifyQuery } from 'utils/url-helpers';

import FilterForm, { ITransactionFilterFormData, transactionFilterFormName } from './form';

interface IOwnProps {
  open:   boolean;
  filter: ITransactionsFilter;
}

interface IDispatchProps {
  clearForm: () => void;
  reinitialize: (data: ITransactionFilterFormData) => void;
}

type IRouteProps = RouteComponentProps<{}> & IOwnProps;
type IProps = IRouteProps & IDispatchProps;

class TransactionsFilter extends React.PureComponent<IProps> {
  private handleSubmit = (values: ITransactionFilterFormData) => {
    const { history, location: { pathname } } = this.props;

    const query: IQuery = {
      q: {
        ...values.q,
        amountEq: formatMoneyParam(values.q.amountEq),
      },
    };

    history.push({ pathname, search: stringifyQuery(query) });
  }

  private handleReset = () => {
    const { history, location: { pathname } } = this.props;

    history.push({ pathname });
  }

  private initialValues = (): ITransactionFilterFormData => {
    const { filter } = this.props;

    return {
      q: {
        amountEq:        formatMoneyValue(filter.amountEq),
        commentCont:     filter.commentCont,
        period:          filter.period,
        categoryIdEq:    filter.categoryIdEq    ? Number(filter.categoryIdEq) : undefined,
        bankAccountIdEq: filter.bankAccountIdEq ? Number(filter.bankAccountIdEq) : undefined,
        customerIdEq:    filter.customerIdEq    ? Number(filter.customerIdEq) : undefined,
      },
    };
  }

  public componentDidUpdate(prevProps: IProps) {
    const { filter: currFilter } = this.props;
    const { filter: prevFilter } = prevProps;
    if (!isEqual(currFilter, prevFilter)) {
      this.props.reinitialize(this.initialValues());
    }
  }

  public render() {
    return(
      <Collapse in={ this.props.open }>
        <Row>
          <Col xs={ 12 }>
            <FilterForm
              onSubmit={ this.handleSubmit }
              onReset={ this.handleReset }
              initialValues={ this.initialValues() }
            />
          </Col>
        </Row>
      </Collapse>
    );
  }
}

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  clearForm: () => dispatch(clearFields(transactionFilterFormName, false, false)),
  reinitialize: data => dispatch(initialize(transactionFilterFormName, data, { keepValues: false })),
});

export default withRouter<IRouteProps>(
  connect<{}, IDispatchProps, IOwnProps>(undefined, mapDispatch)(TransactionsFilter),
);
