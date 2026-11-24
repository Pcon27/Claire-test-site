"use client";

import Card from "../components/flexBox/Card";
import Text from "../components/text/Text";
import Gutter from "../components/flexBox/Gutter";
import SectionHeader from "./SectionHeader";
import CustomImage from "../components/images/CustomImage";
import useWindowDimensions from "../hooks/GetDimensions";

type Resume = {
  company?: string;
  role?: string;
  years?: string;
  location?: string;
  bullets?: string[];
  image?: string;
};

const SingleResume = ({
  resume,
  isWide,
}: {
  resume: Resume;
  isWide: boolean;
}) => {
  const logoSize = isWide ? 96 : 72;

  return (
    <Card
      backgroundColor={1}
      radius={0}
      borderWidth={1}
      borderColor={5}
      size={40}
      width="fill"
      flexDirection={isWide ? "row" : "column"}
      alignItems={isWide ? "center" : "flex-start"}
      justifyContent="flex-start"
      gap={40}
      style={{
        boxSizing: "border-box",
        maxWidth: "40rem",
      }}
    >
      {/* Logo tile */}
      <Card
        backgroundColor={2}
        radius={0}
        borderWidth={1}
        borderColor={5}
        size={20}
        alignItems="center"
        justifyContent="center"
        style={{
          width: logoSize,
          height: logoSize,
          flexShrink: 0,
          boxSizing: "border-box",
        }}
      >
        {resume.image && (
          <CustomImage
            src={resume.image}
            alt={resume.company ?? "logo"}
            objectFit="contain"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </Card>

      {/* Company / role */}
      <Card
        size={0}
        gap={10}
        flexDirection="column"
        alignItems="flex-start"
        style={{ flexGrow: 1, minWidth: 0 }}
      >
        <Text color={2} size={40} weight={600}>
          {resume.company}
        </Text>
        <Text color={2} size={20} weight={300}>
          {resume.role}
        </Text>
        {!!resume.bullets?.length && (
          <ul style={{ margin: 0, paddingInlineStart: "1.25rem" }}>
            {resume.bullets.map((bullet) => (
              <li key={bullet}>
                <Text color={2} size={15} weight={300}>
                  {bullet}
                </Text>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Meta: years + location */}
      <Card
        size={0}
        gap={10}
        flexDirection="column"
        alignItems={isWide ? "flex-end" : "flex-start"}
        style={{ flexShrink: 0 }}
      >
        {resume.years && (
          <Text
            color={1}
            size={15}
            weight={600}
            align={isWide ? "end" : "start"}
          >
            {resume.years}
          </Text>
        )}
        {resume.location && (
          <Text
            color={2}
            size={15}
            weight={300}
            align={isWide ? "end" : "start"}
          >
            {resume.location}
          </Text>
        )}
      </Card>
    </Card>
  );
};

export default function ResumeBits() {
  const { width = 0 } = useWindowDimensions();
  const isWide = width >= 768; // matches $breakpoints.small

  return (
    <Card
      backgroundColor={0}
      radius={0}
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      size={40}
      width="fill"
      style={{ boxSizing: "border-box" }}
    >
      <SectionHeader title="Resume" />
      <Card
        width="fill"
        backgroundColor={4}
        size={40}
        gap={40}
        flexDirection="row"
        flexWrap="wrap"
        alignItems="stretch"
        style={{ boxSizing: "border-box" }}
      >
        {resumeData.map((resume) => (
          <SingleResume
            key={`${resume.company}-${resume.role}`}
            resume={resume}
            isWide={isWide}
          />
        ))}
      </Card>
      <Gutter size={20} />
    </Card>
  );
}

const resumeData: Resume[] = [
  {
    company: "Kellogg School of Management",
    role: "MBA + Masters in Design Innovation (MMM Program)",
    image: "/images/Kellogg.svg",
    location: "Evanston, IL",
    years: "2026 - 2028",
  },
  {
    company: "Tidepool Labs Inc.",
    role: "Software Engineer",
    image: "/images/TPL.svg",
    location: "Los Angeles, CA",
    years: "2022 - 2026",
  },
  {
    company: "Chalkboard Sports",
    role: "Product Development Intern",
    location: "Remote",
    image: "/images/CB.svg",
    years: "2021",
  },
  {
    company: "University of California, Los Angeles",
    role: "BA in Political Science - International Relations",
    // years: "2018 - 2022",
    location: "Los Angeles, CA",
    image: "/images/UCLA2.svg",
  },
];
