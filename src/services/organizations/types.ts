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
  id:       ID;
  data:     IOrganization;
  isLoaded: boolean;
}

interface IOrganizationsState {
  items:  IOrganization[];
  status: Status;
  error:  Error | null;
}

export {
  IOrganization,
  IOrganizationParams,
  ICurrentOrganizationState,
  IOrganizationsState,
};
