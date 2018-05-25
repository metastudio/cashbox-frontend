import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';

import { CategoryFragment, CategoryInput } from 'graphql-types';
import { prepareSubmissionError } from 'utils/errors';
import { UpdateCategoryMutation, UpdateCategoryMutationVariables } from 'graphql-types';

import { UpdateCategory as UpdateCategoryQuery } from 'queries/categories';

import Form from '../form.jsx';

class UpdateMutation extends Mutation<UpdateCategoryMutation, UpdateCategoryMutationVariables> {}

type UpdateFn = MutationFn<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

interface Props {
  category: CategoryFragment;
  afterUpdate: () => void;
}

class UpdateCategory extends React.Component<Props> {
  // TODO: `values` should have `CategoryFormData` type defined via form component
  handleSubmit = (update: UpdateFn, values: CategoryInput) => {
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
              onSubmit={ (values: CategoryInput) => this.handleSubmit(updateCategory, values) }
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
