import education from "@/utils/education"

export default function Education() {
  return (
    <div className="w-full max-w-screen break-word md:max-w-7xl mx-auto items-center px-4 py-10 md:px-6 md:py-14 lg:py-16 space-y-20">
      <h1 className="col-start-1 text-6xl md:text-8xl font-bold">Education</h1>
      {education.map((item, index) => (
        <div key={index} className="flex flex-col space-y-4 max-w-4xl md:pl-10">
          <h2 className="text-4xl font-bold">{item.subject}</h2>
          <h3 className="text-2xl font-bold text-yellow-400">{item.timeline}</h3>
          <p className="text-slate-300 text-lg leading-relaxed space-y-4">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  )
}
