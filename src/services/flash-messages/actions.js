import { createAction } from 'redux-actions';
import uuid from 'uuid';

const defaultOptions = {
  type: 'success',
  autoClose: true,
};

export const addFlashMessage = createAction(
  'FLASH_MESSAGE_ADD',
  (text, options = {}) => ({ message: {...defaultOptions, uid: uuid.v4(), text: text, ...options } }),
);
export const removeFlashMessage = createAction(
  'FLASH_MESSAGE_REMOVE',
  (messageUID) => ({ messageUID })
);
