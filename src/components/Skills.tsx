export default function Skills() {
  return (
    <section className="bg-slate-800 rounded-3xl p-8 shadow-md transition-transform duration-300 hover:-translate-y-1 lg:col-span-2">
        <h2 className="text-2xl font-semibold text-white border-b-2 border-[#ff8000] pb-2 mb-4">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <span className="border-1 border-[#ff8000] text-white px-4 py-2 rounded-2xl flex items-center"><i className="fa-brands fa-html5 mr-2"></i>HTML</span>
          <span className="border-1 border-[#ff8000] text-white px-4 py-2 rounded-2xl flex items-center"><i className="fa-brands fa-css3-alt mr-2"></i>CSS</span>
          <span className="border-1 border-[#ff8000] text-white px-4 py-2 rounded-2xl flex items-center"><i className="fa-brands fa-js mr-2"></i>JavaScript</span>
          <span className="border-1 border-[#ff8000] text-white px-4 py-2 rounded-2xl flex items-center"><i className="fa-solid fa-code mr-2"></i>TypeScript</span>
          <span className="border-1 border-[#ff8000] text-white px-4 py-2 rounded-2xl flex items-center"><i className="fa-brands fa-react mr-2"></i>React</span>
          <span className="border-1 border-[#ff8000] text-white px-4 py-2 rounded-2xl flex items-center"><i className="fa-solid fa-wind mr-2"></i>Tailwind CSS</span>
          <span className="border-1 border-[#ff8000] text-white px-4 py-2 rounded-2xl flex items-center"><i className="fa-brands fa-git-alt mr-2"></i>Git</span>
          <span className="border-1 border-[#ff8000] text-white px-4 py-2 rounded-2xl flex items-center"><i className="fa-brands fa-github mr-2"></i>Github</span>
          <span className="border-1 border-[#ff8000] text-white px-4 py-2 rounded-2xl flex items-center"><i className="fa-solid fa-mobile-alt mr-2"></i>Responsive Design</span>
          <span className="border-1 border-[#ff8000] text-white px-4 py-2 rounded-2xl flex items-center"><i className="fa-brands fa-microsoft mr-2"></i>Visual Studio Code</span>
          <span className="border-1 border-[#ff8000] text-white px-4 py-2 rounded-2xl flex items-center"><i className="fa-solid fa-v mr-2"></i>Vite</span>
        </div>
    </section>
  )
}