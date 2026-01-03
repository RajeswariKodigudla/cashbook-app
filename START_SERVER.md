# 🚀 Start Development Server

## Quick Start

```bash
npm install
npm start
```

The server will start at: **http://localhost:5173**

## Alternative Commands

```bash
# Using dev script
npm run dev

# Or using the batch file (Windows)
start-dev.bat
```

## ✅ Verification

Once the server starts, you should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Then open your browser to: **http://localhost:5173**

## 🔧 Troubleshooting

### Port Already in Use
If port 5173 is busy, change it in `vite.config.js`:
```javascript
server: {
  port: 3000,  // Change to any available port
}
```

### Module Not Found Errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear Cache
```bash
npm run dev -- --force
```

