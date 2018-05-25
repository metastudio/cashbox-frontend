import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';

import { Category, CategoryParams } from 'model-types';
import { prepareSubmissionError } from 'utils/errors';
import { UpdateCategoryMutation, UpdateCategoryMutationVariables } from 'graphql-types';

import { UpdateCategory as UpdateCategoryQuery } from 'queries/categories';

import Form from '../form.jsx';

class UpdateMutation extends Mutation<UpdateCategoryMutation, UpdateCategoryMutationVariables> {}

type UpdateFn = MutationFn<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

interface Props {
  category: Category;
  afterUpdate: () => void;
}

class UpdateCategory extends React.Component<Props> {
  // TODO: `values` should have `CategoryFormData` type defined via form component
  handleSubmit = (update: UpdateFn, values: CategoryParams) => {
    const { category } = this.props;
    return update({
      variables: {
        categoryId: category.id,
        category: {
          name: values.name,
          type: values.type,
        }
      }
    }).catch(prepareSubmissionError);
  }

  render() {
    const { category, afterUpdate } = this.props;

    return(
      <UpdateMutation mutation={ UpdateCategoryQuery }>
        {
          (updateCategory) => (
            <Form
              onSubmit={ (values: CategoryParams) => this.handleSubmit(updateCategory, values) }
              onSubmitSuccess={ afterUpdate }
              initialValues={ category }
              action="Update"
            />
          )
        }
      </UpdateMutation>
    );
  }
}

export default UpdateCategory;
