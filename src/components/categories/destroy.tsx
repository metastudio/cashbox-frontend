import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';

import { Category, FalshMessageOptions } from 'model-types';
import { addFlashMessage } from 'actions/flash-messages.js';
import { deleteCategory } from 'actions/categories.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { confirm } from 'components/utils/confirm';

interface OwnProps {
  category: Category;
}

interface StateProps {
  orgId: number;
}

interface DispatchProps {
  destroy: (orgId: number, categoryId: number) => Promise<{}>;
  message: (msg: string, type?: FalshMessageOptions) => void;
}

type Props = OwnProps & StateProps & DispatchProps & RouteComponentProps<{}>;

class DestroyCategory extends React.Component<Props> {
  handleDeleteCategoryClick = () => {
    const { orgId, category, destroy, message, history } = this.props;

    confirm('Are you sure?').then(() => {
      destroy(orgId, category.id).then(() => {
        message(`Category ${category.name} successfully deleted.`);
        history.push('/categories');
      }).catch(error => {
        message(`Unable to delete category: ${error.message}`, { type: 'danger' });
      });
    });
  }

  render() {
    return (
      <Link
        title="Delete"
        to={ '/categories' }
        onClick={ this.handleDeleteCategoryClick }
      >
        <i className="fa fa-trash-o" />
      </Link>
    );
  }
}

const mapState = (state: {}) => ({
  orgId: getCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  destroy:  (orgId: number, categoryId: number) =>
    new Promise((res, rej) => dispatch(deleteCategory(orgId, categoryId, res, rej))),
  message: (msg: string, type?: FalshMessageOptions) => dispatch(addFlashMessage(msg, type)),
});

export default withRouter(connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch)(DestroyCategory));
