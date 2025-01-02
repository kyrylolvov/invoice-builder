"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import * as React from "react";
import { useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { invoiceSchema } from "~/app/api/pdf/route";
import { Input } from "~/components/ui/inputs";
import { invoiceDefaultValues } from "~/lib/constants";
import { Invoice } from "~/types/invoice";

import { DownloadButton } from "./download-button";
import { ThemeSwitch } from "./theme-switch";
import { Form as ReactForm, FormControl, FormField, FormItem } from "./ui/form";

export function InvoiceForm() {
  const { theme } = useTheme();

  const formRef = useRef<HTMLFormElement | null>(null);

  const form = useForm<Invoice>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: invoiceDefaultValues(theme!),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lineItems",
  });

  const onSubmit = (values: Invoice) => {
    console.log(values);
  };

  console.log("rerender");

  return (
    <>
      <div className="flex flex-col gap-4">
        <DownloadButton onClick={() => formRef.current?.requestSubmit()} />
        <ThemeSwitch />
      </div>
      <ReactForm {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} ref={formRef} className="noValidate w-full">
          <div className="flex aspect-[1/1.4] w-full flex-col justify-between rounded-md border bg-secondary/40 px-8 py-10 font-mono text-xs">
            <div className="flex flex-col gap-20">
              <div className="flex justify-between">
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

                {/* <div className="flex gap-1">
                  <span>Issue date:</span>
                  <Controller
                    control={control}
                    name="issueDate"
                    render={({ field }) => (
                      <PatternInput
                        {...field}
                        format="##/##/####"
                        placeholder="MM/DD/YYYY"
                        onChange={(value) => field.onChange(value)}
                        className="max-w-[10ch]"
                      />
                    )}
                  />
                </div>

                <div className="flex gap-1">
                  <span>Due date:</span>
                  <Controller
                    control={control}
                    name="dueDate"
                    render={({ field }) => (
                      <PatternInput
                        {...field}
                        format="##/##/####"
                        placeholder="MM/DD/YYYY"
                        onChange={(value) => field.onChange(value)}
                        className="max-w-[10ch]"
                      />
                    )}
                  />
                </div> */}
              </div>
              {/* 
              <div className="flex justify-between">
                <div className="flex flex-col gap-1.5">
                  <div className="mb-2 font-semibold">From</div>
                  <Controller
                    control={control}
                    name="fromAddress"
                    render={({ field }) => <TextArea {...field} placeholder={addressPlaceholder} />}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="mb-2 font-semibold">To</div>
                  <Controller
                    control={control}
                    name="toAddress"
                    render={({ field }) => <TextArea {...field} placeholder={addressPlaceholder} />}
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
                  <LineItem key={item.id} index={index} control={control} remove={remove} />
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
                <InvoiceSubtotal control={control} />
              </div>

              <div className="grid grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <div className="mb-2 font-semibold">Payment details</div>
                  <Controller
                    control={control}
                    name="paymentDetails"
                    render={({ field }) => <TextArea {...field} placeholder={paymentPlaceholder} />}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="mb-2 font-semibold">Additional Notes</div>
                  <Controller
                    control={control}
                    name="additionalNotes"
                    render={({ field }) => <TextArea {...field} placeholder={notesPlaceholder} />}
                  />
                </div>
              </div> */}
            </div>
          </div>
        </form>
      </ReactForm>
    </>
  );
}
