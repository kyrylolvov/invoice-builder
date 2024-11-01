import React, { useMemo } from "react";
import { Control, Controller, useWatch } from "react-hook-form";

import { NumericInput } from "~/components/ui/inputs";
import { Invoice } from "~/types/invoice";

export function InvoiceSubtotal({ control }: { control: Control<Invoice> }) {
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
          <Controller
            control={control}
            name="total"
            render={({ field }) => (
              <NumericInput
                {...field}
                value={total}
                placeholder="Total"
                thousandSeparator=","
                prefix="$"
                decimalScale={2}
                readOnly
                className="text-right"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
