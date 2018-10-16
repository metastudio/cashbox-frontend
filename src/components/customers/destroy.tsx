import * as React from 'react';

import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID } from 'model-types';
import { deleteCustomer, ICustomer } from 'services/customers';
import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';

import { confirm } from 'components/utils/confirm';

interface IOwnProps {
  customer: ICustomer;
}

interface IStateProps {
  orgId: ID;
}

interface IDispatchProps {
  deleteCust:  typeof deleteCustomer.request;
  showMessage: typeof addFlashMessage;
}

type IProps = IOwnProps & IStateProps & IDispatchProps & RouteComponentProps<{}>;

class DestroyCustomer extends React.Component<IProps> {
  private handleDeleteCustomerClick = () => {
    const { orgId, customer, deleteCust } = this.props;

    confirm('Are you sure?').then(() => {
      new Promise((resolve, reject) => {
        deleteCust(orgId, customer.id, resolve, reject);
      }).then((c: ICustomer) => {
        const { showMessage, history } = this.props;
        showMessage(`Customer "${c.name}" has been deleted.`);
        history.push('/customers');
      }).catch((e) => {
        this.props.showMessage(`Unable to delete customer: ${e.message}`, { type: 'danger' });
      });
    });
  }

  public render() {
    return (
      <Link
        title="Delete"
        to={ '/customers' }
        onClick={ this.handleDeleteCustomerClick }
      >
        <i className="fa fa-trash-o" />
      </Link>
    );
  }
}

const select = (state: IGlobalState): IStateProps => ({
  orgId: selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
});

const dispatcher = (dispatch: Dispatch): IDispatchProps => ({
  deleteCust:  (orgId, customerId, res, rej) => dispatch(deleteCustomer.request(orgId, customerId, res, rej)),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect(select, dispatcher)(DestroyCustomer));
