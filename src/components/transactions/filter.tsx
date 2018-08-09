import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Collapse, Row, Col } from 'react-bootstrap';
import * as QS from 'qs';

import FilterForm from './forms/filter';

interface IOwnProps {
  isFilterOpened: boolean;
}

type IProps = RouteComponentProps<{ id: string }> & IOwnProps;

class TransactionsFilter extends React.Component<IProps> {
  private handleSubmit = (values: object) => {
    const { history, location: { pathname } } = this.props;

    history.push({ pathname, search: QS.stringify(values) });
  }

  public render() {
    return(
      <Collapse in={ this.props.isFilterOpened }>
        <Row>
          <Col xs={ 12 }>
            <FilterForm onSubmit={ this.handleSubmit }/>
          </Col>
        </Row>
      </Collapse>
    );
  }
}

export default withRouter(TransactionsFilter);
