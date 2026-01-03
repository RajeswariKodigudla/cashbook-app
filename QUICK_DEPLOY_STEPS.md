# ⚡ Quick Deploy Steps (30 Minutes)

## **Fastest Way to Deploy Your Full Stack App**

---

## **🚀 Frontend to GitHub Pages (10 min)**

### **1. Create Repository**
- Go to: https://github.com/new
- Name: `cashbook-app`
- Make it **Public**
- Create

### **2. Push Code**
```bash
cd C:\Users\rajes\OneDrive\Dokumen\Desktop\React\cashbook_app
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/cashbook-app.git
git branch -M main
git push -u origin main
```

### **3. Deploy**
```bash
npm run deploy
```

### **4. Enable Pages**
- Repository → Settings → Pages
- Source: `gh-pages`
- Save

**✅ Frontend live at:** `https://YOUR_USERNAME.github.io/cashbook-app`

---

## **🚀 Backend to Railway (15 min)**

### **1. Sign Up**
- Go to: https://railway.app
- Sign up with GitHub

### **2. Deploy**
- New Project → Deploy from GitHub
- Select `cashbook-app` repo
- Settings:
  - **Root Directory:** `backend/backend`
  - **Start Command:** `python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT`

### **3. Add Variables**
- Variables tab → Add:
  ```
  SECRET_KEY=your-secret-key-here
  DEBUG=False
  ALLOWED_HOSTS=*.railway.app
  ```

### **4. Get URL**
- Settings → Generate Domain
- Copy URL: `https://your-app.railway.app`

**✅ Backend live at:** `https://your-app.railway.app`

---

## **🔗 Connect Them (5 min)**

### **1. Update Frontend**
**Edit `src/config/api.js`:**
```javascript
export const API_BASE_URL = 'https://your-app.railway.app/api';
```

### **2. Update CORS**
**Edit `backend/backend/backend/settings.py`:**
```python
CORS_ALLOWED_ORIGINS = [
    "https://YOUR_USERNAME.github.io",
]
```

### **3. Push & Deploy**
```bash
git add .
git commit -m "Connect frontend to backend"
git push
npm run deploy
```

---

## **✅ Done!**

**Your app is live:**
- Frontend: `https://YOUR_USERNAME.github.io/cashbook-app`
- Backend: `https://your-app.railway.app`

**Test it:**
1. Visit frontend URL
2. Try to login
3. Save a transaction
4. It should work! 🎉

---

**For detailed steps, see:** `COMPLETE_DEPLOYMENT_GUIDE.md`


