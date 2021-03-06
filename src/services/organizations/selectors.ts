import { IGlobalState } from 'services/global-state';

const selectCurrentOrganization   = (state: IGlobalState) => state.currentOrganization.data;
const selectCurrentOrganizationId = (state: IGlobalState) => state.currentOrganization.id;

const selectHasCurrentOrganization = (state: IGlobalState) => !!selectCurrentOrganization(state);
const selectIsOrganizationLoaded   = (state: IGlobalState) => state.currentOrganization.isLoaded;

const selectOrganizations       = (state: IGlobalState) => state.organizations.items;
const selectOrganizationsStatus = (state: IGlobalState) => state.organizations.status;

const selectOrganization       = (state: IGlobalState) => state.organization.data;
const selectOrganizationStatus = (state: IGlobalState) => state.organization.status;

export {
  selectCurrentOrganization,
  selectCurrentOrganizationId,
  selectHasCurrentOrganization,
  selectIsOrganizationLoaded,
  selectOrganizations,
  selectOrganizationsStatus,
  selectOrganization,
  selectOrganizationStatus,
};
