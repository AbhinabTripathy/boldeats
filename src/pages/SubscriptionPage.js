import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, styled, Drawer, Radio, RadioGroup, FormControlLabel, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import axios from 'axios';

const PageContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  marginTop: '90px',
  marginBottom: '90px',
  justifyContent: 'center',
  alignItems: 'center'
});

const MainContent = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  padding: '40px 0'
});

const RedSection = styled(Box)({
  backgroundColor: '#C4362A',
  padding: '20px',
  color: 'white',
  height: '300px',
  position: 'relative',
  marginBottom: '700px',
  width: '100%'
});

const SubscriptionCard = styled(Box)({
  backgroundColor: 'white',
  borderRadius: '25px',
  padding: '40px',
  width: '1165px',
  margin: '0 auto',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  border: '2px solid #E0E0E0',
  position: 'absolute',
  top: '150px',
  left: '52%',
  transform: 'translateX(-50%)',
  zIndex: 2,
  '@media (max-width: 1200px)': {
    width: '90%',
    height: 'auto',
    minHeight: '395px'
  },
  marginTop: '30px'
});

const AmountButton = styled(Button)(({ selected }) => ({
  backgroundColor: 'white',
  color: '#000',
  border: '1px solid #E0E0E0',
  borderRadius: '4px',
  padding: '8px 16px',
  margin: '0 8px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  textTransform: 'none',
  fontWeight: 'normal',
}));

const SubscribeButton = styled(Button)({
  backgroundColor: '#D87C74',
  color: 'white',
  padding: '12px 40px',
  borderRadius: '4px',
  fontSize: '16px',
  textTransform: 'none',
  marginTop: '24px',
  width: '100%',
  '&:hover': {
    backgroundColor: '#C4362A',
  },
});

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E0E0',
    },
    '&:hover fieldset': {
      borderColor: '#E0E0E0',
    },
  },
});

const PaymentDrawerContent = styled(Box)({
  width: 400,
  maxWidth: '100vw',
  padding: '32px 24px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  boxSizing: 'border-box',
  position: 'relative',
});

const PaymentCard = styled(Box)({
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  padding: '24px',
  marginBottom: '32px',
  display: 'flex',
  alignItems: 'center',
});

const PayNowButton = styled(Button)({
  background: '#C4362A',
  color: '#fff',
  borderRadius: '20px',
  fontWeight: 600,
  fontSize: '1.2rem',
  textTransform: 'none',
  width: '100%',
  height: '48px',
  marginTop: '24px',
  boxShadow: 'none',
  '&:hover': {
    background: '#a82a1a',
  },
  '&.Mui-disabled': {
    background: '#bdbdbd',
    color: '#fff',
  },
});

const SubscriptionPage = () => {
  const [customAmount, setCustomAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const amounts = [1400, 1500, 1700, 2000];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }
    axios.get('http://3.108.237.86:3333/api/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setUser(res.data?.data?.user || null);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const handleAmountSelect = (amount) => {
    setCustomAmount(amount.toString());
    if (amount < 1400) {
      setAmountError('The minimum Subscription Price is 1400 per 15 days and 2400 per 30 days.');
    } else {
      setAmountError('');
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value && Number(value) < 1400) {
      setAmountError('The minimum Subscription Price is 1400 per 15 days and 2400 per 30 days.');
    } else {
      setAmountError('');
    }
  };

  const handleLoginClick = () => {
    if (typeof window.openLoginModalFromHeader === 'function') {
      window.openLoginModalFromHeader();
    }
  };

  const handleSubscribe = () => {
    if (!customAmount || Number(customAmount) < 1400) {
      setAmountError('The minimum Subscription Price is 1400 per 15 days and 2400 per 30 days.');
      return;
    }
    setDrawerOpen(true);
  };

  // Helper to determine days and message
  const getSubscriptionMessage = () => {
    const amt = Number(customAmount);
    if (!amt || amt < 1400) return '';
    if (amt === 1400) return 'Thanks for choosing Subscription of 15 days for ₹1400';
    if (amt === 2400) return 'Thanks for choosing Subscription of 30 days for ₹2400';
    if (amt % 2400 === 0) {
      const months = amt / 2400;
      return `Thanks for choosing Subscription of ${months * 30} days for ₹${amt}`;
    }
    if (amt % 1400 === 0) {
      const blocks = amt / 1400;
      return `Thanks for choosing Subscription of ${blocks * 15} days for ₹${amt}`;
    }
    // For any other amount, show proportional days (rounded to 1 decimal)
    const days = ((amt / 1400) * 15).toFixed(1);
    return `Thanks for choosing Subscription of ${days} days for ₹${amt}`;
  };

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <PageContainer>
        <RedSection>
          <Box sx={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '40px' }}>
            <Typography variant="h4" sx={{ fontWeight: 'normal', mb: 1 }}>
              For subscription, please login
            </Typography>
            <SubscribeButton variant="contained" onClick={handleLoginClick} sx={{ width: 300, mt: 4 }}>
              Login
            </SubscribeButton>
          </Box>
        </RedSection>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <MainContent>
        <RedSection>
          <Box sx={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '40px' }}>
            <Typography variant="h4" sx={{ fontWeight: 'normal', mb: 1 }}>
              {user.name}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '1rem' }}>
              {user._id}
            </Typography>
          </Box>
        </RedSection>

        <SubscriptionCard>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 'normal', fontSize: '24px' }}>
            Please enter an amount
          </Typography>
          
          <CustomTextField
            fullWidth
            placeholder="Please enter an amount"
            value={customAmount}
            onChange={handleAmountChange}
            sx={{ mb: 4 }}
          />

          {amountError && (
            <Typography color="error" sx={{ mb: 2, fontWeight: 500, fontSize: '1.1rem' }}>
              {amountError}
            </Typography>
          )}

          <Box sx={{ display: 'flex', gap: 2, mb: 6, flexWrap: 'wrap' }}>
            {amounts.map((amount) => (
              <AmountButton
                key={amount}
                onClick={() => handleAmountSelect(amount)}
              >
                ₹{amount}
              </AmountButton>
            ))}
          </Box>

          <SubscribeButton variant="contained" onClick={handleSubscribe}>
            Subscribe
          </SubscribeButton>
        </SubscriptionCard>
      </MainContent>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { borderTopLeftRadius: 12, borderBottomLeftRadius: 12, width: 420 } }}
      >
        <IconButton
          aria-label="close"
          onClick={() => setDrawerOpen(false)}
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}
        >
          <Close />
        </IconButton>
        <PaymentDrawerContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Choose payment method
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, fontWeight: 500 }}>
            {getSubscriptionMessage()}
          </Typography>
          <PaymentCard>
            <RadioGroup
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="razorpay"
                control={<Radio />}
                label={<Typography sx={{ fontWeight: 500 }}>Debit/ Credit card, Net banking, UPI (Razorpay)</Typography>}
              />
            </RadioGroup>
          </PaymentCard>
          <PayNowButton>
            Pay now
          </PayNowButton>
        </PaymentDrawerContent>
      </Drawer>
    </PageContainer>
  );
};

export default SubscriptionPage; 