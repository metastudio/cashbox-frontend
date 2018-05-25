import * as React from 'react';
import { Alert } from 'react-bootstrap';
import { Query } from 'react-apollo';

import Spinner from 'components/utils/spinner';
import { Category } from 'model-types';
import { GetCategoryQuery, GetCategoryQueryVariables } from 'graphql-types';

import { GetCategory } from 'queries/categories';

class CategoryQuery extends Query<GetCategoryQuery, GetCategoryQueryVariables> {}

interface Props {
  orgId:      string;
  categoryId: string;
  children:   (category: Category) => React.ReactNode;
}

class LoadEditCategory extends React.Component<Props> {
  render() {
    const { orgId, categoryId, children } = this.props;

    return(
      <CategoryQuery query={ GetCategory } variables={ { orgId, categoryId } }>
        {
          ({ loading, error, data }) => {
            if (loading) { return <Spinner />; }
            if (error) { return <Alert bsStyle="danger">{ error }</Alert>; }
            if (!data || !data.organization || !data.organization.category) {
              return <Alert bsStyle="danger">No data</Alert>;
            }

            return children(data.organization.category);
          }
        }
      </CategoryQuery>
    );
  }
}

export default LoadEditCategory;
