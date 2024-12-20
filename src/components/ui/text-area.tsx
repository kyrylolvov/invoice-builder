"use client";

import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}

export function TextArea({ placeholder, rows = 5, ...props }: TextareaProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
      className="text-ƒoregroung w-[246px] resize-none bg-transparent leading-5 outline-none placeholder:text-secondary-foreground/40"
    />
  );
}
