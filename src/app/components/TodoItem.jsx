'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function TodoItem({ todo }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this todo?');
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const response = await fetch('/api/todos', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: todo.id }),
      });

      if (response.ok) {
        toast.success('Todo deleted successfully!');
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error('Failed to delete todo');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
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
        toast.success(`Todo marked as ${!todo.completed ? 'completed' : 'pending'}!`);
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update todo');
      }
    } catch (error) {
      console.error('Error completing todo:', error);
      toast.error('Failed to update todo');
    } finally {
      setIsCompleting(false);
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
          disabled={isCompleting}
          className={`px-3 py-1 rounded-md text-sm disabled:opacity-50 ${
            todo.completed
              ? 'bg-gray-500 hover:bg-gray-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isCompleting ? '...' : (todo.completed ? 'Undo' : 'Complete')}
        </button>
        <Link
          href={`/todos/${todo.id}`}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm disabled:opacity-50"
        >
          {isDeleting ? '...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}