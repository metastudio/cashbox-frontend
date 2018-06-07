import * as React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import DestroyButton from './destroy.jsx';

class CustomersTableRow extends React.Component {

  render() {
    const { customer } = this.props;

    return(
      <tr key={ customer.id }>
        <td>{ customer.name }</td>
        <td>{ customer.invoiceDetails }</td>
        <td><Link to={ `/customers/${customer.id}/edit` }><i className="fa fa-edit" /></Link></td>
        <td><DestroyButton customer={ customer } /></td>
      </tr>
    );
  }
}

CustomersTableRow.propTypes = {
  customer: PropTypes.object.isRequired,
};

export default withRouter(CustomersTableRow);
