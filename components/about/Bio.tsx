import Button from "../shared/Button";
import Avatar from "./Avatar";

export default function Bio() {
  return (
    <main className="w-full max-w-screen break-word md:max-w-7xl mx-auto items-center px-4 py-10 md:px-6 md:py-14 lg:py-16 space-y-20">
    
          {/* BIO */}
          <section className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
            <h1 className="col-start-1 text-6xl md:text-8xl font-bold">About Me</h1>
    
            <div className="col-start-1 max-w-screen break-word md:max-w-3xl text-slate-300 text-lg leading-relaxed space-y-6">
              <p>
                Hello, I&apos;m Glenn! I&apos;ve always been passionate about creating things and exploring technology, and the idea of being able to combine the two as a career led me to become a web developer.
              </p>
    
              <p>
                I graduated in March 2025 with honors and a 3.9 GPA, and soon after, I started building my own website and completing courses on FreeCodeCamp from March through May. In June, I began a full-stack development course, but I eventually decided to pause and start applying for real-world opportunities to get hands-on experience.
              </p>
    
              <p>
                I applied to more than 30 entry-level and internship positions but was denied from all of them. Instead of giving up, I took it as a learning moment. I started looking for what I was missing — and noticed a common theme: React and TypeScript. From July through early August 2025, I focused on those technologies, taking courses and building projects to sharpen my skills.
              </p>
              <p>
                After completing my React and TypeScript courses, I felt more confident and began applying again for entry-level, internship, and volunteer roles. Soon after, I was contacted by a volunteer organization and started contributing to their website, helping make STEM education more accessible. During this time, I learned Next.js and Tailwind CSS, gaining hands-on experience with modern front-end development.
              </p>
              <p>
                Around the same time, I also landed an internship where I worked on a website built with Vanilla HTML, CSS, and JavaScript. I suggested using more modern tools like React, Next.js, and TailwindCSS, which allowed us to build more dynamic features and maintain the site more efficiently.
              </p>
              <p>
                Towards the end of my internship, I was promoted to Lead Web Developer, overseeing all web development projects. I&apos;m still actively applying for paid web development roles and freelancing, continually learning and growing. I&apos;m happy to have chosen this path — it&apos;s been very rewarding, and I am passionate about transforming ideas into reality through code.
              </p>
            </div>
            <Button link="/Glenn-Hensley-III.pdf" label="Resume" />
            <Avatar src="/glenn.png" alt="Glenn Hensley III" className="row-start-1 max-w-xs md:max-w-sm lg:col-start-2 lg:row-end-3" />
          </section>
    </main>
  )
}
