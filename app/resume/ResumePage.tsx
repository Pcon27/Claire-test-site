"use client";

import Card from "../components/flexBox/Card";
import Text from "../components/text/Text";
import Gutter from "../components/flexBox/Gutter";
import {
  EducationType,
  EducationData,
  ExperienceData,
  ExperienceType,
  ProjectData,
  ProjectType,
} from "../siteData/projectData";
import SectionLayout from "../portfolio/SectionLayout";
import SectionHeader from "../portfolio/SectionHeader";

export default function ResumePage() {
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
      <Gutter size={60} />
      <Card
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        backgroundColor={1}
        radius={0}
      >
        <Card
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          size={0}
        >
          <Text color={2} weight={600} size={80}>
            Peter Consagra
          </Text>
          <Gutter size={20} />
        </Card>
        <Gutter size={40} />
        <SectionHeader title="Education" />
        <Card
          size={0}
          flexDirection="column"
          alignItems="flex-start"
          width="fill"
        >
          {EducationData.map((education: EducationType, index: number) => (
            <SectionLayout
              key={index}
              title={education.school}
              subtext={education.degree}
              years={education.years}
              location={education.location}
              bulletPoints={
                education.educationBulletPoints || [education.description || ""]
              }
            />
          ))}
        </Card>
        <SectionHeader title="Experience" />
        <Card
          size={0}
          flexDirection="column"
          alignItems="flex-start"
          width="fill"
        >
          {ExperienceData.map((experience: ExperienceType, index: number) => (
            <SectionLayout
              key={index}
              title={experience.company}
              subtext={experience.position}
              years={experience.years}
              location={experience.location}
              bulletPoints={
                experience.bulletPoints || [experience.description || ""]
              }
            />
          ))}
        </Card>
      </Card>
    </Card>
  );
}
