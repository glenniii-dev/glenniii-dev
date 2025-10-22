"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

type AvatarProps = {
  src: string;
  alt: string;
  className?: string;
}

export default function Avatar({ src, alt, className }: AvatarProps) {
  const component = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".avatar", 
      {
        opacity: 0,
        scale: 1.4
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.3,
        ease: "power3.inOut"
      }
    );

    window.onmousemove = (e) => {
      if (!component.current) return;

      const componentRect = (component.current as HTMLDivElement).getBoundingClientRect();
      const componentCenterX = componentRect.left + componentRect.width / 2;

      const componentPercent = {
        x: (e.clientX - componentCenterX) / componentRect.width / 2,
      };

      const distFromCenter = 1 - Math.abs(componentPercent.x);

      gsap.timeline({
        defaults: {
          duration: 0.5,
          overwrite: "auto",
          ease: "power3.Out"
        }
      }).to(".avatar", {
        rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
        duration: .5
      }, 0).to(".highlight", {
        opacity: distFromCenter - 0.7,
        x: -10 + 20 & componentPercent.x,
        duration: .5
      }, 0);
    }
  })

  return (
    <div ref={component} className={`relative h-full w-full ${className}`}>
      <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0">
        <Image src={src} alt={alt} width={300} height={300} className="avatar-image h-full w-full object-fill" />
        <div className="highlight absolute inset-0 hidden w-full  scale-110 bg-linear-to-tr from-transparent via-white to-transparent opacity-0 lg:block"></div>
      </div>
    </div>
  )
}