"use client";

import * as React from "react";
import { useState } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}

export function TextArea({ placeholder, rows = 5 }: TextareaProps) {
  const [value, setValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const lines = e.currentTarget.value.split("\n").length;

    if (e.key === "Enter" && lines >= 5) {
      e.preventDefault();
    }
  };

  return (
    <textarea
      rows={rows}
      value={value}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      className="text-ƒoregroung w-[246px] resize-none bg-transparent leading-5 outline-none placeholder:text-secondary-foreground/40"
    />
  );
}
