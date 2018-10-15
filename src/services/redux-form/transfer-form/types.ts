interface ITransferFormData {
  toAmount?:          string;
  fromAmount?:        string;
  fromBankAccountId?: number;
  toBankAccountId?:   number;
  exchangeRate?:      string;
  comission?:         string;
  comment?:           string;
  date?:              string;
}

interface ITransferFormState {
  values: ITransferFormData;
}

export { ITransferFormData, ITransferFormState };
