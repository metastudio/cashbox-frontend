import * as React from 'react';
import gql from 'graphql-tag';
import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Alert, Panel, Row, Col, PageHeader } from 'react-bootstrap';
import { Query } from 'react-apollo';

import { CategoryParams } from 'model-types';
import { addFlashMessage } from 'actions/flash-messages.js';
import { updateCategory } from 'actions/categories.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { prepareSubmissionError } from 'utils/errors';

import Spinner from 'components/utils/spinner';
import Form from './form.jsx';

const categoryQuery = gql`
  query category($orgId: ID!, $categoryId: ID!) {
    organization(id: $orgId) {
      category(id:$categoryId) {
        id
        name
        type
      }
    }
  }
`;

interface StateProps {
  orgId: number;
}

interface DispatchProps {
  update:  (orgId: number, id: number, data: CategoryParams) => Promise<{}>;
  message: (msg: string) => void;
}

type Props = RouteComponentProps<{ id: string }> & StateProps & DispatchProps;

class EditCategory extends React.Component<Props> {
  // TODO: `values` should have `CategoryFormData` type defined via form component
  handleSubmit = (values: CategoryParams) => {
    const { orgId, match, update } = this.props;
    return update(orgId, Number(match.params.id), {
      name: values.name,
      type: values.type,
    }).catch(prepareSubmissionError);
  }

  afterUpdate = () => {
    const { message, history } = this.props;

    message('Category successfully updated.');
    history.push('/categories');
  }

  render() {
    const { orgId, match } = this.props;

    return(
      <Row>
        <Col xs={ 12 } smOffset={ 2 } sm={ 8 } mdOffset={ 3 } md={ 6 } >
          <PageHeader>Edit Category</PageHeader>
          <Query query={ categoryQuery } variables={ { orgId, categoryId: match.params.id } }>
            {
              ({ loading, error, data }) => {
                if (loading) { return <Spinner />; }
                if (error) { return <Alert bsStyle="danger">{ error }</Alert>; }

                return (
                  <Panel>
                    <Panel.Body>
                      <Form
                        onSubmit={ this.handleSubmit }
                        onSubmitSuccess={ this.afterUpdate }
                        initialValues={ data.organization.category }
                        action="Update"
                      />
                    </Panel.Body>
                  </Panel>
                );
              }
            }
          </Query>
        </Col>
      </Row>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:    getCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  update: (orgId: number, categoryId: number, data: CategoryParams) =>
    new Promise((res, rej) => dispatch(updateCategory(orgId, categoryId, data, res, rej))),
  message: (msg: string) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(EditCategory));
