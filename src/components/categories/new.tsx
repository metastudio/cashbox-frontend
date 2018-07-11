import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Panel, Row, Col, PageHeader } from 'react-bootstrap';

import { addFlashMessage } from 'services/flash-messages';
import { selectCurrentOrganizationId } from 'services/organizations';
import { CategoryParams, createCategory } from 'services/categories';

import { prepareSubmissionError } from 'utils/errors';

import Form from './form.jsx';

interface StateProps {
  orgId: number;
}

interface DispatchProps {
  create:  (orgId: number, data: CategoryParams) => Promise<{}>;
  message: (msg: string) => void;
}

type Props = RouteComponentProps<{}> & StateProps & DispatchProps;

class NewCategory extends React.Component<Props> {
  handleSubmit = (values: CategoryParams) => {
    const { create, orgId } = this.props;
    return create(
      orgId,
      {
        name: values.name,
        type: values.type,
      }
    ).catch(prepareSubmissionError);
  }

  afterCreate = () => {
    const { message, history } = this.props;
    message('Category has been created.');
    history.push('/categories');
  }

  render() {
    return(
      <Row>
        <Col xs={ 12 } smOffset={ 2 } sm={ 8 } mdOffset={ 3 } md={ 6 } >
          <PageHeader>New Category</PageHeader>
          <Panel>
            <Panel.Body>
              <Form
                onSubmit={ this.handleSubmit }
                onSubmitSuccess={ this.afterCreate }
                action="Create"
              />
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    );
  }
}

const mapState = (state: {}) => ({
  orgId: selectCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  create: (orgId: number, data: CategoryParams) => (
    new Promise((res, rej) => dispatch(createCategory(orgId, data, res, rej)))
  ),
  message: (msg: String) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(NewCategory));
