import { IFlashMessagesState } from './types';

function selectFlashMessages(state: { flashMessages: IFlashMessagesState}) {
  return state.flashMessages.messages;
}

export { selectFlashMessages };
