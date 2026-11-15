"use client";

import Card from "../components/flexBox/Card";
import Text from "../components/text/Text";

export default function FunSection() {
  return (
    <Card
      backgroundColor={5}
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      size={40}
    >
      <Text color={1} weight={600} size={60}>
        Fun Fact
      </Text>
    </Card>
  );
}
