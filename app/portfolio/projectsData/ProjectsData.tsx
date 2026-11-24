import Card from "@/app/components/flexBox/Card";
import { useState } from "react";
import Gutter from "@/app/components/flexBox/Gutter";
import CustomImage from "@/app/components/images/CustomImage";
import Text from "@/app/components/text/Text";
import { title } from "process";

type ProjectTitleType = {
  title?: string;
  link?: string;
  headerImage?: string;
};

const ProjectTitle = ({ title, link, headerImage }: ProjectTitleType) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Card>
      <CustomImage
        src={headerImage ?? null}
        alt={title ?? "image"}
        width={"fill"}
        height={90}
      />
      <Card
        backgroundColor={4}
        flexDirection="row"
        alignItems="center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => window.open(`${link}`, "_blank", "noopener,noreferrer")}
      >
        <Text size={90} color={3} weight={900} underline={isHovered}>
          {title}
        </Text>
        <Gutter size={isHovered ? 20 : 10} horizontal />
        <CustomImage
          src={"/images/ArrowRight.svg"}
          alt="arrow"
          small
          height={40}
          width={40}
        />
      </Card>
    </Card>
  );
};

type ProjectSectionHeaderType = {
  title: string;
  children?: React.ReactNode;
};

const ProjectSectionHeader = ({
  title,
  children,
}: ProjectSectionHeaderType) => {
  return (
    <Card>
      <Text color={3} size={50} weight={600}>
        {title}
      </Text>
      {children}
    </Card>
  );
};

const ProjectSubTitle = ({ title, children }: ProjectSectionHeaderType) => {
  return (
    <Card size={0}>
      <Text color={3} size={30} weight={400}>
        {title}
      </Text>
      {children}
    </Card>
  );
};

const projectParagraphStyles = {
  size: 30,
  color: 3,
};

export const Novemberfest = () => {
  return (
    <Card backgroundColor={4} radius={0} flexDirection="column" gap={60}>
      <ProjectTitle
        link="https://beergarten.vercel.app"
        title="Novemberfest"
        headerImage="/images/NovemberfestSC1.png"
      />
      <Text
        size={projectParagraphStyles.size}
        color={projectParagraphStyles.color}
      >
        When a friend wanted a custom party invite for his "Novemberfest" themed
        party. (A mixture of Oktoberfest, and the Berlin Nightclub Scene). I set
        out to do exactly that. A three part interactive game leading to the
        party inviation. For the project I coded the entire website. I also
        created all of the animations (with the help of AI), made all of the
        music (also with the help of AI), and synthesized all of the vocals (not
        AI).
      </Text>
      <ProjectSectionHeader title="Inspiration">
        <Card flexDirection="row" size={0} flexWrap="wrap">
          <CustomImage src={"/images/s1.png"} alt="s1" width={80} />
          <Gutter size={20} horizontal />
          <Text
            size={projectParagraphStyles.size}
            color={projectParagraphStyles.color}
          >
            The inspiration for this sort of interactive invite comes from the
            release of Mac Miller's Faces Mixtape released in 2014. To gain
            access to the mixtape, you first had to make a sandwich on an
            interactive website. I wanted to create something like this with
            even more interaction.
          </Text>
        </Card>
      </ProjectSectionHeader>
      <ProjectSectionHeader title="Design Choices">
        <ProjectSubTitle title="Animation Style" />
        <Text
          size={projectParagraphStyles.size}
          color={projectParagraphStyles.color}
        >
          When creating this game, I used Midjourney for most of the characters
          and animations. I found that this animation style, similar to the TV
          show "Family Guy", produced the most reliable results in consistent
          style, whereas other styles, namely Studio Ghibli, looked different
          across characters and scenes.
        </Text>
        <Card>
          <CustomImage
            src={"/images/BouncerHDStill.png"}
            alt="animated bouncer"
          />
          <CustomImage src={"/images/OperaHouse.png"} alt="animated Opera" />
        </Card>
      </ProjectSectionHeader>
      <Card>
        <ProjectSubTitle title="Font Selection" />
        <Text
          size={projectParagraphStyles.size}
          color={projectParagraphStyles.color}
        >
          To match the German theme of the party invitation, I decided that the
          font "Germiania-One" was the best font for the job. Simple and modern
          enough to match typical website fonts, yet undoubtedly Germanic in
          feeling.
        </Text>
        <CustomImage src={"/images/GermaniaFont.png"} alt="GermaniaFont" />
      </Card>
      <Card>
        <ProjectSubTitle title="Color Scheme" />
        <Text
          size={projectParagraphStyles.size}
          color={projectParagraphStyles.color}
        >
          I wanted each cut-scene to be independent and immersive. Thus I have
          no over-arching color scheme.
        </Text>
        <CustomImage src={"/images/GermaniaFont.png"} alt="GermaniaFont" />
      </Card>
      <Card>
        <ProjectSubTitle title="Game Design" />
        <Text
          size={projectParagraphStyles.size}
          color={projectParagraphStyles.color}
        >
          Similar to the sandwich making game that created the inspiration, the
          games could not be lost. They merely are meant to create a moment of
          interaction and integration. Each level also had the option to skip in
          case the user was dis-interested or the game was not working as
          expected.
        </Text>
        <CustomImage src={"/images/Brat.png"} alt="Brat" />
      </Card>
    </Card>
  );
};

export const KDMSite = () => {
  return (
    <Card backgroundColor={4} radius={0} flexDirection="column" gap={60}>
      <ProjectTitle
        link="https://beergarten.vercel.app"
        title="Film Direction Portfolio"
        headerImage="/images/NovemberfestSC1.png"
      />
    </Card>
  );
};
