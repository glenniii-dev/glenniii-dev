import Link from "next/link";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="top-0 z-50 mx-auto max-w-7xl md:sticky lg:top-4 lg:rounded-xl bg-slate-100 text-slate-900 p-3 shadow-2xl">
      <NavBar />
    </header>
  )
}