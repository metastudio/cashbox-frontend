import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import * as statuses from 'constants/statuses.js';

import { loadCategories } from 'actions/categories.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import LoadingView from 'components/utils/loading-view';
import TableBody from './table-body';

class CategoriesList extends React.Component {
  componentDidMount() {
    const { orgId, loadCategories } = this.props;
    loadCategories(orgId);
  }

  render() {
    const { status, categories } = this.props;

    if (status !== statuses.SUCCESS || !categories) {
      return <LoadingView status={ status } />;
    }

    return (
      <Table striped responsive hover id="categories">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <TableBody categories={ categories } />
      </Table>
    );
  }
}

CategoriesList.propTypes = {
  orgId:          PropTypes.number.isRequired,
  loadCategories: PropTypes.func.isRequired,
  status:         PropTypes.string.isRequired,
  categories:     PropTypes.arrayOf(PropTypes.object).isRequired,
};

const select = (state) => ({
  orgId:      getCurrentOrganizationId(state),
  categories: state.categories.items,
  status:     state.categories.status,
});

const dispatcher = (dispatch) => ({
  loadCategories: (organizationId) => dispatch(loadCategories(organizationId)),
});

export default connect(select, dispatcher)(CategoriesList);
