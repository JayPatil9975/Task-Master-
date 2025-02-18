import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  created_at: string;
}

interface TodoState {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Omit<Todo, 'id' | 'created_at'>) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  fetchTodos: () => Promise<void>;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: async (todo) => {
    const { error, data } = await supabase
      .from('todos')
      .insert([todo])
      .select()
      .single();
    
    if (error) throw error;
    if (data) {
      set((state) => ({ todos: [...state.todos, data] }));
    }
  },
  updateTodo: async (id, updates) => {
    const { error, data } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    if (data) {
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? data : todo)),
      }));
    }
  },
  deleteTodo: async (id) => {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) throw error;
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
  fetchTodos: async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    if (data) {
      set({ todos: data });
    }
  },
}));