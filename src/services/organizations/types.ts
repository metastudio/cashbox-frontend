import { ID, Status } from 'model-types';

interface IOrganization {
  id:              number;
  name:            string;
  defaultCurrency: string;
}

interface IOrganizationParams {
  name?:            string | null;
  defaultCurrency?: string | null;
}

interface ICurrentOrganizationState {
  id:       ID | null;
  data:     IOrganization | null;
  isLoaded: boolean;
}

interface IOrganizationsState {
  items:  IOrganization[];
  status: Status;
  error:  Error | null;
}

interface IOrganizationState {
  data:   IOrganization | null;
  status: Status;
  error:  Error | null;
}

export {
  IOrganization,
  IOrganizationParams,
  ICurrentOrganizationState,
  IOrganizationsState,
  IOrganizationState,
};
