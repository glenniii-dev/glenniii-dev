import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {

  return (
    <div className="font-open-sans bg-slate-900 min-h-screen">
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

export default App
