import NumberFlow from "@number-flow/react";
import React, { useMemo } from "react";
import { Control, useWatch } from "react-hook-form";

import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { NumericInput } from "~/components/ui/inputs";
import { Invoice } from "~/types/invoice";

export function InvoiceSubtotal({ control }: { control: Control<Omit<Invoice, "theme">> }) {
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

  return (
    <div>
      <div className="mb-1.5 flex justify-between border-b pb-1.5">
        <div className="font-semibold">VAT</div>
        <div>
          <FormField
            control={control}
            name="vat"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <NumericInput
                    {...field}
                    placeholder="VAT"
                    thousandSeparator=","
                    prefix="$"
                    decimalScale={2}
                    className="text-right"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="font-semibold">Total</div>
        <div className="text-xl">
          <NumberFlow
            value={total}
            format={{
              style: "currency",
              currency: "USD",
            }}
            willChange
          />
        </div>
      </div>
    </div>
  );
}
