import React from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { isAuthenticated } from '@/utils/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await isAuthenticated();
  if (!admin) redirect('/login');
  return (
    <div className="relative flex">
      {/* Content */}
      <div className="flex w-full">
        <Sidebar />
        <main className="flex-1 overflow-y-auto transition-all duration-300">
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
