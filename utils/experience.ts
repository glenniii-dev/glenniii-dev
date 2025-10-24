interface Experience {
  role: string;
  timeline: string;
  description: string[];
}

const experience: Experience[] = [
  {
    role: "Pixel Pulse News (Lead Web Developer)",
    timeline: "August 2025 - Present",
    description: [
      "Started as Intern; promoted to Lead Developer to oversee all front-end and back-end web projects.", 
      "Built and maintained a fully responsive STEM education and news platform using React, TypeScript, Next.js, and Tailwind CSS.", 
      "Led a team of developers in refactoring code, implementing scalable architecture, and adopting modern tools to improve performance and maintainability.", 
      "Optimized automated CI/CD workflows with Vercel and GitHub Actions, streamlining deployment and reducing manual overhead.", 
      "Collaborated with design and content teams to deliver engaging, accessible digital experiences for a diverse STEM audience."
    ]
  },
  {
    role: "STEMPLORE by Stem For Others (Web Developer)",
    timeline: "August 2025 - Present",
    description: [
      "Contributed to developing the front-end using React, TypeScript, and Tailwind CSS.",
      "Collaborated effectively with a team of developers on features and projects.",
      "Managed version control and codebase using Git and GitHub."
    ]
  },
  {
    role: "Self Directed Learning and Project Development",
    timeline: "March 2025 - Present",
    description: [
      "Completed advanced coursework and earned multiple certificates on freeCodeCamp and Codecademy.",
      "Engaged with online developer communities.",
      "Built a personal portfolio and developed real-world projects and tools."
    ]
  }
];

export default experience