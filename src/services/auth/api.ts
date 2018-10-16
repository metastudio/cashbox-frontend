import { property } from 'lodash';

import { postApi, prepareURL } from 'utils/api-helpers';

const tokenURL = () => prepareURL('/api/auth_token');

export function postToken(email: string, password: string) {
  return postApi(tokenURL(), { auth: { email, password } }).then(property('jwt'));
}
