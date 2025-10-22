"use client";

import stack from "@/utils/Stack"
import React, { useRef } from "react"
import { MdCircle } from "react-icons/md"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

export default function Stack() {
  const component = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: component.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 4
      },
    });

    tl.fromTo(
      ".tech-row",
      {
        x: (index) => {
          return index % 2 === 0 ? gsap.utils.random(600, 400) : gsap.utils.random(-600, -400);
        }
      },
      {
        x: (index) => {
          return index % 2 === 0 ? gsap.utils.random(-600, -400) : gsap.utils.random(600, 400);
        },
        ease: "power1.inOut"
      },
    )
    
  }, [component]);

  return (
    <section>
      <div className="w-full max-w-7xl mx-auto items-center px-4 py-10 md:px-6 md:py-14 lg:py-16 space-y-20">
        <h1 className="col-start-1 text-8xl font-bold mb-8">What I Use</h1>
      </div>
      {stack.map((item, index) => (
        <div key={index} aria-label={item.tech || undefined} className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700">
          {Array.from({ length: 15 }, (_, index) => (
            <React.Fragment key={index}>
              <span className="text-item text-8xl font-extrabold uppercase tracking-tighter" style={{ color: index === 7 && item.color ? item.color : "inherit" }}>
                {item.tech}
              </span>
              <span className="text-3xl">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  )
}
// 2:52:38