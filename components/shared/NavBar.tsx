"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MdMenu, MdClose } from "react-icons/md";
import { usePathname } from "next/navigation";
import Button from "./Button";
import navigation from "@/utils/navigation";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col justify-between rounded-b-lg bg-slate-100 px-4 md:flex-row md:items-center md:rounded-xl">
        {/* Logo + mobile toggle */}
        <div className="flex items-center justify-between bg-slate-100">
          <NameLogo name={navigation.name} />
          <button
            aria-expanded={open}
            aria-label="Open menu"
            className="block p-2 text-2xl text-slate-800 md:hidden"
            onClick={() => setOpen(true)}
          >
            <MdMenu />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-end gap-4 bg-slate-100 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            aria-label="Close menu"
            aria-expanded={open}
            className="fixed right-4 top-3 block p-2 text-2xl text-slate-800 md:hidden"
            onClick={() => setOpen(false)}
          >
            <MdClose />
          </button>

          {navigation.navItems.map(({ href, label }, index) => (
            <React.Fragment key={label}>
              <li className="first:mt-8">
                <Link
                  href={href}
                  className={`group relative block overflow-hidden rounded px-3 text-3xl font-bold text-slate-900`}
                  onClick={() => setOpen(false)}
                  aria-current={
                    pathname === href || pathname.startsWith(href)
                      ? "page"
                      : undefined
                  }
                >
                  <span
                    className={`absolute inset-0 z-0 h-full translate-y-12 rounded bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0 ${
                      pathname === href ? "translate-y-6" : "translate-y-18"
                    }`}
                  />
                  <span className="relative">{label}</span>
                </Link>
              </li>
              {index < navigation.navItems.length - 1 && (
                <span
                  className="hidden text-4xl font-thin leading-0 text-slate-400 md:inline"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
            </React.Fragment>
          ))}

          <li>
            <Button link={navigation.cta.href} label={navigation.cta.label} className="ml-3" />
          </li>
        </div>

        {/* Desktop Menu */}
        <DesktopMenu navigation={navigation} pathname={pathname} />
      </ul>
    </nav>
  );
}

function NameLogo({ name }: { name: string }) {
  return (
    <Link
      href="/"
      aria-label="Home page"
      className="text-xl font-extrabold tracking-tighter text-slate-800"
    >
      {name}
    </Link>
  );
}

function DesktopMenu({
  navigation,
  pathname,
}: {
  navigation: {
    navItems: { href: string; label: string }[];
    cta: { href: string; label: string };
  };
  pathname: string;
}) {
  return (
    <div className="relative z-50 hidden flex-row items-center gap-1 py-0 md:flex">
      {navigation.navItems.map(({ href, label }, index) => (
        <React.Fragment key={label}>
          <li>
            <Link
              href={href}
              className="group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-800"
              aria-current={
                pathname === href || pathname.startsWith(href)
                  ? "page"
                  : undefined
              }
            >
              <span
                className={`absolute inset-0 z-0 h-full rounded bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0  ${
                  pathname === href ? "translate-y-7" : "translate-y-9"
                }`}
              />
              <span className="relative">{label}</span>
            </Link>
          </li>
          {index < navigation.navItems.length - 1 && (
            <span
              className="hidden text-4xl font-thin leading-0 text-slate-400 md:inline"
              aria-hidden="true"
            >
              /
            </span>
          )}
        </React.Fragment>
      ))}
      <li>
        <Button link={navigation.cta.href} label={navigation.cta.label} className="ml-3" />
      </li>
    </div>
  );
}