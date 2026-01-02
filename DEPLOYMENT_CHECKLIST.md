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

## **Common Issues**

### **Frontend:**
- ❌ API calls fail → Check API URL in `src/config/api.js`
- ❌ 404 errors → Check GitHub Pages branch setting
- ❌ Blank page → Check browser console for errors

### **Backend:**
- ❌ CORS errors → Update CORS_ALLOWED_ORIGINS in settings
- ❌ Database errors → Run migrations on production
- ❌ 500 errors → Check environment variables and logs

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

