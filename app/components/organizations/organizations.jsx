import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { Panel, Button, ListGroup, ListGroupItem } from 'react-bootstrap'

import { loadOrganizations, setCurrentOrganization, addFlashMessage } from 'actions'

class Organizations extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.index()
  }

  render() {
    let organizations = this.props.organizations.map((organization) => {
      return (
        <ListGroupItem key={ organization.id } onClick={() => this.props.setOrganization(organization.id) }>
          { organization.name } - { organization.defaultCurrency }
        </ListGroupItem>
      )
    })

    return (
      <Panel>
        <Button bsStyle="primary" onClick={this.props.newOrganization}>New Organization</Button>
        <ListGroup id="organizations">
          { organizations }
        </ListGroup>
      </Panel>
    )
  }
}

Organizations.propTypes = {
  newOrganization: React.PropTypes.func.isRequired,
  setOrganization: React.PropTypes.func.isRequired,
}

const select = (state) => ({
  organizations: state.organizations.organizations,
})

const dispatcher = (dispatch) => ({
  index:           () => dispatch(loadOrganizations()),
  newOrganization: () => dispatch(routeActions.push('/organizations/new')),
  setOrganization: (organizationId) => dispatch(setCurrentOrganization(organizationId)),
})

export default connect(select, dispatcher)(Organizations)
