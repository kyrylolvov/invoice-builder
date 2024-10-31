export interface LineItem {
  description: string;
  quantity: number | string;
  price: number | string;
}

export interface Invoice {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  fromAddress: string;
  toAddress: string;
  lineItems: LineItem[];
  vat: string;
  total: string;
  paymentDetails: string;
  additionalNotes: string;
}
