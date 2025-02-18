# TaskMaster Web App

TaskMaster is a simple to-do list web application that allows users to manage their tasks efficiently. The app features task creation, updating, and deletion, with an emphasis on task prioritization. Users can log in and manage their profile securely, and all data is stored in a MongoDB database.

## Features

- **User Authentication**: Secure login/logout functionality with Clerk for user authentication.
- **Task Management**: Users can create, read, update, and delete tasks.
- **Task Prioritization**: Users can set the importance of tasks to manage priorities effectively.
- **Profile Management**: Users can manage their profile information.
- **Responsive Design**: The app is fully responsive and works seamlessly across devices.

# Tech Stack

## Frontend
- **React**: JavaScript library for building user interfaces, used for developing interactive UIs.
- **TypeScript**: Superset of JavaScript that adds static types, improving code quality and developer experience.
- **Tailwind CSS**: Utility-first CSS framework to rapidly build custom designs without writing custom CSS.
- **Vite**: Next-generation, fast build tool and development server optimized for modern JavaScript and TypeScript projects.

## Backend
- **Supabase**: Open-source Firebase alternative that provides backend services like authentication, database, and storage.

## State Management
- **Zustand**: A small, fast, and scalable state management solution for React applications.

## Routing
- **React Router DOM**: Declarative routing library for React to handle navigation and rendering of components based on the URL.

## Linting & Code Quality
- **ESLint**: Linting tool for identifying and fixing problems in JavaScript/TypeScript code, ensuring coding standards.
- **Prettier**: Code formatter to enforce consistent code style.
- **TypeScript ESLint**: Linting for TypeScript code to catch errors specific to TypeScript.

## Other Tools
- **PostCSS**: Tool for transforming CSS with JavaScript plugins (used alongside Tailwind for features like autoprefixing).
- **Autoprefixer**: PostCSS plugin that automatically adds vendor prefixes to CSS rules for better browser support.

## Development Tools
- **Vite**: Fast, optimized development and build process that supports modern JavaScript and TypeScript features.


## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Steps to run the project locally

1. Clone the repository:

   ```bash
   git clone https://github.com/JayPatil9975/Task-Master-.git
   cd taskmaster
   npm run dev
