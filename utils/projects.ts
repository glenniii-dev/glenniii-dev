interface Projects {
  id: number,
  title: string,
  description: string,
  link: string,
}

const projects: Projects[] = [
  {
    id: 1,
    title: "This Site",
    description: "A personal portfolio website built using NextJS, Vercel, React, Tailwind CSS, TypeScript, GSAP, and PostgreSQL.",
    link: "/"
  },
  {
    id: 2,
    title: "CODEXEDOC",
    description: "A coding threads site built using NextJS, Vercel, React, Tailwind CSS, Shadcn, TypeScript, Mongoose, and MongoDB.",
    link: "https://www.codexedoc.com/"
  },
  {
    id: 3,
    title: "Just Wise Love",
    description: "A accurate knowledge education site built using React, Vite, TypeScript, Tailwind CSS, Vercel, ExpressJS, RestAPI, mongoose, and MongoDB.",
    link: "https://www.justwiselove.com/"
  },
  {
    id: 4,
    title: "Pixel Pulse News",
    description: "A STEM education site built using NextJS, Vercel, React, Tailwind CSS, Shadcn, and TypeScript.",
    link: "https://pixelpulsenews.vercel.app/"
  },
  {
    id: 5,
    title: "Dish Dash",
    description: "A responsive recipe finder site created using HTML, CSS, and JavaScript.",
    link: "https://glenniii-dev.github.io/dish-dash/"
  },
  {
    id: 6,
    title: "Dessert Shop",
    description: "A online shopping page created using HTML, CSS, and JavaScript.",
    link: "https://glenniii-dev.github.io/dessert-shop/"
  },
  {
    id: 7,
    title: "Pangolin Magazine",
    description: "A magazine site created using HTML, and CSS.",
    link: "https://glenniii-dev.github.io/pangolin-magazine/"
  },
  {
    id: 8,
    title: "Original Trombones",
    description: "A product landing page created using HTML, and CSS",
    link: "https://glenniii-dev.github.io/original-trombones/"
  }
]

export default projects