import { ActionType, getType } from 'typesafe-actions';

import { addFlashMessage, removeFlashMessage } from '../actions';
import { IFlashMessagesState } from '../types';

const defaultState: IFlashMessagesState = {
  messages: [],
};

function flashMessagesReducer(
  state: IFlashMessagesState = defaultState,
  action: ActionType<
    | typeof addFlashMessage
    | typeof removeFlashMessage
  >,
): IFlashMessagesState {
  switch (action.type) {
    case getType(addFlashMessage):
      return {
        ...state,
        messages: [
          action.payload.message,
          ...state.messages,
        ],
      };
    case getType(removeFlashMessage):
      return {
        ...state,
        messages: state.messages.filter(m => m.uid !== action.payload.uid),
      };
    default:
      return state;
  }
}

export default flashMessagesReducer;
