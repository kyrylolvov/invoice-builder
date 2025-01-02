import { Text, View } from "@react-pdf/renderer";
import { FC } from "react";

import { LineItem } from "../types";

interface Props {
  line_items: LineItem[];
  currency: string;
  theme: "dark" | "light";
}

const Table: FC<Props> = ({ line_items, currency, theme }) => {
  const formatCurrency = (value: number | string): string => `${currency}${(+value).toFixed(2)}`;

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          borderBottom: 1,
          borderColor: theme === "dark" ? "#27272A" : "#E4E4E7",
          paddingBottom: 6,
        }}
      >
        <Text style={{ flex: 6, fontWeight: 600 }}>Description</Text>
        <Text style={{ flex: 2, textAlign: "right", fontWeight: 600 }}>Quantity</Text>
        <Text style={{ flex: 2, textAlign: "right", fontWeight: 600 }}>Price</Text>
        <Text style={{ flex: 2, textAlign: "right", fontWeight: 600 }}>Total</Text>
      </View>
      {line_items.map((item, index) => {
        const quantity = +item.quantity || 0;
        const price = +item.price || 0;
        const total = quantity * price;
        return (
          <View
            key={index}
            style={{
              flexDirection: "row",
              width: "100%",
              paddingTop: 6,
              paddingBottom: 6,
            }}
          >
            <Text style={{ flex: 6 }}>{item.description}</Text>
            <Text style={{ flex: 2, textAlign: "right" }}>{quantity}</Text>
            <Text style={{ flex: 2, textAlign: "right" }}>{formatCurrency(price)}</Text>
            <Text style={{ flex: 2, textAlign: "right" }}>{formatCurrency(total)}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Table;
