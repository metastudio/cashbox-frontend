import * as React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import { CategoryType, ICategory, selectCategories } from 'services/categories';
import { IGlobalState } from 'services/global-state';

import Row from './table-row';

interface IOwnProps {
  type: CategoryType;
}

interface IStateProps {
  categories: ICategory[];
}

type IProps = IOwnProps & IStateProps;

const CategoriesTable: React.SFC<IProps> = ({ categories }) => (
  <Table striped responsive hover id="categories">
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th colSpan={ 2 } />
      </tr>
    </thead>
    <tbody>
      { categories.map(c => c ? <Row category={ c } key={ c.id } /> : null) }
    </tbody>
  </Table>
);

const mapState = (state: IGlobalState, props: IOwnProps) => ({
  categories: selectCategories(state, props.type),
});

export default connect<IStateProps, {}, IOwnProps>(mapState)(CategoriesTable);
