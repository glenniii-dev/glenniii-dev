import Header from '@/components/sections/Header';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

export default function page() {

  return (
    <div className="font-open-sans bg-(--dark-blue) text-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </div>
    </div>
  )
}