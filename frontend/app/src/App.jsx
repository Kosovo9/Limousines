import { useNavigate } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Profile = lazy(() => import("./pages/Profile"));
const Navbar = lazy(() => import("./components/Navbar"));
const AdminPhotos = lazy(() => import("./pages/AdminPhotos"));
const Success = lazy(() => import("./pages/Success"));
const Browse = lazy(() => import("./pages/Browse"));
const Admin = lazy(() => import("./pages/Admin"));

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// 🎯 BESTIA Loading Component - Hero Level
const BestiaLoader = () => (
  <div className="bestia-loader">
    <div className="bestia-loader__container">
      <div className="bestia-loader__car">
        <div className="bestia-loader__car-body"></div>
        <div className="bestia-loader__car-wheel bestia-loader__car-wheel--front"></div>
        <div className="bestia-loader__car-wheel bestia-loader__car-wheel--rear"></div>
      </div>
      <div className="bestia-loader__road"></div>
      <div className="bestia-loader__text">Loading Premium Experience...</div>
    </div>

    <style jsx>{`
      .bestia-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          #0a0a0a 0%,
          #1a1a2e 50%,
          #16213e 100%
        );
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: bestiaFadeIn 0.5s ease-out;
      }

      .bestia-loader__container {
        text-align: center;
        position: relative;
      }

      .bestia-loader__car {
        width: 120px;
        height: 60px;
        position: relative;
        margin: 0 auto 40px;
        animation: bestiaCarMove 2s ease-in-out infinite;
      }

      .bestia-loader__car-body {
        width: 100px;
        height: 30px;
        background: linear-gradient(45deg, #ffd700, #ffed4e);
        border-radius: 20px 20px 5px 5px;
        position: relative;
        box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
        animation: bestiaGlow 2s ease-in-out infinite alternate;
      }

      .bestia-loader__car-body::before {
        content: "";
        position: absolute;
        top: -15px;
        left: 20px;
        width: 60px;
        height: 20px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        backdrop-filter: blur(10px);
      }

      .bestia-loader__car-wheel {
        width: 20px;
        height: 20px;
        background: #333;
        border-radius: 50%;
        position: absolute;
        bottom: -10px;
        border: 3px solid #666;
        animation: bestiaWheelSpin 1s linear infinite;
      }

      .bestia-loader__car-wheel--front {
        right: 10px;
      }
      .bestia-loader__car-wheel--rear {
        left: 10px;
      }

      .bestia-loader__road {
        width: 300px;
        height: 4px;
        background: linear-gradient(90deg, transparent, #ffd700, transparent);
        margin: 20px auto;
        border-radius: 2px;
        animation: bestiaRoadMove 1.5s ease-in-out infinite;
      }

      .bestia-loader__text {
        color: #ffd700;
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 1px;
        animation: bestiaPulse 1.5s ease-in-out infinite;
        font-family:
          "SF Pro Display",
          -apple-system,
          BlinkMacSystemFont,
          sans-serif;
      }

      @keyframes bestiaFadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes bestiaCarMove {
        0%,
        100% {
          transform: translateX(0) translateY(0);
        }
        25% {
          transform: translateX(10px) translateY(-2px);
        }
        75% {
          transform: translateX(-10px) translateY(2px);
        }
      }

      @keyframes bestiaGlow {
        0% {
          box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
        }
        100% {
          box-shadow: 0 15px 40px rgba(255, 215, 0, 0.6);
        }
      }

      @keyframes bestiaWheelSpin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes bestiaRoadMove {
        0%,
        100% {
          background-position: -300px 0;
        }
        50% {
          background-position: 300px 0;
        }
      }

      @keyframes bestiaPulse {
        0%,
        100% {
          opacity: 0.8;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.05);
        }
      }
    `}</style>
  </div>
);

// 🎯 BESTIA Error Boundary - Production Ready
class BestiaErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      "🔥 BESTIA Error Boundary caught an error:",
      error,
      errorInfo,
    );
    // Send to analytics/monitoring service
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exception", {
        description: error.toString(),
        fatal: true,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bestia-error">
          <div className="bestia-error__container">
            <div className="bestia-error__icon">⚡</div>
            <h1>Oops! Something went wrong</h1>
            <p>Don't worry, our premium team is on it!</p>
            <button
              onClick={() => window.location.reload()}
              className="bestia-error__button"
            >
              Reload Experience
            </button>
          </div>
          <style jsx>{`
            .bestia-error {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
              color: white;
              text-align: center;
              padding: 20px;
            }
            .bestia-error__container {
              max-width: 500px;
            }
            .bestia-error__icon {
              font-size: 4rem;
              margin-bottom: 1rem;
              animation: bestiaPulse 2s infinite;
            }
            .bestia-error__button {
              background: linear-gradient(45deg, #ffd700, #ffed4e);
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              color: #000;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;
              margin-top: 1rem;
            }
            .bestia-error__button:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

// 🎯 BESTIA Theme Provider - Dark/Light Mode Hero
const BestiaThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bestia-theme");
      return (
        saved ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      );
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("bestia-theme", theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("bestia-theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className={`bestia-app theme-${theme}`}>
      {children}
      <style jsx global>{`
        :root {
          --bestia-primary: #ffd700;
          --bestia-primary-dark: #e6c200;
          --bestia-secondary: #16213e;
          --bestia-accent: #ff6b6b;
          --bestia-success: #4ecdc4;
          --bestia-warning: #ffe66d;
          --bestia-error: #ff6b6b;
          --bestia-gradient: linear-gradient(
            135deg,
            var(--bestia-primary),
            var(--bestia-primary-dark)
          );
          --bestia-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          --bestia-shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.15);
          --bestia-border-radius: 12px;
          --bestia-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          --bestia-font-primary:
            "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, sans-serif;
        }

        [data-theme="dark"] {
          --bestia-bg-primary: #0a0a0a;
          --bestia-bg-secondary: #1a1a1a;
          --bestia-bg-tertiary: #2a2a2a;
          --bestia-text-primary: #ffffff;
          --bestia-text-secondary: #b0b0b0;
          --bestia-text-tertiary: #808080;
          --bestia-border: #333333;
        }

        [data-theme="light"] {
          --bestia-bg-primary: #ffffff;
          --bestia-bg-secondary: #f8f9fa;
          --bestia-bg-tertiary: #e9ecef;
          --bestia-text-primary: #212529;
          --bestia-text-secondary: #6c757d;
          --bestia-text-tertiary: #adb5bd;
          --bestia-border: #dee2e6;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
          font-size: 16px;
        }

        body {
          font-family: var(--bestia-font-primary);
          background-color: var(--bestia-bg-primary);
          color: var(--bestia-text-primary);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }

        .bestia-app {
          min-height: 100vh;
          transition: var(--bestia-transition);
        }

        /* Premium Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: var(--bestia-bg-secondary);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--bestia-primary);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--bestia-primary-dark);
        }

        /* Selection */
        ::selection {
          background: var(--bestia-primary);
          color: var(--bestia-secondary);
        }

        /* Focus states */
        :focus {
          outline: 2px solid var(--bestia-primary);
          outline-offset: 2px;
        }

        /* Animations */
        @keyframes bestiaSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bestiaSlideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bestiaFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bestiaPulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes bestiaShimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* Utility classes */
        .bestia-animate-slide-up {
          animation: bestiaSlideUp 0.6s ease-out;
        }

        .bestia-animate-slide-in {
          animation: bestiaSlideIn 0.6s ease-out;
        }

        .bestia-animate-fade-in {
          animation: bestiaFadeIn 0.5s ease-out;
        }

        /* Responsive */
        @media (max-width: 768px) {
          html {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <BestiaLoader />;
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Suspense fallback={<BestiaLoader />}>
        <div className="bestia-animate-fade-in">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Navbar />}>
              <Route
                path="/dashboard"
                element={
                  <>
                    <SignedIn>
                      <Dashboard />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/bookings"
                element={
                  <>
                    <SignedIn>
                      <Bookings />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <SignedIn>
                      <Profile />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/admin/photos"
                element={
                  <>
                    <SignedIn>
                      <AdminPhotos />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route
                path="/admin"
                element={
                  <>
                    <SignedIn>
                      <Admin />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn />
                    </SignedOut>
                  </>
                }
              />
              <Route path="/success" element={<Success />} />
              <Route path="/browse/:type" element={<Browse />} />
            </Route>
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Suspense>
    </ClerkProvider>
  );
}

export default function App() {
  return (
    <BestiaErrorBoundary>
      <BrowserRouter>
        <BestiaThemeProvider>
          <ClerkProviderWithRoutes />
        </BestiaThemeProvider>
      </BrowserRouter>
    </BestiaErrorBoundary>
  );
}
