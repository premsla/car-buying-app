import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, setLoading } from './store/slices/authSlice';
import { RootState } from './store/store';
import { doc, getDoc } from 'firebase/firestore';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import { CarProvider } from './context/CarContext';
import { AuthProvider } from './context/AuthContext';
import Box from '@mui/material/Box';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Footer/Footer';

// Components
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Admin from './pages/Admin';
import CertifiedPreOwned from './pages/CertifiedPreOwned';
import CompareCars from './pages/CompareCars';
import ManageListings from './pages/ManageListings';
import ManageRequests from './pages/ManageRequests';
import CircularProgress from '@mui/material/CircularProgress';
import Profile from './pages/Profile';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = 'user' }: { children: React.ReactNode, requiredRole?: 'user' | 'admin' }) => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole === 'admin' && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.exists() ? userDoc.data() : { role: 'user' };
          
          dispatch(setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || '',
            role: userData.role || 'user'
          }));
        } catch (error) {
          console.error('Error fetching user data:', error);
          dispatch(setUser(null));
        }
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CarProvider>
          <Router>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <Box sx={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/certified-pre-owned" element={<CertifiedPreOwned />} />
                  <Route path="/compare-cars" element={<CompareCars />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route 
                    path="/manage-listings" 
                    element={
                      <ProtectedRoute>
                        <ManageListings />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/manage-requests" 
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <ManageRequests />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </Router>
        </CarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
