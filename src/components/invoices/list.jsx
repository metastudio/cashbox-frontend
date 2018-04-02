import React from 'react'
import { connect } from 'react-redux'
import { Button, Table } from 'react-bootstrap'
import queryString from 'query-string'
import { LinkContainer } from 'react-router-bootstrap'

import { getCurrentOrganizationId } from 'selectors'
import { loadInvoices } from 'actions'
import { 
  InvoiceRow,
  Navigation,
  TableHeader
} from './list_components'
import { paginationSelector, unpaidCountSelector } from 'selectors/invoices'

class Invoices extends React.Component {
  componentDidMount() {
    const { orgId, loadInvoices, location } = this.props
    const queryParams = queryString.parse(location.search)
    loadInvoices(orgId, queryParams)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search != nextProps.location.search) {
      const { orgId, loadInvoices, location } = this.props
      const queryParams = queryString.parse(location.search)
      loadInvoices(orgId, queryParams)
    }
  }

  render() {
    if (this.props.invoices) {
      const queryParams = queryString.parse(this.props.location.search)
      console.log(queryParams)
  
      const invoices = this.props.invoices.map((invoice) => (
        <InvoiceRow invoice={ invoice } key={ invoice.id } />
      ))
  
      return(
        <div>
          <div className='page-header'>
            <div className='pull-right'>
              <LinkContainer to="/invoices/new">
                <Button bsStyle="success">New Invoice</Button>
              </LinkContainer>
            </div>
            <h1>Listing invoices</h1>
          </div>
          <Navigation unpaidCount={ this.props.unpaidCount } activeKey={ queryParams['q[unpaid]'] ? 2 : 1 } />
          <Table hover striped responsive>
            <thead>
              <TableHeader unpaid={ Boolean(queryParams['q[unpaid]']) } s={ queryParams['q[s]'] } />
            </thead>
            <tbody>
              { invoices }
            </tbody>
          </Table>
        </div>
      )
    } else {
      return(<div>Loading...</div>)
    }
  }
}

Invoices.propTypes = {
  orgId:        React.PropTypes.number,
  invoices:     React.PropTypes.array,
  loadInvoices: React.PropTypes.func,
  location:     React.PropTypes.object,
  unpaidCount:  React.PropTypes.number,
  pagination:   React.PropTypes.object
}

const select = (state) => ({
  orgId:    getCurrentOrganizationId(state),
  invoices: state.invoices.items,
  pagination: paginationSelector(state),
  unpaidCount: unpaidCountSelector(state)
})

const dispatcher = (dispatch) => ({
  loadInvoices:    (organizationId, params) => dispatch(loadInvoices(organizationId, params)),
  // addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(Invoices)
