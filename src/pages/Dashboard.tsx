import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTodoStore } from '../store/todoStore';
import { useAuthStore } from '../store/authStore';
import {
  ListTodo,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  LogOut,
  User,
} from 'lucide-react';

export default function Dashboard() {
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
  });
  const { todos, fetchTodos, addTodo, updateTodo, deleteTodo } = useTodoStore();
  const { user, signOut } = useAuthStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTodo({
        ...newTodo,
        completed: false,
        user_id: user?.id as string,
      });
      setNewTodo({ title: '', description: '', priority: 'medium' });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await updateTodo(id, { completed: !completed });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ListTodo className="w-8 h-8 text-purple-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                TaskMaster
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <User className="w-5 h-5 mr-1" />
                Profile
              </Link>
              <button
                onClick={signOut}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={newTodo.title}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, title: e.target.value })
                }
                placeholder="Task title"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                required
              />
            </div>
            <div>
              <textarea
                value={newTodo.description}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, description: e.target.value })
                }
                placeholder="Task description"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={newTodo.priority}
                onChange={(e) =>
                  setNewTodo({
                    ...newTodo,
                    priority: e.target.value as 'low' | 'medium' | 'high',
                  })
                }
                className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <button
                type="submit"
                className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-5 h-5 mr-1" />
                Add Task
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleToggleComplete(todo.id, todo.completed)}
                    className={`${
                      todo.completed ? 'text-green-500' : 'text-gray-400'
                    } hover:text-green-600`}
                  >
                    <CheckCircle className="w-6 h-6" />
                  </button>
                  <div>
                    <h3
                      className={`text-lg font-medium ${
                        todo.completed ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {todo.title}
                    </h3>
                    <p className="text-gray-500">{todo.description}</p>
                    <span
                      className={`text-sm font-medium ${getPriorityColor(
                        todo.priority
                      )}`}
                    >
                      {todo.priority.charAt(0).toUpperCase() +
                        todo.priority.slice(1)}{' '}
                      Priority
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      // Implement edit functionality
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}