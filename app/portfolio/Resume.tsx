"use client";

import { useState } from "react";
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
  onClick,
  isExpanded,
}: {
  resume: Resume;
  onClick?: () => void;
  isExpanded?: boolean;
}) => {
  return (
    <Card
      flexDirection="column"
      alignItems="flex-start"
      onClick={onClick}
      width={"fill"}
      backgroundColor={4}
      dropShadow={5}
    >
      {resume.image && (
        <CustomImage
          src={!!resume.image ? resume.image : null}
          alt={resume?.company ?? "image"}
        />
      )}
      {isExpanded && (
        <Card size={10} gap={10}>
          <Text color={3} weight={700}>
            {resume?.company}
          </Text>
          <Text color={3}>{resume?.role}</Text>
          <Text color={3} size={30}>
            {resume?.years}
          </Text>
        </Card>
      )}
    </Card>
  );
};

export default function ResumeBits() {
  const [expanded, setExpanded] = useState(resumeData.length);
  return (
    <Card flexDirection="column" width={"fill"} backgroundColor={3}>
      <SectionHeader title="Resume" />
      <Card
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
        width={"fill"}
        backgroundColor={2}
        // gap={10}
        size={40}
      >
        {resumeData.map((project, index) => (
          <Card key={index}>
            <SingleResume
              resume={project}
              onClick={() =>
                setExpanded((current) =>
                  current === index ? resumeData.length : index,
                )
              }
              isExpanded={expanded === index}
            />
          </Card>
        ))}
      </Card>
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
