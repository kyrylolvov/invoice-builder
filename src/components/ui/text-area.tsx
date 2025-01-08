"use client";

import { KeyboardEvent } from "react";

import { cn } from "~/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}

export function TextArea({ placeholder, className, rows = 5, ...props }: TextareaProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const lines = e.currentTarget.value.split("\n").length;

    if (e.key === "Enter" && lines >= 5) {
      e.preventDefault();
    }
  };

  return (
    <textarea
      {...props}
      rows={rows}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={cn(
        "resize-none bg-transparent leading-5 text-foreground outline-none placeholder:text-secondary-foreground/40 aria-invalid:text-destructive aria-invalid:caret-foreground aria-invalid:placeholder:text-destructive/80",
        className,
      )}
    />
  );
}
