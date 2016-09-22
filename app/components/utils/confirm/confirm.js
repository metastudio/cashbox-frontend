import createConfirmation from './createConfirmation.jsx'
import Confirmation from './confirmation.jsx'

const defaultConfirmation = createConfirmation(Confirmation)

export default function confirm(confirmation, options = {}) {
  return defaultConfirmation({ confirmation, ...options })
}
