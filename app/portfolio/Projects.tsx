"use client";

import Card from "../components/flexBox/Card";
import Text from "../components/text/Text";
import Gutter from "../components/flexBox/Gutter";
import SectionHeader from "./SectionHeader";
import CustomImage from "../components/images/CustomImage";
import useWindowDimensions from "../hooks/GetDimensions";
import { useCallback, useState } from "react";
import Modal from "../components/modal/Modal";
import { KDMSite, Novemberfest } from "./projectsData/ProjectsData";

const SingleProject = ({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) => {
  return (
    <Card
      backgroundColor={1}
      radius={0}
      flexDirection="column"
      alignItems="stretch"
      justifyContent="flex-start"
      width="fill"
      height="fill"
      borderWidth={1}
      borderColor={5}
      dropShadow={5}
      size={0}
      onClick={onClick}
      style={{
        cursor: "pointer",
        overflow: "hidden",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
    >
      <CustomImage
        src={project.image ?? "/images/Flag_of_California_Winter.svg"}
        alt={project.title}
        objectFit="cover"
        height={80}
        style={{
          width: "100%",
          display: "block",
          borderBottom: "1px solid var(--border5)",
        }}
      />
      <Card
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="space-between"
        width="fill"
        size={40}
        radius={0}
        gap={20}
        style={{ flexGrow: 1, boxSizing: "border-box" }}
      >
        <Card flexDirection="column" size={0} gap={10} width="fill">
          <Text color={1} size={10} weight={600}>
            {String(index + 1).padStart(2, "0")}
          </Text>
          <Text color={2} size={40} weight={600}>
            {project.title}
          </Text>
          <Text color={2} size={20} weight={300}>
            {project.description}
          </Text>
        </Card>
        <Text color={1} size={15} weight={600} hover="underline">
          View project →
        </Text>
      </Card>
    </Card>
  );
};

export default function Projects() {
  const { width = 0 } = useWindowDimensions();
  const isTwoColumn = width >= 768; // matches $breakpoints.small
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeModal = useCallback(() => setSelectedProject(null), []);
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
        size={40}
        gap={50}
        style={{
          display: "grid",
          gridTemplateColumns: isTwoColumn ? "repeat(2, minmax(0, 1fr))" : "1fr",
          boxSizing: "border-box",
        }}
      >
        {projects.map((project, index) => (
          <SingleProject
            key={project.link}
            project={project}
            index={index}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </Card>
      <Modal
        open={selectedProject !== null}
        onClose={closeModal}
        title={selectedProject?.title}
      >
        {selectedProject?.content}
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
