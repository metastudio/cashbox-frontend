import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Mutation, MutationFn } from 'react-apollo';

import { FalshMessageOptions } from 'model-types';
import { CategoryFragment } from 'graphql-types';
import { addFlashMessage } from 'actions/flash-messages.js';
import { confirm } from 'components/utils/confirm';
import { DeleteCategoryMutation, DeleteCategoryMutationVariables } from 'graphql-types';
import { DeleteCategory, GetOrganizationCategories } from 'queries/categories';

class DeleteMutation extends Mutation<DeleteCategoryMutation, DeleteCategoryMutationVariables> {}
type DeleteFn = MutationFn<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

interface OwnProps {
  category: CategoryFragment;
}

interface StateProps {
}

interface DispatchProps {
  message: (msg: string, type?: FalshMessageOptions) => void;
}

type Props = OwnProps & DispatchProps & RouteComponentProps<{}>;

class DestroyCategory extends React.Component<Props> {
  handleDeleteCategoryClick = (deletCategory: DeleteFn) => {
    const { category, message, history } = this.props;

    confirm('Are you sure?').then(() => {
      deletCategory({ variables: { categoryId: category.id } }).then(() => {
        message(`Category ${category.name} successfully deleted.`);
        history.push('/categories');
      }).catch(error => {
        message(`Unable to delete category: ${error.message}`, { type: 'danger' });
      });
    });
  }

  render() {
    const { category } = this.props;
    return (
      <DeleteMutation
        mutation={ DeleteCategory }
        refetchQueries={ [
          { query: GetOrganizationCategories, variables: { orgId: category.organizationId } }
        ] }
      >
        {
          (deleteCategory) => (
            <a
              title="Delete"
              href={ `/categories/${category.id}` }
              onClick={
                (e) => {
                  e.preventDefault();
                  this.handleDeleteCategoryClick(deleteCategory);
                }
              }
            >
              <i className="fa fa-trash-o" />
            </a>
          )
        }
      </DeleteMutation>
    );
  }
}

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  message: (msg: string, type?: FalshMessageOptions) => dispatch(addFlashMessage(msg, type)),
});

export default withRouter(connect<StateProps, DispatchProps, OwnProps>(undefined, mapDispatch)(DestroyCategory));
