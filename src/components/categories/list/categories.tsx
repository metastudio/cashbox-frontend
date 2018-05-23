import * as React from 'react';
import { connect } from 'react-redux';
import { Alert, Table } from 'react-bootstrap';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { getCurrentOrganizationId } from 'selectors/organizations.js';

import Spinner from 'components/utils/spinner';
import TableBody from './table-body';

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
  orgId:       number;
}

type Props = StateProps;

class CategoriesList extends React.Component<Props> {
  render() {
    const { orgId } = this.props;

    return (
      <Query query={ categoriesQuery } variables={ { orgId } }>
        {
          ({ loading, error, data }) => {
            if (loading) { return <Spinner />; }
            if (error) { return <Alert bsStyle="danger">{ error }</Alert>; }

            return (
              <Table striped responsive hover id="categories">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th colSpan={ 2 } />
                  </tr>
                </thead>
                <TableBody categories={ data.organization.categories } />
              </Table>
            );
          }
        }
      </Query>
    );
  }
}

const mapState = (state: {}) => ({
  orgId: getCurrentOrganizationId(state),
});

export default connect<StateProps>(mapState)(CategoriesList);
