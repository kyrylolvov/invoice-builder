import { renderToStream } from "@react-pdf/renderer";
import { z } from "zod";

import { InvoiceTemplate } from "./template";
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
  const body = await request.json();

  const result = invoiceSchema.safeParse(body);

  if (!result.success) {
    return Response.json({ message: "Invalid body" }, { status: 400 });
  }

  const stream = await renderToStream(<InvoiceTemplate />);

  const blob = await new Response(stream).blob();

  const headers = {
    "Content-Type": "application/pdf",
    "Cache-Control": "no-store, max-age=0",
  };

  return new Response(blob, { headers });
}
