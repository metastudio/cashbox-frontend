import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Row, Col, PageHeader, Panel } from 'react-bootstrap';

import { Status } from 'model-types';
import { addFlashMessage } from 'services/flash-messages';
import {
  ICategoryParams, ICategory,
  loadCategory, updateCategory,
  selectCategoryStatus, selectCategory,
} from 'services/categories';
import { prepareSubmissionError } from 'utils/errors';

import LoadingView from '../utils/loading-view';
import Form from './form.jsx';
import { selectCurrentOrganizationId } from 'services/organizations';

interface IStateProps {
  orgId:    number;
  status:   Status;
  category: ICategory | null;
}

interface IDispatchProps {
  load:    (orgId: number, categoryId: number) => void;
  update:  (orgId: number, categoryId: number, data: ICategoryParams) => Promise<{}>;
  message: (msg: string) => void;
}

type IProps = RouteComponentProps<{ id: string }> & IStateProps & IDispatchProps;

class EditCategory extends React.Component<IProps> {
  private loadData = () => {
    const { load, orgId, match: { params: { id } } } = this.props;

    load(orgId, Number(id));
  }

  private handleSubmit = (values: ICategoryParams) => {
    const { update, orgId, match: { params: { id } } } = this.props;
    return update(
      orgId, Number(id),
      {
        name: values.name,
        type: values.type,
      },
    ).catch(prepareSubmissionError);
  }

  private afterUpdate = () => {
    const { message, history } = this.props;

    message('Category successfully updated.');
    history.push('/categories');
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate(prevProps: IProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { status, match: { params: { id } } } = this.props;

    if (status === Status.Invalid || id !== prevId) {
      this.loadData();
    }
  }

  public render() {
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

const mapDispatch = (dispatch: Dispatch) => ({
  load:    (orgId: number, categoyId: number) => dispatch(loadCategory(orgId, categoyId)),
  update:  (orgId: number, categoryId: number, data: ICategoryParams) => (
    new Promise((res, rej) => dispatch(updateCategory(orgId, categoryId, data, res, rej)))
  ),
  message: (msg: string) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(EditCategory));
