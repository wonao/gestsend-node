# gestsend-node

This project contains a Node.js backend and a React frontend. To get set up:

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Build the frontend and copy the files so the backend can serve them:

```bash
cd frontend
npm run build
cp -r dist/* ../backend/public/
```

4. Start the backend server (which serves the static files from `backend/public/`):

```bash
cd ../backend
npm start
```

`node_modules` directories are listed in `.gitignore` and will not be present in the repository until you run `npm install`.
