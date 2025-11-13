"use client";

import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import TipTapEditor from "@/components/shared/TipTapEditor";

type Blog = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "" });

  // Load blogs
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/blogs", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to load");
        const { blogs } = await res.json();
        setBlogs(blogs);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Load error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Edit handler
  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title, content: blog.content });
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const method = editingBlog ? "PUT" : "POST";
    const url = editingBlog
      ? `/api/admin/blogs?id=${editingBlog.id}`
      : "/api/admin/blogs";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Save failed");
      const { blog } = await res.json();

      if (editingBlog) {
        setBlogs((b) => b.map((x) => (x.id === editingBlog.id ? blog : x)));
      } else {
        setBlogs((b) => [blog, ...b]);
      }

      // Reset form
      setEditingBlog(null);
      setFormData({ title: "", content: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save error");
    }
  };

  const handleCancel = () => {
    setEditingBlog(null);
    setFormData({ title: "", content: "" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete?")) return;
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      setBlogs((b) => b.filter((x) => x.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Manage Blogs</h1>
        <p className="mt-2 text-sm text-slate-400">Create and manage your blog posts</p>
      </header>

      {error && (
        <div className="mb-8 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      )}

      {/* ---------- FORM ---------- */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700 p-6 mb-8">
        <h2 className="text-lg font-medium text-slate-100 mb-4">
          {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-slate-900/50 border-slate-700 text-slate-100 shadow-sm p-2"
            />
          </div>

          {/* TipTap Editor */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Content
            </label>
            <TipTapEditor
              value={formData.content}
              onChange={(html) => setFormData((p) => ({ ...p, content: html }))}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            {editingBlog && (
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800/50 border border-slate-600 rounded-lg hover:bg-slate-700/50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#007AFF] rounded-lg hover:bg-[#0056B3]"
            >
              {editingBlog ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>

      {/* ---------- LIST ---------- */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700">
        <div className="p-6">
          <h2 className="text-lg font-medium text-slate-100 mb-4">Blog Posts</h2>
          <div className="space-y-4">
            {blogs.length === 0 ? (
              <p className="text-sm text-slate-400">No blog posts yet.</p>
            ) : (
              blogs.map((b) => (
                <div
                  key={b.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-slate-700/50 rounded-lg"
                >
                  <div className="flex-1 mb-3 sm:mb-0 sm:mr-4">
                    <h3 className="text-sm font-medium text-slate-100">{b.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2 self-end sm:self-center">
                    <button
                      onClick={() => handleEdit(b)}
                      className="p-2 text-slate-400 hover:text-[#007AFF]"
                    >
                      <MdEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="p-2 text-slate-400 hover:text-red-400"
                    >
                      <MdDelete className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}