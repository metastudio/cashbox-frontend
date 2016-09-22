import uuid from 'uuid'

import * as types from 'constants/flash-message-action-types'

const defaultOptions = {
  type: 'success',
  autoClose: true,
}


export function addFlashMessage(text, options = {}) {
  return {
    type: types.FLASH_MESSAGE_ADD,
    payload: {
      message: {
        ...defaultOptions,
        uid:  uuid.v4(),
        text: text,
        ...options,
      }
    }
  }
}

export function removeFlashMessage(message_uid) {
  return {
    type: types.FLASH_MESSAGE_REMOVE,
    payload: {
      message_uid: message_uid,
    }
  }
}
