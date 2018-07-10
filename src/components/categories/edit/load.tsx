import * as React from 'react';
import { Alert } from 'react-bootstrap';
import { Query } from 'react-apollo';

import Spinner from 'components/utils/spinner';
import { CategoryFragment } from 'graphql-types';
import { GetCategoryQuery, GetCategoryQueryVariables } from 'graphql-types';
import { GetCategory } from 'services/categories/queries';

class CategoryQuery extends Query<GetCategoryQuery, GetCategoryQueryVariables> {}

interface Props {
  categoryId: string;
  children:   (category: CategoryFragment) => React.ReactNode;
}

class LoadEditCategory extends React.Component<Props> {
  render() {
    const { categoryId, children } = this.props;

    return(
      <CategoryQuery query={ GetCategory } variables={ { categoryId } }>
        {
          ({ loading, error, data }) => {
            if (loading) { return <Spinner />; }
            if (error) { return <Alert bsStyle="danger">{ error }</Alert>; }
            if (!data || !data.category) {
              return <Alert bsStyle="danger">No data</Alert>;
            }

            return children(data.category);
          }
        }
      </CategoryQuery>
    );
  }
}

export default LoadEditCategory;
