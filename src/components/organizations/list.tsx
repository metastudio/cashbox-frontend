import * as React from 'react';

import { PageHeader } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { IOrganization } from 'services/organizations';

import Table from './list/table';
import Provider from './providers/organizations';

class OrganizationsList extends React.Component<{}> {
  private renderOrganizations(organizations: IOrganization[]) {
    return <Table organizations={ organizations } />;
  }

  public render() {
    return (
      <>
        <PageHeader>
          <Link to="/organizations/new" className="btn btn-default pull-right">
            Add Organization...
          </Link>
          Organizations
        </PageHeader>
        <Provider>
          { this.renderOrganizations }
        </Provider>
      </>
    );
  }
}

export default OrganizationsList;
