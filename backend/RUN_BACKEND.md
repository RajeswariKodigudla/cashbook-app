# How to Run the Backend

## Step-by-Step Instructions

### Step 1: Open Terminal/Command Prompt
- Press `Win + R`, type `cmd` or `powershell`, press Enter
- Or open VS Code terminal (Ctrl + `)

### Step 2: Navigate to Backend Folder
```bash
cd backend
```

### Step 3: Install Dependencies (First Time Only)
```bash
npm install
```
Wait for all packages to install. This may take 1-2 minutes.

### Step 4: Create .env File
Create a file named `.env` in the `backend` folder with this content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cashbook
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Step 5: Make Sure MongoDB is Running
- Open Services (Win + R, type `services.msc`)
- Find "MongoDB" service
- If it's stopped, right-click → Start

### Step 6: Run the Backend Server

**Option A: Development Mode (Recommended)**
```bash
npm run dev
```

**Option B: Production Mode**
```bash
npm start
```

### Step 7: Check the Output
You should see:
```
Connected to MongoDB
Server is running on port 5000
```

If you see errors, check:
- Is MongoDB running?
- Did you run `npm install`?
- Is port 5000 already in use?

### Step 8: Test the API
Open your browser and go to:
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

## Quick Commands Summary

```bash
# 1. Go to backend folder
cd backend

# 2. Install dependencies (first time only)
npm install

# 3. Run server
npm run dev

# 4. Stop server (when needed)
Press Ctrl + C
```

## Troubleshooting

**Error: "Cannot find module"**
→ Run `npm install` again

**Error: "MongoDB connection error"**
→ Make sure MongoDB is running (check Services)

**Error: "Port 5000 already in use"**
→ Change PORT in .env file to another number (e.g., 5001)

**Error: "npm is not recognized"**
→ Install Node.js from https://nodejs.org/

