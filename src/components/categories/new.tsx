import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Panel, Row, Col, PageHeader } from 'react-bootstrap';
import { Mutation, MutationFn } from 'react-apollo';

import { CategoryInput } from 'graphql-types';
import { addFlashMessage } from 'actions/flash-messages.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { appollorErrorToSubmission } from 'utils/errors';
import { CreateCategoryMutation, CreateCategoryMutationVariables } from 'graphql-types';
import { CreateCategory as CreateCategoryQuery, GetOrganizationCategories } from 'queries/categories';

import Form from './form.jsx';

class CreateMutation extends Mutation<CreateCategoryMutation, CreateCategoryMutationVariables> {}

type UpdateFn = MutationFn<CreateCategoryMutation, CreateCategoryMutationVariables>;

interface StateProps {
  orgId: string;
}

interface DispatchProps {
  message: (msg: string) => void;
}

type Props = RouteComponentProps<{}> & StateProps & DispatchProps;

class NewCategory extends React.Component<Props> {
  handleSubmit = (create: UpdateFn, values: CategoryInput) => {
    const { orgId } = this.props;
    return create({
      variables: {
        orgId,
        category: {
          name: values.name,
          type: values.type,
        }
      }
    }).catch(appollorErrorToSubmission);
  }

  afterCreate = () => {
    const { message, history } = this.props;
    message('Category successfully created.');
    history.push('/categories');
  }

  render() {
    const { orgId } = this.props;

    return(
      <Row>
        <Col xs={ 12 } smOffset={ 2 } sm={ 8 } mdOffset={ 3 } md={ 6 } >
          <PageHeader>New Category</PageHeader>
          <Panel>
            <Panel.Body>
              <CreateMutation
                mutation={ CreateCategoryQuery }
                refetchQueries={ [ { query: GetOrganizationCategories, variables: { orgId } } ] }
              >
                {
                  (createCategory) => (
                    <Form
                      onSubmit={ (values: CategoryInput) => this.handleSubmit(createCategory, values) }
                      onSubmitSuccess={ this.afterCreate }
                      action="Create"
                    />
                  )
                }
              </CreateMutation>
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    );
  }
}

const mapState = (state: {}) => ({
  orgId: getCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  message: (msg: String) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(NewCategory));
