"use client";

import Card from "../components/flexBox/Card";
import Text from "../components/text/Text";
import Gutter from "../components/flexBox/Gutter";
import SectionHeader from "./SectionHeader";
import CustomImage from "../components/images/CustomImage";
import useWindowDimensions from "../hooks/GetDimensions";
import { useState } from "react";

const SingleProject = ({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) => {
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
      hoverBlur
      onClick={onClick}
    >
      <CustomImage
        src="/images/Flag_of_California_Winter.svg"
        alt={project.title}
      ></CustomImage>
      <Text color={2}>{project.title}</Text>
    </Card>
  );
};

export default function Projects() {
  const { width = 0 } = useWindowDimensions();
  const isTwoColumn = width >= 768; // matches $breakpoints.small
  const [modalOpen, setModalOpen] = useState(false);
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
      <SectionHeader title="Projects" subtext="A collection of my work" />
      <Card
        width="fill"
        flexDirection={isTwoColumn ? "row" : "column"}
        flexWrap="wrap"
        size={0}
      >
        {projects.map((project) => (
          <Card
            key={project.link}
            style={{
              width: isTwoColumn ? "50%" : "100%",
              boxSizing: "border-box",
            }}
            // width="fill"
          >
            <SingleProject
              project={project}
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            />
          </Card>
        ))}
      </Card>
      {modalOpen ? (
        <Card size={60} backgroundColor={2}>
          <Text>New Modal</Text>
        </Card>
      ) : null}
    </Card>
  );
}

type Project = {
  title: string;
  description: string;
  link: string;
  onClick?: void;
};

const projects: Project[] = [
  {
    title: "Project 1",
    description: "Description of Project 1",
    link: "/projects/project-1",
  },
  {
    title: "Project 2",
    description: "Description of Project 2",
    link: "/projects/project-2",
  },
];
