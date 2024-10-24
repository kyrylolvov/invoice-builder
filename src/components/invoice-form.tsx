import * as React from "react";

export function InvoiceForm() {
  return (
    <div className="flex aspect-[1/1.4] w-full flex-col justify-between rounded-md border bg-secondary/60 p-8 font-mono text-xs">
      <div className="flex flex-col gap-20">
        <div className="flex justify-between">
          <div className="flex gap-1">
            <span>Invoice no:</span>
            <span>0001</span>
          </div>

          <div className="flex gap-1">
            <span>Issue date:</span>
            <span>10/24/2024</span>
          </div>

          <div className="flex gap-1">
            <span>Due date:</span>
            <span>10/30/2024</span>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="mb-2 font-semibold">From</div>
            <div>List Island AB</div>
            <div>Email: info@list.com</div>
            <div>Phone: +1 (123) 456 7890</div>
            <div>Address: 123 Main St, Anytown, USA</div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="mb-2 font-semibold">To</div>
            <div>List Island AB</div>
            <div>Email: info@list.com</div>
            <div>Phone: +1 (123) 456 7890</div>
            <div>Address: 123 Main St, Anytown, USA</div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-10 border-b pb-1.5">
            <div className="col-span-4 font-semibold">Description</div>
            <div className="col-span-2 text-right font-semibold">Quantity</div>
            <div className="col-span-2 text-right font-semibold">Price</div>
            <div className="col-span-2 text-right font-semibold">Total</div>
          </div>

          <div className="mt-2.5 grid grid-cols-10">
            <div className="col-span-4">Development</div>
            <div className="col-span-2 text-right">52</div>
            <div className="col-span-2 text-right">$1,100.00</div>
            <div className="col-span-2 text-right">$57,200.00</div>
          </div>

          <div className="mt-2.5 grid grid-cols-10">
            <div className="col-span-4">Development</div>
            <div className="col-span-2 text-right">52</div>
            <div className="col-span-2 text-right">$1,100.00</div>
            <div className="col-span-2 text-right">$57,200.00</div>
          </div>

          <div className="mt-2.5 grid grid-cols-10">
            <div className="col-span-4">Development</div>
            <div className="col-span-2 text-right">52</div>
            <div className="col-span-2 text-right">$1,100.00</div>
            <div className="col-span-2 text-right">$57,200.00</div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div></div>
          <div>
            <div className="mb-1.5 flex justify-between border-b pb-1.5">
              <div className="font-semibold">VAT</div>
              <div>$60,500.00</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="font-semibold">Total</div>
              <div className="text-xl">$302,500.00</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <div className="mb-2 font-semibold">Payment details</div>
            <div>SEB Bank</div>
            <div>IBAN: 123 123 123 123</div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="mb-2 font-semibold">Additional Notes details</div>
            <div>Thank you for your business</div>
          </div>
        </div>
      </div>
    </div>
  );
}
