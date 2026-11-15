"use client";

import Card from "../components/flexBox/Card";
import Text from "../components/text/Text";
import Gutter from "../components/flexBox/Gutter";

export default function Header() {
  return (
    <Card
      backgroundColor={3}
      radius={0}
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      size={0}
      width="fill"
      height={10}
    >
      <Text color={2}>Peter Consagra</Text>
    </Card>
  );
}
