# ✅ Deployment Checklist

## **Before Deploying**

### **Frontend:**
- [ ] Update `src/config/api.js` with production backend URL
- [ ] Test build locally: `npm run build`
- [ ] Check for console errors
- [ ] Verify all API calls work

### **Backend:**
- [ ] Update `settings.py` for production (SECRET_KEY, DEBUG, ALLOWED_HOSTS)
- [ ] Configure CORS for frontend domain
- [ ] Set up database (PostgreSQL recommended)
- [ ] Run migrations: `python manage.py migrate`
- [ ] Test API endpoints

---

## **Deployment Steps**

### **Frontend (GitHub Pages):**
- [ ] Create GitHub repository
- [ ] Initialize git: `git init`
- [ ] Add files: `git add .`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Add remote: `git remote add origin https://github.com/YOUR_USERNAME/cashbook-app.git`
- [ ] Push: `git push -u origin main`
- [ ] Deploy: `npm run deploy`
- [ ] Enable GitHub Pages in repository settings
- [ ] Test deployed site

### **Backend (Railway/Render/Heroku):**
- [ ] Sign up for hosting service
- [ ] Connect GitHub repository
- [ ] Set root directory: `backend/backend`
- [ ] Configure build command
- [ ] Configure start command
- [ ] Set environment variables (SECRET_KEY, DEBUG, etc.)
- [ ] Deploy
- [ ] Run migrations on production
- [ ] Test API endpoints
- [ ] Update frontend API URL

---

## **After Deployment**

- [ ] Test login functionality
- [ ] Test saving transactions
- [ ] Test all features
- [ ] Check browser console for errors
- [ ] Verify CORS is working
- [ ] Test on mobile device
- [ ] Share your deployed app! 🎉

---

## **Common Issues & Detailed Fixes**

### **Frontend Issues:**

#### **❌ API calls fail**
**Symptoms:** Network errors, "Failed to fetch", "Cannot connect to server"

**Fixes:**
1. **Check API URL in `src/config/api.js`:**
   ```javascript
   // Should point to your deployed backend
   export const API_BASE_URL = 'https://your-backend-url.com/api';
   ```

2. **Check backend is running:**
   - Test: `https://your-backend-url.com/api/`
   - Should return API information JSON

3. **Check CORS configuration:**
   - Backend must allow your frontend domain
   - Update `CORS_ALLOWED_ORIGINS` in Django settings

4. **Check environment variables:**
   - Create `.env.production` with: `REACT_APP_API_URL=https://your-backend-url.com/api`
   - Rebuild: `npm run build`

---

#### **❌ 404 errors on GitHub Pages**
**Symptoms:** Page not found, blank page, routes don't work

**Fixes:**
1. **Check GitHub Pages branch:**
   - Repository → Settings → Pages
   - Source: `gh-pages` branch
   - Folder: `/ (root)`

2. **Check `package.json` homepage:**
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/cashbook-app"
   ```

3. **Add `_redirects` file in `public/` folder:**
   ```
   /*    /index.html   200
   ```
   (For React Router to work on GitHub Pages)

4. **Rebuild and redeploy:**
   ```bash
   npm run build
   npm run deploy
   ```

---

#### **❌ Blank page**
**Symptoms:** Page loads but shows nothing, white screen

**Fixes:**
1. **Check browser console (F12):**
   - Look for JavaScript errors
   - Check Network tab for failed requests

2. **Check build output:**
   ```bash
   npm run build
   # Check for build errors
   ```

3. **Check React Router:**
   - Make sure `BrowserRouter` is used
   - Check base URL matches GitHub Pages path

4. **Check API connection:**
   - If API fails, app might not load
   - Check console for API errors

---

### **Backend Issues:**

#### **❌ CORS errors**
**Symptoms:** "Access to fetch blocked by CORS policy", 403 errors

**Fixes:**
1. **Update `backend/backend/backend/settings.py`:**
   ```python
   CORS_ALLOWED_ORIGINS = [
       "https://YOUR_USERNAME.github.io",  # GitHub Pages
       "http://localhost:3000",              # Local dev
   ]
   
   # Or for testing (less secure):
   CORS_ALLOW_ALL_ORIGINS = True
   ```

2. **Check middleware order:**
   ```python
   MIDDLEWARE = [
       ...
       'corsheaders.middleware.CorsMiddleware',  # Should be early
       ...
   ]
   ```

3. **Restart backend server after changes**

---

#### **❌ Database errors**
**Symptoms:** "no such table", "OperationalError", 500 errors on data operations

**Fixes:**
1. **Run migrations on production:**
   ```bash
   python manage.py migrate
   ```

2. **Check database connection:**
   - Verify database credentials in environment variables
   - Check database is accessible from hosting service

3. **For SQLite (development):**
   - Make sure `db.sqlite3` file exists
   - Check file permissions

4. **For PostgreSQL (production):**
   - Verify connection string
   - Check database is created
   - Run migrations: `python manage.py migrate`

---

#### **❌ 500 errors (Internal Server Error)**
**Symptoms:** Server error, 500 status code

**Fixes:**
1. **Check environment variables:**
   ```bash
   # Required variables:
   SECRET_KEY=your-secret-key
   DEBUG=False
   ALLOWED_HOSTS=your-domain.com
   ```

2. **Check server logs:**
   - Railway: View logs in dashboard
   - Render: Check logs in dashboard
   - Heroku: `heroku logs --tail`

3. **Check Django settings:**
   - `DEBUG=False` in production
   - `ALLOWED_HOSTS` includes your domain
   - `SECRET_KEY` is set

4. **Check static files (if needed):**
   ```bash
   python manage.py collectstatic
   ```

5. **Check dependencies:**
   - Make sure `requirements.txt` is up to date
   - All packages installed on hosting service

---

## **Quick Commands**

```bash
# Frontend
npm run build          # Build for production
npm run deploy         # Deploy to GitHub Pages

# Backend
python manage.py migrate    # Run migrations
python manage.py collectstatic  # Collect static files (if needed)
```

---

**Good luck with your deployment! 🚀**

