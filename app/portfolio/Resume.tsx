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
};

const SingleResume = ({ resume }: { resume: Resume }) => {
  return (
    <Card>
      <Text color={2}>{resume.company}</Text>
      <Text color={2}>{resume.company}</Text>
    </Card>
  );
};

export default function ResumeBits() {
  return (
    <Card>
      {" "}
      <SectionHeader title="Resume" />
      {resumeData.map((project, index) => (
        <Card
          key={index}
          // width="fill"
        >
          <SingleResume resume={project} />
        </Card>
      ))}
    </Card>
  );
}

const resumeData: Resume[] = [
  {
    company: "Project 1",
    role: "Description of Project 1",
    // link: "/projects/project-1",
  },
  {
    company: "Project 2",
    role: "Description of Project 2",
    // link: "/projects/project-2",
  },
];
