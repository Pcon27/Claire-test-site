"use client";

import Card from "../components/flexBox/Card";
import Text from "../components/text/Text";
import Gutter from "../components/flexBox/Gutter";
import SectionHeader from "./SectionHeader";
import CustomImage from "../components/images/CustomImage";
import useWindowDimensions from "../hooks/GetDimensions";

const SingleOpinion = ({ opinion }: { opinion: Opinion }) => {
  return (
    <Card
      backgroundColor={3}
      radius={0}
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      size={40}
      width="fill"
      borderWidth={1}
      borderColor={2}
    >
      <CustomImage
        src="/images/Flag_of_California_Winter.svg"
        alt={opinion.title}
      ></CustomImage>
      <Text color={2}>{opinion.title}</Text>
      <Text color={2}>{opinion.description}</Text>
    </Card>
  );
};

export default function Opinions() {
  const { width = 0 } = useWindowDimensions();
  const isTwoColumn = width >= 768; // matches $breakpoints.small
  return (
    <Card
      backgroundColor={1}
      radius={0}
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      size={0}
      width="fill"
    >
      <SectionHeader title="Opinions" subtext="A collection of my work" />
      <Card
        width="fill"
        flexDirection={isTwoColumn ? "row" : "column"}
        flexWrap="wrap"
        size={0}
      >
        {opinions.map((opinion) => (
          <Card
            key={opinion.link}
            style={{
              width: isTwoColumn ? "50%" : "100%",
              boxSizing: "border-box",
            }}
            // width="fill"
          >
            <SingleOpinion opinion={opinion} />
          </Card>
        ))}
      </Card>
    </Card>
  );
}

type Opinion = {
  title: string;
  description: string;
  link: string;
};

const opinions: Opinion[] = [
  {
    title: "Opinion 1",
    description: "Description of Opinion 1",
    link: "/opinions/opinion-1",
  },
  {
    title: "Opinion 2",
    description: "Description of Opinion 2",
    link: "/opinions/opinion-2",
  },
];
