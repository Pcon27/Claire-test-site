"use client";

import Card from "../components/flexBox/Card";
import Text from "../components/text/Text";
import Gutter from "../components/flexBox/Gutter";
import SectionHeader from "./SectionHeader";
import CustomImage from "../components/images/CustomImage";
import useWindowDimensions from "../hooks/GetDimensions";
import { useState } from "react";
import Modal from "../components/modal/Modal";
import { KDMSite, Novemberfest } from "./projectsData/ProjectsData";

const SingleProject = ({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) => {
  return (
    <Card
      backgroundColor={0}
      radius={0}
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      width="fill"
      borderWidth={1}
      borderColor={2}
      size={0}
      hoverBlur
      onClick={onClick}
    >
      <CustomImage
        src={project.image ?? "/images/Flag_of_California_Winter.svg"}
        alt={project.title}
        objectFit="cover"
        // width={"fill"}
        // maxWidth={100}
        height={80}
        style={{
          width: "100%",
        }}
      />
      <Text color={2}>{project.title}</Text>
    </Card>
  );
};

export default function Projects() {
  const { width = 0 } = useWindowDimensions();
  const isTwoColumn = width >= 768; // matches $breakpoints.small
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return (
    <Card
      backgroundColor={0}
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
            width="fill"
          >
            <SingleProject
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          </Card>
        ))}
      </Card>
      <Modal
        open={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <Card
            flexDirection="column"
            gap={10}
            size={0}
            backgroundColor={selectedProject.backgroundColor}
          >
            {selectedProject.content}
          </Card>
        )}
      </Modal>
    </Card>
  );
}

type Project = {
  title: string;
  description: string;
  link: string;
  onClick?: void;
  content?: React.ReactNode;
  backgroundColor?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | undefined;
  image?: string;
};

const projects: Project[] = [
  {
    title: "Interactive Party Invite",
    description: "Project 1",
    link: "https://beergarten.vercel.app",
    content: <Novemberfest />,
    backgroundColor: 1,
    image: "/images/NovemberfestSC1.png",
  },
  {
    title: "Director's Portfolio",
    description: "Description of Project 2",
    content: <KDMSite />,
    link: "/projects/project-2",
  },
  {
    title: "Chalkboard Sports",
    description: "Description of Project 2",
    content: <KDMSite />,
    link: "/projects/project-3",
  },
  {
    title: "Modular Shelving",
    description: "Description of Project 2",
    content: <KDMSite />,
    link: "/projects/project-4",
  },
];
