import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { deleteCategory as deleteCategoryAction, ICategory } from 'services/categories';
import { addFlashMessage, IFlashMessageOptions } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';

import { confirm } from 'components/utils/confirm';

interface IOwnProps {
  category: ICategory;
}

interface IStateProps {
  orgId: number;
}

interface IDispatchProps {
  deleteCategory: (orgId: number, categoryId: number) => Promise<{}>;
  message:        (msg: string, type?: IFlashMessageOptions) => void;
}

type Props = IOwnProps & IStateProps & IDispatchProps & RouteComponentProps<{}>;

class DestroyCategory extends React.Component<Props> {
  private handleDeleteCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const { orgId, category, message, history, deleteCategory } = this.props;

    confirm(`Are you sure you want to remove category "${category.name}"?`).then(() => {
      deleteCategory(orgId, category.id).then(() => {
        message(`Category "${category.name}" has been removed.`);
        history.push('/categories');
      }).catch((error) => {
        message(`Unable to delete category: ${error.message}`, { type: 'danger' });
      });
    });
  }

  public render() {
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

const mapState = (state: IGlobalState) => ({
  orgId: selectCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  deleteCategory:
    (orgId: number, categoryId: number) => (
      new Promise((res, rej) => dispatch(deleteCategoryAction(orgId, categoryId, res, rej)))
    ),
  message: (msg: string, type?: IFlashMessageOptions) => dispatch(addFlashMessage(msg, type)),
});

export default withRouter(connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(DestroyCategory));
