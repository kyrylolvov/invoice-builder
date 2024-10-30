import React from "react";
import { Control, Controller, useWatch } from "react-hook-form";

import { Input, NumericInput } from "./inputs";
import { FormValues } from "./invoice-form";

interface LineItemProps {
  index: number;
  control: Control<FormValues>;
}

export function LineItem({ index, control }: LineItemProps) {
  const quantity = useWatch({
    control,
    name: `lineItems.${index}.quantity`,
  });

  const price = useWatch({
    control,
    name: `lineItems.${index}.price`,
  });

  const total = parseFloat(String(quantity)) * parseFloat(String(price));

  return (
    <div className="grid grid-cols-10 border-b py-1.5">
      <div className="col-span-4">
        <Controller
          control={control}
          name={`lineItems.${index}.description`}
          render={({ field }) => <Input {...field} placeholder="Description" />}
        />
      </div>
      <div className="col-span-2 text-right">
        <Controller
          control={control}
          name={`lineItems.${index}.quantity`}
          render={({ field }) => (
            <NumericInput {...field} placeholder="Quantity" decimalScale={0} className="text-right" />
          )}
        />
      </div>
      <div className="col-span-2 text-right">
        <Controller
          control={control}
          name={`lineItems.${index}.price`}
          render={({ field }) => (
            <NumericInput
              {...field}
              placeholder="Price"
              thousandSeparator=","
              prefix="$"
              decimalScale={2}
              className="text-right"
            />
          )}
        />
      </div>
      <div className="col-span-2 text-right">
        <NumericInput
          value={total.toFixed(2)}
          thousandSeparator=","
          prefix="$"
          decimalScale={2}
          className="text-right"
        />
      </div>
    </div>
  );
}
