import React from 'react'
import * as statuses from 'constants/statuses'

import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

import LoadingView from 'components/utils/loading-view'

import { loadMembers, addFlashMessage } from 'actions'

class Members extends React.Component {
  componentDidMount() {
    const { orgId, loadMembers } = this.props
    loadMembers(orgId)
  }

  render() {
    const members = this.props.members.map((member) => (
      <tr key={ member.id }>
        <td>{ member.user.fullName }</td>
        <td>{ member.user.email }</td>
        <td>{ member.role }</td>
      </tr>
      )
    )

    return (
      <LoadingView status={ this.props.status }>
        { this.props.status == statuses.SUCCESS &&
          <Table striped responsive hover id="members">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              { members }
            </tbody>
          </Table>
        }
      </LoadingView>
    )
  }
}

Members.propTypes = {
  orgId:           React.PropTypes.number.isRequired,
  loadMembers:     React.PropTypes.func.isRequired,
  status:          React.PropTypes.string.isRequired,
  members:         React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
}

const select = (state) => ({
  orgId:   state.currentOrganization.current.id,
  members: state.members.items,
  status:  state.members.status,
})

const dispatcher = (dispatch) => ({
  loadMembers:     (organizationId) => dispatch(loadMembers(organizationId)),
  addFlashMessage: (message, type = null) => dispatch(addFlashMessage(message, type)),
})

export default connect(select, dispatcher)(Members)
