import { Money } from 'utils/money';

export interface InvoiceItem {
  id:           number;
  customerId:   number;
  amount:       Money;
  date?:        Date;
  hours?:       number;
  description?: string;
}

export interface Invoice {
  id:                    number;
  customerId:            number;
  customerName:          string;
  amount:                Money;
  currency:              string;
  bankAccountId?:        number;
  number:                number;
  endsAt:                Date;
  paidAt?:               Date;
  startsAt?:             Date;
  sentAt?:               Date;
  invoiceDetails?:       string;
  customerDetails?:      string;
  hasIncomeTransaction?: boolean;

  invoiceItems: InvoiceItem[];
}

export interface InvoiceItemParams {
  amount?:      string;
  customerId?:  number;
  date?:        Date;
  hours?:       number;
  description?: string;
}

export interface InvoiceParams {
  currency?:      string;
  amount?:        string;
  number?:        number;
  bankAccountId?: number;
  customerId?:    number;
  endsAt?:        Date;
  startsAt?:      Date;
  sentAt?:        Date;
  paidAt?:        Date;

  invoiceItemsAttributes: InvoiceItemParams[];
}
