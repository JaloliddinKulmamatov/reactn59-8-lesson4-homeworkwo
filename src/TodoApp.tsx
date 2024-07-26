import React, { useState, useEffect } from 'react';
import { useTodos, Todo } from './TodoReducer';
import { FaRegTrashAlt, FaCheck } from 'react-icons/fa';
import { IoReturnUpBackOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import Loading from './Loading';

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
    }
  };

  const toggleTodo = (id: number) => {
      dispatch({ type: 'TOGGLE_TODO', id });
  };

  const removeTodo = (id: number) => {
      dispatch({ type: 'REMOVE_TODO', id });
  };

  if (loading) {
    return <Loading />;
  }

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
          className={`bg-purple-500 text-white p-3 rounded-lg border  hover:bg-blue-600 hover:border-purple-600 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
         <IoMdAdd />
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-4">Active Todos: {todos.length}</h2>
      <ul className="space-y-4">
        {todos.filter(todo => !todo.completed).map((todo: Todo) => (
          <li
            key={todo.id}
            className="bg-gray-800 p-4 rounded-lg flex justify-between items-center border border-purple-500"
          >
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              className=" cursor-pointer text-purple-300 transition-all duration-300"
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <span className="flex items-center gap-2">
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`p-3 rounded-lg hover:bg-emerald-400 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                <FaCheck />
              </button>
              <button
                onClick={() => removeTodo(todo.id)}
                className={`text-white p-3 rounded-lg hover:bg-red-600 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                <FaRegTrashAlt />
              </button>
            </span>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-4">Completed Todos: {todos.length}</h2>
      <ul className="space-y-4">
        {todos.filter(todo => todo.completed).map((todo: Todo) => (
          <li
            key={todo.id}
            className="bg-gray-800 p-4 rounded-lg flex justify-between items-center border border-green-500"
          >
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              className="t cursor-pointer text-green-300 transition-all duration-300"
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <span>
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`text-white p-3 rounded-lg hover:bg-sky-600 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
              >
              <IoReturnUpBackOutline />
            </button>
            <button
              onClick={() => removeTodo(todo.id)}
              className={`text-white p-3 rounded-lg hover:bg-red-600 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              <FaRegTrashAlt />
            </button>

            </span>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
