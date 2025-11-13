"use client";

import React, { useEffect, useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

type Project = {
  id: number;
  title: string;
  description: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
  });

  // Load projects
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/admin/projects', { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to load projects');
        const data = await res.json();
        setProjects(data.projects);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const method = editingProject ? 'PUT' : 'POST';
      const url = editingProject 
        ? `/api/admin/projects?id=${editingProject.id}`
        : '/api/admin/projects';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save project');

      const data = await res.json();
      
      if (editingProject) {
        setProjects(projects.map(p => p.id === editingProject.id ? data.project : p));
      } else {
        setProjects([data.project, ...projects]);
      }

      setFormData({ title: '', description: '', link: '' });
      setEditingProject(null);
    } catch (err) {
      console.error('Error saving project:', err);
      setError(err instanceof Error ? err.message : 'Failed to save project');
    }
  }

  // Handle project deletion
  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        console.log(res);
        throw new Error('Failed to delete project');
      }
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  }

  // Handle edit button click
  function handleEdit(project: Project) {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      link: project.link || '',
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Manage Projects</h1>
        <p className="mt-2 text-sm text-slate-400">Create and manage your portfolio projects</p>
      </header>

      {error && (
        <div className="mb-8 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700 p-6 mb-8">
        <h2 className="text-lg font-medium text-slate-100 mb-4">
          {editingProject ? 'Edit Project' : 'Create New Project'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="mt-1 block w-full rounded-lg bg-slate-900/50 border-slate-700 text-slate-100 shadow-sm focus:border-[#007AFF] focus:ring-[#007AFF] sm:text-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-300">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="mt-1 block w-full rounded-lg bg-slate-900/50 border-slate-700 text-slate-100 shadow-sm focus:border-[#007AFF] focus:ring-[#007AFF] sm:text-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-slate-300">
              Link
            </label>
            <input
              type="url"
              id="link"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="mt-1 block w-full rounded-lg bg-slate-900/50 border-slate-700 text-slate-100 shadow-sm focus:border-[#007AFF] focus:ring-[#007AFF] sm:text-sm p-2"
            />    
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
            {editingProject && (
              <button
                type="button"
                onClick={() => {
                  setEditingProject(null);
                  setFormData({ title: '', description: '', link: '' });
                }}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800/50 border border-slate-600 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#007AFF] rounded-lg hover:bg-[#0056B3] transition-colors duration-200"
            >
              {editingProject ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700">
        <div className="p-6">
          <h2 className="text-lg font-medium text-slate-100 mb-4">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col sm:flex-row sm:items-start justify-between p-4 hover:bg-slate-700/50 rounded-lg transition-colors duration-200">
                <div className="flex-1 mb-4 sm:mb-0 sm:mr-4">
                  <h3 className="text-sm font-medium text-slate-100">{project.title}</h3>
                  <p className="mt-1 text-sm text-slate-400 line-clamp-2">{project.description}</p>
                  <div className="mt-3 flex flex-wrap">
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#007AFF] hover:text-[#0056B3] transition-colors duration-200"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 self-end sm:self-start">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-slate-400 hover:text-[#007AFF] transition-colors duration-200"
                  >
                    <MdEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors duration-200"
                  >
                    <MdDelete className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <p className="text-sm text-slate-400">No projects yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}