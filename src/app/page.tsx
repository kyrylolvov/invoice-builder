import Link from "next/link";

import { InvoiceForm } from "~/components/invoice-form";

export default function Home() {
  return (
    <main className="mx-auto flex h-full w-[700px] flex-col gap-4">
      <InvoiceForm />
      <h1 className="text-center text-sm text-secondary-foreground/50">
        Open-Source Invoice Builder. Done by{" "}
        <Link target="_blank" href="https://x.com/kyrylolvov" rel="noreferrer nofollow">
          @kyrylolvov
        </Link>{" "}
        and{" "}
        <Link target="_blank" href="https://x.com/vladstohnii" rel="noreferrer nofollow">
          @vladstohnii
        </Link>
      </h1>
    </main>
  );
}
