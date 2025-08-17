'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TodoItem({ todo }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this todo?');
    if (confirmed) {
      const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: todo.id }),
      });

      if (response.ok) {
        router.refresh();
      }
    }
  };

  const handleComplete = async () => {
    const response = await fetch('/api/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id: todo.id, 
        completed: !todo.completed 
      }),
    });

    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center ${todo.completed ? 'bg-green-50' : ''}`}>
      <div>
        <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {todo.title}
        </h3>
        <p className="text-sm text-gray-500">
          Status: {todo.completed ? 'Completed' : 'Pending'}
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleComplete}
          className={`px-3 py-1 rounded-md text-sm ${
            todo.completed
              ? 'bg-gray-500 hover:bg-gray-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        <Link
          href={`/todos/${todo.id}`}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}