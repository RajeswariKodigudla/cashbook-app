# 🔧 Update Frontend API URL

## Current Situation

Your frontend is trying to use:
```
https://rajeswarikodigudla.github.io/cashbook-backend/api
```

**This won't work!** GitHub Pages only shows documentation, not a running API.

## ✅ Solution

### Step 1: Deploy Backend to Render

Follow the guide: `DEPLOY_BACKEND_TO_RENDER.md`

After deployment, you'll get a URL like:
```
https://cashbook-backend.onrender.com
```

### Step 2: Update Frontend API URL

1. **Open:** `src/config/api.js`

2. **Change the API_BASE_URL:**

   **Before:**
   ```javascript
   export const API_BASE_URL = import.meta.env.VITE_API_URL || 
     (import.meta.env.MODE === 'production' 
       ? 'https://rajeswarikodigudla.github.io/cashbook-backend/api'
       : 'http://127.0.0.1:8000/api');
   ```

   **After (with your Render URL):**
   ```javascript
   export const API_BASE_URL = import.meta.env.VITE_API_URL || 
     (import.meta.env.MODE === 'production' 
       ? 'https://cashbook-backend.onrender.com/api'  // Your Render backend URL
       : 'http://127.0.0.1:8000/api');
   ```

   **Replace `cashbook-backend.onrender.com` with your actual Render URL!**

### Step 3: Rebuild and Redeploy Frontend

```powershell
cd C:\Users\rajes\OneDrive\Dokumen\Desktop\React\cashbook_app
npm run build
npm run deploy
```

### Step 4: Test

1. Open your frontend: `https://rajeswarikodigudla.github.io/cashbook-app/`
2. Try to login/register
3. Should connect to your Render backend

---

## 🔍 Alternative: Use Environment Variable

You can also set an environment variable:

1. **Create:** `.env.production` file in frontend root
2. **Add:**
   ```
   VITE_API_URL=https://cashbook-backend.onrender.com/api
   ```
3. **Rebuild:**
   ```powershell
   npm run build
   npm run deploy
   ```

---

## ✅ Checklist

- [ ] Backend deployed to Render
- [ ] Got Render backend URL
- [ ] Updated `src/config/api.js`
- [ ] Rebuilt frontend (`npm run build`)
- [ ] Redeployed frontend (`npm run deploy`)
- [ ] Tested connection

Your frontend will now connect to your Render backend! 🎉

