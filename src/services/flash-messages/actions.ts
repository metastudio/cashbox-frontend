import { createAction } from 'typesafe-actions';
import * as uuid from 'uuid';

import { IFlashMessageOptions } from './types';

const defaultOptions = {
  type: 'success',
  autoClose: true,
};

const addFlashMessage = createAction(
  'FLASH_MESSAGE_ADD',
  (resolve) => {
    return (text: string, options?: IFlashMessageOptions) => resolve(
      {
        message: {
          ...defaultOptions,
          ...options,
          text,
          uid: uuid.v4(),
        },
      },
    );
  },
);
const removeFlashMessage = createAction(
  'FLASH_MESSAGE_REMOVE',
  (resolve) => {
    return (uid: string) => resolve({ uid });
  },
);

export {
  addFlashMessage,
  removeFlashMessage,
};
