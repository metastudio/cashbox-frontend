import { TOKEN_STORAGE_KEY } from 'constants/storage-keys';

const fetchAuthToken = (): string | null => localStorage.getItem(TOKEN_STORAGE_KEY);
const storeAuthToken = (token: string): void => localStorage.setItem(TOKEN_STORAGE_KEY, token);
const clearAuthToken = (): void => localStorage.removeItem(TOKEN_STORAGE_KEY);

export { fetchAuthToken, storeAuthToken, clearAuthToken };
