import "~/styles/globals.css";

import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";

import { Toaster } from "~/components/ui/toast";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Invoice Builder",
  description:
    "Effortlessly create, customize, and manage professional invoices for your business. Save time with pre-designed templates, automatic calculations, and export options tailored to meet your invoicing needs.",
  applicationName: "Invoice Builder",
  authors: [{ name: "Kyrylo Lvov" }, { name: "Vlad Stohnii" }],
  keywords: [
    "invoice builder",
    "create invoices online",
    "invoice management",
    "customizable invoices",
    "billing software",
    "invoice templates",
    "invoice generator",
    "professional invoices",
    "online invoicing tools",
    "small business invoicing",
    "invoicing software",
    "Next.js invoicing app",
    "React invoice builder",
    "web invoicing application",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-w-screen-md min-h-screen p-8 antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
