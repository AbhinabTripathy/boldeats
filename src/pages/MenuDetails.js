import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Chip, Avatar, styled, IconButton, Button, Fade } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CloseIcon from '@mui/icons-material/Close';
import { caterers } from './MenuPage';
import phonepe from "../assets/phonepe.png";
import gpay from "../assets/gpay.png";
import amazon_pay from "../assets/amazon_pay.png";
import sbi from "../assets/SBI.png";
import axis from "../assets/Axis.png";
import bob from "../assets/BOB.png";
import rupay from "../assets/rupay.png"

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

const MenuCard = styled(Box)({
  background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  borderRadius: '20px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  padding: '12px 8px',
  maxWidth: '420px',
  margin: '0 auto',
  marginTop: 10,
  border: '1px solid rgba(25,118,210,0.1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
  }
});

const MenuHeading = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.8rem',
  textAlign: 'center',
  marginBottom: 8,
  letterSpacing: 1,
  color: '#222',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  '& svg': {
    color: '#1976d2',
    fontSize: '1.6rem'
  }
});

const MenuSubHeading = styled(Typography)({
  fontWeight: 500,
  fontSize: '1.2rem',
  textAlign: 'center',
  marginBottom: 20,
  color: '#4b5e3a',
  fontFamily: 'cursive',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  '& svg': {
    color: '#4b5e3a',
    fontSize: '1.3rem'
  }
});

const MenuDivider = styled('div')({
  width: '100%',
  height: 2,
  background: 'linear-gradient(90deg, #bdbdbd 0%, #fff 50%, #bdbdbd 100%)',
  margin: '16px 0 20px 0',
});

const MenuGrid = styled(Box)({
  display: 'flex',
  gap: 24,
  justifyContent: 'center',
  '@media (max-width: 700px)': {
    flexDirection: 'column',
    gap: 0,
  },
});

const MenuCol = styled(Box)({
  flex: 1,
});

const MenuDayTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: '1.15rem',
  color: '#222',
  marginBottom: 6,
  marginTop: 16,
  fontFamily: 'serif',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  '& svg': {
    color: '#1976d2',
    fontSize: '1.1rem'
  }
});

const MenuItemRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 6,
  gap: 8,
  padding: '4px 0',
  '&:hover': {
    background: 'rgba(25,118,210,0.03)',
    borderRadius: '4px',
  }
});

const MenuItemText = styled(Typography)({
  fontSize: '1rem',
  color: '#444',
  fontFamily: 'serif',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  '& svg': {
    color: '#666',
    fontSize: '0.9rem'
  }
});

const SubscriptionButtons = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: 16,
  marginTop: 24,
  paddingTop: 20,
  borderTop: '1px solid rgba(0,0,0,0.08)',
});

const SubscriptionButton = styled(Button)({
  background: 'linear-gradient(135deg, #C4362A 0%, #ff5e62 100%)',
  color: '#fff',
  fontWeight: 600,
  fontSize: '1rem',
  borderRadius: '8px',
  minWidth: '140px',
  padding: '8px 0',
  boxShadow: '0 2px 8px rgba(196,54,42,0.15)',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(135deg, #a82a1f 0%, #ff4b4f 100%)',
  },
});

const MenuTypePill = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  background: '#1976d2',
  color: '#fff',
  borderRadius: '16px',
  fontWeight: 600,
  fontSize: '1.05rem',
  padding: '4px 18px',
  marginBottom: 18,
  letterSpacing: 1,
  boxShadow: '0 2px 8px rgba(25,118,210,0.10)',
}));

const DiagonalRibbon = styled(Box)(({ bgcolor }) => ({
  position: 'absolute',
  top: 12,
  left: -38,
  width: 140,
  height: 32,
  background: bgcolor || '#1976d2',
  color: '#fff',
  fontWeight: 700,
  fontSize: '1rem',
  textAlign: 'center',
  lineHeight: '32px',
  transform: 'rotate(-25deg)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
  letterSpacing: 1,
  zIndex: 3,
  pointerEvents: 'none',
  textShadow: '0 1px 4px rgba(0,0,0,0.10)'
}));

const PaymentSummaryBar = styled(Box)({
  border: '1.5px solid #8bc34a',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px',
  marginTop: 18,
  background: '#fff',
  boxShadow: '0 1px 4px rgba(76,175,80,0.08)',
  gap: 18,
  minHeight: 56,
  position: 'relative',
});

const PayButton = styled(Button)({
  background: '#4caf50',
  color: '#fff',
  fontWeight: 600,
  fontSize: '1.1rem',
  borderRadius: '6px',
  minWidth: '120px',
  padding: '10px 0',
  textTransform: 'none',
  '&:hover': {
    background: '#388e3c',
  },
});

const QtyBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #bbb',
  borderRadius: 6,
  background: '#fff',
  minWidth: 80,
  justifyContent: 'center',
  gap: 8,
  fontWeight: 600,
  fontSize: 18,
  padding: '2px 8px',
});

const menuTypes = [
  { key: 'lunchMenu', label: 'Lunch' },
  { key: 'dinnerMenu', label: 'Dinner' },
  { key: 'breakfastMenu', label: 'Breakfast' },
];

// Dummy QR code image (replace with your own if needed)
const qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay';

function PaymentModal({ open, onClose, price }) {
  const [method, setMethod] = useState('wallet');
  const walletBalance = 2000;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" PaperProps={{ sx: { borderRadius: 4, p: 2, position: 'relative' } }} disableScrollLock>
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12, zIndex: 10, color: '#333' }}>
        <CloseIcon fontSize="medium" />
      </IconButton>
      <DialogContent sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 4, minWidth: { xs: 320, sm: 600 } }}>
        {/* Left: Payment Methods */}
        <Box sx={{ flex: 1, minWidth: 260 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, textAlign: 'center' }}>Payment</Typography>
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <RadioGroup value={method} onChange={e => setMethod(e.target.value)}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, border: '1.5px solid #eee', borderRadius: 5, px: 2, py: 1, background: method==='wallet' ? '#fafafa' : '#fff' }}>
                <FormControlLabel value="wallet" control={<Radio />} label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><AccountBalanceWalletIcon sx={{ color: '#43a047' }} />WALLET</Box>} />
                <Box sx={{ ml: 'auto', background: '#aee571', color: '#222', borderRadius: 2, px: 2, py: 0.5, fontWeight: 600, fontSize: 16 }}>₹{price}</Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, border: '1.5px solid #eee', borderRadius: 5, px: 2, py: 1, background: method==='upi' ? '#fafafa' : '#fff' }}>
                <FormControlLabel 
                  value="upi" 
                  control={<Radio />} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '170px' }}>
                      <span>UPI</span>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img src={phonepe} alt="PhonePe" style={{height:18}} />
                        <img src={amazon_pay} alt="Amazon Pay" style={{height:18}} />
                        <img src={gpay} alt="GPay" style={{height:18}} />
                      </Box>
                    </Box>
                  }
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, border: '1.5px solid #eee', borderRadius: 5, px: 2, py: 1, background: method==='card' ? '#fafafa' : '#fff' }}>
                <FormControlLabel 
                  value="card" 
                  control={<Radio />} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '170px' }}>
                      <span>CARD</span>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img src={axis} alt="Axis" style={{height:18}} />
                        <img src={bob} alt="BOB" style={{height:18}} />
                        <img src={sbi} alt="SBI" style={{height:18}} />
                      </Box>
                    </Box>
                  }
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, border: '1.5px solid #eee', borderRadius: 5, px: 2, py: 1, background: method==='netbanking' ? '#fafafa' : '#fff' }}>
                <FormControlLabel value="netbanking" control={<Radio />} label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>NET BANKING <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" style={{height:18}} /> <img src={rupay} alt="RuPay" style={{height:18}} /> <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" style={{height:18}} /></Box>} />
              </Box>
            </RadioGroup>
          </FormControl>
          <Button variant="outlined" sx={{ mt: 2, width: '100%', borderRadius: 5, fontWeight: 600, fontSize: 18, py: 1.2 }} color="primary">Proceed to Pay</Button>
        </Box>
        {/* Right: Wallet Bal & QR */}
        <Box sx={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box sx={{ background: 'linear-gradient(180deg, #aee571 0%, #43a047 100%)', color: '#222', borderRadius: 3, px: 4, py: 2, fontWeight: 700, fontSize: 20, mb: 2, boxShadow: 2, textAlign: 'center' }}>
            Wallet Bal.<br />₹{walletBalance}
          </Box>
          <Typography sx={{ fontWeight: 500, mb: 1 }}>Scan QR</Typography>
          <img src={qrCodeUrl} alt="QR Code" style={{ width: 140, height: 140, marginBottom: 8, borderRadius: 8, border: '2px solid #222' }} />
          <Typography sx={{ fontSize: 16, color: '#888', mt: 1 }}>or</Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <img src={phonepe} alt="PhonePe" style={{height:22}} />
            <img src={gpay} alt="GPay" style={{height:22}} />
            <img src={amazon_pay} alt="Paytm" style={{height:22}} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

const MenuDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const caterer = location.state?.caterer;
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [subs15Count, setSubs15Count] = useState(0);
  const [subs30Count, setSubs30Count] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryMsg, setSummaryMsg] = useState('');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(0);
  // Menu slider state
  const [menuIdx, setMenuIdx] = useState(0); // 0: Lunch, 1: Dinner, 2: Breakfast
  const [fadeIn, setFadeIn] = useState(true);

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

  // Find the caterer from the imported caterers array using name
  const foundCaterer = caterers.find(c => c.name === caterer.name);

  // Get available menu types for this caterer
  const availableMenus = menuTypes.filter(mt => foundCaterer && foundCaterer[mt.key]);
  // Clamp menuIdx if needed
  const safeMenuIdx = Math.min(menuIdx, availableMenus.length - 1);
  const currentMenuType = availableMenus[safeMenuIdx]?.key || 'lunchMenu';
  const currentMenuLabel = availableMenus[safeMenuIdx]?.label || 'Lunch';
  const menu = foundCaterer && foundCaterer[currentMenuType] ? foundCaterer[currentMenuType] : [];
  const leftDays = menu.slice(0, 3);
  const rightDays = menu.slice(3, 6);

  // Animation handler
  const handleMenuChange = (dir) => {
    setFadeIn(false);
    setTimeout(() => {
      setMenuIdx(idx => {
        if (dir === 'next') {
          return (idx + 1) % availableMenus.length;
        } else {
          return (idx - 1 + availableMenus.length) % availableMenus.length;
        }
      });
      setFadeIn(true);
    }, 180);
  };

  // Calculate total
  const total = subs15Count * 1500 + subs30Count * 2400;

  // Message for summary
  let msg = '';
  if (subs15Count > 0 && subs30Count > 0) {
    msg = `You have added ${subs15Count} x 15 days and ${subs30Count} x monthly subscription.`;
  } else if (subs15Count > 0) {
    msg = `You have added ${subs15Count} x 15 days subscription.`;
  } else if (subs30Count > 0) {
    msg = `You have added ${subs30Count} x monthly subscription.`;
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
        {/* Caterer Details Header - OUTSIDE CARD */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, p: 2, background: '#f8fafc', borderRadius: '14px', boxShadow: '0 2px 8px rgba(25,118,210,0.06)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={foundCaterer?.image} alt={foundCaterer?.name} sx={{ width: 70, height: 70, border: '2px solid #eee', mr: 2 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, fontSize: '1.15rem', mb: 0.5 }}>{foundCaterer?.name}</Typography>
              <Typography sx={{ color: '#666', fontSize: '1rem', mb: 0.5 }}>{foundCaterer?.address}</Typography>
              <Typography sx={{ color: '#666', fontSize: '0.95rem', mb: 0.5 }}>{foundCaterer?.phone}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#FFD600', fontSize: 20 }}>★</span>
                ))}
                <Chip label={foundCaterer?.years + ' years'} size="small" sx={{ ml: 1, bgcolor: '#43a047', color: '#fff', fontWeight: 600 }} />
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src={require('../assets/FSSAI_logo.png')} alt="FSSAI Logo" style={{ width: 38, height: 38, objectFit: 'contain' }} />
            <Typography sx={{ fontSize: '0.9rem', color: '#666', textAlign: 'right', ml: 2 }}>{foundCaterer?.fssaiNumber}</Typography>
          </Box>
        </Box>
        {/* Menu Type Slider Controls */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => handleMenuChange('prev')}
              disabled={availableMenus.length < 2}
              sx={{ bgcolor: '#f0f4fa', borderRadius: '50%' }}
              size="small"
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <MenuTypePill>{currentMenuLabel}</MenuTypePill>
            <IconButton
              onClick={() => handleMenuChange('next')}
              disabled={availableMenus.length < 2}
              sx={{ bgcolor: '#f0f4fa', borderRadius: '50%' }}
              size="small"
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        {/* Animated Menu Card */}
        <Fade in={fadeIn} timeout={300}>
          <div>
            <MenuCard>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, position: 'relative' }}>
                <img 
                  src={foundCaterer?.image} 
                  alt={foundCaterer?.name} 
                  style={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }} 
                />
              </Box>
              <MenuSubHeading>
                <RestaurantIcon />
                {foundCaterer?.name}
              </MenuSubHeading>
              <MenuHeading>
                <AccessTimeIcon />
                WEEKLY FOOD MENU
              </MenuHeading>
              <MenuDivider />
              <MenuGrid>
                <MenuCol>
                  {leftDays.map(day => (
                    <Box key={day.day}>
                      <MenuDayTitle>
                        <CalendarTodayIcon />
                        {day.day}
                      </MenuDayTitle>
                      {day.items.map((item, idx) => (
                        <MenuItemRow key={idx}>
                          <MenuItemText>
                            <RestaurantIcon />
                            {item.desc}
                          </MenuItemText>
                        </MenuItemRow>
                      ))}
                    </Box>
                  ))}
                </MenuCol>
                <MenuCol>
                  {rightDays.map(day => (
                    <Box key={day.day}>
                      <MenuDayTitle>
                        <CalendarTodayIcon />
                        {day.day}
                      </MenuDayTitle>
                      {day.items.map((item, idx) => (
                        <MenuItemRow key={idx}>
                          <MenuItemText>
                            <RestaurantIcon />
                            {item.desc}
                          </MenuItemText>
                        </MenuItemRow>
                      ))}
                    </Box>
                  ))}
                </MenuCol>
              </MenuGrid>
              <SubscriptionButtons>
                <SubscriptionButton onClick={() => {
                  if (localStorage.getItem('isLoggedIn') !== 'true') {
                    setShowLoginPrompt(true);
                  } else {
                    setSubs15Count(c => {
                      setShowSummary(true);
                      setSummaryMsg('');
                      return c + 1;
                    });
                  }
                }}>
                  Subscription @ ₹1500 / 15 Days
                </SubscriptionButton>
                <SubscriptionButton onClick={() => {
                  if (localStorage.getItem('isLoggedIn') !== 'true') {
                    setShowLoginPrompt(true);
                  } else {
                    setSubs30Count(c => {
                      setShowSummary(true);
                      setSummaryMsg('');
                      return c + 1;
                    });
                  }
                }}>
                  Subscription @ ₹2400 / Month
                </SubscriptionButton>
              </SubscriptionButtons>
            </MenuCard>
            {/* Inline Payment Summary Bar and message OUTSIDE the card */}
            {(showSummary && (subs15Count > 0 || subs30Count > 0)) && (
              <PaymentSummaryBar>
                {subs15Count > 0 && (
                  <>
                    <Typography sx={{ fontWeight: 600, mr: 1 }}>15 days</Typography>
                    <QtyBox>
                      <IconButton size="small" onClick={() => setSubs15Count(c => Math.max(0, c - 1))}>
                        -
                      </IconButton>
                      <span>{subs15Count}</span>
                      <IconButton size="small" onClick={() => setSubs15Count(c => c + 1)}>
                        +
                      </IconButton>
                    </QtyBox>
                  </>
                )}
                {subs30Count > 0 && (
                  <>
                    <Typography sx={{ fontWeight: 600, ml: 2, mr: 1 }}>Monthly</Typography>
                    <QtyBox>
                      <IconButton size="small" onClick={() => setSubs30Count(c => Math.max(0, c - 1))}>
                        -
                      </IconButton>
                      <span>{subs30Count}</span>
                      <IconButton size="small" onClick={() => setSubs30Count(c => c + 1)}>
                        +
                      </IconButton>
                    </QtyBox>
                  </>
                )}
                <PayButton sx={{ ml: 'auto', px: 3 }} onClick={() => {
                  setSelectedPrice(total);
                  setPaymentModalOpen(true);
                }}>
                  Pay ₹ {total}
                </PayButton>
              </PaymentSummaryBar>
            )}
            {msg && showSummary && (
              <Typography sx={{ color: '#388e3c', fontWeight: 500, mt: 1, mb: 0, fontSize: 15 }}>{msg}</Typography>
            )}
          </div>
        </Fade>
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

      <PaymentModal open={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} price={selectedPrice} />
    </>
  );
};

export default MenuDetails; 