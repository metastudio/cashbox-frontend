import { createSelector } from 'reselect';

export const getCurrentOrganization   = state => state.currentOrganization.data;
export const getCurrentOrganizationId = state => state.currentOrganization.id;

export const getHasCurrentOrganization = createSelector(getCurrentOrganization, org => !!org);

export const selectOrganizations       = state => state.organizations.items;
export const selectOrganizationsStatus = state => state.organizations.status;
