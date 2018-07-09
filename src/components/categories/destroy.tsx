import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Category, deleteCategory as deleteCategoryAction } from 'services/categories';
import { addFlashMessage, FlashMessageOptions } from 'services/flash-messages';

import { confirm } from 'components/utils/confirm';
import { selectCurrentOrganizationId } from 'services/organizations';

interface OwnProps {
  category: Category;
}

interface StateProps {
  orgId: number;
}

interface DispatchProps {
  deleteCategory: (orgId: number, categoryId: number) => Promise<{}>;
  message:        (msg: string, type?: FlashMessageOptions) => void;
}

type Props = OwnProps & StateProps & DispatchProps & RouteComponentProps<{}>;

class DestroyCategory extends React.Component<Props> {
  handleDeleteCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const { orgId, category, message, history, deleteCategory } = this.props;

    confirm(`Are you sure you want to remove category "${category.name}"?`).then(() => {
      deleteCategory(orgId, category.id).then(() => {
        message(`Category "${category.name}" has been removed.`);
        history.push('/categories');
      }).catch(error => {
        message(`Unable to delete category: ${error.message}`, { type: 'danger' });
      });
    });
  }

  render() {
    const { category } = this.props;
    return (
      <a
        title="Delete"
        href={ `/categories/${category.id}` }
        onClick={ this.handleDeleteCategoryClick }
      >
        <i className="fa fa-trash-o" />
      </a>
    );
  }
}

const mapState = (state: object) => ({
  orgId: selectCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  deleteCategory:
    (orgId: number, categoryId: number) => (
      new Promise((res, rej) => dispatch(deleteCategoryAction(orgId, categoryId, res, rej)))
    ),
  message: (msg: string, type?: FlashMessageOptions) => dispatch(addFlashMessage(msg, type)),
});

export default withRouter(connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch)(DestroyCategory));
