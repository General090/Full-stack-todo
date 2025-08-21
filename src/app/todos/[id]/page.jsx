import TodoForm from '@/components/TodoForm';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

// async function getTodo(id) {
//   const todo = db.getTodoById(Number(id));
//   if (!todo) {
//     return null;
//   }
//   return todo;
// }


async function getTodo(id) {
  try {
    const todo = db.getTodoById(Number(id));
    return todo;
  } catch (error) {
    console.error('Error fetching todo:', error);
    return null;
  }
}


export default async function TodoDetailPage({ params }) {
  const todo = await getTodo(params.id);

  if (!todo) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Todo</h1>
      <TodoForm todo={todo} />
    </div>
  );
}