import * as React from 'react';

import { Col, PageHeader, Panel, Row } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { Status } from 'model-types';
import {
  ICategory,
  loadCategory,
  selectCategory, selectCategoryStatus,
  updateCategory,
} from 'services/categories';
import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';

import LoadingView from 'components/utils/loading-view';
import Form, { ICategoryFormData } from './form';

interface IStateProps {
  orgId:    number;
  status:   Status;
  category: ICategory | null;
}

interface IDispatchProps {
  load:    typeof loadCategory.request;
  update:  typeof updateCategory.request;
  message: typeof addFlashMessage;
}

type IProps = RouteComponentProps<{ id: string }> & IStateProps & IDispatchProps;

class EditCategory extends React.Component<IProps> {
  private loadData = () => {
    const { load, orgId, match: { params: { id } } } = this.props;

    load(orgId, Number(id));
  }

  private handleSubmit = (values: ICategoryFormData) => {
    const { update, orgId, match: { params: { id } } } = this.props;
    return new Promise((resolve, reject) => {
      update(
        orgId,
        Number(id),
        {
          name: values.name,
          type: values.type,
        },
        resolve,
        reject,
      );
    }).catch(prepareSubmissionError);
  }

  private afterUpdate = () => {
    const { message, history } = this.props;

    message('Category successfully updated.');
    history.push('/categories');
  }

  private renderForm = () => (
    <Panel>
      <Panel.Body>
        <Form
          onSubmit={ this.handleSubmit }
          onSubmitSuccess={ this.afterUpdate }
          initialValues={ this.props.category || {} }
          action="Update"
        />
      </Panel.Body>
    </Panel>
  )

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
    const { status, match: { params: { id } } } = this.props;

    return(
      <>
        <BreadcrumbsItem to={ `/categories/${id}/edit` }>
          { `Edit Category #${id}` }
        </BreadcrumbsItem>
        <Row>
          <Col xs={ 12 } smOffset={ 2 } sm={ 8 } mdOffset={ 3 } md={ 6 } >
            <PageHeader>Edit Category</PageHeader>
            <LoadingView status={ status }>
              { this.renderForm }
            </LoadingView>
          </Col>
        </Row>
      </>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  orgId:    selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
  status:   selectCategoryStatus(state),
  category: selectCategory(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load:    (orgId, categoyId) => dispatch(loadCategory.request(orgId, categoyId)),
  update:  (orgId, categoryId, data, res, rej) => dispatch(updateCategory.request(orgId, categoryId, data, res, rej)),
  message: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(EditCategory));
