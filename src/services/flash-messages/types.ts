export interface IFlashMessage {
  uid:        string;
  type:       string;
  text:       string;
  autoClose?: boolean;
}

export interface IFlashMessageOptions {
  type:       'success' | 'danger' | 'info';
  autoClose?: boolean;
}
