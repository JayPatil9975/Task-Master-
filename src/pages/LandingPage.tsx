import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ListTodo } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center text-white">
            <ListTodo className="w-8 h-8 mr-2" />
            <span className="text-2xl font-bold">TaskMaster</span>
          </div>
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-white hover:text-purple-200 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-24">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-6">
              Organize your work and life, finally.
            </h1>
            <p className="text-xl mb-8">
              TaskMaster helps you manage your tasks with priority levels, keeping you
              focused on what matters most.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                <span>Prioritize tasks with importance levels</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                <span>Track your progress effortlessly</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                <span>Collaborate with team members</span>
              </div>
            </div>
            <Link
              to="/register"
              className="inline-block mt-8 bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-100 transition-colors"
            >
              Get Started - It's Free
            </Link>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80"
              alt="Productivity"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}