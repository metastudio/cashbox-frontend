import { prepareURL, getApi } from './_helpers'

const currenciesURL = () => prepareURL('/api/currencies')

export const getCurrencies = () => getApi(currenciesURL())
