import * as React from 'react';

import { ID } from 'model-types';
import { IOrganization } from 'services/organizations';

interface IOrganizationContext {
  orgId?:        ID;
  organization?: IOrganization;
}

const CurrentOrganizationContext = React.createContext<IOrganizationContext>({});

export default CurrentOrganizationContext;
