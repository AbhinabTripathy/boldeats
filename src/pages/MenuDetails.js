import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Chip, Card, CardContent, Avatar, styled, IconButton, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const menuPresets = {
  chinese: [
    { type: 'Chinese', items: ['Veg Hakka Noodles', 'Chilli Paneer', 'Spring Roll', 'Fried Rice'], cuisine: 'Chinese' },
    { type: 'Chinese', items: ['Manchurian', 'Fried Rice', 'Veg Momos', 'Hot & Sour Soup'], cuisine: 'Chinese' },
    { type: 'Chinese', items: ['Schezwan Rice', 'Veg Lollipop', 'Paneer Chilli', 'Veg Noodles'], cuisine: 'Chinese' },
    { type: 'Chinese', items: ['Veg Fried Rice', 'Chilli Garlic Noodles', 'Spring Roll', 'Gobi Manchurian'], cuisine: 'Chinese' },
    { type: 'Chinese', items: ['Paneer Manchurian', 'Veg Momos', 'Fried Rice', 'Veg Soup'], cuisine: 'Chinese' },
    { type: 'Chinese', items: ['Veg Hakka Noodles', 'Chilli Paneer', 'Spring Roll', 'Fried Rice'], cuisine: 'Chinese' },
  ],
  pureveg: [
    { type: 'Pure Veg', items: ['Paneer Butter Masala', 'Dal Tadka', 'Jeera Rice', 'Roti', 'Salad'], cuisine: 'North Indian' },
    { type: 'Pure Veg', items: ['Aloo Gobi', 'Chana Masala', 'Steamed Rice', 'Paratha', 'Raita'], cuisine: 'North Indian' },
    { type: 'Pure Veg', items: ['Mix Veg', 'Rajma', 'Rice', 'Chapati', 'Gulab Jamun'], cuisine: 'North Indian' },
    { type: 'Pure Veg', items: ['Baingan Bharta', 'Dal Fry', 'Rice', 'Roti', 'Salad'], cuisine: 'North Indian' },
    { type: 'Pure Veg', items: ['Palak Paneer', 'Dal Makhani', 'Rice', 'Roti', 'Salad'], cuisine: 'North Indian' },
    { type: 'Pure Veg', items: ['Kofta Curry', 'Dal Tadka', 'Rice', 'Roti', 'Raita'], cuisine: 'North Indian' },
  ],
  northindian: [
    { type: 'North Indian', items: ['Paneer Butter Masala', 'Dal Tadka', 'Jeera Rice', 'Roti', 'Salad'], cuisine: 'North Indian' },
    { type: 'North Indian', items: ['Aloo Gobi', 'Chana Masala', 'Steamed Rice', 'Paratha', 'Raita'], cuisine: 'North Indian' },
    { type: 'North Indian', items: ['Chicken Curry', 'Mix Veg', 'Rice', 'Chapati', 'Gulab Jamun'], cuisine: 'North Indian' },
    { type: 'North Indian', items: ['Baingan Bharta', 'Dal Fry', 'Rice', 'Roti', 'Salad'], cuisine: 'North Indian' },
    { type: 'North Indian', items: ['Fish Fry', 'Dal Makhani', 'Rice', 'Roti', 'Salad'], cuisine: 'North Indian' },
    { type: 'North Indian', items: ['Kofta Curry', 'Dal Tadka', 'Rice', 'Roti', 'Raita'], cuisine: 'North Indian' },
  ],
  southindian: [
    { type: 'South Indian', items: ['Sambar', 'Idli', 'Vada', 'Coconut Chutney', 'Rice'], cuisine: 'South Indian' },
    { type: 'South Indian', items: ['Rasam', 'Dosa', 'Upma', 'Chutney', 'Rice'], cuisine: 'South Indian' },
    { type: 'South Indian', items: ['Curd Rice', 'Veg Curry', 'Rice', 'Papad', 'Pickle'], cuisine: 'South Indian' },
    { type: 'South Indian', items: ['Lemon Rice', 'Sambar', 'Vada', 'Chutney', 'Rice'], cuisine: 'South Indian' },
    { type: 'South Indian', items: ['Tomato Rice', 'Dal', 'Rice', 'Roti', 'Salad'], cuisine: 'South Indian' },
    { type: 'South Indian', items: ['Kootu', 'Rice', 'Rasam', 'Papad', 'Curd'], cuisine: 'South Indian' },
  ],
  mondaypureveg: [
    { type: 'Pure Veg', items: ['Paneer Butter Masala', 'Dal Tadka', 'Jeera Rice', 'Roti', 'Salad'], cuisine: 'North Indian' },
    { type: 'Veg + Non-Veg', items: ['Chicken Curry', 'Mix Veg', 'Rice', 'Chapati', 'Gulab Jamun'], cuisine: 'North Indian' },
    { type: 'Veg + Non-Veg', items: ['Fish Fry', 'Dal Makhani', 'Rice', 'Roti', 'Salad'], cuisine: 'North Indian' },
    { type: 'Veg + Non-Veg', items: ['Egg Curry', 'Dal Fry', 'Rice', 'Roti', 'Salad'], cuisine: 'North Indian' },
    { type: 'Veg + Non-Veg', items: ['Mutton Curry', 'Dal Makhani', 'Rice', 'Roti', 'Salad'], cuisine: 'North Indian' },
    { type: 'Veg + Non-Veg', items: ['Chicken Biryani', 'Dal Tadka', 'Rice', 'Roti', 'Raita'], cuisine: 'North Indian' },
  ],
  wednesdayfridaynonveg: [
    { type: 'Veg', items: ['Paneer Butter Masala', 'Dal Tadka', 'Jeera Rice', 'Roti', 'Salad'], cuisine: 'North Indian' },
    { type: 'Veg', items: ['Aloo Gobi', 'Chana Masala', 'Steamed Rice', 'Paratha', 'Raita'], cuisine: 'North Indian' },
    { type: 'Veg + Non-Veg', items: ['Chicken Curry', 'Mix Veg', 'Rice', 'Chapati', 'Gulab Jamun'], cuisine: 'North Indian' },
    { type: 'Veg', items: ['Baingan Bharta', 'Dal Fry', 'Rice', 'Roti', 'Salad'], cuisine: 'North Indian' },
    { type: 'Veg + Non-Veg', items: ['Fish Fry', 'Dal Makhani', 'Rice', 'Roti', 'Salad'], cuisine: 'North Indian' },
    { type: 'Veg', items: ['Kofta Curry', 'Dal Tadka', 'Rice', 'Roti', 'Raita'], cuisine: 'North Indian' },
  ],
};

const CardTypeColor = {
  'Pure Veg': '#43a047',
  'Veg + Non-Veg': '#C4362A',
  'Veg': '#7CB342',
  'Chinese': '#1976d2',
  'South Indian': '#ff9800',
  'North Indian': '#8d6e63',
};

const MenuDayCard = styled(Card)(({ menutype }) => ({
  borderLeft: `8px solid ${CardTypeColor[menutype] || '#1976d2'}`,
  marginBottom: '18px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  borderRadius: '12px',
}));

const WaveHeader = styled(Box)({
  width: '100vw',
  minHeight: '70px',
  background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 32,
  position: 'fixed',
  top: 0,
  left: 0,
  marginBottom: 0,
  zIndex: 100,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  '@media (max-width: 600px)': {
    paddingLeft: 12,
    minHeight: '56px',
  },
});

const WaveSVG = styled('div')({
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  zIndex: 2,
  lineHeight: 0,
});

const BottomButtonBar = styled(Box)({
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100vw',
  background: 'rgba(255,255,255,0.95)',
  display: 'flex',
  justifyContent: 'center',
  gap: 24,
  padding: '18px 0 18px 0',
  boxShadow: '0 -2px 12px rgba(0,0,0,0.07)',
  zIndex: 200,
});

const PriceButton = styled(Button)({
  background: '#C4362A',
  color: '#fff',
  fontWeight: 600,
  fontSize: '1.1rem',
  borderRadius: '8px',
  minWidth: '160px',
  padding: '10px 0',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  textTransform: 'none',
  '&:hover': {
    background: '#a82a1f',
  },
});

const MenuDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const caterer = location.state?.caterer;
  const menuType = location.state?.menuType || 'pureveg';
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const weeklyMenus = menuPresets[menuType] || menuPresets['pureveg'];

  if (!caterer) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">No caterer data found.</Typography>
        <Typography sx={{ mt: 2 }}>
          <span style={{ color: '#1976d2', cursor: 'pointer' }} onClick={() => navigate(-1)}>Go Back</span>
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {/* Attractive Back Header */}
      <WaveHeader>
        <IconButton onClick={() => navigate('/kitchen')} sx={{ mr: 1, color: '#fff' }}>
          <ArrowBackIosNewIcon sx={{ fontSize: 28, color: '#fff' }} />
        </IconButton>
        <Typography onClick={() => navigate('/kitchen')} sx={{ fontWeight: 500, color: '#fff', cursor: 'pointer', fontSize: '1.18rem', letterSpacing: 0.5 }}>
          Back to Home Page
        </Typography>
        <WaveSVG>
          <svg viewBox="0 0 500 20" preserveAspectRatio="none" style={{ width: '100%', height: 20, display: 'block' }}>
            <path d="M0,10 Q250,30 500,10 L500,20 L0,20 Z" fill="#fff" fillOpacity="0.3" />
          </svg>
        </WaveSVG>
      </WaveHeader>
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 0, mb: 6, p: 2, pt: { xs: '80px', sm: '90px' } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
          <Avatar src={caterer.image} alt={caterer.name} sx={{ width: 90, height: 90, border: '2px solid #eee' }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>{caterer.name}</Typography>
            <Typography sx={{ color: '#666', fontSize: '1.1rem', mb: 0.5 }}>{caterer.address}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: '#FFD600', fontSize: 22 }}>★</span>
              ))}
              <Chip label={caterer.years + ' years'} size="small" sx={{ ml: 1, bgcolor: '#43a047', color: '#fff', fontWeight: 600 }} />
            </Box>
          </Box>
        </Box>
        {/* Weekly Menu */}
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#C4362A' }}>Weekly Menu</Typography>
        {days.map((day, idx) => (
          <MenuDayCard key={day} menutype={weeklyMenus[idx]?.type}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{day}</Typography>
                <Chip label={weeklyMenus[idx]?.type} size="small" sx={{ bgcolor: CardTypeColor[weeklyMenus[idx]?.type], color: '#fff', fontWeight: 600 }} />
                <Chip label={weeklyMenus[idx]?.cuisine} size="small" sx={{ bgcolor: '#eee', color: '#333', fontWeight: 600 }} />
              </Box>
              <Box sx={{ pl: 1 }}>
                {weeklyMenus[idx]?.items.map((item, i) => (
                  <Typography key={i} sx={{ fontSize: '1.08rem', color: '#444' }}>• {item}</Typography>
                ))}
              </Box>
            </CardContent>
          </MenuDayCard>
        ))}
        {/* Price Buttons below menu cards */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4 }}>
          <PriceButton onClick={() => {
            if (localStorage.getItem('isLoggedIn') !== 'true') {
              setShowLoginPrompt(true);
            } else {
              navigate('/subscription');
            }
          }}>₹1500/Week</PriceButton>
          <PriceButton onClick={() => {
            if (localStorage.getItem('isLoggedIn') !== 'true') {
              setShowLoginPrompt(true);
            } else {
              navigate('/subscription');
            }
          }}>₹2600/Month</PriceButton>
        </Box>
      </Box>
      {/* Login Prompt Modal */}
      <Dialog open={showLoginPrompt} onClose={() => setShowLoginPrompt(false)}>
        <DialogTitle>You are not logged in.</DialogTitle>
        <DialogContent>
          <Typography>Please login to continue.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLoginPrompt(false)} color="inherit">Cancel</Button>
          <Button onClick={() => {
            setShowLoginPrompt(false);
            if (typeof window.openLoginModalFromHeader === 'function') {
              window.openLoginModalFromHeader();
            }
          }} color="primary" variant="contained">Login</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MenuDetails; 