import { Text, View } from "@react-pdf/renderer";
import { FC } from "react";

interface Props {
  payment_details: string;
  note_details: string;
}

const Details: FC<Props> = ({ payment_details, note_details }) => (
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
        Payment details
      </Text>
      <Text>{payment_details}</Text>
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
        Additional Notes
      </Text>
      <Text>{note_details}</Text>
    </View>
  </View>
);

export default Details;
