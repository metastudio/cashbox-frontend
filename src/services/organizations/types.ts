interface IOrganization {
  id:              number;
  name:            string;
  defaultCurrency: string;
}

interface IOrganizationParams {
  name?:            string | null;
  defaultCurrency?: string | null;
}

export { IOrganization, IOrganizationParams };
