# 🔧 Deployment Troubleshooting Guide

## **Complete Guide to Fix Deployment Issues**

---

## **Frontend Issues**

### **1. API Calls Fail**

**Error Messages:**
- "Failed to fetch"
- "Cannot connect to server"
- "Network error"
- CORS errors

**Step-by-Step Fix:**

1. **Verify API URL:**
   ```javascript
   // In src/config/api.js
   export const API_BASE_URL = 'https://your-backend-url.com/api';
   ```

2. **Test Backend:**
   ```bash
   # In browser, visit:
   https://your-backend-url.com/api/
   # Should see API information
   ```

3. **Check Environment Variables:**
   ```bash
   # Create .env.production
   REACT_APP_API_URL=https://your-backend-url.com/api
   
   # Rebuild
   npm run build
   npm run deploy
   ```

4. **Verify CORS:**
   - Backend must allow your frontend domain
   - Check Django CORS settings

---

### **2. 404 Errors on GitHub Pages**

**Error Messages:**
- "Page not found"
- Routes don't work
- Blank page on refresh

**Step-by-Step Fix:**

1. **Check GitHub Pages Settings:**
   - Repository → Settings → Pages
   - Source: `gh-pages` branch
   - Folder: `/ (root)`

2. **Fix React Router:**
   
   **Option A: Use HashRouter (Easiest)**
   ```javascript
   // In src/index.js
   import { HashRouter } from 'react-router-dom';
   
   <HashRouter>
     <App />
   </HashRouter>
   ```

   **Option B: Add _redirects file**
   - Create `public/_redirects`:
   ```
   /*    /index.html   200
   ```
   - Rebuild and redeploy

3. **Check Homepage in package.json:**
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/cashbook-app"
   ```

---

### **3. Blank Page / White Screen**

**Step-by-Step Fix:**

1. **Open Browser Console (F12):**
   - Check for JavaScript errors
   - Check Network tab for failed requests

2. **Check Build:**
   ```bash
   npm run build
   # Look for errors or warnings
   ```

3. **Check API Connection:**
   - If API fails, app might not load
   - Check console for API errors
   - Verify backend is running

4. **Check React Router:**
   - Make sure routes are configured correctly
   - Check base path matches GitHub Pages

---

## **Backend Issues**

### **1. CORS Errors**

**Error Messages:**
- "Access to fetch blocked by CORS policy"
- "No 'Access-Control-Allow-Origin' header"
- 403 Forbidden errors

**Step-by-Step Fix:**

1. **Update Django Settings:**
   ```python
   # In backend/backend/backend/settings.py
   
   CORS_ALLOWED_ORIGINS = [
       "https://YOUR_USERNAME.github.io",
       "http://localhost:3000",
   ]
   
   # Or for testing (less secure):
   CORS_ALLOW_ALL_ORIGINS = True
   ```

2. **Check Middleware Order:**
   ```python
   MIDDLEWARE = [
       'django.middleware.security.SecurityMiddleware',
       'corsheaders.middleware.CorsMiddleware',  # Should be early
       'django.middleware.common.CommonMiddleware',
       ...
   ]
   ```

3. **Restart Server:**
   - After changing settings, restart backend

---

### **2. Database Errors**

**Error Messages:**
- "no such table: transactions_transaction"
- "OperationalError"
- 500 errors on data operations

**Step-by-Step Fix:**

1. **Run Migrations:**
   ```bash
   # On your hosting service
   python manage.py migrate
   ```

2. **Check Database Connection:**
   - Verify database credentials
   - Check database is accessible
   - Test connection

3. **For PostgreSQL (Production):**
   ```bash
   # Check connection
   python manage.py dbshell
   
   # Run migrations
   python manage.py migrate
   ```

4. **For SQLite (Development):**
   ```bash
   # Make sure db.sqlite3 exists
   python manage.py migrate
   ```

---

### **3. 500 Internal Server Error**

**Step-by-Step Fix:**

1. **Check Environment Variables:**
   ```bash
   # Required:
   SECRET_KEY=your-secret-key-here
   DEBUG=False
   ALLOWED_HOSTS=your-domain.com,your-app.railway.app
   ```

2. **Check Server Logs:**
   - **Railway:** Dashboard → View logs
   - **Render:** Dashboard → Logs
   - **Heroku:** `heroku logs --tail`

3. **Check Django Settings:**
   ```python
   # In settings.py
   DEBUG = False  # Must be False in production
   ALLOWED_HOSTS = ['your-domain.com', 'your-app.railway.app']
   SECRET_KEY = os.environ.get('SECRET_KEY')
   ```

4. **Check Static Files:**
   ```bash
   python manage.py collectstatic
   ```

5. **Check Dependencies:**
   ```bash
   # Make sure requirements.txt is up to date
   pip install -r requirements.txt
   ```

---

## **Quick Diagnostic Commands**

### **Frontend:**
```bash
# Check build
npm run build

# Test locally
npm start

# Check for errors
npm run build 2>&1 | grep -i error
```

### **Backend:**
```bash
# Check migrations
python manage.py showmigrations

# Run migrations
python manage.py migrate

# Check settings
python manage.py check --deploy

# Test server
python manage.py runserver
```

---

## **Common Error Codes**

| Code | Meaning | Fix |
|------|---------|-----|
| **400** | Bad Request | Check request data format |
| **401** | Unauthorized | Check authentication token |
| **403** | Forbidden | Check CORS settings |
| **404** | Not Found | Check URL/route |
| **500** | Server Error | Check server logs |
| **CORS** | Cross-Origin | Update CORS settings |

---

## **Testing Checklist**

### **Before Deployment:**
- [ ] Backend runs locally
- [ ] Frontend runs locally
- [ ] API calls work locally
- [ ] Login works
- [ ] Transactions save correctly

### **After Deployment:**
- [ ] Backend accessible at URL
- [ ] Frontend accessible at URL
- [ ] API calls work from frontend
- [ ] Login works
- [ ] Transactions save correctly
- [ ] No console errors
- [ ] No CORS errors

---

## **Still Having Issues?**

1. **Check browser console** for errors
2. **Check server logs** for backend errors
3. **Test API endpoints** directly
4. **Verify environment variables**
5. **Check CORS configuration**
6. **Verify database migrations**

---

**For more help, check:**
- `GITHUB_DEPLOYMENT_GUIDE.md` - Complete deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Deployment checklist

