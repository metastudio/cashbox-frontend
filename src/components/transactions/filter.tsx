import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Collapse, Row, Col } from 'react-bootstrap';
import FilterForm from './form/filter-form.jsx';
import * as QS from 'qs';

interface OwnProps {
  isFilterOpened: boolean;
}

type RouteProps = RouteComponentProps<{ id: string }>;
type Props = RouteProps & OwnProps;

class TransactionsFilter extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values: object) {
    const { history, location: { pathname } } = this.props;

    history.push({ pathname: pathname, search: QS.stringify(values) });
  }

  render() {
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
