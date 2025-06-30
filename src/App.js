import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SubscriptionSection from './components/SubscriptionSection';
import ReviewsSection from './components/ReviewsSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import SubscriptionPage from './pages/SubscriptionPage';
// import SubscriptionModal from './components/SubscriptionModal';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import SplashScreen from './components/SplashScreen';
import ProductPage from './pages/ProductPage';
import MenuDetails from './pages/MenuDetails';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import CancellationPolicy from './pages/CancellationPolicy';
import AboutPage from './pages/AboutPage';
import axios from 'axios';


const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: '#ff0000',
    },
  },
});

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show modal after splash screen (assuming splash screen takes 2 seconds)
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ marginTop: '-90px' }}>
      <HeroSection />
      <Box sx={{ mt: 12 }}>
        <SubscriptionSection />
      </Box>
      <Box sx={{ mt: 12 }}>
        <ReviewsSection />
      </Box>
      <Box sx={{ mt: 12 }}>
        <NewsletterSection />
      </Box>
      {/* <SubscriptionModal 
        open={showModal} 
        onClose={() => setShowModal(false)} 
      /> */}
    </Box>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isSubscriptionPage = location.pathname === '/subscription';
  const isMenuDetails = location.pathname === '/menu-details';
  const isPolicyPage = location.pathname.startsWith('/terms-conditions') || 
                      location.pathname.startsWith('/privacy-policy') ||
                      location.pathname.startsWith('/refund-policy') ||
                      location.pathname.startsWith('/cancellation-policy') ||
                      location.pathname.startsWith('/about');

  // Utility function to validate token and handle expiration
  const validateTokenAndHandleExpiration = async (token, isLoggedIn) => {
    if (!token || !isLoggedIn) return;

    // First, check if token is a JWT and has expiration
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (payload.exp && payload.exp < currentTime) {
          console.log('JWT token has expired, clearing and showing login');
          localStorage.removeItem('token');
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('userData');
          
          if (window.openLoginModalFromHeader) {
            window.openLoginModalFromHeader();
          } else {
            window.dispatchEvent(new CustomEvent('showLoginModal'));
          }
          return;
        }
      }
    } catch (error) {
      console.log('Error parsing JWT token, proceeding with API validation');
    }

    try {
      // Make a request to verify token validity
      const response = await axios.get('https://api.boldeats.in/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        timeout: 10000 // 10 second timeout
      });
      
      // If request succeeds, token is valid
      console.log('Token is valid');
    } catch (error) {
      console.error('Token validation error:', error);
      
      // If we get a 401 or 403 error, token is expired/invalid
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        console.log('Token is expired or invalid, redirecting to login');
        
        // Clear invalid token and login status
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        
        // Open login modal
        if (window.openLoginModalFromHeader) {
          window.openLoginModalFromHeader();
        } else {
          // Fallback: dispatch custom event
          window.dispatchEvent(new CustomEvent('showLoginModal'));
        }
      } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        // Network timeout - don't clear token, just log the issue
        console.log('Network timeout during token validation, will retry later');
      } else if (!error.response) {
        // Network error - don't clear token, just log the issue
        console.log('Network error during token validation, will retry later');
      }
    }
  };

  // Token expiration checking logic
  useEffect(() => {
    const checkTokenExpiration = async () => {
      const token = localStorage.getItem('token');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      await validateTokenAndHandleExpiration(token, isLoggedIn);
    };

    // Check token expiration on component mount
    checkTokenExpiration();

    // Set up interval to check token expiration every 5 minutes
    const tokenCheckInterval = setInterval(checkTokenExpiration, 5 * 60 * 1000);

    // Also check when user becomes active (returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkTokenExpiration();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(tokenCheckInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [validateTokenAndHandleExpiration]);

  // Listen for storage changes to check token when it's updated
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'isLoggedIn') {
        // Small delay to ensure the storage change is complete
        setTimeout(async () => {
          const token = localStorage.getItem('token');
          const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
          
          await validateTokenAndHandleExpiration(token, isLoggedIn);
        }, 100);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [validateTokenAndHandleExpiration]);

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%'
    }}>
      {!isMenuDetails && <Header />}
      <Box sx={{ 
        flex: 1,
        width: '100%',
        pt: isHomePage ? '0' : '0',
      }}>
        <Routes>
          <Route path="/" element={
            <>
              <SplashScreen />
              <HomePage />
            </>
          } />
          <Route path="/kitchen" element={<MenuPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/menu-details" element={<MenuDetails onSubscription={() => window.location.assign('/subscription')} />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/about" element={<AboutPage />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
        <Box sx={{ mt: 12 }}>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
