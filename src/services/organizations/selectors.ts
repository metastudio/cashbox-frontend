import { createSelector } from 'reselect';
import { IGlobalState } from 'services/global-state';

const selectCurrentOrganization   = (state: IGlobalState) => state.currentOrganization.data;
const selectCurrentOrganizationId = (state: IGlobalState) => state.currentOrganization.id;

const selectHasCurrentOrganization = createSelector(selectCurrentOrganization, org => !!org);
const selectIsOrganizationLoaded   = (state: IGlobalState) => state.currentOrganization.isLoaded;

const selectOrganizations       = (state: IGlobalState) => state.organizations.items;
const selectOrganizationsStatus = (state: IGlobalState) => state.organizations.status;

export {
  selectCurrentOrganization,
  selectCurrentOrganizationId,
  selectHasCurrentOrganization,
  selectIsOrganizationLoaded,
  selectOrganizations,
  selectOrganizationsStatus,
};
