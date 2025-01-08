import { renderToStream } from "@react-pdf/renderer";
import { z } from "zod";

import { PdfTemplate } from "~/lib/pdf";

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

    const result = invoiceSchema.safeParse(body);

    if (!result.success) {
      return Response.json({ message: "Invalid body" }, { status: 400 });
    }

    const stream = await renderToStream(
      <PdfTemplate
        invoice_number={body.invoiceNumber}
        issue_date={body.issueDate}
        due_date={body.dueDate}
        line_items={body.lineItems}
        customer_details={body.toAddress}
        from_details={body.fromAddress}
        payment_details={body.paymentDetails}
        note_details={body.additionalNotes}
        currency={"$"}
        tax={body.tax}
        amount={body.total}
        theme={body.theme}
      />,
    );

    const headers = {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store, max-age=0",
    };

    return new Response(stream as unknown as BodyInit, { headers });
  } catch (e) {
    console.log(e);
    return Response.json({ message: "Please check the provided data and try again. " }, { status: 400 });
  }
}
