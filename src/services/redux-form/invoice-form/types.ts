interface IInvoiceItemFormData {
  _destroy?:    boolean;
  id?:          number;
  customerId?:  number;
  amount?:      string;
  date?:        Date;
  hours?:       number;
  description?: string;
}

interface IInvoiceFormData {
  currency:       string;
  bankAccountId?: number;
  number?:        number;
  customerId?:    number;
  startsAt?:      Date;
  endsAt?:        Date;
  amount?:        string;
  sentAt?:        Date;
  paidAt?:        Date;
  invoiceItems:   IInvoiceItemFormData[];
}

interface IInvoiceFormState {
  values: IInvoiceFormData;
}

export {
  IInvoiceItemFormData,
  IInvoiceFormData,
  IInvoiceFormState,
};
