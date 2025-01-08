import { Text, View } from "@react-pdf/renderer";
import { FC } from "react";

interface Props {
  from_details: string;
  customer_details: string;
}

const Address: FC<Props> = ({ from_details, customer_details }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <View
      style={{
        flexDirection: "column",
        gap: 6,
        width: 246,
      }}
    >
      <Text
        style={{
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        From
      </Text>
      <Text>{from_details}</Text>
    </View>
    <View
      style={{
        flexDirection: "column",
        gap: 6,
      }}
    >
      <Text
        style={{
          fontWeight: 600,
          marginBottom: 8,
          width: 246,
        }}
      >
        To
      </Text>
      <Text>{customer_details}</Text>
    </View>
  </View>
);

export default Address;
