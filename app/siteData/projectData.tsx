// CONTACT

export type ContactType = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
};

export const ContactData: ContactType = {
  name: "Henry Smith",
  email: "henrys@gmail.com",
  phone: "(123) 456-7890",
  address: "123 Main St, Anytown, USA",
};

// EDUCATION

export type EducationType = {
  school?: string;
  degree?: string;
  years?: string;
  description?: string;
  location?: string;
  educationBulletPoints?: string[];
};

export const EducationData: EducationType[] = [
  {
    school: "University of California, Los Angeles",
    degree: "Bachelor of Arts in Political Science",
    years: "2018-2022",
    location: "Los Angeles, CA",
  },
  {
    school: "Kellogg School of Management",
    degree: "Masters of Business Administration (MBA)",
    years: "2026-2028",
    location: "Evanston, IL",
  },
  {
    school: "Northwestern University",
    degree: "Master of Science in Design Innovation",
    years: "2026-2028",
    location: "Evanston, IL",
  },
];

// EXPERIENCE

export type ExperienceType = {
  company?: string;
  position?: string;
  years?: string;
  description?: string;
  location?: string;
  bulletPoints?: string[];
};

export const ExperienceData: ExperienceType[] = [
  {
    company: "Tech Solutions Inc.",
    position: "Software Engineer",
    years: "2022-Present",
    description:
      "Developing and maintaining web applications using modern frameworks and technologies.",
    location: "San Francisco, CA",
    bulletPoints: [
      "Led development of a customer-facing web application using React and Node.js.",
      "Implemented CI/CD pipelines to automate testing and deployment processes.",
    ],
  },
  {
    company: "Innovatech Labs",
    position: "AI Research Intern",
    years: "2021-2022",
    description:
      "Conducted research on machine learning algorithms and contributed to the development of AI models.",
    location: "Boulder, CO",
    bulletPoints: [
      "Assisted in the development of machine learning models for natural language processing.",
      "Participated in research meetings and contributed to the design of experimental protocols.",
    ],
  },
  {
    company: "Global Tech Corp",
    position: "Sales Associate",
    years: "2020-2021",
    description:
      "Provided customer service and sales support for a variety of products.",
    location: "Denver, CO",
    bulletPoints: [
      "Achieved sales targets and maintained strong relationships with existing clients.",
      "Participated in training sessions to improve product knowledge and sales techniques.",
    ],
  },
];

// PROJECTS

export type ProjectType = {
  name: string;
  url: string;
  description?: string;
  technologies?: string[];
};

export const ProjectData: ProjectType[] = [
  {
    name: "Project Alpha",
    url: "https://www.projectalpha.com",
    description:
      "A web application that allows users to track their daily tasks and manage their time effectively.",
    technologies: ["React", "Node.js", "MongoDB"],
  },
  {
    name: "Project Beta",
    url: "https://www.projectbeta.com",
    description:
      "An e-commerce platform that provides a seamless shopping experience for customers.",
    technologies: ["Vue.js", "Express", "MySQL"],
  },
  {
    name: "Project Gamma",
    url: "https://www.projectgamma.com",
    description:
      "A mobile application that helps users monitor their fitness activities and set health goals.",
    technologies: ["React Native", "Firebase"],
  },
];

// BLURB

export type BlurbType = {
  title?: string;
  content?: string;
};

export const blurbData: BlurbType = {
  title: "About Me",
  content:
    "I am a passionate software engineer with experience in web development and artificial intelligence. I enjoy creating innovative solutions and continuously learning new technologies.",
};
