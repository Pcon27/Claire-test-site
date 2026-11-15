"use client";

import Card from "../components/flexBox/Card";
import Text from "../components/text/Text";
import Gutter from "../components/flexBox/Gutter";

export default function sectionLayout({
  title,
  subtext,
  years,
  location,
  description,
  bulletPoints,
}: {
  title?: string;
  subtext?: string;
  years?: string;
  location?: string;
  description?: string;
  bulletPoints?: string[];
}) {
  return (
    <Card
      radius={0}
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      size={0}
      width="fill"
    >
      <Gutter size={40} />
      <Card
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        width="fill"
        size={0}
      >
        <Card
          size={0}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          width="fill"
        >
          <Text color={2} weight={600} size={40}>
            {title}
          </Text>
          <Text color={2} size={20}>
            ({location})
          </Text>
        </Card>
        <Card
          size={0}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          width="fill"
        >
          <Text color={2} size={20}>
            {subtext}
          </Text>
          <Gutter size={20} horizontal />
          <Text color={2} size={20}>
            {years}
          </Text>
        </Card>
      </Card>
      <Gutter size={20} />
      <Card
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        width="fill"
        size={0}
      >
        {bulletPoints?.map((point, index) => (
          <Text key={index} color={2} size={20}>
            {point}
          </Text>
        ))}
      </Card>
      <Gutter size={20} />
    </Card>
  );
}
