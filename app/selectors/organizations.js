import { createSelector } from 'reselect'

export const getCurrentOragnization = state => state.currentOrganization.current

export const getCurrentOragnizationId = createSelector(getCurrentOragnization, organization => organization && organization.id)
