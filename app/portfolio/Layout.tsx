"use client";

import Card from "../components/flexBox/Card";
import Text from "../components/text/Text";
import FunSection from "./FunSection";
import Opinions from "./Opinions";
import Projects from "./Projects";
import ResumeBits from "./Resume";

const Intro = () => {
  return (
    <Card>
      <Text color={2}>
        Hey There! My name is{" "}
        <span style={{ color: "white", fontWeight: "bold" }}>
          Peter Consagra
        </span>
        , and welcome to my online portfolio. Believe it or not, I actually
        created this entire site the old fashioned way (coded it myself with
        Next.JS). Stay a while and check out{" "}
        <span style={{ color: "white", fontWeight: "bold" }}>my work</span>,
        read some of{" "}
        <span style={{ color: "white", fontWeight: "bold" }}>my thoughts</span>,
        and lay down some{" "}
        <span style={{ color: "white", fontWeight: "bold" }}>funky tunes</span>.
        If you want to get in touch for any reason, feel free to reach out to me
        at{" "}
        <span style={{ color: "white", fontWeight: "bold" }}>
          pconsagra@gmail.com
        </span>
      </Text>
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
      <Projects />
      <ResumeBits />
      <Opinions />
      <FunSection />
    </Card>
  );
}
