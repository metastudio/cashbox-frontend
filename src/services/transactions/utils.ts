import { ITransaction } from './types';

const isTransfer = (transaction: ITransaction) => transaction.category.name === 'Transfer';

export { isTransfer };
