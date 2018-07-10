import fetch from 'isomorphic-fetch';
import humps from 'humps';
import Url   from 'url';
import { getCookies } from 'utils/cookies';
import { HttpError, ValidationError } from 'utils/errors';

const headers = (headers = {}) => {
  const token = getCookies().token;
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
    headers: headers(),
    ...options
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

export const getPDF = (url, query, fullOptions = {}) => {
  return fetch(url, {
    headers: headers({ 'Accept': 'text/pdf' }),
    method: 'GET',
    ...fullOptions
  }).then(response => {
    if (response.ok) {
      return response.blob();
    } else {
      throw new HttpError(response);
    }
  });
};

export const prepareURL = (pathname, query = {}) => Url.format({
  protocol: process.env.REACT_APP_BACKEND_PROTOCOL,
  hostname: process.env.REACT_APP_BACKEND_HOSTNAME,
  port:     process.env.REACT_APP_BACKEND_PORT,
  query:    humps.decamelizeKeys(query),
  pathname: pathname,
});

export const getApi    = (url, options = {})       => fetchApi(url, { ...options, method: 'GET' });
export const postApi   = (url, data, options = {}) => fetchApi(url, { ...options, method: 'POST',  body: formatJsonBody(data) });
export const putApi    = (url, data, options = {}) => fetchApi(url, { ...options, method: 'PUT',   body: formatJsonBody(data) });
export const patchApi  = (url, data, options = {}) => fetchApi(url, { ...options, method: 'PATCH', body: formatJsonBody(data) });
export const deleteApi = (url, options = {})       => fetchApi(url, { ...options, method: 'DELETE' });
