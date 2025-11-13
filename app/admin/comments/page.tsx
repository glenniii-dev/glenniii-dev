"use client";

import React, { useEffect, useState } from 'react';
import { MdThumbUp, MdDelete } from 'react-icons/md';

type Comment = {
  id: number;
  content: string;
  authorName: string;
  authorEmail: string;
  postId: number;
  postTitle?: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
};

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  // Load comments
  useEffect(() => {
    async function loadComments() {
      try {
        const res = await fetch('/api/admin/comments', { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to load comments');
        const data = await res.json();
        setComments(data.comments);
      } catch (err) {
        console.error('Error loading comments:', err);
        setError(err instanceof Error ? err.message : 'Failed to load comments');
      } finally {
        setLoading(false);
      }
    }

    loadComments();
  }, []);

  // Handle comment approval
  async function handleApprove(id: number) {
    try {
      const res = await fetch(`/api/admin/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, action: 'approve' }),
      });

      if (!res.ok) throw new Error('Failed to approve comment');
      
      setComments(comments.map(comment => 
        comment.id === id 
          ? { ...comment, status: 'approved' } 
          : comment
      ));
    } catch (err) {
      console.error('Error approving comment:', err);
      setError(err instanceof Error ? err.message : 'Failed to approve comment');
    }
  }

  // Handle comment deletion
  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const res = await fetch(`/api/admin/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, action: 'delete' }),
      });

      if (!res.ok) throw new Error('Failed to delete comment');
      setComments(comments.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete comment');
    }
  }

  // Filter comments based on status
  const filteredComments = comments.filter(comment => {
    if (filter === 'all') return true;
    if (filter === 'pending') return comment.status === 'pending';
    return comment.status === 'approved';
  });

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
        <h1 className="text-3xl font-bold">Manage Comments</h1>
        <p className="mt-2 text-sm ">Review and moderate user comments</p>
      </header>

      {error && (
        <div className="mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'pending'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              filter === 'approved'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Approved
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Comments</h2>
          <div className="space-y-4">
            {filteredComments.map((comment) => (
              <div key={comment.id} className="flex items-start justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div className="flex-1 mr-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{comment.authorName}</span>
                    <span className="text-xs text-gray-500">{comment.authorEmail}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
                  {comment.postTitle && (
                    <p className="mt-1 text-xs text-gray-500">
                      On: {comment.postTitle}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      comment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : comment.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {comment.status === 'pending' && (
                    <button
                      onClick={() => handleApprove(comment.id)}
                      className="p-2 text-gray-600 hover:text-green-600"
                    >
                      <MdThumbUp className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-2 text-gray-600 hover:text-red-600"
                  >
                    <MdDelete className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
            {filteredComments.length === 0 && (
              <p className="text-sm text-gray-500">No comments to display.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}