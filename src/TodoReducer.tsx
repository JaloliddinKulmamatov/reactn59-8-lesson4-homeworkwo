import { useReducer, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Action =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'REMOVE_TODO'; id: number }
  | { type: 'SET_TODOS'; todos: Todo[] };

const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id);
    case 'SET_TODOS':
      return action.todos;
    default:
      throw new Error('Unknown action type');
  }
};

const useTodos = (initialTodos: Todo[] = []) => {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos: Todo[] = JSON.parse(savedTodos);
        dispatch({ type: 'SET_TODOS', todos: parsedTodos });
      } catch (error) {
        console.error('Error parsing todos from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  return [todos, dispatch] as const;
};

export { useTodos };
export type { Todo, Action };
