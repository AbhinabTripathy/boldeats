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
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { caterers } from './MenuPage';
import phonepe from "../assets/phonepe.png";
import gpay from "../assets/gpay.png";
import amazon_pay from "../assets/amazon_pay.png";
import sbi from "../assets/SBI.png";
import axis from "../assets/Axis.png";
import bob from "../assets/BOB.png";
import rupay from "../assets/rupay.png"
import Header from '../components/Header';
import qrCodeAsset from '../assets/QR Code .png';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

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
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
  },
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
  '@media (max-width: 600px)': {
    minWidth: 60,
    fontSize: 16,
  },
});

const menuTypes = [
  { key: 'lunchMenu', label: 'Lunch' },
  { key: 'dinnerMenu', label: 'Dinner' },
  { key: 'breakfastMenu', label: 'Breakfast' },
];

// Dummy QR code image (replace with your own if needed)
const qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay';

// Add a veg icon and a placeholder food image
const foodImg = 'https://img.freepik.com/free-photo/indian-food_23-2148001642.jpg?w=360';

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
                {method === 'wallet' && (
                  <Box sx={{ ml: 'auto', background: '#c6ef9c', color: '#222', borderRadius: 2.5, px: 3, py: 1, fontWeight: 700, fontSize: 20, boxShadow: 1 }}>
                    ₹{price}
                  </Box>
                )}
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
                {method === 'upi' && (
                  <Box sx={{ ml: 'auto', background: '#c6ef9c', color: '#222', borderRadius: 2.5, px: 3, py: 1, fontWeight: 700, fontSize: 20, boxShadow: 1 }}>
                    ₹{price}
                  </Box>
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, border: '1.5px solid #eee', borderRadius: 5, px: 2, py: 1, background: method==='netbanking' ? '#fafafa' : '#fff' }}>
                <FormControlLabel value="netbanking" control={<Radio />} label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>NET BANKING <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" style={{height:18}} /> <img src={rupay} alt="RuPay" style={{height:18}} /> <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" style={{height:18}} /></Box>} />
                {method === 'netbanking' && (
                  <Box sx={{ ml: 'auto', background: '#c6ef9c', color: '#222', borderRadius: 2.5, px: 3, py: 1, fontWeight: 700, fontSize: 20, boxShadow: 1 }}>
                    ₹{price}
                  </Box>
                )}
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
          {method === 'upi' && (
            <>
              <Typography sx={{ fontWeight: 500, mb: 1 }}>Scan QR</Typography>
              <img src={qrCodeAsset} alt="UPI QR Code" style={{ width: 300, height: 300, marginBottom: 8, borderRadius: 8, border: '2px solid #222' }} />
              <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#222', mt: 1 }}>UPI ID: boldtribe1234@idfcbank</Typography>
              <Typography sx={{ fontSize: 16, color: '#888', mt: 1 }}>or</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <img src={phonepe} alt="PhonePe" style={{height:22}} />
                <img src={gpay} alt="GPay" style={{height:22}} />
                <img src={amazon_pay} alt="Paytm" style={{height:22}} />
              </Box>
            </>
          )}
          {method === 'netbanking' && (
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 16, mb: 1, textAlign: 'center' }}>Account Details</Typography>
              <Typography sx={{ fontSize: 14, mb: 0.5, textAlign: 'center' }}>Account Number: 1234567890</Typography>
              <Typography sx={{ fontSize: 14, mb: 0.5, textAlign: 'center' }}>Account Holder Name: BoldTribe</Typography>
              <Typography sx={{ fontSize: 14, mb: 0.5, textAlign: 'center' }}>IFSC Code: IDFC0001234</Typography>
              <Typography sx={{ fontSize: 14, mb: 0.5, textAlign: 'center' }}>Branch Name: Main Branch</Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function SubscriptionModal({ open, onClose, onAdd }) {
  const [quantities, setQuantities] = useState({ 15: 0, 30: 0 });

  const plans = [
    { days: 15, price: 1500, label: '15 Days Subscription' },
    { days: 30, price: 2400, label: '30 Days Subscription' }
  ];

  const handleAdd = () => {
    // Add both plans if they have quantities
    plans.forEach(plan => {
      if (quantities[plan.days] > 0) {
        onAdd({
          days: plan.days,
          price: plan.price,
          quantity: quantities[plan.days]
        });
      }
    });
    setQuantities({ 15: 0, 30: 0 });
    onClose();
  };

  const updateQuantity = (days, delta) => {
    setQuantities(prev => ({
      ...prev,
      [days]: Math.max(0, prev[days] + delta)
    }));
  };

  const totalAmount = plans.reduce((sum, plan) => 
    sum + (plan.price * quantities[plan.days]), 0
  );

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{ 
        sx: { 
          borderRadius: 3,
          p: 2
        } 
      }}
    >
      <DialogTitle sx={{ 
        textAlign: 'center',
        fontWeight: 700,
        fontSize: '1.5rem',
        color: '#222'
      }}>
        Choose Subscription Plan
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          {plans.map((plan) => (
            <Box
              key={plan.days}
              sx={{
                border: '2px solid',
                borderColor: quantities[plan.days] > 0 ? '#C4362A' : '#e0e0e0',
                borderRadius: 2,
                p: 2,
                transition: 'all 0.3s ease',
                background: quantities[plan.days] > 0 ? '#fff3f0' : '#fff',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                    {plan.label}
                  </Typography>
                  <Typography sx={{ color: '#666', mt: 0.5 }}>
                    Valid for {plan.days} days
                  </Typography>
                </Box>
                <Typography sx={{ 
                  fontWeight: 700, 
                  fontSize: '1.3rem',
                  color: '#C4362A'
                }}>
                  ₹{plan.price}
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#f5f5f5',
                p: 2,
                borderRadius: 2
              }}>
                <Typography sx={{ fontWeight: 600 }}>Quantity:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton 
                    size="small"
                    onClick={() => updateQuantity(plan.days, -1)}
                    sx={{ 
                      border: '1px solid #bbb',
                      '&:hover': { background: '#eee' }
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ mx: 2, fontWeight: 600 }}>{quantities[plan.days]}</Typography>
                  <IconButton 
                    size="small"
                    onClick={() => updateQuantity(plan.days, 1)}
                    sx={{ 
                      border: '1px solid #bbb',
                      '&:hover': { background: '#eee' }
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          disabled={totalAmount === 0}
          onClick={handleAdd}
          sx={{
            background: '#C4362A',
            color: '#fff',
            py: 1.5,
            fontWeight: 600,
            '&:hover': {
              background: '#a82a1f'
            },
            '&.Mui-disabled': {
              background: '#eee',
              color: '#999'
            }
          }}
        >
          Add to Cart - ₹{totalAmount}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const MenuDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const caterer = location.state?.caterer;
  const [activeTab, setActiveTab] = useState(0);
  const [cartQty, setCartQty] = useState(0);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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

  // Determine which menu to show based on activeTab
  let menu = [];
  if (activeTab === 0 && caterer.lunchMenu) menu = caterer.lunchMenu;
  if (activeTab === 1 && caterer.dinnerMenu) menu = caterer.dinnerMenu;
  if (activeTab === 2 && caterer.breakfastMenu) menu = caterer.breakfastMenu;

  // Update the cart items handling
  const handleAddToCart = (newItem) => {
    setCartItems(prev => {
      // Check if this subscription type already exists
      const existingItemIndex = prev.findIndex(item => item.days === newItem.days);
      
      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prev, newItem];
      }
    });
    setCartQty(prev => prev + newItem.quantity);
  };

  // Add function to update quantity in cart
  const updateCartItemQuantity = (index, delta) => {
    setCartItems(prev => {
      const updatedItems = [...prev];
      const newQuantity = Math.max(0, updatedItems[index].quantity + delta);
      
      if (newQuantity === 0) {
        // Remove item if quantity becomes 0
        updatedItems.splice(index, 1);
      } else {
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: newQuantity
        };
      }
      
      // Update total cart quantity
      const newTotalQty = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      setCartQty(newTotalQty);
      
      return updatedItems;
    });
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update the cart section JSX
  const cartSection = cartItems.length === 0 ? (
    <>
      <ShoppingCartOutlinedIcon sx={{ fontSize: 50, color: '#bdbdbd', mb: 1, mt: 2 }} />
      <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 0.5, mt: 2 }}>OOPS! your cart is EMPTY</Typography>
      <Typography sx={{ color: '#888', fontSize: 13 }}>Looks like you haven't added to your cart yet.</Typography>
    </>
  ) : (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Box sx={{ background: '#ffe7d6', borderRadius: 1, py: 0.5, mb: 1.5, textAlign: 'center', fontWeight: 600, fontSize: 15, letterSpacing: 1, color: '#222' }}>CART</Box>
      <Typography sx={{ fontWeight: 600, fontSize: 11, mb: 1, color: '#222' }}>{cartItems.length} ITEM(S)</Typography>
      {cartItems.map((item, index) => (
        <Box key={index} sx={{ 
          border: '1.2px solid #e0e0e0', 
          borderRadius: 2, 
          p: 2,
          display: 'flex', 
          flexDirection: 'column',
          mb: 2,
          background: item.days === 30 ? '#fff3f0' : '#f5f9ff',
          borderColor: item.days === 30 ? '#ffcdc3' : '#b3d4ff'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ 
              fontWeight: 600, 
              fontSize: 13,
              color: item.days === 30 ? '#C4362A' : '#1976d2'
            }}>
              {item.days} Days Subscription
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton 
                size="small"
                onClick={() => updateCartItemQuantity(index, -1)}
                sx={{ 
                  border: '1px solid #bbb',
                  '&:hover': { background: '#eee' }
                }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 1, fontWeight: 600 }}>{item.quantity}</Typography>
              <IconButton 
                size="small"
                onClick={() => updateCartItemQuantity(index, 1)}
                sx={{ 
                  border: '1px solid #bbb',
                  '&:hover': { background: '#eee' }
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 0.5
          }}>
            <Typography sx={{ 
              fontWeight: 700, 
              fontSize: 14,
              color: '#222'
            }}>
              ₹{item.price * item.quantity}
            </Typography>
          </Box>
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography sx={{ fontWeight: 600, fontSize: 12, color: '#222' }}>SUBTOTAL</Typography>
        <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#222' }}>₹ {totalPrice}</Typography>
      </Box>
      <Button 
        fullWidth 
        sx={{ 
          background: '#d98a7e', 
          color: '#fff', 
          fontWeight: 700, 
          fontSize: 15, 
          borderRadius: 2, 
          py: 1, 
          mt: 1, 
          boxShadow: 'none', 
          '&:hover': { 
            background: '#c4362a' 
          } 
        }}
        onClick={() => setPaymentModalOpen(true)}
      >
        CHECKOUT
      </Button>
    </Box>
  );

  // Update the ADD button click handler
  const handleAddButtonClick = () => {
    setSubscriptionModalOpen(true);
  };

  return (
    <>
      <Header />
      <Box sx={{ background: '#fff', minHeight: '100vh', pb: 6, mt: 4 }}>
        {/* Top Vendor Info */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', maxWidth: 1200, mx: 'auto', mt: 14, px: 4 }}>
          {/* Left: Image & Info */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            <img src={caterer.image} alt={caterer.name} style={{ width: 180, height: 120, borderRadius: 12, objectFit: 'cover', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>{caterer.name}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#FFD600', fontSize: 18 }}>★</span>
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip label="Non-veg" color="error" size="small" icon={<CancelIcon sx={{ color: '#fff' }} />} />
                <Chip label="Veg" color="success" size="small" icon={<CheckCircleIcon sx={{ color: '#fff' }} />} />
              </Box>
              <Typography sx={{ mt: 1, fontSize: 15 }}>{caterer.years} years in business · {caterer.address} · {caterer.phone}</Typography>
              <Typography sx={{ fontSize: 15 }}>Open 24 hours</Typography>
              <Typography sx={{ fontSize: 15 }}>On-site services·Online appointments</Typography>
            </Box>
          </Box>
          {/* Right: Info */}
          <Box sx={{ minWidth: 320, textAlign: 'right', mt: 1 }}>
            <Typography sx={{ fontSize: 15 }}>Lunch and Dinner can be ordered from the site.</Typography>
            <Typography sx={{ fontSize: 15, mt: 2 }}>
              For breakfast please call on<br />
              <span style={{ fontWeight: 600 }}>{caterer.phone}</span>
            </Typography>
          </Box>
        </Box>

        {/* Meal Tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          {["Lunch", "Dinner", "Breakfast"].map((label, idx) => (
            <Button
              key={label}
              variant={activeTab === idx ? 'contained' : 'outlined'}
              sx={{
                borderRadius: 2,
                minWidth: 120,
                fontWeight: 600,
                fontSize: 16,
                background: activeTab === idx ? '#e9b7b2' : '#fff',
                color: activeTab === idx ? '#C4362A' : '#333',
                borderColor: '#e9b7b2',
                boxShadow: activeTab === idx ? '0 2px 8px rgba(196,54,42,0.08)' : 'none',
                '&:hover': {
                  background: '#f5e0de',
                  color: '#C4362A',
                },
              }}
              onClick={() => setActiveTab(idx)}
            >
              {label}
            </Button>
          ))}
        </Box>

        {/* Main Content: Menu + Cart */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 6, mt: 5, maxWidth: 1200, mx: 'auto' }}>
          {/* Left: Weekly Menu */}
          <Box sx={{ background: 'linear-gradient(180deg, #ffe0d3 0%, #fbeee6 100%)', borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', p: 2, minWidth: 300, maxWidth: 400, flex: 1, mx: 'auto' }}>
            <Typography sx={{ fontWeight: 600, fontSize: 22, mb: 3, textAlign: 'center', color: '#222' }}>Choose your weekly menu</Typography>
            {menu.map((item, idx) => (
              <Box key={idx} sx={{
                background: '#fff',
                borderRadius: 3,
                border: '1.5px solid #e0e0e0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 1,
                mb: 2.5,
                minHeight: 60,
                justifyContent: 'space-between',
              }}>
                {/* Left: Menu Info */}
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <Typography sx={{ fontSize: 11, color: '#888', fontWeight: 500, mb: 0.2 }}>MENU 1</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.2 }}>
                    <FiberManualRecordIcon sx={{ color: '#43a047', fontSize: 15, mr: 0.5 }} />
                    <Typography sx={{ fontWeight: 700, fontSize: 15, color: '#222', mr: 1 }}>{item.day}</Typography>
                  </Box>
                  {item.items && item.items.map((i, j) => (
                    <Typography key={j} sx={{ fontSize: 11, color: '#222', textTransform: 'uppercase', fontWeight: 500, letterSpacing: 0.15 }}>{i.desc}</Typography>
                  ))}
                </Box>
                {/* Right: Food Image */}
                <Box sx={{ ml: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Avatar src={foodImg} alt="food" sx={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid #e0e0e0', objectFit: 'cover' }} />
                </Box>
              </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button 
                sx={{
                  background: '#fff',
                  color: '#C4362A',
                  fontWeight: 700,
                  fontSize: 24,
                  borderRadius: 6,
                  px: 4,
                  py: 1,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                  border: '1.5px solid #e0e0e0',
                  '&:hover': {
                    background: '#f5f5f5',
                    color: '#C4362A',
                  },
                }}
                onClick={handleAddButtonClick}
              >
                ADD +
              </Button>
            </Box>
          </Box>
          {/* Right: Cart Section */}
          <Box sx={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', minWidth: 280, maxWidth: 340, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', p: 1.5 }}>
            {cartSection}
          </Box>
        </Box>
      </Box>
      {cartQty > 0 && (
        <PaymentModal open={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} price={cartQty * 1500} />
      )}
      <SubscriptionModal 
        open={subscriptionModalOpen}
        onClose={() => setSubscriptionModalOpen(false)}
        onAdd={handleAddToCart}
      />
    </>
  );
};

export default MenuDetails; 