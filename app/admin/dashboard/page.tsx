"use client";

import React, { useEffect, useState } from 'react';
import StatsCard from '@/components/admin/StatsCard';
import { MdArticle, MdFolder, MdChat } from 'react-icons/md';

type Stats = {
  totalBlogs?: number;
  totalProjects?: number;
  pendingComments?: number;
};

type BlogItem = { id: number; title?: string; createdAt?: string };
type ProjectItem = { id: number; title?: string; description?: string };
type CommentItem = { id: number; comment?: string; createdAt?: string };

type DashboardResponse = {
  stats?: Stats;
  recentBlogs?: BlogItem[];
  recentProjects?: ProjectItem[];
  pendingComments?: CommentItem[];
  error?: string;
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Actions
  async function approveComment(id: number) {
    try {
      const res = await fetch('/api/admin/comments', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve', id }),
      });
      if (!res.ok) throw new Error('Failed to approve');
      await res.json();
      // update local state
      setData((d) => {
        if (!d) return d;
        return {
          ...d,
          pendingComments: (d.pendingComments ?? []).filter((c) => c.id !== id),
        } as DashboardResponse;
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteBlog(id: number) {
    try {
      const res = await fetch('/api/admin/blogs', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Failed to delete blog');
      setData((d) => {
        if (!d) return d;
        return { ...d, recentBlogs: (d.recentBlogs ?? []).filter((b) => b.id !== id) } as DashboardResponse;
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteProject(id: number) {
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Failed to delete project');
      setData((d) => {
        if (!d) return d;
        return { ...d, recentProjects: (d.recentProjects ?? []).filter((p) => p.id !== id) } as DashboardResponse;
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteComment(id: number) {
    try {
      const res = await fetch('/api/admin/comments', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id }),
      });
      if (!res.ok) throw new Error('Failed to delete comment');
      setData((d) => {
        if (!d) return d;
        return { ...d, pendingComments: (d.pendingComments ?? []).filter((c) => c.id !== id) } as DashboardResponse;
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/dashboard', { credentials: 'include' });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json = (await res.json()) as DashboardResponse;
        if (mounted) setData(json);
      } catch (err: unknown) {
        console.error('Failed to load dashboard', err);
        const message = err instanceof Error ? err.message : String(err);
        if (mounted) setError(message || 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-slate-400">Manage your content and monitor activity</p>
      </header>

      {data && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatsCard 
              title="Total Blogs" 
              value={data.stats?.totalBlogs ?? 0}
              icon={<MdArticle className="h-6 w-6" />}
            />
            <StatsCard 
              title="Total Projects" 
              value={data.stats?.totalProjects ?? 0}
              icon={<MdFolder className="h-6 w-6" />}
            />
            <StatsCard 
              title="Pending Comments" 
              value={data.stats?.pendingComments ?? 0}
              icon={<MdChat className="h-6 w-6" />}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700">
              <div className="p-6">
                <h2 className="text-lg font-medium text-slate-100 mb-4">Recent Blogs</h2>
                <div className="space-y-4">
                  {(data.recentBlogs ?? []).map((blog) => (
                    <div key={blog.id} className="flex items-center justify-between p-4 hover:bg-slate-700/50 rounded-lg transition-colors duration-200">
                      <span className="text-sm text-slate-200">{blog.title ?? `Blog #${blog.id}`}</span>
                      <button
                        onClick={() => deleteBlog(blog.id)}
                        className="text-sm px-3 py-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700">
              <div className="p-6">
                <h2 className="text-lg font-medium text-slate-100 mb-4">Recent Projects</h2>
                <div className="space-y-4">
                  {(data.recentProjects ?? []).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 hover:bg-slate-700/50 rounded-lg transition-colors duration-200">
                      <span className="text-sm text-slate-200">{project.title ?? `Project #${project.id}`}</span>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="text-sm px-3 py-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700">
            <div className="p-6">
              <h2 className="text-lg font-medium text-slate-100 mb-4">Pending Comments</h2>
              <div className="space-y-4">
                {(data.pendingComments ?? []).map((comment) => (
                  <div key={comment.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 hover:bg-slate-700/50 rounded-lg transition-colors duration-200 gap-4">
                    <span className="text-sm text-slate-200 flex-1">
                      {comment.comment ? comment.comment.slice(0, 180) + (comment.comment.length > 180 ? '...' : '') : `Comment #${comment.id}`}
                    </span>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => approveComment(comment.id)}
                        className="flex-1 sm:flex-initial text-sm px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-md hover:bg-emerald-500/20 transition-colors duration-200"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => deleteComment(comment.id)}
                        className="flex-1 sm:flex-initial text-sm px-4 py-2 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500/20 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
