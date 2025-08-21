import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'todos.json');

const ensureDataDirectory = () => {
  const dataDir = path.dirname(filePath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read todos from file
const readTodos = () => {
  try {
    ensureDataDirectory();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading todos:', error);
  }
  return [
    { id: 1, title: 'Learn Next.js', completed: false },
    { id: 2, title: 'Build a Todo App', completed: false },
  ];
};

const writeTodos = (todos) => {
  try {
    ensureDataDirectory();
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error('Error writing todos:', error);
  }
};

let todos = readTodos();
let nextId = Math.max(...todos.map(todo => todo.id), 0) + 1;

export const db = {
  getTodos: () => todos,
  
  addTodo: (title) => {
    const newTodo = { 
      id: nextId++, 
      title, 
      completed: false 
    };
    todos.push(newTodo);
    writeTodos(todos);
    return newTodo;
  },
  
  updateTodo: (id, updates) => {
    const index = todos.findIndex(todo => todo.id === Number(id));
    if (index === -1) return null;
    todos[index] = { ...todos[index], ...updates };
    writeTodos(todos);
    return todos[index];
  },
  
  deleteTodo: (id) => {
    const index = todos.findIndex(todo => todo.id === Number(id));
    if (index === -1) return false;
    todos.splice(index, 1);
    writeTodos(todos);
    return true;
  },
  
  getTodoById: (id) => {
    return todos.find(todo => todo.id === Number(id));
  }
};