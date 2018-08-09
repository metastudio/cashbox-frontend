import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Panel, Row, Col, PageHeader } from 'react-bootstrap';

import { addFlashMessage } from 'services/flash-messages';
import { selectCurrentOrganizationId } from 'services/organizations';
import { ICategoryParams, createCategory } from 'services/categories';

import { prepareSubmissionError } from 'utils/errors';

import Form from './form.jsx';

interface IStateProps {
  orgId: number;
}

interface IDispatchProps {
  create:  (orgId: number, data: ICategoryParams) => Promise<{}>;
  message: (msg: string) => void;
}

type IProps = RouteComponentProps<{}> & IStateProps & IDispatchProps;

class NewCategory extends React.Component<IProps> {
  private handleSubmit = (values: ICategoryParams) => {
    const { create, orgId } = this.props;
    return create(
      orgId,
      {
        name: values.name,
        type: values.type,
      },
    ).catch(prepareSubmissionError);
  }

  private afterCreate = () => {
    const { message, history } = this.props;
    message('Category has been created.');
    history.push('/categories');
  }

  public render() {
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

const mapDispatch = (dispatch: Dispatch) => ({
  create: (orgId: number, data: ICategoryParams) => (
    new Promise((res, rej) => dispatch(createCategory(orgId, data, res, rej)))
  ),
  message: (msg: string) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(NewCategory));
