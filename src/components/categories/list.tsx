import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, PageHeader } from 'react-bootstrap';
import { Query } from 'react-apollo';

import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { GetOrganizationCategoriesQuery, GetOrganizationCategoriesQueryVariables } from 'graphql-types';
import { GetOrganizationCategories } from 'queries/categories';

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
              if (!data || !data.organization || !data.organization.categories) {
                return <Alert bsStyle="danger">No data</Alert>;
              }

              return <Table categories={ data.organization.categories } />;
            }
          }
        </OrganizationCategoriesQuery>
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId: getCurrentOrganizationId(state),
});

export default connect<StateProps>(mapState)(CategoriesList);
