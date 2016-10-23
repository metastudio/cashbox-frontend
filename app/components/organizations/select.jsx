import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { routeActions } from 'react-router-redux'
import { Panel, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'

import { loadOrganizations, setCurrentOrganization, addFlashMessage } from 'actions'
import { getOrganizationsItems } from 'selectors'

class SelectOrganization extends React.Component {
  constructor(props) {
    super(props)
    this.handleOrganizationClick = this.handleOrganizationClick.bind(this)
  }

  componentDidMount() {
    this.props.loadOrganizations()
  }

  handleOrganizationClick(organization) {
    this.props.setOrganization(organization).then(organization => {
      this.props.addFlashMessage('Organization ' + organization.name + ' selected.')
      this.props.redirectToRootPage()
    }).catch(error => {
      this.props.addFlashMessage(`Unable to select organization: ${error.message}`, { type: 'danger' })
    })
  }

  render() {
    const organizations = this.props.organizations.map((organization) => (
      <ListGroupItem key={ organization.id } onClick={ () => this.handleOrganizationClick(organization) }>
        { organization.name } - { organization.defaultCurrency }
      </ListGroupItem>
      )
    )

    return (
      <Row>
        <Col xs={12} smOffset={2} sm={8} mdOffset={3} md={6} >
          <Panel>
            <p className="text-center">
              Select an organization or <Link to="/organizations/new">create a new one</Link>.
            </p>
            <ListGroup id="organizations">
              { organizations }
            </ListGroup>
          </Panel>
        </Col>
      </Row>
    )
  }
}

SelectOrganization.propTypes = {
  setOrganization:    React.PropTypes.func.isRequired,
  redirectToRootPage: React.PropTypes.func.isRequired,
  addFlashMessage:    React.PropTypes.func.isRequired,
  loadOrganizations:  React.PropTypes.func.isRequired,
  organizations:      React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
}

const select = (state) => ({
  organizations: getOrganizationsItems(state),
})

const dispatcher = (dispatch) => ({
  loadOrganizations:  () => dispatch(loadOrganizations()),
  redirectToRootPage: () => dispatch(routeActions.push('/')),
  setOrganization:    (orgId) => new Promise((res, rej) => dispatch(setCurrentOrganization(orgId, res, rej))),
  addFlashMessage:    (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(SelectOrganization)
