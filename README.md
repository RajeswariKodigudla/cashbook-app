# Cashbook App - Frontend

A modern React cashbook application built with Vite and React.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm start
# or
npm run dev
```

The app will be available at `http://localhost:5173` (Vite default port).

### Build

```bash
# Build for production
npm run build
```

The production build will be in the `build` directory.

### Preview Production Build

```bash
# Preview production build locally
npm run preview
```

## 📦 Deployment

### Deploy to GitHub Pages

```bash
# Build and deploy
npm run deploy
```

The app will be deployed to: `https://rajeswarikodigudla.github.io/cashbook-app`

## 🔧 Configuration

### API Configuration

The API base URL is configured in `src/config/api.js`. Update it to point to your deployed backend:

```javascript
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.com/api'  // Your deployed backend URL
    : 'http://127.0.0.1:8000/api');        // Local development
```

### Environment Variables

Create a `.env` file in the root directory for local development:

```env
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

## 📁 Project Structure

```
cashbook_app/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   ├── pages/       # Page components
│   ├── services/    # API services
│   ├── utils/       # Utility functions
│   ├── styles/      # CSS files
│   └── config/      # Configuration files
├── index.html       # HTML entry point
├── vite.config.js   # Vite configuration
└── package.json     # Dependencies
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Routing
- **Material-UI** - UI components
- **CSS Modules** - Styling

## 📝 Available Scripts

- `npm start` / `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

## 🔗 Backend

This frontend connects to a separate Django REST Framework backend API. Make sure your backend is deployed and the API URL is correctly configured in `src/config/api.js`.
