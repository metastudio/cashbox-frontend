import fetch from 'isomorphic-fetch';
import humps from 'humps';
import Url   from 'url';

import { HttpError, ValidationError } from 'utils/errors';
import { stringifyQuery } from '../url-helpers';

import { fetchAuthToken } from 'services/auth/storage-utils';

const authorizeHeaders = (headers = {}) => {
  const token = fetchAuthToken();
  const basicAuth = token ? { 'Authorization': token } : null;

  return {
    'Accept': 'application/vnd.forge.v1',
    'Content-Type': 'application/json',
    ...basicAuth,
    ...headers,
  };
};

const formatJsonBody = (json) => JSON.stringify(humps.decamelizeKeys(json));

const fetchApi = (url, fullOptions = {}) => {
  const { camelizeSkipFilter, ...options } = fullOptions;

  return fetch(url, {
    headers: authorizeHeaders(),
    ...options,
  }).then(response => {
    if (response.status === 204) {
      // Empty body
      return {};
    } else if (response.ok || response.status === 422) {
      return response.json().then(j => {
        const json = humps.camelizeKeys(j, camelizeSkipFilter);
        if (response.ok) {
          return json;
        } else {
          throw new ValidationError(json);
        }
      });
    } else {
      throw new HttpError(response);
    }
  });
};

const getPDF = (url, query, fullOptions = {}) => {
  return fetch(url, {
    headers: authorizeHeaders({ 'Accept': 'text/pdf' }),
    method: 'GET',
    ...fullOptions,
  }).then(response => {
    if (response.ok) {
      return response.blob();
    } else {
      throw new HttpError(response);
    }
  });
};

const prepareURL = (pathname, query = {}) => Url.format({
  protocol: process.env.REACT_APP_BACKEND_PROTOCOL,
  hostname: process.env.REACT_APP_BACKEND_HOSTNAME,
  port:     process.env.REACT_APP_BACKEND_PORT,
  search:   stringifyQuery(humps.decamelizeKeys(query)),
  pathname: pathname,
});

const getApi = (url, options = {}) => {
  return fetchApi(url, { ...options, method: 'GET' });
};
const postApi = (url, data, options = {}) => {
  return fetchApi(url, { ...options, method: 'POST',  body: formatJsonBody(data) });
};
const putApi = (url, data, options = {}) => {
  return fetchApi(url, { ...options, method: 'PUT',   body: formatJsonBody(data) });
};
const patchApi = (url, data, options = {}) => {
  return fetchApi(url, { ...options, method: 'PATCH', body: formatJsonBody(data) });
};
const deleteApi = (url, options = {}) => {
  return fetchApi(url, { ...options, method: 'DELETE' });
};

export {
  prepareURL,
  getApi, postApi, putApi, patchApi, deleteApi,
  getPDF,
};
