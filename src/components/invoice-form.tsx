"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { useRef } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { Input, PatternInput } from "~/components/ui/inputs";
import { TextArea } from "~/components/ui/text-area";
import { addressPlaceholder, invoiceDefaultValues, notesPlaceholder, paymentPlaceholder } from "~/lib/constants";
import { Invoice } from "~/types/invoice";

import { DownloadButton } from "./download-button";
import { InvoiceSubtotal } from "./invoice-subtotal";
import { LineItem } from "./line-item";
import { ThemeSwitch } from "./theme-switch";

export function InvoiceForm() {
  const { theme } = useTheme();
  const formRef = useRef<HTMLFormElement | null>(null);

  const { control, handleSubmit } = useForm<Invoice>({
    defaultValues: invoiceDefaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems",
  });

  const onSubmit = async (values: Invoice) => {
    fetch("/api/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, theme: theme }),
    }).then((res) => {
      res.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "invoice.pdf";
        a.click();
      });
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <DownloadButton onClick={() => formRef.current?.requestSubmit()} />
        <ThemeSwitch />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef} className="w-full">
        <div className="flex aspect-[1/1.4] w-full flex-col justify-between rounded-md border bg-secondary/40 px-8 py-10 font-mono text-xs">
          <div className="flex flex-col gap-20">
            <div className="flex justify-between">
              <div className="flex gap-1">
                <span>Invoice no:</span>
                <Controller
                  control={control}
                  name="invoiceNumber"
                  render={({ field }) => <Input {...field} placeholder="0001" className="max-w-[10ch]" />}
                />
              </div>

              <div className="flex gap-1">
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
              </div>
            </div>

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
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
