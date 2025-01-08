export interface LineItem {
  description: string;
  quantity: number | string;
  price: number | string;
  invoice_number?: string;
  issue_date?: string;
  due_date?: string;
}

export interface TemplateProps {
  invoice_number: string;
  issue_date: string;
  due_date: string;
  line_items: LineItem[];
  customer_details?: string;
  payment_details?: string;
  from_details?: string;
  note_details?: string;
  currency: string;
  amount: number;
  customer_name?: string;
  tax?: number;
  theme: "light" | "dark";
}
