import { DownloadButton } from "~/components/download-button";
import { InvoiceForm } from "~/components/invoice-form";
import { ThemeSwitch } from "~/components/theme-switch";

export default function Home() {
  return (
    <main className="mx-auto flex h-full w-[700px] gap-4">
      <div className="flex flex-col gap-4">
        <DownloadButton />
        <ThemeSwitch />
      </div>
      <InvoiceForm />
    </main>
  );
}
