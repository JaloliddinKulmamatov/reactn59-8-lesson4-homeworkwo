import React, { useState, useEffect } from 'react';
import { useTodos, Todo } from './TodoReducer';
import { FaRegTrashAlt, FaCheck } from 'react-icons/fa';
import { IoReturnUpBackOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import Loading from './Loading';
import Swal from 'sweetalert2';

const TodoApp: React.FC = () => {
  const [todos, dispatch] = useTodos();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const addTodo = () => {
    if (text.trim() !== '') {
      dispatch({ type: 'ADD_TODO', text });
      setText('');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'You have saved the new todo',
        showConfirmButton: false,
        timer: 500
      });
    }
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', id });
  };

  const removeTodo = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: 'REMOVE_TODO', id });
        Swal.fire('Deleted!', 'Your todo has been deleted.', 'success');
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  const TodoItem: React.FC<{ todo: Todo; onToggle: () => void; onRemove: () => void }> = ({ todo, onToggle, onRemove }) => (
    <li className={`bg-gray-800 p-4 rounded-lg flex justify-between items-center border ${todo.completed ? 'border-green-500' : 'border-purple-500'}`}>
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        className={`cursor-pointer ${todo.completed ? 'text-green-300' : 'text-purple-300'} transition-all duration-300`}
        onClick={onToggle}
      >
        {todo.text}
      </span>
      <span className="flex items-center gap-2">
        <button
          onClick={onToggle}
          className={`p-3 rounded-lg ${todo.completed ? 'hover:bg-sky-600' : 'hover:bg-emerald-400'} transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {todo.completed ? <IoReturnUpBackOutline /> : <FaCheck />}
        </button>
        <button
          onClick={onRemove}
          className={`text-white p-3 rounded-lg hover:bg-red-600 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          <FaRegTrashAlt />
        </button>
      </span>
    </li>
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen py-10 px-4">
      <div className="mb-6 flex items-center gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 my-6"
          placeholder="Add a new task"
        />
        <button
          onClick={addTodo}
          className={`bg-purple-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          <IoMdAdd />
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-4">Active Todos: {todos.filter(todo => !todo.completed).length}</h2>
      <ul className="space-y-4">
        {todos.filter(todo => !todo.completed).map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onRemove={() => removeTodo(todo.id)}
          />
        ))}
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-4">Completed Todos: {todos.filter(todo => todo.completed).length}</h2>
      <ul className="space-y-4">
        {todos.filter(todo => todo.completed).map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onRemove={() => removeTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
