import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Row, Col, PageHeader, Panel } from 'react-bootstrap';

import { Status } from 'model-types';
import { addFlashMessage } from 'services/flash-messages';
import {
  CategoryParams, Category,
  loadCategory, updateCategory,
  selectCategoryStatus, selectCategory,
} from 'services/categories';
import { prepareSubmissionError } from 'utils/errors';

import LoadingView from '../utils/loading-view';
import Form from './form.jsx';
import { selectCurrentOrganizationId } from 'services/organizations';

interface StateProps {
  orgId:    number;
  status:   Status;
  category: Category | null;
}

interface DispatchProps {
  load:    (orgId: number, categoryId: number) => void;
  update:  (orgId: number, categoryId: number, data: CategoryParams) => Promise<{}>;
  message: (msg: string) => void;
}

type Props = RouteComponentProps<{ id: string }> & StateProps & DispatchProps;

class EditCategory extends React.Component<Props> {
  loadData = () => {
    const { load, orgId, match: { params: { id }}} = this.props;

    load(orgId, Number(id));
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { status, match: { params: { id } } } = this.props;

    if (status === Status.Invalid || id !== prevId) {
      this.loadData();
    }
  }

  handleSubmit = (values: CategoryParams) => {
    const { update, orgId, match: { params: { id } } } = this.props;
    return update(
      orgId, Number(id),
      {
        name: values.name,
        type: values.type,
      }
    ).catch(prepareSubmissionError);
  }

  afterUpdate = () => {
    const { message, history } = this.props;

    message('Category successfully updated.');
    history.push('/categories');
  }

  render() {
    const { status, category } = this.props;

    if (status === Status.Invalid || !category) {
      return <LoadingView status={ status } />;
    }

    return(
      <Row>
        <Col xs={ 12 } smOffset={ 2 } sm={ 8 } mdOffset={ 3 } md={ 6 } >
          <PageHeader>Edit Category</PageHeader>
          <Panel>
            <Panel.Body>
              <Form
                onSubmit={ this.handleSubmit }
                onSubmitSuccess={ this.afterUpdate }
                initialValues={ category }
                action="Update"
              />
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    );
  }
}

const mapState = (state: object) => ({
  orgId:    selectCurrentOrganizationId(state),
  status:   selectCategoryStatus(state),
  category: selectCategory(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load:    (orgId: number, categoyId: number) => dispatch(loadCategory(orgId, categoyId)),
  update:  (orgId: number, categoryId: number, data: CategoryParams) => (
    new Promise((res, rej) => dispatch(updateCategory(orgId, categoryId, data, res, rej)))
  ),
  message: (msg: string) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(EditCategory));
