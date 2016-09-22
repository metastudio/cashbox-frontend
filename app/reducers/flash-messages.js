import * as types from 'constants/flash-message-action-types'

const initialState = {
  messages: []
}


export default (state = initialState, action) => {
  switch(action.type) {
    case types.FLASH_MESSAGE_ADD:
      return {
        ...state,
        messages: [
          action.payload.message,
          ...state.messages,
        ]
      }
    case types.FLASH_MESSAGE_REMOVE:
      return {
        ...state,
        messages: state.messages.filter((m) => m.uid != action.payload.message_uid)
      }
    default:
      return state
  }
}
