# Quick Start Guide

## 🚀 Start Development Server

### Option 1: Using npm (Recommended)
```bash
npm install
npm start
```

### Option 2: Using the batch file (Windows)
Double-click: `start-dev.bat`

### Option 3: Using npm run dev
```bash
npm install
npm run dev
```

## ✅ Expected Output

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## 🔧 Troubleshooting

### Issue: "Cannot find module 'vite'"
**Solution:**
```bash
npm install
```

### Issue: "Port 5173 is already in use"
**Solution:**
1. Close other applications using port 5173, or
2. Change port in `vite.config.js`:
```javascript
server: {
  port: 3000,  // Change to any available port
}
```

### Issue: "Module not found" errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Server starts but shows blank page
**Check:**
1. Open browser console (F12) for errors
2. Verify `index.html` exists in root
3. Verify `src/main.jsx` exists
4. Check that all imports in `src/main.jsx` are correct

## 📝 Verify Setup

1. ✅ `package.json` has vite and @vitejs/plugin-react
2. ✅ `vite.config.js` exists in root
3. ✅ `index.html` exists in root
4. ✅ `src/main.jsx` exists
5. ✅ `node_modules` folder exists (after npm install)

## 🌐 Access Your App

Once server is running:
- **Local:** http://localhost:5173
- The app should open automatically in your browser

