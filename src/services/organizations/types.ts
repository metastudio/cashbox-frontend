export interface Organization {
  id:              number;
  name:            string;
  defaultCurrency: string;
}

export interface OrganizationParams {
  name?:            string | null;
  defaultCurrency?: string | null;
}
