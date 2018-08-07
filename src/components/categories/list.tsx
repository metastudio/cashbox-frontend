import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';

import { Status } from 'model-types';
import { selectCurrentOrganizationId } from 'services/organizations';
import { Category, selectCategories, selectCategoriesStatus, loadCategories } from 'services/categories';

import Table from './list/table';
import LoadingView from 'components/utils/loading-view';

interface StateProps {
  orgId:      number;
  status:     Status;
  categories: Category[] | null;
}

interface DispatchProps {
  load: (orgId: number) => void;
}

type Props = StateProps & DispatchProps;

class CategoriesList extends React.Component<Props> {
  loadData = () => {
    const { orgId, load } = this.props;

    load(orgId);
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { status, categories } = this.props;

    if (status !== Status.Success || !categories) {
      return <LoadingView status={ status } />;
    }

    return (
      <>
        <PageHeader>
          <Link to="/categories/new" className="btn btn-default pull-right">Add Category...</Link>
          Categories
        </PageHeader>
        <Table categories={ categories } />
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:      selectCurrentOrganizationId(state),
  status:     selectCategoriesStatus(state),
  categories: selectCategories(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => dispatch(loadCategories(orgId)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(CategoriesList);
