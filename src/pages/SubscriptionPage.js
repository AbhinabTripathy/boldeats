import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, styled, Drawer, Radio, RadioGroup, FormControlLabel, IconButton, Modal } from '@mui/material';
import { Close, AddLocationAlt, Edit as EditIcon, Delete as DeleteIcon, RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material';
import axios from 'axios';
import Lock from '@mui/icons-material/Lock';

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
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIdx, setSelectedAddressIdx] = useState(null);
  const [editingAddressIdx, setEditingAddressIdx] = useState(null);
  const [address, setAddress] = useState({ address1: '', address2: '', city: '', state: '', pincode: '' });
  const [addressError, setAddressError] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }
    axios.get('https://api.boldeats.in/api/users/profile', {
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

  // Fetch city/state from pincode
  const fetchCityState = async (pincode) => {
    if (pincode.length !== 6) return;
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();
      if (data[0].Status === 'Success') {
        const postOffice = data[0].PostOffice[0];
        setAddress(prev => ({
          ...prev,
          city: postOffice.District,
          state: postOffice.State
        }));
      }
    } catch (e) {
      // Optionally handle error
    }
  };

  const handleAddressChange = (field, value) => {
    setAddress(prev => ({ ...prev, [field]: value }));
    if (field === 'pincode' && value.length === 6) {
      fetchCityState(value);
    }
  };

  // Open modal for address management
  const handleAddAddress = () => {
    setAddress({ address1: '', address2: '', city: '', state: '', pincode: '' });
    setEditingAddressIdx(null);
    setShowForm(true);
    setAddressModalOpen(true);
  };

  const handleEditAddress = (idx) => {
    setAddress(addresses[idx]);
    setEditingAddressIdx(idx);
    setShowForm(true);
    setAddressModalOpen(true);
  };

  const handleDeleteAddress = (idx) => {
    setAddresses(prev => prev.filter((_, i) => i !== idx));
    // If editing the same address, close the form
    if (editingAddressIdx === idx) {
      setShowForm(false);
      setEditingAddressIdx(null);
    }
  };

  const handleAddressModalClose = () => {
    setAddressModalOpen(false);
    setAddressError('');
    setShowForm(false);
    setEditingAddressIdx(null);
  };

  const handleAddressModalSave = async () => {
    if (!address.address1 || !address.pincode) {
      setAddressError('Address 1 and Pincode are required.');
      return;
    }
    // Prepare payload for API
    const payload = {
      addressLine1: address.address1,
      addressLine2: address.address2,
      city: address.city,
      state: address.state,
      pincode: address.pincode
    };
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://3.108.237.86:3333/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        setAddressError(errorData.message || 'Failed to save address.');
        return;
      }
      const data = await response.json();
      // Add to local state only if POST is successful
      if (editingAddressIdx === null) {
        setAddresses(prev => [...prev, address]);
      } else {
        setAddresses(prev => prev.map((a, i) => i === editingAddressIdx ? address : a));
      }
      setShowForm(false);
      setEditingAddressIdx(null);
      setAddress({ address1: '', address2: '', city: '', state: '', pincode: '' });
      setAddressError('');
      setAddressModalOpen(false);
    } catch (err) {
      setAddressError('Failed to save address.');
    }
  };

  const handleShowAddForm = () => {
    setAddress({ address1: '', address2: '', city: '', state: '', pincode: '' });
    setEditingAddressIdx(null);
    setShowForm(true);
  };

  if (loading) {
    return null;
  }

  if (!localStorage.getItem('token')) {
    return (
      <PageContainer>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 3 }}>
          <Lock sx={{ fontSize: 60, color: '#C4362A', mb: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#C4362A', mb: 1, textAlign: 'center' }}>
            For subscription, please login
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', mb: 2, textAlign: 'center' }}>
            You need to be logged in to access subscription features.
          </Typography>
          <SubscribeButton variant="contained" onClick={() => typeof window.openLoginModalFromHeader === 'function' && window.openLoginModalFromHeader()} sx={{ width: 220, fontSize: 18 }}>
            Login
          </SubscribeButton>
        </Box>
      </PageContainer>
    );
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
          <Button
            variant="outlined"
            startIcon={<AddLocationAlt />}
            sx={{ mt: 2, borderRadius: 2, fontWeight: 600 }}
            onClick={handleAddAddress}
          >
            Add Address
          </Button>
          {addresses.length > 0 && addresses.map((addr, idx) => (
            <Box
              key={idx}
              sx={{
                mt: 2,
                mb: 1,
                p: 2,
                border: selectedAddressIdx === idx ? '2px solid #C4362A' : '1px solid #eee',
                borderRadius: 2,
                background: selectedAddressIdx === idx ? '#fff5f5' : '#fafafa',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedAddressIdx(idx)}
            >
              <Box sx={{ mr: 1, mt: 0.5 }}>
                {selectedAddressIdx === idx ? (
                  <RadioButtonChecked sx={{ color: '#C4362A' }} />
                ) : (
                  <RadioButtonUnchecked sx={{ color: '#bbb' }} />
                )}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center' }}>
                  Delivery Address {idx + 1}
                  <IconButton size="small" sx={{ ml: 1 }} onClick={e => { e.stopPropagation(); handleEditAddress(idx); }}><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" sx={{ ml: 1 }} onClick={e => { e.stopPropagation(); handleDeleteAddress(idx); }}><DeleteIcon fontSize="small" /></IconButton>
                </Typography>
                {addr.address1 && <Typography sx={{ fontSize: 15 }}>{addr.address1}</Typography>}
                {addr.address2 && <Typography sx={{ fontSize: 15 }}>{addr.address2}</Typography>}
                {(addr.city || addr.state || addr.pincode) && (
                  <Typography sx={{ fontSize: 15, mt: 0.5 }}>
                    {[addr.city, addr.state, addr.pincode].filter(Boolean).join(', ')}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </PaymentDrawerContent>
        <Modal
          open={addressModalOpen}
          onClose={handleAddressModalClose}
          aria-labelledby="add-address-modal"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            minWidth: 340,
            maxWidth: 480,
            width: '90vw',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Manage Addresses</Typography>
            {/* Address form for add/edit */}
            {showForm && (
              <Box sx={{ mb: 3, border: '1px solid #eee', borderRadius: 2, p: 2 }}>
                <TextField
                  label="Address 1"
                  fullWidth
                  value={address.address1}
                  onChange={e => handleAddressChange('address1', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Address 2"
                  fullWidth
                  value={address.address2}
                  onChange={e => handleAddressChange('address2', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                    label="Pincode"
                    value={address.pincode}
                    onChange={e => handleAddressChange('pincode', e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="City"
                    value={address.city}
                    InputProps={{ readOnly: true }}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="State"
                    value={address.state}
                    InputProps={{ readOnly: true }}
                    sx={{ flex: 1 }}
                  />
                </Box>
                {addressError && (
                  <Typography color="error" sx={{ mt: 2 }}>{addressError}</Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button onClick={handleAddressModalSave} color="primary" variant="contained" sx={{ borderRadius: 2 }}>
                    {editingAddressIdx !== null ? 'Update' : 'Save'}
                  </Button>
                </Box>
              </Box>
            )}
            {/* List all addresses as cards with edit/delete */}
            {addresses.length > 0 && addresses.map((addr, idx) => (
              <Box
                key={idx}
                sx={{
                  mt: 2,
                  mb: 1,
                  p: 2,
                  border: selectedAddressIdx === idx ? '2px solid #C4362A' : '1px solid #eee',
                  borderRadius: 2,
                  background: selectedAddressIdx === idx ? '#fff5f5' : '#fafafa',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedAddressIdx(idx)}
              >
                <Box sx={{ mr: 1, mt: 0.5 }}>
                  {selectedAddressIdx === idx ? (
                    <RadioButtonChecked sx={{ color: '#C4362A' }} />
                  ) : (
                    <RadioButtonUnchecked sx={{ color: '#bbb' }} />
                  )}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center' }}>
                    Delivery Address {idx + 1}
                    <IconButton size="small" sx={{ ml: 1 }} onClick={e => { e.stopPropagation(); handleEditAddress(idx); }}><EditIcon fontSize="small" /></IconButton>
                    <IconButton size="small" sx={{ ml: 1 }} onClick={e => { e.stopPropagation(); handleDeleteAddress(idx); }}><DeleteIcon fontSize="small" /></IconButton>
                  </Typography>
                  {addr.address1 && <Typography sx={{ fontSize: 15 }}>{addr.address1}</Typography>}
                  {addr.address2 && <Typography sx={{ fontSize: 15 }}>{addr.address2}</Typography>}
                  {(addr.city || addr.state || addr.pincode) && (
                    <Typography sx={{ fontSize: 15, mt: 0.5 }}>
                      {[addr.city, addr.state, addr.pincode].filter(Boolean).join(', ')}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
            <Button
              variant="outlined"
              startIcon={<AddLocationAlt />}
              sx={{ mt: 2, borderRadius: 2, fontWeight: 600 }}
              onClick={handleShowAddForm}
            >
              Add New Address
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button onClick={handleAddressModalClose} color="primary" variant="contained" sx={{ borderRadius: 2 }}>
                Done
              </Button>
            </Box>
          </Box>
        </Modal>
      </Drawer>
    </PageContainer>
  );
};

export default SubscriptionPage; 