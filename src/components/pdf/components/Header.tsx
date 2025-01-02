import { Text, View } from "@react-pdf/renderer";
import { FC } from "react";

interface Props {
  invoice_number: string;
  issue_date: string;
  due_date: string;
}

const Header: FC<Props> = ({ invoice_number, issue_date, due_date }) => (
  <View
    style={{
      justifyContent: "space-between",
      flexDirection: "row",
    }}
  >
    <View
      style={{
        flexDirection: "row",
        gap: 4,
      }}
    >
      <Text>Invoice no:</Text>
      <Text>{invoice_number}</Text>
    </View>
    <View
      style={{
        flexDirection: "row",
        gap: 4,
      }}
    >
      <Text>Issue date:</Text>
      <Text>{issue_date}</Text>
    </View>
    <View
      style={{
        flexDirection: "row",
        gap: 4,
      }}
    >
      <Text>Due date:</Text>
      <Text>{due_date}</Text>
    </View>
  </View>
);

export default Header;
