"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { MdDashboard, MdArticle, MdFolder, MdChat, MdLogout, MdMenu, MdClose } from 'react-icons/md';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: <MdDashboard className="w-5 h-5" /> },
  { href: '/admin/blogs', label: 'Blogs', icon: <MdArticle className="w-5 h-5" /> },
  { href: '/admin/projects', label: 'Projects', icon: <MdFolder className="w-5 h-5" /> },
  { href: '/admin/comments', label: 'Comments', icon: <MdChat className="w-5 h-5" /> },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-slate-100 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <MdClose className="w-6 h-6" /> : <MdMenu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 z-40 
        w-64 min-h-screen h-full 
        bg-slate-800/50 backdrop-blur-sm border-r border-slate-700
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="px-6 py-6">
          <h2 className="text-2xl font-semibold text-slate-100">Admin</h2>
        </div>
        <nav className="px-4">
          <ul className="space-y-2">
            {navItems.map(({ href, label, icon }) => (
              <li key={href}>
                <Link 
                  href={href}
                  className={`
                    flex items-center gap-3 px-4 py-3 
                    rounded-lg transition-colors duration-200
                    ${isActive(href) 
                      ? 'bg-[#007AFF]/10 text-[#007AFF]' 
                      : 'text-slate-300 hover:bg-slate-700/50'}
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {icon}
                  {label}
                </Link>
              </li>
            ))}
            <li className="mt-8">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
              >
                <MdLogout className="w-5 h-5" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
