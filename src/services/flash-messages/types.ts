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

type AddFlashMessageAction = (msg: string, opts?: IFlashMessageOptions | null) => void;

export { IFlashMessage, IFlashMessageOptions, AddFlashMessageAction };
