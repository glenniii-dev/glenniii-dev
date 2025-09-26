import PortfolioItem from "../cards/PortfolioItem";

export default function Projects() {
  return (
    <section className="lg:col-span-3 bg-(--blue) rounded-3xl p-8 shadow-md transition-transform duration-300 hover:-translate-y-1">
      <h2 className="text-2xl font-semibold border-b-2 border-(--light-blue) pb-2 mb-6">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
        <PortfolioItem image="glenniii-dev" title="This Site" description="A personal portfolio website built using NextJS, Vercel, React, Tailwind CSS, and TypeScript." link="/" />
        <PortfolioItem image="codexedoc" title="CODEXEDOC" description="A coding threads site built using NextJS, Vercel, React, Tailwind CSS, Shadcn, TypeScript, Mongoose, and MongoDB." link="https://www.codexedoc.com/" />
        <PortfolioItem image="pixel-perfect-news" title="Pixel Perfect News" description="A STEM education site built using NextJS, Vercel, React, Tailwind CSS, Shadcn, and TypeScript." link="https://pixel-perfect-news.vercel.app/" />
        <PortfolioItem image="just-wise-love" title="Just Wise Love" description="A accurate knowledge website built using Vite, React, Tailwind CSS, and JavaScript." link="https://justwiselove.com/" />
        <PortfolioItem image="dish-dash" title="Dish Dash" description="A responsive recipe finder site created using HTML, CSS, and JavaScript." link="https://glenniii-dev.github.io/dish-dash/" />
        <PortfolioItem image="dessert-shop" title="Dessert Shop" description="A online shopping page created using HTML, CSS, and JavaScript." link="https://glenniii-dev.github.io/dessert-shop/" />
        <PortfolioItem image="original-trombones" title="Original Trombones" description="A product landing page created using HTML, and CSS." link="https://glenniii-dev.github.io/original-trombones/" />
        <PortfolioItem image="pangolin-magazine" title="Pangolin Magazine" description="A magazine site created using HTML, and CSS." link="https://glenniii-dev.github.io/pangolin-magazine/" />
      </div>
    </section>
  )
}