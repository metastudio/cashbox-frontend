interface IFlashMessage {
  uid:        string;
  type:       string;
  text:       string;
  autoClose?: boolean;
}

interface IFlashMessageOptions {
  type:       'success' | 'danger' | 'info';
  autoClose?: boolean;
}

interface IFlashMessagesState {
  messages: IFlashMessage[];
}

export {
  IFlashMessage,
  IFlashMessageOptions,

  IFlashMessagesState,
};
