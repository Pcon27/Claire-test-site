"use client";

import Link from "next/link";
import Card from "../components/flexBox/Card";
import Text from "../components/text/Text";
import FunSection from "./FunSection";
import Opinions from "./Opinions";
import Projects from "./Projects";
import ResumeBits from "./Resume";

const EMAIL = "pconsagra@gmail.com";

const introLinks = [
  { label: "My work", href: "#projects" },
  { label: "My thoughts", href: "#opinions" },
  { label: "Funky tunes", href: "/pressplay" },
];

const IntroChip = ({
  label,
  href,
  primary = false,
}: {
  label: string;
  href: string;
  primary?: boolean;
}) => (
  <Link href={href}>
    <Card
      backgroundColor={primary ? 1 : 2}
      radius={0}
      borderWidth={1}
      borderColor={5}
      dropShadow={5}
      size={20}
      flexDirection="row"
      alignItems="center"
      style={{
        cursor: "pointer",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
    >
      <Text color={primary ? 1 : 2} size={15} weight={600}>
        {label} →
      </Text>
    </Card>
  </Link>
);

const Intro = () => {
  return (
    <Card width="fill" size={40} radius={0} style={{ boxSizing: "border-box" }}>
      <Card
        backgroundColor={1}
        radius={0}
        borderWidth={1}
        borderColor={5}
        size={60}
        gap={40}
        width="fill"
        flexDirection="column"
        style={{
          boxSizing: "border-box",
          boxShadow: "4px 4px 0 var(--border5)",
        }}
      >
        <Card size={0} gap={20} flexDirection="column" width="fill">
          <Text color={1} size={10} weight={600}>
            HELLO, WORLD
          </Text>
          <Text color={2} size={80} weight={600}>
            Hey there, I&apos;m Peter Consagra.
          </Text>
          <Text color={2} size={30} weight={300} style={{ maxWidth: "40rem" }}>
            Welcome to my online portfolio. Believe it or not, I built this
            entire site the old-fashioned way — coded it myself with Next.js.
            Stay a while: check out my work, read some of my thoughts, and lay
            down some funky tunes.
          </Text>
        </Card>

        <Card
          size={0}
          gap={30}
          flexDirection="row"
          flexWrap="wrap"
          alignItems="center"
        >
          {introLinks.map((link) => (
            <IntroChip key={link.href} {...link} />
          ))}
        </Card>

        <Card
          width="fill"
          style={{ height: "1px" }}
          backgroundColor={4}
          size={0}
        />

        <Card
          size={0}
          gap={20}
          flexDirection="row"
          flexWrap="wrap"
          alignItems="center"
        >
          <Text color={2} size={20} weight={300}>
            Want to get in touch for any reason?
          </Text>
          <a href={`mailto:${EMAIL}`}>
            <Text color={1} size={20} weight={600} hover="underline">
              {EMAIL}
            </Text>
          </a>
        </Card>
      </Card>
    </Card>
  );
};

export default function Layout() {
  return (
    <Card
      backgroundColor={3}
      radius={0}
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      style={{ minHeight: "100svh", width: "100%" }}
      size={0}
    >
      <Intro />
      <section id="projects" style={{ width: "100%" }}>
        <Projects />
      </section>
      <ResumeBits />
      <section id="opinions" style={{ width: "100%" }}>
        <Opinions />
      </section>
      <FunSection />
    </Card>
  );
}
