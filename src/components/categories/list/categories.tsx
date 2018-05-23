import * as React from 'react';

import { connect, Dispatch } from 'react-redux';
import { Table } from 'react-bootstrap';

import { Status, Category } from 'model-types';
import { loadCategories } from 'actions/categories.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectCategoriesStatus, selectCategories } from 'selectors/categories.js';

import LoadingView from 'components/utils/loading-view';
import TableBody from './table-body';

interface StateProps {
  orgId:       number;
  status:      Status;
  categories?: Category[];
}

interface DispatchProps {
  load: (orgId: number) => void;
}

type Props = StateProps & DispatchProps;

class CategoriesList extends React.Component<Props> {
  loadData = ({ orgId, load }: Props) => {
    load(orgId);
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(props: Props) {
    if (props.status === Status.Invalid) {
      this.loadData(props);
    }
  }

  render() {
    const { status, categories } = this.props;

    if (status !== Status.Success || !categories) {
      return <LoadingView status={ status } />;
    }

    return (
      <Table striped responsive hover id="categories">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th colSpan={ 2 } />
          </tr>
        </thead>
        <TableBody categories={ categories } />
      </Table>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:      getCurrentOrganizationId(state),
  status:     selectCategoriesStatus(state),
  categories: selectCategories(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: Number) => dispatch(loadCategories(orgId)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(CategoriesList);
