import { z } from "zod";

import { dateSchema, lineItemsSchema, nonEmptyString, nonNegativeNumberString } from "./utils";

const invoiceSchema = z.object({
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    invoiceSchema.parse(body);

    return Response.json({ ...body }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ message: "Please check the provided data and try again. " }, { status: 400 });
  }
}
