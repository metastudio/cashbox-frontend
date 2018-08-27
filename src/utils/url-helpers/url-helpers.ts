import { LocationDescriptorObject, Search } from 'history';
import * as QS from 'qs';

type QueryValue =  string | number | null | undefined | IQuery;
interface IQuery {
  [key: string]: QueryValue;
}

const parseQuery = (search?: Search): IQuery => QS.parse(search || '', { ignoreQueryPrefix: true });
const stringifyQuery = (query: IQuery): Search => QS.stringify(query, { encodeValuesOnly: true });

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
  keys: IQuery,
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

const locationWithQuery = (
  location: LocationDescriptorObject,
  query: IQuery,
): LocationDescriptorObject => {
  return {
    ...location,
    search: stringifyQuery(query),
  };
};

const keyFromLocation = <T>(
  location: LocationDescriptorObject,
  key: string,
  defaultValue?: QueryValue,
): QueryValue => {
  const query = parseQuery(location.search);

  if (!(key in query)) { return defaultValue; }

  return query[key];
};

export {
  IQuery,

  parseQuery,
  stringifyQuery,

  locationWithoutKey,
  locationWithKeys,
  locationWithQuery,
  keyFromLocation,
};
