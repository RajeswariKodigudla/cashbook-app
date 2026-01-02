# Quick Start Guide - See Backend Output

## Step 1: Install Dependencies

First, navigate to the backend folder and install all required packages:

```bash
cd backend
npm install
```

This will install all dependencies listed in `package.json`.

## Step 2: Make Sure MongoDB is Running

Before starting the server, ensure MongoDB is running:

**Option A: Check if MongoDB service is running**
- Open Services (Win + R, type `services.msc`)
- Look for "MongoDB" service
- If stopped, right-click → Start

**Option B: Start MongoDB manually**
```bash
net start MongoDB
```

## Step 3: Create .env File

Create a `.env` file in the `backend` folder with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cashbook
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## Step 4: Run the Server

### Development Mode (Recommended - Auto-reloads on changes):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

## Step 5: See the Output

When you run the server, you'll see output in your terminal like this:

```
Connected to MongoDB
Server is running on port 5000
```

**If you see errors:**
- MongoDB connection error → MongoDB is not running
- Port already in use → Another service is using port 5000
- Module not found → Run `npm install` again

## Step 6: Test the API

### Test 1: Health Check (No authentication needed)
Open your browser or use curl:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Cashbook API is running"
}
```

### Test 2: Register a User
Use Postman, curl, or any API client:

**POST** `http://localhost:5000/api/auth/register`
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

You'll see the response in your API client, and any errors will appear in the terminal.

## Viewing Logs in Real-Time

The terminal/console where you ran `npm run dev` or `npm start` will show:
- ✅ Connection messages
- ❌ Error messages
- 🔍 Request logs (if you add logging middleware)

## Example Output You'll See:

```
$ npm run dev

> cashbook-backend@1.0.0 dev
> nodemon server.js

[nodemon] 3.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,json
[nodemon] starting `node server.js`
Connected to MongoDB
Server is running on port 5000
```

## Testing with Browser

1. Start the server
2. Open browser: `http://localhost:5000/api/health`
3. You should see JSON response

## Testing with Postman/Thunder Client

1. Import `API_COLLECTION.json` (included in backend folder)
2. Set baseUrl variable to `http://localhost:5000`
3. Make requests and see responses in Postman
4. See server logs in your terminal

## Common Commands:

```bash
# Install dependencies
npm install

# Run in development (auto-reload)
npm run dev

# Run in production
npm start

# Stop server
Press Ctrl + C in the terminal
```

