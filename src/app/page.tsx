import { InvoiceForm } from "~/components/invoice-form";

export default function Home() {
  return (
    <main className="mx-auto flex h-full w-[700px] gap-4">
      <InvoiceForm />
    </main>
  );
}
