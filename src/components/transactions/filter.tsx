import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Collapse, Row, Col } from 'react-bootstrap';

import { stringifyQuery } from 'utils/url-helpers';

import FilterForm from './forms/filter';

interface IOwnProps {
  open: boolean;
}

type IProps = RouteComponentProps<{}> & IOwnProps;

class TransactionsFilter extends React.PureComponent<IProps> {
  private handleSubmit = (values: object) => {
    const { history, location: { pathname } } = this.props;

    history.push({ pathname, search: stringifyQuery(values) });
  }

  private handleReset = () => {
    const { history, location: { pathname } } = this.props;

    history.push({ pathname });
  }

  public render() {
    return(
      <Collapse in={ this.props.open }>
        <Row>
          <Col xs={ 12 }>
            <FilterForm onSubmit={ this.handleSubmit } onReset={ this.handleReset } />
          </Col>
        </Row>
      </Collapse>
    );
  }
}

export default withRouter(TransactionsFilter);
