"use client";

import * as React from "react";
import { useMemo } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";

import { addressPlaceholder, notesPlaceholder, paymentPlaceholder } from "~/lib/constants";

import { Input, NumericInput, PatternInput } from "./inputs";
import { LineItem } from "./line-item";
import { TextArea } from "./text-area";

export interface LineItem {
  description: string;
  quantity: number | string;
  price: number | string;
}

export interface FormValues {
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

export function InvoiceForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
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
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems",
  });

  const lineItems = useWatch({
    name: "lineItems",
    control,
  });

  const vat = useWatch({
    control,
    name: "vat",
  });

  const subtotal = useMemo(() => {
    return lineItems.reduce((acc, item) => {
      const quantity = parseFloat(String(item.quantity));
      const price = parseFloat(String(item.price));

      return acc + quantity * price;
    }, 0);
  }, [lineItems]);

  const total = useMemo(() => {
    const vatAmount = parseFloat(String(vat));

    return subtotal + vatAmount;
  }, [subtotal, vat]);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
            <div className="grid grid-cols-10 border-b pb-1.5">
              <div className="col-span-4 font-semibold">Description</div>
              <div className="col-span-2 text-right font-semibold">Quantity</div>
              <div className="col-span-2 text-right font-semibold">Price</div>
              <div className="col-span-2 text-right font-semibold">Total</div>
            </div>

            {fields.map((item, index) => (
              <LineItem key={item.id} index={index} control={control} remove={remove} />
            ))}

            <button className="mt-2" onClick={() => append([{ description: "", quantity: "0", price: "0" }])}>
              + Add new item
            </button>
          </div>

          <div className="grid grid-cols-2">
            <div></div>
            <div>
              <div className="mb-1.5 flex justify-between border-b pb-1.5">
                <div className="font-semibold">VAT</div>
                <div>
                  <Controller
                    control={control}
                    name="vat"
                    render={({ field }) => (
                      <NumericInput
                        {...field}
                        placeholder="VAT"
                        thousandSeparator=","
                        prefix="$"
                        decimalScale={2}
                        className="text-right"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="font-semibold">Total</div>
                <div className="text-xl">
                  <NumericInput
                    value={total}
                    thousandSeparator=","
                    prefix="$"
                    decimalScale={2}
                    fixedDecimalScale
                    className="bg-transparent text-right outline-none"
                    valueIsNumericString
                    readOnly
                    displayType="text"
                  />
                </div>
              </div>
            </div>
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
  );
}
