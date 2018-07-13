export interface FlashMessage {
  uid:        string;
  type:       string;
  text:       string;
  autoClose?: boolean;
}

export interface FlashMessageOptions {
  type:       'success' | 'danger' | 'info';
  autoClose?: boolean;
}
