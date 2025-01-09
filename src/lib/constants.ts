export const addressPlaceholder = `Acme Inc.
List Island AB
Email: info@email.com
Phone: +1 (123) 456 7890
Address: 123 Main St, Anytown, USA`;

export const paymentPlaceholder = `SEB Bank
IBAN: 123 123 123 123`;

export const notesPlaceholder = `Thank you for your business`;

export const invoiceDefaultValues = (theme: string) => ({
  invoiceNumber: "",
  issueDate: "",
  dueDate: "",
  fromAddress: "",
  toAddress: "",
  lineItems: [{ description: "Development", quantity: "40", price: "20" }],
  vat: "0",
  total: "800",
  paymentDetails: "",
  additionalNotes: "",
  theme: theme,
});
