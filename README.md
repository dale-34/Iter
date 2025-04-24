# Iter
This application is the Traveling Gators' full-stack React application with a Node.js/Express backend. The application serves the purpose of working as an AI-powered travel guide and itinerary creator. 


### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Environment Variables
This project requires a `.env` file with API keys and other sensitive environment variables in order to function properly.

**To receive the `.env` file**, please contact one of the the project members:
- Dorian De Jesus - dorian.dejesus@ufl.edu

Once you’ve received the file, place it in the following directory:
- `iter/server/.env` – for backend environment variables


### 3. Start the Frontend
Navigate to the frontend directory './iter' and start the React development server:
```bash
npm install
npm start
```

This will launch the frontend at:
```
http://localhost:3000
```

### 4. Start the Backend
In a new terminal, navigate to the backend directory './iter/server' and run:
```bash
npm install
npm start
```

The backend server will typically run at:
```
http://localhost:3001
```

## Project Structure
```
iter/
├── public/
├── src/
├── .env           <-- frontend environment variables
├── server/
│   ├── index.js
│   ├── .env       <-- backend environment variables (if used)
│   └── ...
└── package.json
```

Thank you, and we hope you enjoy our application!
