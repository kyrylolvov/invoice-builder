import { Document, Font, Page, StyleSheet, View } from "@react-pdf/renderer";

import Address from "./components/Address";
import Details from "./components/Details";
import Header from "./components/Header";
import Table from "./components/Table";
import Total from "./components/Total";
import type { TemplateProps } from "./types";

Font.register({
  family: "GeistMono",
  fonts: [
    {
      src: `https://cdn.jsdelivr.net/fontsource/fonts/geist-mono@latest/latin-400-normal.ttf`,
      fontWeight: 400,
    },
    {
      src: `https://cdn.jsdelivr.net/fontsource/fonts/geist-mono@latest/latin-500-normal.ttf`,
      fontWeight: 500,
    },
    {
      src: `https://cdn.jsdelivr.net/fontsource/fonts/geist-mono@latest/latin-600-normal.ttf`,
      fontWeight: 600,
    },
  ],
});

const themeStyles = (theme: "dark" | "light") => ({
  backgroundColor: theme === "dark" ? "#151517" : "#FBFBFB",
  color: theme === "dark" ? "#fafafa" : "#09090b",
});

export function PdfTemplate({
  invoice_number,
  issue_date,
  due_date,
  from_details,
  customer_details,
  line_items,
  payment_details,
  note_details,
  currency,
  tax,
  amount,
  theme,
}: TemplateProps) {
  return (
    <Document>
      <Page size={"A4"} style={[styles.body, themeStyles(theme)]}>
        <View
          style={{
            flexDirection: "column",
            gap: 80,
          }}
        >
          <Header invoice_number={invoice_number} issue_date={issue_date} due_date={due_date} />
          <Address from_details={from_details || ""} customer_details={customer_details || ""} />
          <Table line_items={line_items} currency={currency} theme={theme} />
          <Total currency={currency} tax={tax || 0} amount={amount || 0} theme={theme} />
          <Details payment_details={payment_details || ""} note_details={note_details || ""} />
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontSize: 12,
    fontFamily: "GeistMono",
  },
});
