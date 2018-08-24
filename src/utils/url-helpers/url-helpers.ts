import { LocationDescriptorObject, Search } from 'history';
import * as QS from 'qs';

const parseQuery = (search?: Search): any => QS.parse(search || '', { ignoreQueryPrefix: true });
const stringifyQuery = (query: any): Search => QS.stringify(query, { encodeValuesOnly: true });

const locationWithoutKey = (
  location: LocationDescriptorObject,
  queryKey: string,
): LocationDescriptorObject => {
  const query = parseQuery(location.search);
  delete query[queryKey];

  return {
    ...location,
    search: stringifyQuery(query),
  };
};

const locationWithKeys = (
  location: LocationDescriptorObject,
  keys: { [key: string]: string | number | null },
): LocationDescriptorObject => {
  const query = {
    ...parseQuery(location.search),
    ...keys,
  };

  return {
    ...location,
    search: stringifyQuery(query),
  };
};

const keyFromLocation = <T>(
  location: LocationDescriptorObject,
  key: string,
  defaultValue?: T,
): T | undefined => {
  const query = parseQuery(location.search);

  if (!(key in query)) { return defaultValue; }

  return query[key];
};

export {
  parseQuery,
  stringifyQuery,

  locationWithoutKey,
  locationWithKeys,
  keyFromLocation,
};
