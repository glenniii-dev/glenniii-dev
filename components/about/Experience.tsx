import experience from "@/utils/experience"

export default function Experience() {
  return (
    <div className="w-full max-w-screen break-word md:max-w-7xl mx-auto items-center px-4 py-10 md:px-6 md:py-14 lg:py-16 space-y-20">
      <h1 className="col-start-1 text-6xl md:text-8xl font-bold">Experience</h1>
      {experience.map((item, index) => (
        <div key={index} className="flex flex-col space-y-4 max-w-4xl md:pl-10">
          <h2 className="text-4xl font-bold">{item.role}</h2>
          <h3 className="text-2xl font-bold text-yellow-400">{item.timeline}</h3>
          <ul className="text-slate-300 text-lg leading-relaxed space-y-4">
            {item.description.map((item, index) => (<li key={index} className="list-disc ml-10">{item}</li>))}
          </ul>
        </div>
      ))}
    </div>
  )
}
