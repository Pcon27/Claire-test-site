import Card from "@/app/components/flexBox/Card";
import Gutter from "@/app/components/flexBox/Gutter";
import CustomImage from "@/app/components/images/CustomImage";
import Text from "@/app/components/text/Text";

// ─── Building blocks ────────────────────────────────────────────────────────

type ProjectTitleType = {
  title?: string;
  link?: string;
  headerImage?: string;
  tagline?: string;
};

const ProjectTitle = ({ title, link, headerImage, tagline }: ProjectTitleType) => {
  return (
    <Card size={0} radius={0} width="fill" flexDirection="column">
      {headerImage && (
        <CustomImage
          src={headerImage}
          alt={title ?? "project header"}
          objectFit="cover"
          resW={1600}
          resH={950}
          priority
          style={{
            width: "100%",
            height: "auto",
            maxHeight: 440,
            display: "block",
            borderBottom: "1px solid var(--border3)",
          }}
        />
      )}
      <Card
        size={60}
        radius={0}
        width="fill"
        gap={30}
        flexDirection="column"
        style={{ boxSizing: "border-box" }}
      >
        <Text color={4} size={10} weight={600} style={{ letterSpacing: "0.15em" }}>
          PROJECT
        </Text>
        <Text color={3} size={80} weight={900} style={{ lineHeight: 1.05 }}>
          {title}
        </Text>
        {tagline && (
          <Text color={4} size={30} weight={300}>
            {tagline}
          </Text>
        )}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Card
              backgroundColor={3}
              borderColor={3}
              dropShadow={3}
              flexDirection="row"
              alignItems="center"
              size={30}
              radius={0}
              gap={10}
            >
              <Text color={3} size={15} weight={600}>
                Visit live site
              </Text>
              <CustomImage
                src="/images/ArrowUpRight.svg"
                alt=""
                small
                width={20}
                height={20}
              />
            </Card>
          </a>
        )}
      </Card>
    </Card>
  );
};

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text
    size={30}
    color={3}
    weight={300}
    style={{ lineHeight: 1.65, maxWidth: "68ch" }}
  >
    {children}
  </Text>
);

type ProjectSectionType = {
  title: string;
  index?: number;
  children?: React.ReactNode;
};

const ProjectSection = ({ title, index, children }: ProjectSectionType) => {
  return (
    <Card size={0} radius={0} width="fill" flexDirection="column" gap={40}>
      <Card size={0} radius={0} width="fill" flexDirection="column" gap={10}>
        {index !== undefined && (
          <Text color={4} size={10} weight={600} style={{ letterSpacing: "0.15em" }}>
            {String(index).padStart(2, "0")}
          </Text>
        )}
        <Text color={3} size={60} weight={600}>
          {title}
        </Text>
        <Card
          width="fill"
          size={0}
          radius={0}
          style={{ height: 1, background: "var(--border3)", opacity: 0.35 }}
        />
      </Card>
      {children}
    </Card>
  );
};

const ProjectSubSection = ({ title, children }: ProjectSectionType) => {
  return (
    <Card size={0} radius={0} width="fill" flexDirection="column" gap={20}>
      <Text color={3} size={40} weight={600}>
        {title}
      </Text>
      {children}
    </Card>
  );
};

type ProjectImageType = {
  src: string;
  alt: string;
  caption?: string;
  resW?: number;
  resH?: number;
};

const ProjectImage = ({ src, alt, caption, resW, resH }: ProjectImageType) => (
  <Card size={0} radius={0} width="fill" flexDirection="column" gap={10}>
    <CustomImage
      src={src}
      alt={alt}
      resW={resW}
      resH={resH}
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        border: "1px solid var(--border3)",
        boxSizing: "border-box",
      }}
    />
    {caption && (
      <Text color={4} size={10} weight={400} italic>
        {caption}
      </Text>
    )}
  </Card>
);

const ImageGrid = ({ children }: { children: React.ReactNode }) => (
  <Card
    size={0}
    radius={0}
    width="fill"
    gap={30}
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    }}
  >
    {children}
  </Card>
);

const ProjectBody = ({ children }: { children: React.ReactNode }) => (
  <Card
    size={60}
    radius={0}
    width="fill"
    flexDirection="column"
    gap={70}
    style={{ boxSizing: "border-box" }}
  >
    {children}
  </Card>
);

// ─── Projects ───────────────────────────────────────────────────────────────

export const Novemberfest = () => {
  return (
    <Card backgroundColor={4} size={0} radius={0} flexDirection="column" width="fill">
      <ProjectTitle
        link="https://beergarten.vercel.app"
        title="Novemberfest"
        tagline="An interactive, three-part party invitation"
        headerImage="/images/NovemberfestSC1.png"
      />
      <ProjectBody>
        <Paragraph>
          When a friend wanted a custom party invite for his “Novemberfest”
          themed party (a mixture of Oktoberfest and the Berlin nightclub
          scene), I set out to do exactly that: a three-part interactive game
          leading to the party invitation. For the project I coded the entire
          website. I also created all of the animations (with the help of AI),
          made all of the music (also with the help of AI), and synthesized all
          of the vocals (not AI).
        </Paragraph>

        <ProjectSection title="Inspiration" index={1}>
          <Card
            size={0}
            radius={0}
            width="fill"
            gap={40}
            alignItems="center"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            <ProjectImage
              src="/images/s1.png"
              alt="Mac Miller Faces sandwich website"
              caption="The Faces mixtape unlock site (2014)"
              resW={660}
              resH={414}
            />
            <Paragraph>
              The inspiration for this sort of interactive invite comes from
              the release of Mac Miller’s Faces mixtape in 2014. To gain access
              to the mixtape, you first had to make a sandwich on an interactive
              website. I wanted to create something like this with even more
              interaction.
            </Paragraph>
          </Card>
        </ProjectSection>

        <ProjectSection title="Design Choices" index={2}>
          <ProjectSubSection title="Animation Style">
            <Paragraph>
              When creating this game, I used Midjourney for most of the
              characters and animations. I found that this animation style,
              similar to the TV show “Family Guy”, produced the most reliable
              results in consistent style, whereas other styles, namely Studio
              Ghibli, looked different across characters and scenes.
            </Paragraph>
            <ImageGrid>
              <ProjectImage
                src="/images/BouncerHDStill.png"
                alt="Animated bouncer"
                caption="The bouncer"
                resW={2048}
                resH={2048}
              />
              <ProjectImage
                src="/images/OperaHouse.png"
                alt="Animated opera house"
                caption="The opera house"
                resW={2048}
                resH={2048}
              />
            </ImageGrid>
          </ProjectSubSection>

          <Gutter size={20} />

          <ProjectSubSection title="Font Selection">
            <Paragraph>
              To match the German theme of the party invitation, I decided that
              the font “Germania One” was the best font for the job. Simple and
              modern enough to match typical website fonts, yet undoubtedly
              Germanic in feeling.
            </Paragraph>
            <ProjectImage
              src="/images/GermaniaFont.png"
              alt="Germania One font specimen"
              resW={2112}
              resH={1066}
            />
          </ProjectSubSection>

          <Gutter size={20} />

          <ProjectSubSection title="Color Scheme">
            <Paragraph>
              I wanted each cut-scene to be independent and immersive. Thus I
              have no over-arching color scheme.
            </Paragraph>
            <ProjectImage
              src="/images/GermaniaFont.png"
              alt="Germania One font specimen"
              resW={2112}
              resH={1066}
            />
          </ProjectSubSection>
        </ProjectSection>

        <ProjectSection title="Game Design" index={3}>
          <Paragraph>
            Similar to the sandwich-making game that inspired it, the games
            could not be lost. They are merely meant to create a moment of
            interaction and integration. Each level also had the option to skip
            in case the user was disinterested or the game was not working as
            expected.
          </Paragraph>
          <ProjectImage src="/images/Brat.png" alt="Brat level" resW={3024} resH={1724} />
        </ProjectSection>
      </ProjectBody>
    </Card>
  );
};

export const KDMSite = () => {
  return (
    <Card backgroundColor={4} size={0} radius={0} flexDirection="column" width="fill">
      <ProjectTitle
        link="https://beergarten.vercel.app"
        title="Film Direction Portfolio"
        headerImage="/images/NovemberfestSC1.png"
      />
      <ProjectBody>
        <Paragraph>Write-up coming soon.</Paragraph>
      </ProjectBody>
    </Card>
  );
};
