import { Trash2Icon } from "lucide-react";
import React from "react";
import { Control, Controller, UseFieldArrayRemove, useWatch } from "react-hook-form";

import { Input, NumericInput } from "~/components/ui/inputs";
import { Invoice } from "~/types/invoice";

interface LineItemProps {
  index: number;
  control: Control<Invoice>;
  remove: UseFieldArrayRemove;
}

export function LineItem({ index, control, remove }: LineItemProps) {
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
    <div className="relative grid grid-cols-12 py-1.5">
      <div className="col-span-6">
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

      <button className="group absolute -right-6 top-1 p-0.5" onClick={() => remove(index)}>
        <Trash2Icon
          strokeWidth={2}
          className="size-3.5 text-secondary-foreground opacity-40 transition-opacity group-hover:opacity-80"
        />
      </button>
    </div>
  );
}
