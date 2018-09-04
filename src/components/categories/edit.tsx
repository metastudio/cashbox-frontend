import * as React from 'react';

import { Col, PageHeader, Panel, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { Status } from 'model-types';
import {
  ICategory, ICategoryParams,
  loadCategory,
  selectCategory, selectCategoryStatus,
  updateCategory,
} from 'services/categories';
import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';

import LoadingView from 'components/utils/loading-view';
import Form from './form.jsx';

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

const mapState = (state: IGlobalState) => ({
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
