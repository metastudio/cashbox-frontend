import * as Cookies from 'js-cookie';

const COOKIE_KEY = process.env.REACT_APP_COOKIES_KEY!;

export function getCookies() {
  return Cookies.getJSON(COOKIE_KEY) || {};
}

export function setCookies(changes: {}) {
  const newState = {
    ...getCookies(),
    ...changes,
  };

  Cookies.set(COOKIE_KEY, newState, { secure: false });
}

export function clearCookies() {
  Cookies.remove(COOKIE_KEY);
}
