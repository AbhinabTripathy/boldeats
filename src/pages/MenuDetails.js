import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Chip, Avatar, styled, IconButton, Button, Fade } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import RestaurantIcon from '@mui/icons-material/Restaurant';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import Divider from '@mui/material/Divider';
// import PaymentIcon from '@mui/icons-material/Payment';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import QrCode2Icon from '@mui/icons-material/QrCode2';
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
// import { caterers } from './MenuPage';
import phonepe from "../assets/phonepe.png";
import gpay from "../assets/gpay.png";
import amazon_pay from "../assets/amazon_pay.png";
// import sbi from "../assets/SBI.png";
// import axis from "../assets/Axis.png";
// import bob from "../assets/BOB.png";
import rupay from "../assets/rupay.png"
import Header from '../components/Header';
import qrCodeAsset from '../assets/QR Code .png';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Modal from '@mui/material/Modal';

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
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [showReceiptUpload, setShowReceiptUpload] = useState(false);
  const [receiptImage, setReceiptImage] = useState(null);
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [paymentId, setPaymentId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let timer;
    if (showTimer && timeLeft > 0 && paymentStatus !== 'ACCEPTED' && paymentStatus !== 'FAILED') {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showTimer, timeLeft, paymentStatus]);

  // Add status check interval
  useEffect(() => {
    let statusCheck;
    if (paymentId && showTimer && paymentStatus !== 'ACCEPTED' && paymentStatus !== 'FAILED') {
      statusCheck = setInterval(async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`https://api.boldeats.in/api/payment/status/${paymentId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.data && response.data.status) {
            setPaymentStatus(response.data.status);
            if (response.data.status === 'ACCEPTED') {
              setTimeout(() => {
                onClose();
              }, 3000);
            }
          }
        } catch (err) {
          console.error('Error checking payment status:', err);
        }
      }, 5000); // Check every 5 seconds
    }
    return () => clearInterval(statusCheck);
  }, [paymentId, showTimer, paymentStatus]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleContinue = () => {
    setShowReceiptUpload(true);
  };

  const handleReceiptUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Store the actual file instead of URL
      setReceiptImage(file);
    }
  };

  const handleOrder = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Create FormData object
      const formData = new FormData();
      formData.append('receipt', receiptImage); // This is now the actual file
      formData.append('method', selectedMethod.toUpperCase()); // Convert to uppercase
      formData.append('amount', price.toString()); // Convert to string

      console.log('Uploading payment with data:', {
        method: selectedMethod.toUpperCase(),
        amount: price,
        hasReceipt: !!receiptImage
      });

      const response = await axios.post('https://api.boldeats.in/api/payment/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      });

      console.log('Payment upload response:', response.data);

      if (response.status === 201 && response.data.success) {
        setPaymentId(response.data.paymentId);
        setPaymentStatus('PENDING');
        setShowTimer(true);
        setShowReceiptUpload(false);
      } else {
        throw new Error('Payment upload failed');
      }
    } catch (err) {
      console.error('Error uploading payment receipt:', err);
      setError(err.response?.data?.message || 'Failed to upload payment receipt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setShowTimer(false);
    setShowReceiptUpload(false);
    setReceiptImage(null);
    setPaymentId(null);
    setPaymentStatus(null);
    setTimeLeft(600);
  };

  return (
    <Dialog 
      open={open} 
      onClose={showTimer ? undefined : onClose} 
      maxWidth="md" 
      PaperProps={{ 
        sx: { 
          borderRadius: 4, 
          p: 2, 
          position: 'relative',
          ...(showTimer && {
            '& .MuiDialogContent-root': {
              padding: '40px 24px'
            }
          })
        } 
      }} 
      disableScrollLock
    >
      {!showTimer && (
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12, zIndex: 10, color: '#333' }}>
          <CloseIcon fontSize="medium" />
        </IconButton>
      )}
      <DialogContent sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 4, minWidth: { xs: 320, sm: 600 } }}>
        {!showReceiptUpload && !showTimer ? (
          <>
            {/* Left: Payment Methods */}
            <Box sx={{ flex: 1, minWidth: 260, mt: -2 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>Payment</Typography>
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup value={selectedMethod} onChange={e => setSelectedMethod(e.target.value)}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, border: '1.5px solid #eee', borderRadius: 5, px: 2, py: 1.5, background: selectedMethod==='upi' ? '#fafafa' : '#fff' }}>
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
                    {selectedMethod === 'upi' && (
                      <Box sx={{ ml: 'auto', background: '#c6ef9c', color: '#222', borderRadius: 2.5, px: 3, py: 1, fontWeight: 700, fontSize: 20, boxShadow: 1 }}>
                        ₹{price}
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, border: '1.5px solid #eee', borderRadius: 5, px: 2, py: 1.5, background: selectedMethod==='netbanking' ? '#fafafa' : '#fff' }}>
                    <FormControlLabel value="netbanking" control={<Radio />} label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>NET BANKING <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" style={{height:18}} /> <img src={rupay} alt="RuPay" style={{height:18}} /> <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" style={{height:18}} /></Box>} />
                    {selectedMethod === 'netbanking' && (
                      <Box sx={{ ml: 'auto', background: '#c6ef9c', color: '#222', borderRadius: 2.5, px: 3, py: 1, fontWeight: 700, fontSize: 20, boxShadow: 1 }}>
                        ₹{price}
                      </Box>
                    )}
                  </Box>
                </RadioGroup>
              </FormControl>
              <Button 
                variant="contained" 
                sx={{ 
                  mt: 2, 
                  width: '100%', 
                  borderRadius: 5, 
                  fontWeight: 600, 
                  fontSize: 18, 
                  py: 1.2,
                  background: '#C4362A',
                  '&:hover': {
                    background: '#a82a1f'
                  }
                }} 
                onClick={handleContinue}
              >
                Continue
              </Button>
            </Box>

            {/* Right: QR or Account Details */}
            <Box sx={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              {selectedMethod === 'upi' && (
                <>
                  <Typography sx={{ fontWeight: 500, mb: 1 }}>Scan QR</Typography>
                  <img src={qrCodeAsset} alt="UPI QR Code" style={{ width: 250, height: 400, marginBottom: 8, borderRadius: 8, border: '2px solid #222' }} />
                  <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#222', mt: 1 }}>UPI ID: boldtribe1234@idfcbank</Typography>
                  <Typography sx={{ fontSize: 16, color: '#888', mt: 1 }}>or</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <img src={phonepe} alt="PhonePe" style={{height:22}} />
                    <img src={gpay} alt="GPay" style={{height:22}} />
                    <img src={amazon_pay} alt="Paytm" style={{height:22}} />
                  </Box>
                </>
              )}
              {selectedMethod === 'netbanking' && (
                <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 16, mb: 1, textAlign: 'center' }}>Account Details</Typography>
                  <Typography sx={{ fontSize: 14, mb: 0.5, textAlign: 'center' }}>Account Number: 1234567890</Typography>
                  <Typography sx={{ fontSize: 14, mb: 0.5, textAlign: 'center' }}>Account Holder Name: BoldTribe</Typography>
                  <Typography sx={{ fontSize: 14, mb: 0.5, textAlign: 'center' }}>IFSC Code: IDFC0001234</Typography>
                  <Typography sx={{ fontSize: 14, mb: 0.5, textAlign: 'center' }}>Branch Name: Main Branch</Typography>
                </Box>
              )}
            </Box>
          </>
        ) : showReceiptUpload ? (
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Upload Payment Receipt</Typography>
            
            <Box sx={{ width: '100%', mb: 2 }}>
              <Typography sx={{ fontWeight: 600, mb: 1 }}>Payment Method</Typography>
              <Typography>{selectedMethod === 'upi' ? 'UPI Payment' : 'Net Banking'}</Typography>
              <Typography sx={{ fontWeight: 600, mt: 2, mb: 1 }}>Subtotal Amount</Typography>
              <Typography>₹{price}</Typography>
            </Box>

            <Box sx={{ 
              width: '100%', 
              height: 200, 
              border: '2px dashed #ccc', 
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: receiptImage ? 'none' : '#fafafa',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {receiptImage ? (
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img 
                    src={URL.createObjectURL(receiptImage)} 
                    alt="Receipt" 
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }} 
                  />
                  <IconButton
                    onClick={() => setReceiptImage(null)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      background: 'rgba(0,0,0,0.1)',
                      '&:hover': {
                        background: 'rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleReceiptUpload}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer'
                    }}
                  />
                  <Typography sx={{ color: '#666' }}>Click to upload receipt</Typography>
                  <Typography sx={{ color: '#999', fontSize: 14 }}>or drag and drop</Typography>
                </>
              )}
            </Box>

            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button 
              variant="contained" 
              sx={{ 
                width: '100%', 
                borderRadius: 5, 
                fontWeight: 600, 
                fontSize: 18, 
                py: 1.2,
                background: '#C4362A',
                '&:hover': {
                  background: '#a82a1f'
                }
              }} 
              onClick={handleOrder}
              disabled={!receiptImage || loading}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} sx={{ color: '#fff' }} />
                  <span>Uploading...</span>
                </Box>
              ) : (
                'Submit'
              )}
            </Button>
          </Box>
        ) : (
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            {paymentStatus === 'PENDING' && (
              <>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#C4362A' }}>Wait for the Status</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CircularProgress size={24} sx={{ color: '#C4362A' }} />
                  <Typography sx={{ fontWeight: 600, color: '#C4362A' }}>PENDING</Typography>
                </Box>
                <Typography sx={{ 
                  fontSize: 48, 
                  fontWeight: 700, 
                  color: '#C4362A',
                  fontFamily: 'monospace',
                  background: '#fff5f5',
                  padding: '16px 32px',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(196,54,42,0.1)'
                }}>
                  {formatTime(timeLeft)}
                </Typography>
                <Typography sx={{ color: '#666', textAlign: 'center', maxWidth: 400 }}>
                  Please wait while we verify your payment. You will receive a confirmation once verified.
                </Typography>
              </>
            )}
            
            {paymentStatus === 'ACCEPTED' && (
              <>
                <CheckCircleIcon sx={{ fontSize: 60, color: '#4caf50' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#4caf50' }}>
                  Order Accepted
                </Typography>
              </>
            )}
            
            {paymentStatus === 'FAILED' && (
              <>
                <CancelIcon sx={{ fontSize: 60, color: '#f44336' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#f44336' }}>
                  Payment Failed
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleRetry}
                  sx={{
                    mt: 2,
                    background: '#C4362A',
                    '&:hover': {
                      background: '#a82a1f'
                    }
                  }}
                >
                  Retry
                </Button>
              </>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SubscriptionModal({ open, onClose, onAdd, caterer, cartItems, setCartItems }) {
  const [quantities, setQuantities] = useState({ 15: 0, 30: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Define available plans based on vendor data
  const plans = [
    caterer.subscriptionPrice15Days && {
      days: 15,
      price: parseFloat(caterer.subscriptionPrice15Days),
      label: '15 Days Subscription',
      planType: '15days'
    },
    caterer.subscriptionPriceMonthly && {
      days: 30,
      price: parseFloat(caterer.subscriptionPriceMonthly),
      label: '30 Days Subscription',
      planType: '30days'
    }
  ].filter(Boolean); // Remove null/undefined entries

  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      onClose();
      if (window.openLoginModalFromHeader) {
        window.openLoginModalFromHeader();
      }
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Create cart items for each selected plan
      const cartPromises = plans.map(async (plan) => {
        const quantity = quantities[plan.days];
        if (quantity > 0) {
          const cartData = {
            vendorId: parseInt(caterer.id),
            planType: plan.planType,
            quantity: parseInt(quantity),
            pricePerUnit: parseFloat(plan.price),
            totalPrice: parseFloat(plan.price * quantity)
          };

          console.log('Adding to cart with data:', cartData);

          try {
            const response = await axios.post('https://api.boldeats.in/api/cart/add-to-cart', cartData, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            });
            
            console.log('Cart response:', response.data);
            return response;
          } catch (error) {
            console.error('Error in individual cart item:', error.response?.data || error.message);
            throw error;
          }
        }
        return null;
      }).filter(Boolean);

      const responses = await Promise.all(cartPromises);
      console.log('All cart responses:', responses);

      // Update local cart state
      plans.forEach(plan => {
        if (quantities[plan.days] > 0) {
          // Check if this plan type already exists in cart
          const existingItemIndex = cartItems.findIndex(item => item.days === plan.days);
          
          if (existingItemIndex >= 0) {
            // Update existing item quantity
            const updatedItems = [...cartItems];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + quantities[plan.days]
            };
            setCartItems(updatedItems);
          } else {
            // Add new item
            onAdd({
              days: plan.days,
              price: plan.price,
              quantity: quantities[plan.days],
              planType: plan.planType
            });
          }
        }
      });

      setQuantities({ 15: 0, 30: 0 });
      onClose();
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err.response?.data?.message || 'Failed to add items to cart. Please try again.');
    } finally {
      setLoading(false);
    }
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
        {error && (
          <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
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
                    disabled={loading}
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
                    disabled={loading}
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
          disabled={totalAmount === 0 || loading}
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
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} sx={{ color: '#fff' }} />
              <span>Adding to Cart...</span>
            </Box>
          ) : (
            `Add to Cart - ₹${totalAmount}`
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function AddressModal({ open, onClose, onAddAddress, editAddress, isEditing }) {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset form when modal opens/closes or editAddress changes
  useEffect(() => {
    if (isEditing && editAddress) {
      setAddress1(editAddress.addressLine1 || '');
      setAddress2(editAddress.addressLine2 || '');
      setPincode(editAddress.pincode || '');
      setCity(editAddress.city || '');
      setState(editAddress.state || '');
      setIsDefault(editAddress.isDefault || false);
    } else {
      setAddress1('');
      setAddress2('');
      setPincode('');
      setCity('');
      setState('');
      setIsDefault(false);
    }
  }, [open, editAddress, isEditing]);

  const fetchLocationDetails = async (pincode) => {
    if (pincode.length !== 6) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      
      if (data[0].Status === "Success") {
        const locationData = data[0].PostOffice[0];
        setCity(locationData.District);
        setState(locationData.State);
      } else {
        setError('Invalid Pincode');
        setCity('');
        setState('');
      }
    } catch (err) {
      setError('Error fetching location details');
      setCity('');
      setState('');
    } finally {
      setLoading(false);
    }
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(value);
    if (value.length === 6) {
      fetchLocationDetails(value);
    } else {
      setCity('');
      setState('');
    }
  };

  const handleSubmit = async () => {
    if (address1.trim() && pincode.length === 6) {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const addressData = {
          addressLine1: address1.trim(),
          addressLine2: address2.trim(),
          pincode: pincode,
          city: city,
          state: state
        };

        const fullAddress = `${address1.trim()}${address2.trim() ? `, ${address2.trim()}` : ''}, ${city}, ${state} - ${pincode}`;

        console.log('Sending address data:', addressData);
        
        if (isEditing && editAddress) {
          // Update existing address
          const response = await axios.put(`https://api.boldeats.in/api/addresses/${editAddress.id}`, addressData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          console.log('Address updated successfully:', response.data);

          // Handle default address setting
          try {
            const defaultResponse = await axios.patch(
              `https://api.boldeats.in/api/addresses/${editAddress.id}/default`,
              { isDefault: isDefault },
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
              }
            );
            console.log('Default status updated:', defaultResponse.data);

            // Update local state immediately
            onAddAddress(fullAddress, editAddress.id);
          } catch (defaultErr) {
            console.error('Error updating default status:', defaultErr);
          }
        } else {
          // Add new address
          const response = await axios.post('https://api.boldeats.in/api/addresses', addressData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          console.log('Address added successfully:', response.data);

          // Handle default address setting for new address
          if (isDefault && response.data.data.id) {
            try {
              await axios.patch(
                `https://api.boldeats.in/api/addresses/${response.data.data.id}/default`,
                { isDefault: true },
                {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  }
                }
              );
              console.log('New address set as default successfully');
            } catch (defaultErr) {
              console.error('Error setting new address as default:', defaultErr);
            }
          }

          // Update local state immediately
          onAddAddress(fullAddress);
        }
        
        // Reset form
        setAddress1('');
        setAddress2('');
        setPincode('');
        setCity('');
        setState('');
        setIsDefault(false);
        setError('');
        onClose();
      } catch (err) {
        console.error('Error saving address:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Error saving address');
      } finally {
        setLoading(false);
      }
    }
  };

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
        {isEditing ? 'Edit Address' : 'Add New Address'}
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
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Address Line 1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            required
            placeholder="House/Flat No., Building Name, Street"
          />
          
          <TextField
            fullWidth
            label="Address Line 2"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            placeholder="Area, Landmark (Optional)"
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Pincode"
              value={pincode}
              onChange={handlePincodeChange}
              required
              error={!!error}
              helperText={error}
              placeholder="6-digit pincode"
              InputProps={{
                endAdornment: loading && (
                  <CircularProgress size={20} sx={{ color: '#C4362A' }} />
                ),
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="City"
              value={city}
              InputProps={{
                readOnly: true,
              }}
              sx={{ 
                '& .MuiInputBase-input': {
                  color: city ? '#222' : '#999'
                }
              }}
            />
            
            <TextField
              fullWidth
              label="State"
              value={state}
              InputProps={{
                readOnly: true,
              }}
              sx={{ 
                '& .MuiInputBase-input': {
                  color: state ? '#222' : '#999'
                }
              }}
            />
          </Box>

          {/* Add Default Address Selection */}
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ mb: 1, fontWeight: 500 }}>Set as Default Address</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant={isDefault ? "contained" : "outlined"}
                onClick={() => setIsDefault(true)}
                sx={{
                  flex: 1,
                  borderColor: isDefault ? '#C4362A' : 'grey.300',
                  color: isDefault ? 'white' : '#C4362A',
                  '&:hover': {
                    borderColor: '#C4362A',
                    backgroundColor: isDefault ? '#C4362A' : 'transparent'
                  }
                }}
              >
                Yes
              </Button>
              <Button
                variant={!isDefault ? "contained" : "outlined"}
                onClick={() => setIsDefault(false)}
                sx={{
                  flex: 1,
                  borderColor: !isDefault ? '#C4362A' : 'grey.300',
                  color: !isDefault ? 'white' : '#C4362A',
                  '&:hover': {
                    borderColor: '#C4362A',
                    backgroundColor: !isDefault ? '#C4362A' : 'transparent'
                  }
                }}
              >
                No
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={!address1.trim() || pincode.length !== 6 || loading}
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
          {loading ? 'Saving...' : isEditing ? 'Update Address' : 'Add Address'}
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
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [menuItems, setMenuItems] = useState({
    breakfast: [],
    lunch: [],
    dinner: []
  });
  const [loadingMenu, setLoadingMenu] = useState({
    breakfast: false,
    lunch: false,
    dinner: false
  });
  const [availableMealTypes, setAvailableMealTypes] = useState([]);

  // Add useEffect for fetching cart data
  useEffect(() => {
    const fetchCartData = async () => {
      setLoadingCart(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found, skipping cart fetch');
          return;
        }

        const response = await axios.get('https://api.boldeats.in/api/cart', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        console.log('Cart data response:', response.data);

        if (response.data && response.data.data) {
          // Transform cart data to match our cart items format
          const transformedCartItems = response.data.data.map(item => ({
            id: item.id,
            days: item.planType === '30days' ? 30 : 15,
            price: parseFloat(item.pricePerUnit),
            quantity: parseInt(item.quantity),
            planType: item.planType
          }));

          setCartItems(transformedCartItems);
          
          // Update total cart quantity
          const totalQty = transformedCartItems.reduce((sum, item) => sum + item.quantity, 0);
          setCartQty(totalQty);
        }
      } catch (err) {
        console.error('Error fetching cart data:', err.response?.data || err.message);
      } finally {
        setLoadingCart(false);
      }
    };

    fetchCartData();
  }, []); // Empty dependency array means this runs once when component mounts

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Add handleDeleteCartItem function
  const handleDeleteCartItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      console.log('Deleting cart item with ID:', itemId);

      const response = await axios.delete(`https://api.boldeats.in/api/cart/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.data) {
        console.log('Cart item deleted successfully:', response.data);
        
        // Update local cart state by removing the deleted item
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        
        // Update total cart quantity
        setCartQty(prevQty => prevQty - 1);
      }
    } catch (err) {
      console.error('Error deleting cart item:', err.response?.data || err.message);
    }
  };

  // Add handleAddToCart function
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

  // Add handleAddAddress function
  const handleAddAddress = (newAddress, addressId = null) => {
    if (addressId) {
      // Update existing address
      setAddresses(prev => prev.map(addr => 
        addr.id === addressId ? { 
          ...addr, 
          fullAddress: newAddress,
          isDefault: editAddress?.isDefault || false 
        } : {
          ...addr,
          isDefault: false // Set all other addresses to non-default
        }
      ));
    } else {
      // Add new address
      setAddresses(prev => {
        // If new address is default, set all others to non-default
        if (editAddress?.isDefault) {
          return prev.map(addr => ({
            ...addr,
            isDefault: false
          })).concat([{ 
            id: Date.now(), 
            fullAddress: newAddress,
            isDefault: true 
          }]);
        } else {
          return [...prev, { 
            id: Date.now(), 
            fullAddress: newAddress,
            isDefault: false 
          }];
        }
      });
    }
  };

  // Handler to edit address
  const handleEditAddress = (address) => {
    setEditAddress({
      ...address,
      isDefault: address.isDefault || false
    });
    setIsEditing(true);
    setAddressModalOpen(true);
  };

  // Handler to delete address
  const handleDeleteAddress = async (addressId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      await axios.delete(`https://api.boldeats.in/api/addresses/${addressId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      setAddresses(prev => prev.filter(addr => addr.id !== addressId));
    } catch (err) {
      console.error('Error deleting address:', err.response?.data || err.message);
    }
  };

  // Handler to set default address
  const handleSetDefaultAddress = async (addressId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      console.log('Setting default address for ID:', addressId);

      // First, remove default status from all addresses
      const response = await axios.patch(
        `https://api.boldeats.in/api/addresses/${addressId}/default`,
        { isDefault: true },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      if (response.data && response.data.success) {
        // Update local state to reflect the change
        setAddresses(prev => prev.map(addr => ({
          ...addr,
          isDefault: addr.id === addressId
        })));
        console.log('Default address updated successfully');
      }
    } catch (err) {
      console.error('Error setting default address:', err.response?.data || err.message);
    }
  };

  // Add addressSection component
  const addressSection = (
    <Box sx={{ 
      background: '#fff', 
      borderRadius: 10, 
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
      minWidth: 280, 
      maxWidth: 340, 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'stretch', 
      p: 1.5,
      ml: 2
    }}>
      <Box sx={{ background: '#ffe7d6', borderRadius: 1, py: 0.5, mb: 1.5, textAlign: 'center', fontWeight: 600, fontSize: 15, letterSpacing: 1, color: '#222' }}>DELIVERY ADDRESS</Box>
      
      {loadingAddresses ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
          <CircularProgress size={24} sx={{ color: '#C4362A' }} />
        </Box>
      ) : addresses.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <AddLocationAltIcon sx={{ fontSize: 40, color: '#bdbdbd', mb: 1 }} />
          <Typography sx={{ color: '#888', fontSize: 14 }}>No addresses added yet</Typography>
        </Box>
      ) : (
        <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
          {addresses.map((address, index) => (
            <Box
              key={address.id}
              sx={{
                border: '1.5px solid',
                borderColor: selectedAddress === address.fullAddress ? '#C4362A' : '#e0e0e0',
                borderRadius: 2,
                p: 2,
                mb: 2,
                cursor: 'pointer',
                background: selectedAddress === address.fullAddress ? '#fff3f0' : '#fff',
                '&:hover': {
                  borderColor: '#C4362A',
                  background: '#fff3f0'
                },
                position: 'relative',
                mt: address.isDefault ? 2 : 0
              }}
              onClick={() => setSelectedAddress(address.fullAddress)}
            >
              {address.isDefault && (
                <Box sx={{
                  position: 'absolute',
                  top: -12,
                  left: 10,
                  background: '#4caf50',
                  color: '#fff',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: 12,
                  fontWeight: 600,
                  zIndex: 2,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: '1px solid #fff'
                }}>
                  Default Address
                </Box>
              )}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, pr: 8, mt: address.isDefault ? 1 : 0 }}>
                <LocationOnIcon sx={{ color: selectedAddress === address.fullAddress ? '#C4362A' : '#666', mt: 0.5, flexShrink: 0 }} />
                <Typography sx={{ fontSize: 14, color: '#222', wordBreak: 'break-word', flex: 1 }}>
                  {address.fullAddress}
                </Typography>
              </Box>
              <Box sx={{ position: 'absolute', top: 8, right: 4, display: 'flex', gap: 1 }}>
                <IconButton
                  onClick={e => { 
                    e.stopPropagation(); 
                    handleEditAddress(address);
                  }}
                  sx={{ color: '#1976d2', '&:hover': { background: 'rgba(25, 118, 210, 0.1)' } }}
                  size="small"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={e => { e.stopPropagation(); handleDeleteAddress(address.id); }}
                  sx={{ color: '#C4362A', '&:hover': { background: 'rgba(196, 54, 42, 0.1)' } }}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      )}
      <Button
        fullWidth
        variant="outlined"
        startIcon={<AddLocationAltIcon />}
        onClick={() => {
          setIsEditing(false);
          setEditAddress(null);
          setAddressModalOpen(true);
        }}
        sx={{
          mt: 2,
          borderColor: '#C4362A',
          color: '#C4362A',
          '&:hover': {
            borderColor: '#C4362A',
            background: '#fff3f0'
          }
        }}
      >
        Add New Address
      </Button>
    </Box>
  );

  // Fetch menu items for each meal type
  useEffect(() => {
    const fetchMenuItems = async (mealType) => {
      if (!caterer?.id) return;

      setLoadingMenu(prev => ({ ...prev, [mealType]: true }));
      try {
        const response = await axios.get(
          `https://api.boldeats.in/api/vendors/${caterer.id}/menu?mealType=${mealType}`
        );

        console.log(`${mealType} menu response:`, response.data);

        if (response.data && response.data.success === 'true') {
          const menuData = response.data.data.menu || [];
          if (menuData.length > 0) {
            setMenuItems(prev => ({
              ...prev,
              [mealType]: menuData
            }));
            
            // Add this meal type to available types if it has items
            setAvailableMealTypes(prev => {
              const newTypes = prev.includes(mealType) ? prev : [...prev, mealType];
              // Custom sort to ensure lunch comes first, then dinner
              return newTypes.sort((a, b) => {
                if (a === 'lunch') return -1;
                if (b === 'lunch') return 1;
                if (a === 'dinner') return -1;
                if (b === 'dinner') return 1;
                return a.localeCompare(b);
              });
            });
          }
        }
      } catch (err) {
        console.error(`Error fetching ${mealType} menu:`, err.response?.data || err.message);
      } finally {
        setLoadingMenu(prev => ({ ...prev, [mealType]: false }));
      }
    };

    // Reset states when caterer changes
    setMenuItems({
      breakfast: [],
      lunch: [],
      dinner: []
    });
    setAvailableMealTypes([]);
    setActiveTab(0);

    // Fetch menu for all meal types
    fetchMenuItems('breakfast');
    fetchMenuItems('lunch');
    fetchMenuItems('dinner');
  }, [caterer]);

  // Render tabs based on available meal types
  const renderTabs = () => (
    <>
      <Typography variant="h5" sx={{ 
        textAlign: 'center', 
        mb: 3, 
        fontWeight: 600,
        color: '#222'
      }}>
        Choose your weekly menu
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        justifyContent: 'center', 
        mb: 4 
      }}>
        {availableMealTypes.map((mealType, index) => (
          <Button
            key={mealType}
            onClick={() => setActiveTab(index)}
            sx={{
              minWidth: 120,
              py: 1,
              px: 3,
              borderRadius: 2,
              background: activeTab === index ? '#C4362A' : 'transparent',
              color: activeTab === index ? '#fff' : '#222',
              border: `1.5px solid ${activeTab === index ? '#C4362A' : '#e0e0e0'}`,
              fontWeight: 600,
              '&:hover': {
                background: activeTab === index ? '#C4362A' : '#fff3f0',
                borderColor: '#C4362A'
              }
            }}
          >
            {mealType.toUpperCase()}
          </Button>
        ))}
      </Box>
    </>
  );

  // Render menu items for active tab
  const renderMenuItems = () => {
    const activeMealType = availableMealTypes[activeTab];
    const items = menuItems[activeMealType] || [];
    const isLoading = loadingMenu[activeMealType];

    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={40} sx={{ color: '#C4362A' }} />
        </Box>
      );
    }

    if (items.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography sx={{ color: '#666', fontSize: 16 }}>
            No menu items available for {activeMealType}
          </Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              background: '#fff',
              borderRadius: 3,
              border: '1.5px solid #e0e0e0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 2,
              mb: 0,
              minHeight: 80,
              justifyContent: 'space-between',
              width: { xs: '100%', sm: '90%', md: '80%' },
              mx: 'auto',
            }}
          >
            {/* Left: Veg icon (green circle), MENU 1, Day, Description */}
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mr: 2 }}>
                <FiberManualRecordIcon sx={{ color: '#1dbf73', fontSize: 24, mb: 0.5 }} />
                <Typography sx={{ fontSize: 11, color: '#888', fontWeight: 600, mb: 0.5, mt: 0.5 }}>
                  MENU 1
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#222', mb: 0.5 }}>
                  {item.dayOfWeek}
                </Typography>
                {item.items && (
                  <Typography sx={{ fontSize: 13, color: '#222', fontWeight: 500, letterSpacing: 0.15 }}>
                    {item.items.join(' , ').toUpperCase()}
                  </Typography>
                )}
              </Box>
            </Box>
            {/* Right: Food Image */}
            <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Avatar 
                src={foodImg} // Replace with item.image if available
                alt="food" 
                sx={{ 
                  width: 56, 
                  height: 56, 
                  borderRadius: '10px', 
                  border: '1.5px solid #e0e0e0', 
                  objectFit: 'cover',
                  background: '#fff',
                }} 
              />
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  // Fetch addresses using user token
  useEffect(() => {
    const fetchAddresses = async () => {
      setLoadingAddresses(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found, skipping address fetch');
          setLoadingAddresses(false);
          return;
        }
        const response = await axios.get('https://api.boldeats.in/api/addresses', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        if (response.data && response.data.data) {
          // Format addresses if needed
          const formattedAddresses = response.data.data.map(address => ({
            ...address,
            fullAddress: `${address.addressLine1}${address.addressLine2 ? `, ${address.addressLine2}` : ''}, ${address.city}, ${address.state} - ${address.pincode}`,
            isDefault: address.isDefault || false
          }));
          setAddresses(formattedAddresses);
          // Select default address if available
          const defaultAddress = formattedAddresses.find(addr => addr.isDefault) || formattedAddresses[0];
          if (defaultAddress) {
            setSelectedAddress(defaultAddress.fullAddress);
          }
        }
      } catch (err) {
        console.error('Error fetching addresses:', err.response?.data || err.message);
      } finally {
        setLoadingAddresses(false);
      }
    };
    fetchAddresses();
  }, []);

  return (
    <>
      <Header />
      <Box sx={{ background: '#fff', minHeight: '100vh', pb: 6, mt: 4 }}>
        {/* Top Vendor Info */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'center', md: 'flex-start' }, 
          maxWidth: 1200, 
          mx: 'auto', 
          mt: { xs: 10, sm: 12, md: 14 }, 
          px: { xs: 2, sm: 3, md: 4 },
          gap: { xs: 3, md: 0 }
        }}>
          {/* Left: Image & Info */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 3,
            alignItems: { xs: 'center', sm: 'flex-start' },
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            <img 
              src={`https://api.boldeats.in/${caterer.logo}`} 
              alt={caterer.name} 
              style={{ 
                width: { xs: '100%', sm: 180 },
                height: { xs: 'auto', sm: 120 },
                maxWidth: 180,
                borderRadius: 12, 
                objectFit: 'cover', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)' 
              }} 
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/180x120?text=No+Image';
              }}
            />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>{caterer.name}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                {[...Array(caterer.rating || 5)].map((_, i) => (
                  <span key={i} style={{ color: '#FFD600', fontSize: 18 }}>★</span>
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mt: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                <Chip label="Non-veg" color="error" size="small" icon={<CancelIcon sx={{ color: '#fff' }} />} />
                <Chip label="Veg" color="success" size="small" icon={<CheckCircleIcon sx={{ color: '#fff' }} />} />
              </Box>
              <Typography sx={{ mt: 1, fontSize: 15 }}>{caterer.yearsInBusiness} years in business · {caterer.address}</Typography>
              <Typography sx={{ fontSize: 15 }}>Open {caterer.openingTime} - {caterer.closingTime}</Typography>
              {caterer.phoneNumber && (
                <Typography sx={{ fontSize: 15 }}>Contact: {caterer.phoneNumber}</Typography>
              )}
            </Box>
          </Box>
          {/* Right: Info */}
          <Box sx={{ 
            minWidth: { xs: '100%', md: 320 }, 
            textAlign: { xs: 'center', md: 'right' }, 
            mt: { xs: 2, md: 1 } 
          }}>
            <Typography sx={{ fontSize: 15 }}>Lunch and Dinner can be ordered from the site.</Typography>
            <Typography sx={{ fontSize: 15, mt: 2 }}>
              For breakfast please contact support
            </Typography>
          </Box>
        </Box>

        {/* Meal Tabs */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: { xs: 1, sm: 2 }, 
          mt: 4,
          flexWrap: 'wrap',
          px: { xs: 2, sm: 0 }
        }}>
          {availableMealTypes.map((mealType, idx) => (
            <Button
              key={mealType.key}
              variant={activeTab === idx ? 'contained' : 'outlined'}
              sx={{
                borderRadius: 2,
                minWidth: { xs: 'calc(33.33% - 8px)', sm: 120 },
                fontWeight: 600,
                fontSize: { xs: 14, sm: 16 },
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
              {mealType.label}
            </Button>
          ))}
        </Box>

        {/* Main Content: Menu + Cart + Address */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'center', 
          gap: { xs: 3, lg: 4 }, 
          mt: 5, 
          maxWidth: 1200, 
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 }
        }}>
          {/* Left: Weekly Menu */}
          <Box sx={{ 
            background: 'linear-gradient(180deg, #ffe0d3 0%, #fbeee6 100%)', 
            borderRadius: 3, 
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
            p: 2, 
            width: { xs: '100%', lg: 'auto' },
            minWidth: { xs: 'auto', lg: 300 },
            maxWidth: { xs: '100%', lg: 400 },
            flex: 1
          }}>
            {renderTabs()}
            {renderMenuItems()}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button 
                sx={{
                  background: '#fff',
                  color: '#C4362A',
                  fontWeight: 700,
                  fontSize: { xs: 20, sm: 24 },
                  borderRadius: 6,
                  px: { xs: 3, sm: 4 },
                  py: 1,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                  border: '1.5px solid #e0e0e0',
                  '&:hover': {
                    background: '#f5f5f5',
                    color: '#C4362A',
                  },
                }}
                onClick={() => {
                  const token = localStorage.getItem('token');
                  if (!token) {
                    if (window.openLoginModalFromHeader) {
                      window.openLoginModalFromHeader();
                    }
                  } else {
                    setSubscriptionModalOpen(true);
                  }
                }}
              >
                ADD +
              </Button>
            </Box>
          </Box>
          
          {/* Right: Cart and Address Sections */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            width: { xs: '100%', lg: 'auto' }
          }}>
            {/* Cart Section */}
            <Box sx={{ 
              background: '#fff', 
              borderRadius: 10, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
              width: { xs: '100%', md: '50%', lg: 'auto' },
              minWidth: { xs: 'auto', lg: 280 },
              maxWidth: { xs: '100%', lg: 340 },
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'stretch', 
              p: 1.5 
            }}>
              {loadingCart ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                  <CircularProgress size={24} sx={{ color: '#C4362A' }} />
                </Box>
              ) : cartItems.length === 0 ? (
                <>
                  <ShoppingCartOutlinedIcon sx={{ fontSize: 50, color: '#bdbdbd', mb: 1, mt: 2 }} />
                  <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 0.5, mt: 2 }}>OOPS! your cart is EMPTY</Typography>
                  <Typography sx={{ color: '#888', fontSize: 13 }}>Looks like you haven't added to your cart yet.</Typography>
                </>
              ) : (
                <>
                  <Box sx={{ background: '#ffe7d6', borderRadius: 1, py: 0.5, mb: 1.5, textAlign: 'center', fontWeight: 600, fontSize: 15, letterSpacing: 1, color: '#222' }}>CART</Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 11, mb: 1, color: '#222' }}>{cartItems.length} ITEM(S)</Typography>
                  {cartItems.map((item, index) => (
                    <Box key={item.id} sx={{ 
                      border: '1.2px solid #e0e0e0', 
                      borderRadius: 2, 
                      p: 2,
                      display: 'flex', 
                      flexDirection: 'column',
                      mb: 2,
                      background: item.days === 30 ? '#fff3f0' : '#f5f9ff',
                      borderColor: item.days === 30 ? '#ffcdc3' : '#b3d4ff',
                      position: 'relative'
                    }}>
                      <IconButton
                        onClick={() => handleDeleteCartItem(item.id)}
                        sx={{
                          position: 'absolute',
                          top: -10,
                          right: -10,
                          color: '#C4362A',
                          background: '#fff',
                          border: '1px solid #e0e0e0',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          '&:hover': {
                            background: '#fff3f0',
                            borderColor: '#C4362A'
                          },
                          width: 24,
                          height: 24,
                          padding: 0
                        }}
                        size="small"
                      >
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#222' }}>
                          {item.days} Days Subscription
                        </Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#222' }}>
                          ₹{item.price}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: 12, color: '#666' }}>
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#222' }}>
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
                      background: '#c4362a', 
                      color: '#fff', 
                      fontWeight: 700, 
                      fontSize: 15, 
                      borderRadius: 2, 
                      py: 1, 
                      mt: 1, 
                      boxShadow: 'none', 
                      '&:hover': { 
                        background: '#c4362a' 
                      },
                      '&.Mui-disabled': {
                        background: '#e0e0e0',
                        color: '#999'
                      }
                    }}
                    onClick={() => setPaymentModalOpen(true)}
                    disabled={!selectedAddress || addresses.length === 0}
                  >
                    {!selectedAddress && addresses.length === 0 ? 'ADD ADDRESS TO CHECKOUT' : 'CHECKOUT'}
                  </Button>
                </>
              )}
            </Box>
            
            {/* Address Section */}
            <Box sx={{ 
              background: '#fff', 
              borderRadius: 10, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
              width: { xs: '100%', md: '50%', lg: 'auto' },
              minWidth: { xs: 'auto', lg: 280 },
              maxWidth: { xs: '100%', lg: 340 },
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'stretch', 
              p: 1.5,
              ml: { xs: 0, md: 2 }
            }}>
              {addressSection}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Modals */}
      {cartQty > 0 && (
        <PaymentModal 
          open={paymentModalOpen} 
          onClose={() => setPaymentModalOpen(false)} 
          price={totalPrice}
        />
      )}
      <SubscriptionModal 
        open={subscriptionModalOpen}
        onClose={() => setSubscriptionModalOpen(false)}
        onAdd={handleAddToCart}
        caterer={caterer}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
      <AddressModal
        open={addressModalOpen}
        onClose={() => {
          setAddressModalOpen(false);
          setIsEditing(false);
          setEditAddress(null);
        }}
        onAddAddress={handleAddAddress}
        editAddress={editAddress}
        isEditing={isEditing}
      />
    </>
  );
};

export default MenuDetails; 