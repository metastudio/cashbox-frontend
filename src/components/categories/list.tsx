import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';

import { Status } from 'model-types';
import { selectCurrentOrganizationId } from 'services/organizations';
import { ICategory, selectCategories, selectCategoriesStatus, loadCategories } from 'services/categories';

import Table from './list/table';
import LoadingView from 'components/utils/loading-view';

interface IStateProps {
  orgId:      number;
  status:     Status;
  categories: ICategory[] | null;
}

interface IDispatchProps {
  load: (orgId: number) => void;
}

type IProps = IStateProps & IDispatchProps;

class CategoriesList extends React.Component<IProps> {
  private loadData = () => {
    const { orgId, load } = this.props;

    load(orgId);
  }

  public componentDidMount() {
    this.loadData();
  }

  public render() {
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

const mapDispatch = (dispatch: Dispatch) => ({
  load: (orgId: number) => dispatch(loadCategories(orgId)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(CategoriesList);
