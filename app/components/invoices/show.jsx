import React from 'react'
import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'react-bootstrap'
import { routeActions } from 'react-router-redux'
import { LinkContainer } from 'react-router-bootstrap'

import { getCurrentOrganizationId } from 'selectors'
import { selectUserFullName } from 'selectors/users'
import { invoiceSelector } from 'selectors/invoices'
import {
  loadInvoice,
  destroyInvoice,
  addFlashMessage,
  downloadInvoicePDF,
} from 'actions'

import {
  Header,
  InvoiceTable,
} from './show_components'

class Invoice extends React.Component {
  constructor(props) {
    super(props)
    this.destroyInvoice = this.destroyInvoice.bind(this)
    this.downloadPDF = this.downloadPDF.bind(this)
  }

  componentDidMount() {
    const { orgId, loadInvoice, invoice } = this.props
    if(!invoice) {
      loadInvoice(orgId, this.props.params.id)
    }
  }

  destroyInvoice() {
    const { invoice, destroyInvoice, orgId } = this.props
    return destroyInvoice(orgId, invoice.id)
  }

  downloadPDF() {
    const { orgId, invoice, downloadPDF } = this.props
    return downloadPDF(orgId, invoice.id)
  }

  render() {

    if( this.props.invoice ) {
      const CompleteInvoiceButton = () => {
        if(!this.props.invoice.paidAt) {
          return(<Button bsStyle="primary">Complete Invoice</Button>)
        }
      }

      return <div>
        <div className='page-header'>
          <ButtonGroup className='pull-right'>
            <Button bsStyle="danger" onClick={ this.destroyInvoice }>Destroy</Button>
            <LinkContainer to={ this.props.invoice ? `/invoices/${ this.props.invoice.id }/edit` : '' }>
              <Button>Edit</Button>
            </LinkContainer>
            <CompleteInvoiceButton />
            <Button onClick={ this.downloadPDF }>Download as PDF</Button>
          </ButtonGroup>
          <Header invoice={ this.props.invoice } />
        </div>
        
        <InvoiceTable invoice={ this.props.invoice } userFullName={ this.props.userFullName } />
      </div>
    } else {
      return <div>Loading...</div>
    }
  }
}

Invoice.propTypes = {
  orgId:          React.PropTypes.number.isRequired,
  invoice:        React.PropTypes.object,
  loadInvoice:    React.PropTypes.func.isRequired,
  destroyInvoice: React.PropTypes.func.isRequired,
  userFullName:   React.PropTypes.string.isRequired,
  params:         React.PropTypes.object,
  downloadPDF:  React.PropTypes.func.isRequired
}

const select = (state, props) => ({
  orgId:        getCurrentOrganizationId(state),
  userFullName: selectUserFullName(state),
  invoice:      invoiceSelector(state, props.params.id)
})

const dispatcher = (dispatch) => ({
  loadInvoice: (organizationId, invoiceId) => dispatch(loadInvoice(organizationId, invoiceId)),
  destroyInvoice: (organizationId, invoiceId) => new Promise((res, rej) => {
    dispatch(destroyInvoice(organizationId, invoiceId, res, rej))
  }).then(() => {
    dispatch(addFlashMessage('Invoice successfully destroyed', null))
    dispatch(routeActions.push('/invoices'))
  }),
  downloadPDF: (organizationId, invoiceId) => dispatch(downloadInvoicePDF(organizationId, invoiceId))
})

export default connect(select, dispatcher)(Invoice)
