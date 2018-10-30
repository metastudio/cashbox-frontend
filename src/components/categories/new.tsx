import * as React from 'react';

import { Col, PageHeader, Panel, Row } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { createCategory } from 'services/categories';
import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';

import Form, { ICategoryFormData } from './form';

interface IStateProps {
  orgId: number;
}

interface IDispatchProps {
  create:  typeof createCategory.request;
  message: typeof addFlashMessage;
}

type IProps = RouteComponentProps<{}> & IStateProps & IDispatchProps;

class NewCategory extends React.Component<IProps> {
  private handleSubmit = (values: ICategoryFormData) => {
    const { create, orgId } = this.props;
    return new Promise((resolve, reject) => {
      create(
        orgId,
        {
          name: values.name,
          type: values.type,
        },
        resolve,
        reject,
      );
    }).catch(prepareSubmissionError);
  }

  private afterCreate = () => {
    const { message, history } = this.props;
    message('Category has been created.');
    history.push('/categories');
  }

  public render() {
    return(
      <>
        <BreadcrumbsItem to={ '/categories/new' }>
          New
        </BreadcrumbsItem>
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
      </>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  orgId: selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  create:  (orgId, data, res, rej) => dispatch(createCategory.request(orgId, data, res, rej)),
  message: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(NewCategory));
