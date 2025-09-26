import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3Alt, faJs, faReact, faGitAlt, faGithub, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { faMobile, faCode, faN, faWind, faS, faLeaf, faDatabase, faCloud } from '@fortawesome/free-solid-svg-icons';

export default function Skills() {
  return (
    <section className="bg-(--blue) rounded-3xl p-8 shadow-md transition-transform duration-300 hover:-translate-y-1 lg:col-span-2">
        <h2 className="text-2xl font-semibold text-white border-b-2 border-(--light-blue) pb-2 mb-4">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <span className="border-1 border-(--light-blue) text-white px-4 py-2 rounded-2xl flex items-center gap-2"><FontAwesomeIcon icon={faHtml5} />HTML</span>
          <span className="border-1 border-(--light-blue) text-white px-4 py-2 rounded-2xl flex items-center gap-2"><FontAwesomeIcon icon={faCss3Alt} />CSS</span>
          <span className=" border-1 border-(--light-blue) text-white px-4 py-2 rounded-2xl flex items-center gap-2"><FontAwesomeIcon icon={faMobile} />Responsive</span>
          <span className="border-1 border-(--light-blue) text-white px-4 py-2 rounded-2xl flex items-center gap-2"><FontAwesomeIcon icon={faJs} />JavaScript</span>
          <span className="border-1 border-(--light-blue) text-white px-4 py-2 rounded-2xl flex items-center gap-2"><FontAwesomeIcon icon={faCode} />TypeScript</span>
          <span className="border-1 border-(--light-blue) text-white px-4 py-2 rounded-2xl flex items-center gap-2"><FontAwesomeIcon icon={faReact} />React</span>
          <span className="border-1 border-(--light-blue) text-white px-4 py-2 rounded-2xl flex items-center gap-2"><FontAwesomeIcon icon={faN} />NextJS</span>
          <span className="border-1 border-(--light-blue) text-white px-4 py-2 rounded-2xl flex items-center gap-2"><FontAwesomeIcon icon={faWind} />TailwindCSS</span>
          <span className="border-1 border-(--light-blue) text-white px-4 py-2 rounded-2xl flex items-center gap-2"><FontAwesomeIcon icon={faS} />Shadcn</span>
          <span className="border-1 border-(--light-blue) text-white px-4 py-2 rounded-2xl flex items-center gap-2"><FontAwesomeIcon icon={faGitAlt} />Git</span>
          <span className="border-1 border-(--light-blue) text-white px-4 py-2 rounded-2xl flex items-center gap-2"><FontAwesomeIcon icon={faGithub} />GitHub</span>
          <span className="border-1 border-(--light-blue) text-white px-4 py-2 rounded-2xl flex items-center gap-2"><FontAwesomeIcon icon={faMicrosoft} />VS Code</span>
          <span className="border-1 border-(--light-blue) text-white px-4 py-2 rounded-2xl flex items-center gap-2"><FontAwesomeIcon icon={faLeaf} />MongoDB</span>
          <span className="border-1 border-(--light-blue) text-white px-4 py-2 rounded-2xl flex items-center gap-2"><FontAwesomeIcon icon={faDatabase} />Mongoose</span>
          <span className="border-1 border-(--light-blue) text-white px-4 py-2 rounded-2xl flex items-center gap-2"><FontAwesomeIcon icon={faCloud} />Vercel</span>
        </div>
    </section>
  )
}