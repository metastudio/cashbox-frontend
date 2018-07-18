import { createSelector } from 'reselect';

const selectCurrentOrganization   = state => state.currentOrganization.data;
const selectCurrentOrganizationId = state => state.currentOrganization.id;

const selectHasCurrentOrganization = createSelector(selectCurrentOrganization, org => !!org);
const selectIsOrganizationLoaded   = state => state.currentOrganization.isLoaded;

const selectOrganizations       = state => state.organizations.items;
const selectOrganizationsStatus = state => state.organizations.status;

export {
  selectCurrentOrganization,
  selectCurrentOrganizationId,
  selectHasCurrentOrganization,
  selectIsOrganizationLoaded,
  selectOrganizations,
  selectOrganizationsStatus,
}
