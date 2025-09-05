#Salarify.io

Author: Abhishek kumar

A modern and responsive web application built with React, Vite, and Tailwind CSS. This project serves as a user-friendly platform for accessing financial articles, educational content, and data visualizations. It features a clean architecture and a lightweight Express.js server for backend support.

✨ Features

 * Responsive Design: Fully responsive layout for seamless viewing on desktops, tablets, and mobile devices, built with Tailwind CSS.

 * Client-Side Routing: Smooth navigation between pages without full-page reloads, powered by React Router.

 * Theme Switching: A toggle for switching between light and dark modes to suit user preference.

 * Data Visualization: Simple and clear charts for representing financial data, implemented with Recharts.

 * Modern UI/UX: Animated page transitions and a clean component-based interface using Framer Motion and Lucide Icons.

🛠️ Tech Stack

 * Frontend: React (JSX), Tailwind CSS
 * Build Tool: Vite
 * Backend: Express.js
 * Routing: React Router
 * Animations: Framer Motion
 * Charting: Recharts
 * Theming: next-themes
 * Icons: lucide-react

📂 Project Structure

The project is organized into a client-server architecture.
.
├── client/
│   ├── components/
│   │   ├── layout/         # (Header, Footer, etc.)
│   │   └── ui/             # (Card, Input, Tooltip, etc.)
│   ├── pages/              # (Home, Education, Article, etc.)
│   ├── hooks/              # (Custom React hooks)
│   ├── lib/                # (Utility functions and data)
│   └── App.jsx             # (Main client entry point and routes)
│
├── server/
│   ├── routes/
│   └── index.js            # (Express server entry point)
│
├── public/                 # (Static assets)
│
├── index.html              # (Main HTML file)
├── vite.config.js          # (Vite configuration)
├── tailwind.config.js      # (Tailwind CSS configuration)
└── package.json

🚀 Getting Started

Follow these instructions to get a local copy up and running.

Prerequisites

Ensure you have Node.js installed on your machine (version 18.x or higher is recommended).
Installation & Usage
 * Clone the repository:
   git clone <your-repository-url>
cd <repository-directory>

 * Install dependencies:
   Choose the command corresponding to your preferred package manager.
   npm install

   or
   yarn install

   or
   pnpm install

 * Run the development server:
   This will start the application on localhost.
   npm run dev

 * Build for production:
   This command bundles the application into the dist/ directory for deployment.
   npm run build

 * Start the production server:
   This command serves the production build using the Express server.
   npm run start

📝 Notes on UI Components

The UI components located in client/components/ui/ (e.g., Card.jsx, Tooltip.jsx, Chart.jsx) are custom, lightweight implementations created specifically for this project. They provide the necessary functionality and styling to support the application's features. For more complex use cases in a larger application, these could be expanded or replaced with more feature-rich libraries.

🔮 Future Improvements
 * Testing: Implement unit and integration tests using a framework like Vitest or React Testing Library to ensure code quality and reliability.

 * Code Quality: Integrate ESLint and Prettier with a pre-commit hook to enforce consistent coding standards.

 * Accessibility: Enhance UI components to ensure they meet WCAG accessibility standards, including proper ARIA attributes and keyboard navigation.

 * Environment Variables: Add support for .env files to manage server-side secrets and configuration variables securely.
☁️ Deployment

This application is ready for deployment on platforms that support Node.js and static site hosting. Given the presence of a netlify.toml configuration file, Netlify is a great choice as it can seamlessly build the frontend, deploy the static assets, and manage the server-side endpoints as serverless functions.
To deploy, connect the repository to a hosting provider like Netlify or Vercel and configure the build command as npm run build and the publish directory as dist.

📞 Contact

Abhishek kumar
