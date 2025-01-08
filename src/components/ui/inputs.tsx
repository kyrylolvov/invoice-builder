import { NumericFormat, NumericFormatProps, PatternFormat, PatternFormatProps } from "react-number-format";

import { cn } from "~/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      type="text"
      className={cn(
        "w-full bg-transparent text-foreground outline-none placeholder:text-secondary-foreground/40 aria-invalid:text-destructive aria-invalid:caret-foreground aria-invalid:placeholder:text-destructive/80",
        className,
      )}
    />
  );
}

interface NumericInputProps extends Omit<NumericFormatProps, "value" | "onValueChange" | "onChange"> {
  value: string | number;
  onChange?: (value: string) => void;
}

export const NumericInput: React.FC<NumericInputProps> = ({ onChange, className, ...props }) => {
  return (
    <NumericFormat
      {...props}
      onValueChange={(values) => {
        if (onChange) onChange(values.value);
      }}
      className={cn(
        "w-full bg-transparent text-foreground outline-none placeholder:text-secondary-foreground/40 aria-invalid:text-destructive aria-invalid:caret-foreground aria-invalid:placeholder:text-destructive/80",
        className,
      )}
      isAllowed={(values) => {
        const { floatValue } = values;
        return floatValue !== undefined && floatValue >= 0;
      }}
      valueIsNumericString
      allowNegative={false}
      allowLeadingZeros={false}
    />
  );
};

interface PatternInputProps extends Omit<PatternFormatProps, "onValueChange" | "value" | "onChange"> {
  value: string | number;
  onChange?: (value: string) => void;
}

export const PatternInput: React.FC<PatternInputProps> = ({ onChange, className, ...props }) => {
  return (
    <PatternFormat
      {...props}
      mask=" "
      onValueChange={(values) => {
        if (onChange) onChange(values.formattedValue);
      }}
      className={cn(
        "w-full bg-transparent text-foreground outline-none placeholder:text-secondary-foreground/40 aria-invalid:text-destructive aria-invalid:caret-foreground aria-invalid:placeholder:text-destructive/80",
        className,
      )}
    />
  );
};
