import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { ICategory } from 'services/categories';
import { locationWithQuery } from 'utils/url-helpers';

interface IOwnProps {
  category: ICategory;
}

type IProps = RouteComponentProps<{}> & IOwnProps;

const CategoryFilterLink: React.SFC<IProps> = ({ category, location }) => {
  return (
    <Link
      to={ locationWithQuery(location, { q: { categoryIdEq: category.id } }) }
      className="filter-link"
    >
      { category.name }
    </Link>
  );
};

export default withRouter<IProps>(CategoryFilterLink);
