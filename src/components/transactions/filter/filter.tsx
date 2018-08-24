import * as React from 'react';

import { isEqual } from 'lodash';
import { Col, Collapse, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { clearFields, initialize } from 'redux-form';

import { formatMoneyParam, formatMoneyValue } from 'utils/money';
import { IQuery, parseQuery, stringifyQuery } from 'utils/url-helpers';

import FilterForm, { ITransactionFilterFormData, transactionFilterFormName } from './form';

interface IOwnProps {
  open: boolean;
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

  private filterQuery = (props: IProps) => {
    const { location: { search } } = props;

    return parseQuery(search).q || {};
  }

  private initialValues = (): ITransactionFilterFormData => {
    const filterQuery = this.filterQuery(this.props);

    return {
      q: {
        amountEq:        formatMoneyValue(filterQuery['amountEq']),
        commentCont:     filterQuery['commentCont'],
        period:          filterQuery['period'],
        categoryIdEq:    filterQuery['categoryIdEq'] && Number(filterQuery['categoryIdEq']),
        bankAccountIdEq: filterQuery['bankAccountIdEq'] && Number(filterQuery['bankAccountIdEq']),
        customerIdEq:    filterQuery['customerIdEq'] && Number(filterQuery['customerIdEq']),
      },
    };
  }

  public componentDidUpdate(prevProps: IProps) {
    const currQuery = this.filterQuery(this.props);
    const prevQuery = this.filterQuery(prevProps);
    if (!isEqual(currQuery, prevQuery)) {
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
