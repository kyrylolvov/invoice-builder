"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { invoiceSchema } from "~/app/api/pdf/utils";
import { Form as ReactForm, FormControl, FormField, FormItem } from "~/components/ui/form";
import { addressPlaceholder, invoiceDefaultValues, notesPlaceholder, paymentPlaceholder } from "~/lib/constants";
import { generateInvoice } from "~/lib/utils";
import { Invoice } from "~/types/invoice";

import { DownloadButton } from "./download-button";
import { InvoiceSubtotal } from "./invoice-subtotal";
import { LineItem } from "./line-item";
import { ThemeSwitch } from "./theme-switch";
import { Input, PatternInput } from "./ui/inputs";
import { TextArea } from "./ui/text-area";

export function InvoiceForm() {
  const { theme, systemTheme } = useTheme();

  const formRef = useRef<HTMLFormElement | null>(null);

  const form = useForm<Omit<Invoice, "theme">>({
    resolver: zodResolver(invoiceSchema.omit({ theme: true })),
    defaultValues: invoiceDefaultValues(),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lineItems",
  });

  const onSubmit = (values: Omit<Invoice, "theme">) => {
    const invoiceTheme = theme === "system" ? systemTheme : theme;
    const body: Invoice = { ...values, theme: invoiceTheme! };

    toast.promise(generateInvoice(body), {
      loading: "Generating invoice...",
      success: "Invoice downloaded successfully!",
      error: "Failed to generate invoice. Please try again.",
    });
  };

  return (
    <div className="relative flex gap-4">
      <div className="fixed top-8 flex -translate-x-14 flex-col gap-4">
        <DownloadButton onClick={() => formRef.current?.requestSubmit()} />
        <ThemeSwitch />
      </div>

      <ReactForm {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} ref={formRef} className="noValidate">
          <div className="flex aspect-[1/1.4] w-full flex-col justify-between rounded-md border bg-secondary/40 px-8 py-10 font-mono text-xs">
            <div className="flex flex-col gap-20">
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <span>Invoice no:</span>
                  <FormField
                    control={form.control}
                    name="invoiceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="0001" className="max-w-[10ch]" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-1">
                  <span>Issue date:</span>
                  <FormField
                    control={form.control}
                    name="issueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PatternInput
                            {...field}
                            format="##/##/####"
                            placeholder="MM/DD/YYYY"
                            className="max-w-[10ch]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-1">
                  <span>Due date:</span>
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PatternInput
                            {...field}
                            format="##/##/####"
                            placeholder="MM/DD/YYYY"
                            className="max-w-[10ch]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col gap-1.5">
                  <div className="mb-2 font-semibold">From</div>
                  <FormField
                    control={form.control}
                    name="fromAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TextArea {...field} placeholder={addressPlaceholder} className="w-[246px]" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="mb-2 font-semibold">To</div>
                  <FormField
                    control={form.control}
                    name="toAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TextArea {...field} placeholder={addressPlaceholder} className="w-[246px]" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <div className="grid grid-cols-12 border-b pb-1.5">
                  <div className="col-span-6 font-semibold">Description</div>
                  <div className="col-span-2 text-right font-semibold">Quantity</div>
                  <div className="col-span-2 text-right font-semibold">Price</div>
                  <div className="col-span-2 text-right font-semibold">Total</div>
                </div>

                {fields.map((item, index) => (
                  <LineItem key={item.id} index={index} control={form.control} remove={remove} />
                ))}

                <button
                  type="button"
                  className="mt-2 text-secondary-foreground/40 transition-colors hover:text-secondary-foreground/80"
                  onClick={() => append([{ description: "", quantity: "0", price: "0" }])}
                >
                  + Add new item
                </button>
              </div>

              <div className="grid grid-cols-2">
                <div></div>
                <InvoiceSubtotal control={form.control} />
              </div>

              <div className="grid grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <div className="mb-2 font-semibold">Payment details</div>
                  <FormField
                    control={form.control}
                    name="paymentDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TextArea {...field} placeholder={paymentPlaceholder} className="w-[246px]" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="mb-2 font-semibold">Additional Notes</div>
                  <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TextArea {...field} placeholder={notesPlaceholder} className="w-[246px]" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </ReactForm>
    </div>
  );
}
