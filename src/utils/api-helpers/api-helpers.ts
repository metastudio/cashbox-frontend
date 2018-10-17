// import fetch from 'isomorphic-fetch';
import * as humps from 'humps';
import * as Url from 'url';

import { HttpError, ValidationError } from 'utils/errors';
import { IQuery, stringifyQuery } from '../url-helpers';

import { fetchAuthToken } from 'services/auth/storage-utils';

interface IFetchOpts extends RequestInit {
  camelizeSkipFilter?: humps.OptionOrProcessor;
}

function authorizeHeaders(headers = {}) {
  const token = fetchAuthToken();
  const basicAuth = token ? { Authorization: token } : null;

  return {
    Accept: 'application/vnd.forge.v1',
    'Content-Type': 'application/json',
    ...basicAuth,
    ...headers,
  };
}

function formatJsonBody(json: {}) {
  return JSON.stringify(humps.decamelizeKeys(json));
}

function fetchApi(url: string, fullOptions: IFetchOpts = {}) {
  const { camelizeSkipFilter, ...options } = fullOptions;

  return fetch(url, {
    headers: authorizeHeaders(),
    ...options,
  }).then((response) => {
    if (response.status === 204) {
      // Empty body
      return {};
    }

    if (!response.ok && response.status !== 422) {
      throw new HttpError(response);
    }

    return response.json().then((j) => {
      const json = humps.camelizeKeys(j, camelizeSkipFilter);
      if (!response.ok) { throw new ValidationError(json); }

      return json;
    });
  });
}

function getPDF(url: string, fullOptions: IFetchOpts = {}) {
  const { camelizeSkipFilter, ...options } = fullOptions;

  return fetch(url, {
    headers: authorizeHeaders({ Accept: 'text/pdf' }),
    method: 'GET',
    ...options,
  }).then((response) => {
    if (!response.ok) {
      throw new HttpError(response);
    }

    return response.blob();
  });
}

function prepareURL(pathname: string, query = {}) {
  return Url.format({
    pathname,
    protocol: process.env.REACT_APP_BACKEND_PROTOCOL,
    hostname: process.env.REACT_APP_BACKEND_HOSTNAME,
    port:     process.env.REACT_APP_BACKEND_PORT,
    search:   stringifyQuery(humps.decamelizeKeys(query) as IQuery),
  });
}

function getApi(url: string, options: IFetchOpts = {}) {
  return fetchApi(url, { ...options, method: 'GET' });
}
function postApi(url: string, data: {} = {}, options: IFetchOpts = {}) {
  return fetchApi(url, { ...options, method: 'POST',  body: formatJsonBody(data) });
}
function putApi(url: string, data: {} = {}, options: IFetchOpts = {}) {
  return fetchApi(url, { ...options, method: 'PUT',   body: formatJsonBody(data) });
}
function patchApi(url: string, data: {} = {}, options: IFetchOpts = {}) {
  return fetchApi(url, { ...options, method: 'PATCH', body: formatJsonBody(data) });
}
function deleteApi(url: string, options: IFetchOpts = {}) {
  return fetchApi(url, { ...options, method: 'DELETE' });
}

export {
  prepareURL,
  getApi, postApi, putApi, patchApi, deleteApi,
  getPDF,
};
