import { useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Bookings = lazy(() => import('./pages/Bookings'))
const Profile = lazy(() => import('./pages/Profile'))
const Navbar = lazy(() => import('./components/Navbar'))
const AdminPhotos = lazy(() => import('./pages/AdminPhotos'))
const Success = lazy(() => import('./pages/Success'))
const Browse = lazy(() => import('./pages/Browse'))
const Admin = lazy(() => import('./pages/Admin'))

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function ClerkProviderWithRoutes() {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <Suspense fallback={<div className="grid h-screen place-items-center">Loading…</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Navbar />}>
             <Route path="/dashboard" element={<>
              <SignedIn><Dashboard /></SignedIn>
              <SignedOut><RedirectToSignIn /></SignedOut>
             </>} />
             <Route path="/bookings" element={<>
              <SignedIn><Bookings /></SignedIn>
              <SignedOut><RedirectToSignIn /></SignedOut>
             </>} />
             <Route path="/profile" element={<>
              <SignedIn><Profile /></SignedIn>
              <SignedOut><RedirectToSignIn /></SignedOut>
             </>} />
             <Route path="/admin/photos" element={<>
              <SignedIn><AdminPhotos /></SignedIn>
              <SignedOut><RedirectToSignIn /></SignedOut>
             </>} />
             <Route path="/admin" element={<>
              <SignedIn><Admin /></SignedIn>
              <SignedOut><RedirectToSignIn /></SignedOut>
             </>} />
             <Route path="/success" element={<Success />} />
             <Route path="/browse/:type" element={<Browse />} />
          </Route>
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Suspense>
    </ClerkProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  )
}
