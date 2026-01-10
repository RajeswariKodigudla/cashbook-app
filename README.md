# Cashbook Web Application

Modern React web application with TypeScript, Vite, and Tailwind CSS. **Production-ready for deployment.**

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
# or
npm start
```

**Runs on:** `http://localhost:3000`

### Build for Production

```bash
npm run build
```

**Output:** `dist/` folder

### Preview Production Build

```bash
npm run preview
```

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### API Configuration

Update API URL in:
- `.env` file
- `src/constants/index.ts` (fallback)

## 📦 Dependencies

- React 19
- TypeScript 5.8
- Vite 6.2
- Tailwind CSS 4.1
- Lucide React (icons)
- date-fns (date utilities)

## 🎨 Features

- ✅ Modern, bright UI design
- ✅ Fully responsive for all screen sizes
- ✅ INR currency support (₹)
- ✅ Real-time updates
- ✅ Offline support with localStorage
- ✅ Advanced filtering and search
- ✅ Export functionality
- ✅ No scrollbars (hidden but functional)
- ✅ Fixed viewport (no maximize issues)
- ✅ Touch-optimized for mobile

## 🚀 Deployment

### Vercel (Recommended)

#### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/cashbook-web.git
git push -u origin main
```

#### Step 2: Deploy on Vercel

1. Go to [Vercel](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Select `cashbook-web` folder
5. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
6. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```
7. Click **"Deploy"**

### Netlify

#### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/cashbook-web.git
git push -u origin main
```

#### Step 2: Deploy on Netlify

1. Go to [Netlify](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to Git provider (GitHub)
4. Select repository and `cashbook-web` folder
5. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```
7. Click **"Deploy site"**

### Other Platforms

1. Build: `npm run build`
2. Upload `dist/` folder to your hosting
3. Configure environment variables
4. Set up custom domain

## 📱 Mobile Responsive

- ✅ Optimized for all screen sizes (320px to 4K)
- ✅ Touch-friendly interface
- ✅ No visible scrollbars
- ✅ Fixed viewport (prevents zoom/maximize)
- ✅ Safe area support (notches)
- ✅ Responsive typography
- ✅ Adaptive spacing

## 🔐 Security

- Environment variables for sensitive data
- HTTPS required for production
- CORS configured in backend
- No sensitive data in client code

## 📚 Documentation

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🎯 Production Checklist

- [ ] Update API URL to production backend
- [ ] Set environment variables
- [ ] Build and test production build
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Test on multiple devices
- [ ] Verify all features work
- [ ] Set up monitoring/analytics

---

**Ready for production deployment! 🌐**
