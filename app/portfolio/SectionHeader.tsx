"use client";

import Card from "../components/flexBox/Card";
import Text from "../components/text/Text";

export default function SectionHeader({
  title,
  subtext,
  children,
}: {
  title: string;
  subtext?: string;
  children?: React.ReactNode;
}) {
  return (
    <Card
      width="fill"
      flexDirection="column"
      alignItems="flex-start"
      // boxSizing="content-box"
      // style={{ boxSizing: "border-box" }}
    >
      <Card
        size={0}
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="flex-start"
        width="fill"
      >
        <Text color={2} weight={300} size={40}>
          {title}
        </Text>
      </Card>
      <Card
        width="fill"
        style={{ height: "1px" }}
        backgroundColor={4}
        size={0}
      />
    </Card>
  );
}
