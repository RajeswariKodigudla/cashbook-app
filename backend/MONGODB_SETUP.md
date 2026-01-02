# MongoDB Setup Guide

## Option 1: MongoDB Community Server (Recommended for Local Development)

### Installation Steps:

1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Select:
     - Version: Latest (or 7.0+)
     - Platform: Windows
     - Package: MSI
   - Click "Download"

2. **Install MongoDB**
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - Check "Install MongoDB as a Service"
   - Select "Run service as Network Service user"
   - Check "Install MongoDB Compass" (optional GUI tool)
   - Click "Install"

3. **Verify Installation**
   - MongoDB should start automatically as a Windows service
   - Open Command Prompt or PowerShell and run:
   ```bash
   mongod --version
   ```

4. **Start MongoDB Service** (if not running)
   - Open Services (Win + R, type `services.msc`)
   - Find "MongoDB" service
   - Right-click → Start (if stopped)

### Default Connection:
- **Host**: `localhost`
- **Port**: `27017`
- **Connection String**: `mongodb://localhost:27017/cashbook`

---

## Option 2: Run MongoDB Manually (Without Service)

1. **Create Data Directory**
   ```bash
   mkdir C:\data\db
   ```

2. **Start MongoDB**
   ```bash
   mongod --dbpath C:\data\db
   ```

3. **Keep the terminal window open** - MongoDB runs in this window

---

## Option 3: MongoDB Atlas (Cloud - Free Tier Available)

1. **Sign up for MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Create a free account

2. **Create a Cluster**
   - Choose "Free" tier (M0)
   - Select a cloud provider and region
   - Click "Create Cluster"

3. **Set up Database Access**
   - Go to "Database Access"
   - Add a new database user
   - Set username and password

4. **Set up Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP

5. **Get Connection String**
   - Go to "Clusters" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Update your `.env` file:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cashbook?retryWrites=true&w=majority
     ```

---

## Option 4: Using Docker

1. **Install Docker Desktop** (if not installed)
   - Download from: https://www.docker.com/products/docker-desktop

2. **Run MongoDB Container**
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

3. **Verify it's running**
   ```bash
   docker ps
   ```

---

## Verify MongoDB is Running

### Method 1: Check Service Status
- Open Services (`services.msc`)
- Look for "MongoDB" service
- Status should be "Running"

### Method 2: Test Connection
```bash
mongosh
```
or
```bash
mongo
```
If connected, you'll see MongoDB shell prompt.

### Method 3: Test from Node.js
Create a test file `test-connection.js`:
```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cashbook')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });
```

Run:
```bash
node test-connection.js
```

---

## Troubleshooting

### MongoDB won't start
- Check if port 27017 is already in use:
  ```bash
  netstat -ano | findstr :27017
  ```
- Make sure MongoDB service is running (Services → MongoDB → Start)

### Connection refused
- Verify MongoDB is running
- Check firewall settings
- Ensure connection string is correct

### Permission errors
- Run Command Prompt as Administrator
- Check data directory permissions

---

## Quick Start Commands

### Start MongoDB (if installed as service):
```bash
net start MongoDB
```

### Stop MongoDB:
```bash
net stop MongoDB
```

### Check MongoDB status:
```bash
sc query MongoDB
```

---

## For Your Cashbook App

Once MongoDB is running, your backend will automatically connect using:
```
MONGODB_URI=mongodb://localhost:27017/cashbook
```

The database `cashbook` will be created automatically when you first run the backend server.

