import Confirmation from './confirmation';
import createConfirmation, { IConfirmationOptions } from './createConfirmation';

const defaultConfirmation = createConfirmation(Confirmation);

function confirm(confirmation: string, options: IConfirmationOptions = {}) {
  return defaultConfirmation(confirmation, options);
}

export default confirm;
