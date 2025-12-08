import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/Home';
import MoodCheck from './pages/MoodCheck';
import Insights from './pages/Insights';
import Contact from './pages/Contact';
import ForgetPassword from './pages/ForgetPassword';
// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollTop';

// Layout (Header + Footer)
function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// Protected Route
function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl">
        Loading...
      </div>
    );

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
    
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route element={<Layout />}>

          <Route path="/" element={<HomePage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/mood-check" element={<MoodCheck />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/contact" element={<Contact />} />
          <Route path="/home" element={<HomePage />} />
          </Route>

        </Route>

        <Route path="/home" element={<Navigate to="/home" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
