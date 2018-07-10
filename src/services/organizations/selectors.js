import { createSelector } from 'reselect';

const selectCurrentOrganization   = state => state.currentOrganization.data;
const selectCurrentOrganizationId = state => state.currentOrganization.id;

const selectHasCurrentOrganization = createSelector(selectCurrentOrganization, org => !!org);

const selectOrganizations       = state => state.organizations.items;
const selectOrganizationsStatus = state => state.organizations.status;

export {
  selectCurrentOrganization,
  selectCurrentOrganizationId,
  selectHasCurrentOrganization,

  selectOrganizations,
  selectOrganizationsStatus,
}
