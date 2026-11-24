"use client";

import { useCallback, useState } from "react";
import Card from "../components/flexBox/Card";
import Text from "../components/text/Text";
import SectionHeader from "./SectionHeader";
import CustomImage from "../components/images/CustomImage";
import useWindowDimensions from "../hooks/GetDimensions";
import Modal from "../components/modal/Modal";

const SingleOpinion = ({
  opinion,
  index,
  onClick,
}: {
  opinion: Opinion;
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
        overflow: "hidden",
        cursor: "pointer",
        textAlign: "left",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
    >
      {opinion.image && (
        <CustomImage
          src={opinion.image}
          alt={opinion.title}
          objectFit="cover"
          height={60}
          style={{
            width: "100%",
            display: "block",
            borderBottom: "1px solid var(--border5)",
          }}
        />
      )}
      <Card
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="space-between"
        width="fill"
        size={40}
        radius={0}
        gap={30}
        style={{ flexGrow: 1, boxSizing: "border-box" }}
      >
        <Card flexDirection="column" size={0} gap={20} width="fill">
          <Card
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            size={0}
            width="fill"
          >
            <Text color={1} size={10} weight={600}>
              {String(index + 1).padStart(2, "0")}
            </Text>
            {opinion.tag && (
              <Text color={5} size={10} weight={600}>
                {opinion.tag.toUpperCase()}
              </Text>
            )}
          </Card>
          <Text color={1} size={80} weight={300} style={{ lineHeight: 0.6 }}>
            “
          </Text>
          <Text color={2} size={50} weight={600}>
            {opinion.title}
          </Text>
          <Text color={2} size={20} weight={300}>
            {opinion.description}
          </Text>
        </Card>
        <Text color={1} size={15} weight={600} hover="underline">
          Read more →
        </Text>
      </Card>
    </Card>
  );
};

// Fallback modal body for opinions that don't define custom `content`
const DefaultOpinionContent = ({ opinion }: { opinion: Opinion }) => (
  <Card size={60} radius={0} width="fill" flexDirection="column" gap={30}>
    {opinion.tag && (
      <Text color={5} size={10} weight={600}>
        {opinion.tag.toUpperCase()}
      </Text>
    )}
    <Text color={1} size={60} weight={300}>
      “{opinion.title}”
    </Text>
    <Text color={1} size={30} weight={300}>
      {opinion.description}
    </Text>
  </Card>
);

export default function Opinions() {
  const { width = 0 } = useWindowDimensions();
  const isTwoColumn = width >= 768; // matches $breakpoints.small
  const [selectedOpinion, setSelectedOpinion] = useState<Opinion | null>(null);
  const closeModal = useCallback(() => setSelectedOpinion(null), []);
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
      <SectionHeader title="Opinions" subtext="Things I believe" />
      <Card
        width="fill"
        size={40}
        gap={50}
        style={{
          display: "grid",
          gridTemplateColumns: isTwoColumn
            ? "repeat(2, minmax(0, 1fr))"
            : "1fr",
          boxSizing: "border-box",
        }}
      >
        {opinions.map((opinion, index) => (
          <SingleOpinion
            key={opinion.title}
            opinion={opinion}
            index={index}
            onClick={() => setSelectedOpinion(opinion)}
          />
        ))}
      </Card>
      <Modal
        open={selectedOpinion !== null}
        onClose={closeModal}
        title={selectedOpinion?.title}
      >
        {selectedOpinion &&
          (selectedOpinion.content ?? (
            <DefaultOpinionContent opinion={selectedOpinion} />
          ))}
      </Modal>
    </Card>
  );
}

type Opinion = {
  title: string;
  description: string;
  tag?: string;
  // Custom modal body; falls back to DefaultOpinionContent when omitted
  content?: React.ReactNode;
  image?: string;
};

const opinions: Opinion[] = [
  {
    title: "Opinion 1",
    description: "Description of Opinion 1",
    tag: "Design",
  },
  {
    title: "Opinion 2",
    description: "Description of Opinion 2",
    tag: "Life",
  },
];
