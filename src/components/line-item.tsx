import { Trash2Icon } from "lucide-react";
import { Control, UseFieldArrayRemove, useWatch } from "react-hook-form";

import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { Input, NumericInput } from "~/components/ui/inputs";
import { Invoice } from "~/types/invoice";

interface LineItemProps {
  index: number;
  control: Control<Omit<Invoice, "theme">>;
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

  const total = parseFloat(String(quantity)) * parseFloat(String(price)) || 0;

  return (
    <div className="relative grid grid-cols-12 py-1.5">
      <div className="col-span-6">
        <FormField
          control={control}
          name={`lineItems.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Description" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-2 text-right">
        <FormField
          control={control}
          name={`lineItems.${index}.quantity`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NumericInput {...field} placeholder="Quantity" decimalScale={0} className="text-right" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-2 text-right">
        <FormField
          control={control}
          name={`lineItems.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NumericInput
                  {...field}
                  placeholder="Price"
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

      <div className="col-span-2 text-right">
        <NumericInput
          value={total.toFixed(2)}
          readOnly
          thousandSeparator=","
          prefix="$"
          decimalScale={2}
          className="text-right"
        />
      </div>
      <button
        type="button"
        className="group absolute -right-6 top-1 cursor-pointer p-0.5"
        onClick={() => remove(index)}
      >
        <Trash2Icon
          strokeWidth={2}
          className="size-3.5 text-secondary-foreground opacity-40 transition-opacity group-hover:opacity-80"
        />
      </button>
    </div>
  );
}
