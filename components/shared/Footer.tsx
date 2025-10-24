import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa6";
import navigation from "@/utils/navigation";

export default async function Footer() {

  return (
    <footer className="text-slate-600 mx-auto max-w-7xl">
      <div className="container mx-auto mt-20 flex flex-col items-center justify-between gap-6 py-8 sm:flex-row ">
        <div className="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tighter text-slate-100 transition-colors duration-150 hover:text-yellow-400"
          >
            {navigation.name}
          </Link>
          <span
            className="hidden text-5xl font-extralight leading-0 text-slate-400 sm:inline"
            aria-hidden={true}
          >
            /
          </span>
          <p className=" text-sm text-slate-300 ">
            © {new Date().getFullYear()} {navigation.name}
          </p>
        </div>
        <nav className="navigation" aria-label="Footer Navigation">
          <ul className="flex items-center gap-1">
            {navigation.navItems.map(({ href, label }, index) => (
              <React.Fragment key={label}>
                <li>
                  <Link
                    className="group relative block overflow-hidden  rounded px-3 py-1 text-base font-bold text-slate-100 transition-colors duration-150 hover:hover:text-yellow-400"
                    href={href}
                  >
                    {label}
                  </Link>
                </li>
                {index < navigation.navItems.length - 1 && (
                  <span
                    className="text-4xl font-thin leading-0 text-slate-400"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <div className="socials inline-flex justify-center sm:justify-end">

          <Link
            href="https://github.com/glenniii-dev"
            className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
            aria-label={navigation.name + " on GitHub"}
          >
            <FaGithub />
          </Link>

          <Link
            href="https://www.linkedin.com/in/glenniii-dev/"
            className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
            aria-label={navigation.name + " on LinkedIn"}
          >
            <FaLinkedin />
          </Link>

          <Link
            href="https://discord.com/users/1399723224350068798"
            className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
            aria-label={navigation.name + " on Discord"}
          >
            <FaDiscord />
          </Link>

        </div>
      </div>
    </footer>
  );
}