import { z } from "zod";

export const nonEmptyString = (field: string) => z.string().min(1, `${field} is required`);

export const nonNegativeNumberString = (field: string) =>
  z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, `${field} a number greater than or equal to 0`);

export const dateSchema = (field: string) =>
  nonEmptyString(field).refine(
    (val) => !val || /^\d{2}\/\d{2}\/\d{4}$/.test(val),
    `${field} must be in the format DD/MM/YYYY`,
  );

export const lineItemsSchema = z
  .array(
    z.object({
      description: nonEmptyString("Description"),
      quantity: nonNegativeNumberString("Quantity"),
      price: nonNegativeNumberString("Price"),
    }),
  )
  .min(1, "At least one line item is required");

export const invoiceSchema = z.object({
  invoiceNumber: nonEmptyString("Invoice number"),
  issueDate: dateSchema("Issue Date"),
  dueDate: dateSchema("Due Date"),
  fromAddress: nonEmptyString("From address"),
  toAddress: nonEmptyString("To address"),
  lineItems: lineItemsSchema,
  vat: nonNegativeNumberString("VAT"),
  total: nonNegativeNumberString("Total"),
  paymentDetails: z.string().optional(),
  additionalNotes: z.string().optional(),
  theme: z.enum(["light", "dark"]),
});
