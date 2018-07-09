import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, PageHeader } from 'react-bootstrap';
import { Query } from 'react-apollo';

import { selectCurrentOrganizationId } from 'services/organizations';
import { GetOrganizationCategoriesQuery, GetOrganizationCategoriesQueryVariables } from 'graphql-types';
import { GetOrganizationCategories } from 'services/categories/queries';

import Spinner from 'components/utils/spinner';
import Table from './list/table';

class OrganizationCategoriesQuery extends
  Query<GetOrganizationCategoriesQuery, GetOrganizationCategoriesQueryVariables> {}

interface StateProps {
  orgId: number;
}

type Props = StateProps;

class CategoriesList extends React.Component<Props> {
  render() {
    const { orgId } = this.props;

    return (
      <>
        <PageHeader>
          <Link to="/categories/new" className="btn btn-default pull-right">New Category</Link>
          Categories
        </PageHeader>
        <OrganizationCategoriesQuery
          query={ GetOrganizationCategories }
          variables={ { orgId: String(orgId) } }
          fetchPolicy="cache-and-network"
        >
          {
            ({ loading, error, data }) => {
              if (loading) { return <Spinner />; }
              if (error) { return <Alert bsStyle="danger">{ error }</Alert>; }
              if (!data || !data.categories) {
                return <Alert bsStyle="danger">No data</Alert>;
              }

              return <Table categories={ data.categories } />;
            }
          }
        </OrganizationCategoriesQuery>
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId: selectCurrentOrganizationId(state),
});

export default connect<StateProps>(mapState)(CategoriesList);
