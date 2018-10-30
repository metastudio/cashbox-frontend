import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID } from 'model-types';
import { deleteCategory, ICategory } from 'services/categories';
import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';

import { confirm } from 'components/utils/confirm';

interface IOwnProps {
  category: ICategory;
}

interface IStateProps {
  orgId: ID;
}

interface IDispatchProps {
  remove:  typeof deleteCategory.request;
  message: typeof addFlashMessage;
}

type Props = IOwnProps & IStateProps & IDispatchProps & RouteComponentProps<{}>;

class DestroyCategory extends React.Component<Props> {
  private handleDeleteCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const { orgId, category, message, history, remove } = this.props;

    confirm(`Are you sure you want to remove category "${category.name}"?`).then(() => {
      new Promise((resolve, reject) => {
        remove(orgId, category.id);
      }).then(() => {
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

const mapState = (state: IGlobalState): IStateProps => ({
  orgId: selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  remove:  (orgId, categoryId, res, rej) => dispatch(deleteCategory.request(orgId, categoryId, res, rej)),
  message: (msg, type) => dispatch(addFlashMessage(msg, type)),
});

export default withRouter(connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(DestroyCategory));
