import Image from "next/image";

export default function About() {
  return (
    <section className="bg-(--blue) rounded-3xl p-8 shadow-md transition-transform duration-300 hover:-translate-y-1">
        <h2 className="text-2xl font-semibold border-b-2 border-(--light-blue) pb-2 mb-4">About Me</h2>
        <div className="about-grid">
          <p className="text-white leading-relaxed">Hey, I'm Glenn, a front-end developer who’s passionate about crafting clean, engaging websites. I love creating and transforming ideas through code.</p>
          <Image src="/images/glenniii.png" alt="Profile Picture" width={1000} height={1000} className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl border-2 border-(--light-blue) shadow-md transition-transform duration-300 hover:scale-105" />
        </div>
    </section>
  )
}