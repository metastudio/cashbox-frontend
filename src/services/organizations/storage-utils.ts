import { ORGANIZATION_STORAGE_KEY } from 'constants/storage-keys';

const fetchCurrentOrganizationId = (): string | null => localStorage.getItem(ORGANIZATION_STORAGE_KEY);
const storeCurrentOrganizationId = (orgId: string): void => localStorage.setItem(ORGANIZATION_STORAGE_KEY, orgId);

export { fetchCurrentOrganizationId, storeCurrentOrganizationId };
