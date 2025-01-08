import { Text, View } from "@react-pdf/renderer";
import { FC } from "react";

interface Props {
  tax: number;
  amount: number;
  currency: string;
  theme: "dark" | "light";
}

const Total: FC<Props> = ({ tax, amount, currency, theme }) => (
  <View style={{ flexDirection: "row" }}>
    <View style={{ flex: 1 }}></View>
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 6,
          marginBottom: 6,
          borderBottom: 1,
          borderColor: theme === "dark" ? "#27272A" : "#E4E4E7",
        }}
      >
        <Text style={{ fontWeight: 600 }}>Tax</Text>
        <Text>
          {currency}
          {tax}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: 600 }}>Total</Text>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          {currency}
          {amount}
        </Text>
      </View>
    </View>
  </View>
);

export default Total;
