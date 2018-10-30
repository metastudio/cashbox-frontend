import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { IConfirmationProps } from './confirmation';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type IConfirmationOptions = Omit<IConfirmationProps, 'confirmation' | 'reject' | 'resolve' | 'dispose'>;

const createConfirmation = (Component: React.ComponentType<IConfirmationProps>) => {
  return (confirmation: string, opts: IConfirmationOptions) => {
    const wrapper = document.body.appendChild(document.createElement('div'));

    function dispose() {
      setTimeout(
        () => {
          ReactDOM.unmountComponentAtNode(wrapper);
          setTimeout(() => wrapper.remove());
        },
        1000,
      );
    }

    const promise = new Promise((resolve, reject) => {
      ReactDOM.render(
        <Component
          confirmation={ confirmation }
          reject={ reject }
          resolve={ resolve }
          dispose={ dispose }
          { ...opts }
        />,
        wrapper,
      );
    });

    return promise.then((result) => {
      dispose();
      return result;
    }).catch((result) => {
      dispose();
      return Promise.reject(result);
    });
  };
};

export { createConfirmation as default, IConfirmationOptions };
