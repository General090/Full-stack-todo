let todos = [
    { id: 1, title: 'Learn Next.js', completed: false },
    { id: 2, title: 'Build a Todo App', completed: false },
  ];
  
  let nextId = 3; // To handle auto-incrementing IDs
  
  export const db = {
    getTodos: () => todos,
    addTodo: (title) => {
      const newTodo = { 
        id: nextId++, 
        title, 
        completed: false 
      };
      todos.push(newTodo);
      return newTodo;
    },
    updateTodo: (id, updates) => {
      const index = todos.findIndex(todo => todo.id === Number(id));
      if (index === -1) return null;
      todos[index] = { ...todos[index], ...updates };
      return todos[index];
    },
    deleteTodo: (id) => {
      const index = todos.findIndex(todo => todo.id === Number(id));
      if (index === -1) return false;
      todos.splice(index, 1);
      return true;
    },
    getTodoById: (id) => {
      return todos.find(todo => todo.id === Number(id));
    }
  };