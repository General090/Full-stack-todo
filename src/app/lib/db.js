let todos = [
  { id: 1, title: 'Learn Next.js', completed: false },
  { id: 2, title: 'Build a Todo App', completed: false },
];

let nextId = 3;

export const db = {
  getTodos: () => [...todos],
  
  addTodo: (title) => {
    const newTodo = { 
      id: nextId++, 
      title, 
      completed: false 
    };
    todos.push(newTodo);
    console.log('Added todo:', newTodo);
    return newTodo;
  },
  
  updateTodo: (id, updates) => {
    const numericId = Number(id);
    const index = todos.findIndex(todo => todo.id === numericId);
    if (index === -1) {
      console.log('Todo not found for update:', id);
      return null;
    }
    todos[index] = { ...todos[index], ...updates };
    console.log('Updated todo:', todos[index]);
    return todos[index];
  },
  
  deleteTodo: (id) => {
    const numericId = Number(id);
    const index = todos.findIndex(todo => todo.id === numericId);
    if (index === -1) {
      console.log('Todo not found for deletion:', id);
      return false;
    }
    const deletedTodo = todos.splice(index, 1)[0];
    console.log('Deleted todo:', deletedTodo);
    return true;
  },
  
  getTodoById: (id) => {
    const numericId = Number(id);
    const todo = todos.find(todo => todo.id === numericId);
    if (!todo) {
      console.log('Todo not found:', id);
    }
    return todo;
  }
};