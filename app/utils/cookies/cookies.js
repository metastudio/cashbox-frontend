/*global __CONFIG__*/

import Cookies from 'js-cookie'

let COOKIE_KEY = __CONFIG__.cookies.key

export function getCookies() {
  return Cookies.getJSON(COOKIE_KEY) || {}
}

export function setCookies(changes) {
  const newState = Object.assign({}, getCookies(), changes)

  Cookies.set(COOKIE_KEY, newState, __CONFIG__.cookies)
}

export function clearCookies() {
  Cookies.remove(COOKIE_KEY)
}

