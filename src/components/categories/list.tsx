import * as React from 'react';

import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import { Status } from 'model-types';
import { CategoryType, loadCategories, selectCategoriesStatus } from 'services/categories';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';

import LoadingView from 'components/utils/loading-view';
import Table from './list/table';

interface IStateProps {
  orgId:  number;
  status: Status;
}

interface IDispatchProps {
  load: typeof loadCategories.request;
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
    const { status } = this.props;

    return (
      <>
        <PageHeader>
          <Link to="/categories/new" className="btn btn-default pull-right">Add Category...</Link>
          Categories
        </PageHeader>
        <LoadingView status={ status }>
          { () => [CategoryType.Income, CategoryType.Expense].map(t => <Table key={ t } type={ t } />) }
        </LoadingView>
      </>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  orgId:  selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
  status: selectCategoriesStatus(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: orgId => dispatch(loadCategories.request(orgId)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(CategoriesList);
