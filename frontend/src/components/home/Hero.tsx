"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react"
import Shapes from "../three/Shapes";
import PlanetSection from "../three/Planet";

export default function Hero() {

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".name-animation", 
      {
        x: -100, 
        opacity: 0, 
        rotate: -10
      },
      {
        x: 0, 
        opacity: 1, 
        rotate: 0, 
        ease: "elastic.out(1, 0.3)",
        transformOrigin: "left top",
        delay: 0.5,
        stagger: {
          each: 0.1,
          from: "random"
        }
      },
    );

    tl.fromTo(".job-title",
      {
        y: 20,
        opacity: 0,
        scale: 1.2
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scale: 1,
        ease: "elastic.out(1, 0.3)",
      }
    );
  })

  const renderLetters = (name: string, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span key={index} className={`name-animation name-animation-${key} inline-block opacity-0`}>
        {letter}
      </span>
    ));
  }
  return (
    <section className="grid min-h-[80vh] grid-cols-1 lg:grid-cols-2 items-center px-4 py-10 md:px-6 md:py-14 lg:py-16 w-full max-w-7xl mx-auto">
        <div className="col-start-1 lg:row-start-1"> 
          <h1 className="mb-8 text-[clamp(3rem,15vmin,15rem)] font-extrabold leading-none tracking-tighter" aria-label="Glenn Hensley III"> 
            <span className="block text-slate-300">{renderLetters("Glenn", "first")}</span> 
            <span className="-mt-[.2em] block text-slate-500">{renderLetters("Hensley", "second")} {renderLetters("III", "third")}</span> 
            </h1> 
            <span className="job-title block bg-linear-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 lg:text-4xl">Web Developer</span> 
        </div> 
        <Shapes />
        {/* <PlanetSection /> */}
    </section>
  )
}
