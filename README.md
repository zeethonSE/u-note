# u-note

uNote is a full-stack web application where users can create, store, and manage personal notes. Built with React, Express, and PostgreSQL, it's deployed on Vercel (frontend) and Render (backend + database).

🚀 Live Demo
Frontend: https://u-note-umber.vercel.app

Backend API: https://u-note.onrender.com/api

📌 Features
Add, view, and delete notes

Auto-expanding textarea for writing

Material UI for styling and icons

Progressive Web App (PWA) support

Hosted on cloud platforms for full-stack deployment

🛠️ Technologies Used
Frontend
React

Vite

Material UI

Vite PWA Plugin

Vercel (hosting)

Backend
Node.js + Express

CORS and Body-Parser middleware

PostgreSQL via pg

Render (server + database)

🧩 Environment Variables
Create a .env file in your root directories:

Frontend (.env)
VITE_BACKEND_URL=https://u-note.onrender.com/api

Backend (.env)
DATABASE_URL=postgresql://<username>:<password>@<host>/<db-name>

🧪 Running Locally

1. Clone the repository
   git clone https://github.com/your-username/u-note.git
   cd u-note

2. Setup Backend
   cd server
   npm install
   npm run dev

\*\*\* Ensure you have PostgreSQL running and .env set up with your DATABASE_URL.

3. Setup Frontend
   cd client
   npm install
   npm run dev

🌐 Deployment
Frontend deployed on Vercel

Backend and PostgreSQL hosted on Render

Make sure to:

Add CORS support in the backend for Vercel URLs.

Use Render’s external database URL in your .env.

💡 Future Improvements
Add authentication for user-based notes

Edit existing notes

Search/filter notes

Add tags or categories

Dark mode

📄 License
Licensed under the zeethonSE License

🔗 GitHub
👉 [View the source code on GitHub](https://github.com/zeethonSE/u-note)

