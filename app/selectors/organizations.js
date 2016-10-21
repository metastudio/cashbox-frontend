import { createSelector } from 'reselect'

export const getCurrentOrganization   = state => state.currentOrganization.data
export const getCurrentOrganizationId = state => state.currentOrganization.id

export const getHasCurrentOrganization = createSelector(getCurrentOrganization, org => !!org)

export const getOrganizationsItems = state => state.organizations.items
