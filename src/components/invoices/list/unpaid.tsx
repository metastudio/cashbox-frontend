import * as React from 'react';

import { Table } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { IPagination } from 'model-types';
import { IInvoice } from 'services/invoices';

import { ICurrentOrgIdProps, withCurrentOrgId } from 'components/organizations/current-organization';
import { SimplePaginator } from 'components/utils/paginator';
import Provider from '../providers/unpaid-invoices';
import TableBody from './table-body';
import TableHeader from './table-header';

type IProps = RouteComponentProps<{}> & ICurrentOrgIdProps;

class UnpaidInvoices extends React.PureComponent<IProps> {
  private renderInvoices = (invoices: IInvoice[], pagination: IPagination | null) => {
    return (
      <>
        <Table hover striped responsive>
          <TableHeader />
          <TableBody invoices={ invoices } />
        </Table>
        { pagination && <SimplePaginator data={ pagination } /> }
      </>
    );
  }

  public render() {
    const { orgId, location: { search } } = this.props;

    return(
      <Provider orgId={ orgId } search={ search }>
        { this.renderInvoices }
      </Provider>
    );
  }
}

export default withRouter(withCurrentOrgId(UnpaidInvoices));
