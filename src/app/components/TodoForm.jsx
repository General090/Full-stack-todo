'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TodoForm({ todo }) {
  const router = useRouter();
  const [title, setTitle] = useState(todo?.title || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = '/api/todos';
      const method = todo ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo ? { id: todo.id, title } : { title }),
      });

      if (!response.ok) {
        throw new Error('Failed to save todo');
      }

      router.push('/todos');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {todo ? 'Update Todo' : 'Add Todo'}
      </button>
    </form>
  );
}