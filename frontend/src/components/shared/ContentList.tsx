"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Items {
  id: number;
  title: string;
  tags: string[];
  image?: string;
  content: string;
}

export default function ContentList({contentType, items}: {contentType: string, items: Items[]}) {

  const component = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const [currentItem, setCurrentItem] = useState<null | number>(null);

  const lastMousePos = useRef({ x: 0, y: 0 });

  useGSAP(() => {
    itemsRef.current.forEach((item) => {
      gsap.fromTo(item, 
        {
          opacity: 0,
          y: 20,
        }, 
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "elastic.out(1,0,3)",
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100px",
            end: "bottom center",
            toggleActions: "play none none none"
          }
        }
    )
  })
  })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
      
      const deltaX = mousePos.x - lastMousePos.current.x;
      const speed = Math.sqrt(deltaX * deltaX);
      
      const maxY = window.scrollY + window.innerHeight - 350;
      const maxX = window.innerWidth - 250;

      gsap.to(revealRef.current, {
        x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
        y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
        rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
        ease: "back.out(2)",
        duration: 1.3,
        opacity: 1
      });

      // Update last position
      lastMousePos.current = mousePos;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [revealRef]);

  const contentImages = items.map((item) => item.image);

  
  return (
    <div ref={component}>
      <ul className="grid border-b border-b-slate-100"
        onMouseLeave={() => setCurrentItem(null)}>
        {items.map((item, index) => (
          <li key={item.id} ref={(el) => { itemsRef.current[index] = el}} className="list-item opacity-0f"
            onMouseEnter={() => setCurrentItem(index)}>
            <Link 
              aria-label={item.title}
              href={contentType === "blog" ? `/blog/${item.id}` : `/projects/${item.id}`} 
              className="flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 md:flex-row">
              <div className="flex flex-col">
                <span className="text-3xl font-bold">{item.title}</span>
                <div className="flex gap-3 text-yellow-400 text-lg font-bold">
                  {item.tags.map((tag, tagIndex) => ( 
                    <span key={tagIndex}>{tag}</span>
                  ))}
                </div>
              </div>
              <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0 hover:text-yellow-400">
                {contentType === "blog" ? "Read More" : "View Project"} <MdArrowOutward />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {/* Hover Element
      <div ref={revealRef} className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[220px] w-[320px] rounded-lg bg-over bg-center bg-cover opacity-0 transition-[background] duration-300" style={{ backgroundImage: currentItem !== null ? `url(${contentImages[currentItem]})` : ""}}>

      </div> */}
    </div>
  )
}