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
