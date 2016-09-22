/*global __CONFIG__*/

import Url from 'url'
import { getCookies } from 'utils/cookies'
import humps from 'humps'
import { getJSON } from 'redux-api-middleware'

const ApiHelpers = {
  formatUrl: (pathname, query) => {
    return Url.format({
      ...__CONFIG__.endpoint,
      query: humps.decamelizeKeys(query),
      pathname: pathname,
    })
  },
  headers: () => {
    const token = getCookies().token
    const basicAuth = token ? {'Authorization': token} : null

    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...basicAuth,
    }
  },
  formatJsonBody: (json) => {
    return JSON.stringify(humps.decamelizeKeys(json))
  },
  failurePayload: (action, state, response) => {
    if (response.status == 422) {
      return getJSON(response).then((json) => humps.camelizeKeys(json))
    } else {
      return {_error: response.statusText}
    }
  },
}

export default ApiHelpers
