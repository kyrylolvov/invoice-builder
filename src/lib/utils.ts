import { ClassValue } from "class-variance-authority/types";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Invoice } from "~/types/invoice";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateInvoice = (body: Invoice) =>
  new Promise<void>((resolve, reject) => {
    fetch("/api/pdf", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to generate invoice");
        }
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Invoice-${body.invoiceNumber}.pdf`;
        a.click();
        resolve();
      })
      .catch((error) => reject(error));
  });
