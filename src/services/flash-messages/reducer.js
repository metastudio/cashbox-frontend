import { handleActions } from 'redux-actions';

import { addFlashMessage, removeFlashMessage } from 'services/flash-messages';

const defaultState = {
  messages: [],
};

export default handleActions({
  [addFlashMessage]: (state, { payload }) => ({
    ...state,
    messages: [
      payload.message,
      ...state.messages,
    ],
  }),
  [removeFlashMessage]: (state, { payload }) => ({
    ...state,
    messages: state.messages.filter(m => m.uid !== payload.messageUID),
  }),
}, defaultState);
