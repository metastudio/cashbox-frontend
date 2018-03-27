import { property } from 'lodash';

import { prepareURL, postApi } from './_helpers';

const tokenURL = () => prepareURL('/api/auth_token');

export const postToken = (email, password) => postApi(tokenURL(), { auth: { email, password } }).then(property('jwt'));
