import TodoItem from '../components/TodoItem';
import Link from 'next/link';

async function getTodos() {
  const res = await fetch('http://localhost:3000/api/todos', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }
  return res.json();
}

export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Todo List</h1>
        <Link
          href="/"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Add New Todo
        </Link>
      </div>
      <div className="space-y-4">
        {todos.length === 0 ? (
          <p className="text-gray-500">No todos yet. Add one to get started!</p>
        ) : (
          todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
}