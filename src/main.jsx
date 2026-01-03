import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";
// Import diagnostic utilities for browser console
import "./utils/testCorsConnection";
import "./utils/diagnoseLogin";

// Try to apply theme, but don't fail if it errors
try {
  import("./utils/theme").then(({ applyTheme, getTheme }) => {
    applyTheme(getTheme());
  }).catch((error) => {
    console.warn("Theme loading error (non-critical):", error);
  });
} catch (error) {
  console.warn("Theme loading error (non-critical):", error);
}

// Only log in development
if (import.meta.env.MODE === 'development') {
  console.log("🚀 Main.jsx is loading...");
}

// Verify root element exists
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("❌ Root element not found!");
  document.body.innerHTML = '<div style="padding:20px;color:red;"><h1>Error: Root element not found!</h1><p>Make sure index.html has &lt;div id="root"&gt;&lt;/div&gt;</p></div>';
} else {
  if (import.meta.env.MODE === 'development') {
    console.log("✅ Root element found");
  }
  
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <HashRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <App />
        </HashRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  if (import.meta.env.MODE === 'development') {
    console.log("✅ React app rendered");
  }
}
