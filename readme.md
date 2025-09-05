🌐 Salarify.io

Author: Abhishek Kumar

A modern and responsive financial education platform built with React, Vite, and Tailwind CSS. Salarify.io delivers an intuitive way to explore financial articles, educational resources, and interactive data visualizations. Backed by a lightweight Express.js server, it ensures a smooth and scalable architecture.


---

✨ Features

📱 Responsive Design – Optimized for desktop, tablet, and mobile devices with Tailwind CSS.

🔗 Client-Side Routing – Fast navigation without full reloads using React Router.

🌓 Theme Switching – Light/Dark mode toggle with persistent user preference.

📊 Data Visualization – Interactive charts powered by Recharts.

🎨 Modern UI/UX – Smooth animations via Framer Motion and crisp Lucide icons.

⚡ Lightweight Backend – Simple Express.js server for serving content and APIs.



---

🛠️ Tech Stack

Frontend: React (JSX), Tailwind CSS
Build Tool: Vite
Backend: Express.js
Routing: React Router
Animations: Framer Motion
Charts: Recharts
Theming: next-themes
Icons: lucide-react


---

📂 Project Structure

.
├── client/
│   ├── components/
│   │   ├── layout/         # Shared layout components (Header, Footer, etc.)
│   │   └── ui/             # UI components (Card, Input, Tooltip, etc.)
│   ├── pages/              # Application pages (Home, Education, Article, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and helpers
│   └── App.jsx             # Main client entry point & routes
│
├── server/
│   ├── routes/             # Express routes
│   └── index.js            # Server entry point
│
├── public/                 # Static assets
├── index.html              # Main HTML file
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
└── package.json


---

🚀 Getting Started

✅ Prerequisites

Node.js v18.x or higher


⚙️ Installation & Usage

1. Clone the repository:

git clone <your-repository-url>
cd <repository-directory>


2. Install dependencies:

npm install
# or
yarn install
# or
pnpm install


3. Run development server:

npm run dev

Starts app on http://localhost:5173


4. Build for production:

npm run build


5. Start production server:

npm run start




---

📝 Notes on UI Components

All UI components inside client/components/ui/ (like Card.jsx, Tooltip.jsx, Chart.jsx) are custom-built lightweight implementations tailored for this project.

For larger-scale applications, these can be replaced with component libraries (e.g., Radix UI, Material UI, or ShadCN).


---

🔮 Future Improvements

🧪 Testing: Add unit & integration tests with Vitest / React Testing Library.

🧹 Code Quality: Enforce ESLint + Prettier with Git pre-commit hooks.

♿ Accessibility: Ensure WCAG-compliant ARIA labels & keyboard navigation.

🔐 Environment Variables: Secure .env support for sensitive configs.



---

☁️ Deployment

This project is deployment-ready for Netlify, Vercel, or any Node.js platform.

Build command: npm run build

Publish directory: dist


👉 With netlify.toml, Netlify can:

Build frontend

Deploy static assets

Run server routes as serverless functions



---

📞 Contact

👤 Abhishek Kumar
📧 abhishek3107kumar2004@gmail.com
🐙 Abhishekk3107 


---

⚡ Salarify.io – Financial learning made simple, modern, and engaging.


