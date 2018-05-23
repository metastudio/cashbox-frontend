import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, PageHeader } from 'react-bootstrap';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { getCurrentOrganizationId } from 'selectors/organizations.js';

import Spinner from 'components/utils/spinner';
import Table from './list/table';

const categoriesQuery = gql`
  query categories($orgId: ID!) {
    organization(id: $orgId) {
      categories {
        id
        name
        type
      }
    }
  }
`;

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
        <Query query={ categoriesQuery } variables={ { orgId } }>
          {
            ({ loading, error, data }) => {
              if (loading) { return <Spinner />; }
              if (error) { return <Alert bsStyle="danger">{ error }</Alert>; }

              return <Table categories={ data.organization.categories } />;
            }
          }
        </Query>
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId: getCurrentOrganizationId(state),
});

export default connect<StateProps>(mapState)(CategoriesList);
