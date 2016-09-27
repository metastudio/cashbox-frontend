import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { routeActions } from 'react-router-redux'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

import { loadOrganizations, setCurrentOrganization, addFlashMessage } from 'actions'

class SelectOrganization extends React.Component {
  constructor(props) {
    super(props)
    this.afterSelect = this.afterSelect.bind(this)
  }

  componentDidMount() {
    this.props.index()
  }

  afterSelect(organization) {
    this.props.addFlashMessage('Organization ' + organization.name + ' selected.')
    this.props.setOrganization(organization.id).then(({error, payload}) => error ? reject(payload) : this.props.redirectToRootPage())
  }

  render() {
    const organizations = this.props.organizations.map((organization) => (
      <ListGroupItem key={ organization.id } onClick={ () => this.afterSelect(organization) }>
        { organization.name } - { organization.defaultCurrency }
      </ListGroupItem>
      )
    )

    return (
      <Panel>
        <Link to="/organizations/new" className="btn btn-primary">New Organization</Link>
        <ListGroup id="organizations">
          { organizations }
        </ListGroup>
      </Panel>
    )
  }
}

SelectOrganization.propTypes = {
  setOrganization:    React.PropTypes.func.isRequired,
  redirectToRootPage: React.PropTypes.func.isRequired,
  addFlashMessage:    React.PropTypes.func.isRequired,
}

const select = (state) => ({
  organizations: state.currentUser.organizations,
})

const dispatcher = (dispatch) => ({
  index:              () => dispatch(loadOrganizations()),
  redirectToRootPage: () => dispatch(routeActions.push('/')),
  setOrganization:    (organizationId) => dispatch(setCurrentOrganization(organizationId)),
  addFlashMessage:    (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(SelectOrganization)
