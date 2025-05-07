import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  Modal,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add, Remove, Delete, Close, WhatsApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PageContainer = styled(Box)({
  minHeight: 'calc(100vh - 90px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '120px',
  padding: '40px',
  width: '100%',
  '@media (max-width: 768px)': {
    marginTop: '80px',
    padding: '20px'
  }
});

const CartItemCard = styled(Box)({
  backgroundColor: 'white',
  borderRadius: '15px',
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
  marginBottom: '20px',
  width: '100%',
  maxWidth: '500px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    textAlign: 'center',
    padding: '16px'
  }
});

const ItemImage = styled('img')({
  width: '120px',
  height: '120px',
  objectFit: 'cover',
  borderRadius: '8px',
  '@media (max-width: 768px)': {
    width: '100%',
    height: '200px'
  }
});

const QuantityControl = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  border: '1px solid #E0E0E0',
  borderRadius: '4px',
  padding: '4px 8px',
  width: 'fit-content',
  marginTop: '8px'
});

const AddressModal = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  backgroundColor: 'white',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  padding: '32px',
  '@media (max-width: 768px)': {
    width: '90%',
    maxWidth: '400px',
    padding: '20px'
  }
});

const AddressButton = styled(Button)({
  width: '100%',
  padding: '15px',
  border: '1px dashed #ccc',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#f5f5f5'
  }
});

const DeliveryAddressSection = styled(Box)({
  backgroundColor: 'white',
  borderRadius: '15px',
  padding: '24px',
  marginBottom: '20px',
  width: '100%',
  maxWidth: '500px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 768px)': {
    maxWidth: '100%',
    padding: '16px'
  }
});

const ContentContainer = styled(Box)({
  display: 'flex',
  gap: '40px',
  maxWidth: '1200px',
  width: '100%',
  justifyContent: 'center',
  position: 'relative',
  padding: '0 20px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    padding: '0 16px',
    gap: '20px'
  }
});

const MainContent = styled(Box)({
  flex: 1,
  maxWidth: '500px',
  width: '100%',
  '@media (max-width: 768px)': {
    maxWidth: '100%'
  }
});

const BillDetailsCard = styled(Paper)({
  backgroundColor: 'white',
  borderRadius: '15px',
  padding: '24px',
  width: '100%',
  maxWidth: '400px',
  height: 'fit-content',
  position: 'sticky',
  top: '120px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
  marginLeft: '40px',
  '@media (max-width: 768px)': {
    position: 'relative',
    top: '0',
    marginLeft: '0',
    maxWidth: '100%'
  }
});

const WhatsAppButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#25D366',
  '&:hover': {
    backgroundColor: '#128C7E'
  }
});

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    addressLine1: '',
    addressLine2: '',
    state: '',
    city: '',
  });
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      navigate('/');
      return;
    }

    // Load user data
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Load cart items
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
    calculateTotal(items);

    // Fetch addresses from the API
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        // Get auth token
        const token = localStorage.getItem('token');
        
        // Log the token
        console.log('User authentication token:', token);
        
        if (!token) {
          console.error('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://3.108.237.86:3333/api/addresses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Log the full address response
        console.log('Fetched addresses response:', response.data);
        
        if (response.data && response.data.data && Array.isArray(response.data.data.addresses)) {
          // Log all addresses in a more readable format
          console.log('All fetched addresses:', response.data.data.addresses);
          
          // Transform addresses from API to match our format
          const fetchedAddresses = response.data.data.addresses.map((addr, index) => ({
            id: addr._id || `addr-${index}`,
            type: `Address ${index + 1}`,
            addressLine1: addr.addressLine1 || '',
            addressLine2: addr.addressLine2 || '',
            pincode: addr.pincode || '',
            city: addr.city || '',
            state: addr.state || '',
            isDefault: addr.isDefault || false,
            fullAddress: `${addr.addressLine1 || ''}${addr.addressLine2 ? `, ${addr.addressLine2}` : ''}, ${addr.city || ''}, ${addr.state || ''} - ${addr.pincode || ''}`
          }));
          
          setAddresses(fetchedAddresses);
          
          // Set the default address as selected if there is one
          const defaultAddress = fetchedAddresses.find(addr => addr.isDefault === true);
          if (defaultAddress) {
            setSelectedAddress(defaultAddress.id);
          } else if (fetchedAddresses.length > 0) {
            // Otherwise, select the first address
            setSelectedAddress(fetchedAddresses[0].id);
          }
        } else {
          console.error('Invalid address data structure:', response.data);
          setAddresses([]);
          // Add an error message if needed
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
        if (error.response) {
          console.error('API error response:', error.response.data);
        }
        setAddresses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [navigate]);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => {
      const price = parseFloat(item.price.replace('₹', ''));
      return acc + (price * item.quantity);
    }, 0);
    setTotal(sum);
  };

  const updateQuantity = (index, delta) => {
    const newItems = [...cartItems];
    newItems[index].quantity = Math.max(1, newItems[index].quantity + delta);
    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
    calculateTotal(newItems);
  };

  const removeItem = (index) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
    calculateTotal(newItems);
  };

  const getDeliveryDateText = () => {
    const now = new Date();
    const hours = now.getHours();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    // If order is placed between 1 PM to 8 AM next day OR at 10 AM
    if (hours >= 13 || hours < 8 || hours === 10) {
      return `Your order will be delivered on ${formatDate(tomorrow)}`;
    }
    
    return `Your order will be delivered on ${formatDate(now)}`;
  };

  const handleCheckout = () => {
    // Check if address is selected
    if (!selectedAddress) {
      alert('Please enter your delivery address');
      return;
    }

    const selectedAddressDetails = addresses.find(addr => addr.id === selectedAddress);
    if (!selectedAddressDetails) {
      alert('Please enter your delivery address');
      return;
    }

    const deliveryDate = getDeliveryDateText();
    const itemsList = cartItems.map(item => 
      `${item.quantity}x ${item.title} - ₹${item.price}`
    ).join('\n');
    
    const message = `Hi, I would like to place an order:\n${itemsList}\nTotal Amount: ₹${total}\n${deliveryDate}\n\nDelivery Address:\n${selectedAddressDetails.fullAddress}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/+917684836139?text=${encodedMessage}`, '_blank');

    // Clear cart immediately
    localStorage.setItem('cart', '[]');
    setCartItems([]);
    setTotal(0);
    
    // Show success message
    setShowSuccessMessage(true);
    
    // Hide success message and redirect to homepage after 10 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate('/');
    }, 10000); // 10 seconds
  };

  const handlePincodeChange = async (e) => {
    const value = e.target.value;
    setPincode(value);

    if (value.length === 6) {
      setLoading(true);
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await response.json();
        
        if (data[0].Status === 'Success') {
          const location = data[0].PostOffice[0];
          setAddressDetails(prev => ({
            ...prev,
            state: location.State,
            city: location.Division,
          }));
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
      setLoading(false);
    }
  };

  const handleSaveAddress = async () => {
    if (!addressDetails?.addressLine1 || !addressDetails.addressLine1.trim()) {
      return;
    }

    try {
      setLoading(true);
      // Get the stored token
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Please log in to save your address');
        setLoading(false);
        return;
      }

      const addressData = {
        addressLine1: addressDetails.addressLine1.trim(),
        addressLine2: addressDetails.addressLine2.trim() || '',
        pincode,
        city: addressDetails.city,
        state: addressDetails.state,
        isDefault: isDefault
      };

      // Make API call to save address
      const response = await axios.post('http://3.108.237.86:3333/api/addresses', addressData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        console.log('Address saved successfully:', response.data);
        
        // Fetch updated addresses from the API
        const addressesResponse = await axios.get('http://3.108.237.86:3333/api/addresses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Log the token and address response
        console.log('User token after saving address:', token);
        console.log('Updated addresses response:', addressesResponse.data);
        
        if (addressesResponse.data && addressesResponse.data.data && Array.isArray(addressesResponse.data.data.addresses)) {
          // Log all addresses in a more readable format
          console.log('All updated addresses:', addressesResponse.data.data.addresses);
          
          // Transform addresses from API to match our format
          const fetchedAddresses = addressesResponse.data.data.addresses.map((addr, index) => ({
            id: addr._id || `addr-${index}`,
            type: `Address ${index + 1}`,
            addressLine1: addr.addressLine1 || '',
            addressLine2: addr.addressLine2 || '',
            pincode: addr.pincode || '',
            city: addr.city || '',
            state: addr.state || '',
            isDefault: addr.isDefault || false,
            fullAddress: `${addr.addressLine1 || ''}${addr.addressLine2 ? `, ${addr.addressLine2}` : ''}, ${addr.city || ''}, ${addr.state || ''} - ${addr.pincode || ''}`
          }));
          
          setAddresses(fetchedAddresses);
          
          // Set the default address as selected if there is one
          const defaultAddress = fetchedAddresses.find(addr => addr.isDefault === true);
          if (defaultAddress) {
            setSelectedAddress(defaultAddress.id);
          } else if (fetchedAddresses.length > 0) {
            // Otherwise, select the first address
            setSelectedAddress(fetchedAddresses[0].id);
          }
        } else {
          console.error('Invalid address data structure in save response:', addressesResponse.data);
        }
        
        setOpenAddressModal(false);
        resetAddressForm();
      }
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetAddressForm = () => {
    setPincode('');
    setAddressDetails({
      addressLine1: '',
      addressLine2: '',
      state: '',
      city: '',
    });
    setIsDefault(false);
  };

  return (
    <PageContainer>
      {showSuccessMessage && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            textAlign: 'center',
            maxWidth: '90%',
            width: '400px'
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, color: '#4CAF50' }}>
            Order Placed Successfully!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {getDeliveryDateText()}
          </Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>
            You will receive your order at 1:00 PM
          </Typography>
        </Box>
      )}
      <ContentContainer>
        <MainContent>
          {!isLoggedIn ? (
            <Box sx={{ 
              textAlign: 'center', 
              mt: 4,
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '40px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
            }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#333' }}>
                Please Login to View Cart
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
                You need to be logged in to view and manage your cart
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate('/')}
                sx={{ 
                  backgroundColor: '#C4362A',
                  '&:hover': { backgroundColor: '#b02d23' },
                  padding: '12px 32px',
                  fontSize: '16px',
                  textTransform: 'none'
                }}
              >
                Go to Login
              </Button>
            </Box>
          ) : cartItems.length === 0 ? (
            <Box sx={{ 
              textAlign: 'center', 
              mt: 4,
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '40px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
            }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#333' }}>
                Welcome{userData ? `, ${userData.firstName}` : ''}!
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, color: '#666' }}>
                Your cart is empty
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
                Start your journey with BoldEats by exploring our delicious menu
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate('/menu')}
                sx={{ 
                  backgroundColor: '#C4362A',
                  '&:hover': { backgroundColor: '#b02d23' },
                  padding: '12px 32px',
                  fontSize: '16px',
                  textTransform: 'none',
                  borderRadius: '25px',
                  boxShadow: '0 4px 15px rgba(196, 54, 42, 0.2)'
                }}
              >
                Start Ordering
              </Button>
            </Box>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <CartItemCard key={index}>
                  <ItemImage src={item.image} alt={item.title} />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 500 }}>
                        {item.title}
                      </Typography>
                      <IconButton 
                        onClick={() => removeItem(index)}
                        sx={{ 
                          color: '#666',
                          p: 0,
                          '&:hover': { color: '#C4362A' }
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          textDecoration: 'line-through', 
                          color: '#666' 
                        }}
                      >
                        ₹99
                      </Typography>
                      <Typography variant="body1">
                        Only For {item.price}
                      </Typography>
                    </Box>
                    <QuantityControl>
                      <IconButton 
                        onClick={() => updateQuantity(index, -1)} 
                        size="small"
                        sx={{ p: 0 }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <IconButton 
                        onClick={() => updateQuantity(index, 1)} 
                        size="small"
                        sx={{ p: 0 }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </QuantityControl>
                  </Box>
                </CartItemCard>
              ))}

              <DeliveryAddressSection>
                <Typography variant="h6" sx={{ mb: 2, fontSize: '18px' }}>
                  Delivery Address
                </Typography>
                
                <Box sx={{ mb: 2, maxHeight: '300px', overflowY: 'auto' }}>
                  {addresses.length > 0 ? (
                    <RadioGroup
                      value={selectedAddress}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                    >
                      {addresses.map((address) => (
                        <FormControlLabel
                          key={address.id}
                          value={address.id}
                          control={
                            <Radio 
                              sx={{
                                color: '#666',
                                '&.Mui-checked': {
                                  color: '#4CAF50'
                                }
                              }}
                            />
                          }
                          label={
                            <Box sx={{ wordBreak: 'break-word' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                  {address.type}
                                </Typography>
                                {address.isDefault && (
                                  <Typography 
                                    variant="caption" 
                                    sx={{ 
                                      backgroundColor: '#E0E0E0',
                                      px: 1,
                                      py: 0.5,
                                      borderRadius: '4px',
                                      fontSize: '10px'
                                    }}
                                  >
                                    Default
                                  </Typography>
                                )}
                              </Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {address.fullAddress}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: '#4CAF50',
                                  mt: 0.5
                                }}
                              >
                                Delivery charge: Free
                              </Typography>
                            </Box>
                          }
                          sx={{ 
                            mb: 2,
                            alignItems: 'flex-start',
                            '& .MuiFormControlLabel-label': {
                              flex: 1,
                              minWidth: 0
                            }
                          }}
                        />
                      ))}
                    </RadioGroup>
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                      No saved addresses found. Please add a new address.
                    </Typography>
                  )}
                </Box>

                <AddressButton 
                  onClick={() => setOpenAddressModal(true)}
                  sx={{
                    border: '1px solid #E0E0E0',
                    color: '#666',
                    textTransform: 'none',
                    fontSize: '14px',
                    mt: 'auto'
                  }}
                >
                  Add New Address
                </AddressButton>
              </DeliveryAddressSection>
            </>
          )}
        </MainContent>
        {cartItems.length > 0 && (
          <Box sx={{ width: '400px', position: 'relative' }}>
            <BillDetailsCard elevation={0}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: '18px' }}>
                Bill Details <Typography component="span" color="text.secondary" sx={{ fontSize: '12px' }}>(Includes Taxes)</Typography>
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">MRP Total</Typography>
                <Typography>₹{total + 6}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Item Savings</Typography>
                <Typography sx={{ color: '#4CAF50' }}>- ₹6</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Delivery Fee</Typography>
                <Typography sx={{ color: '#4CAF50' }}>FREE</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ fontWeight: 500 }}>To Pay</Typography>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography 
                    sx={{ 
                      textDecoration: 'line-through',
                      color: '#666',
                      fontSize: '14px'
                    }}
                  >
                    ₹{total + 6}
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>₹{total}</Typography>
                </Box>
              </Box>

              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 2, fontSize: '12px', fontStyle: 'italic' }}
              >
                {getDeliveryDateText()}
              </Typography>

              <WhatsAppButton
                fullWidth
                variant="contained"
                onClick={handleCheckout}
                sx={{
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '16px'
                }}
              >
                <WhatsApp />
                Book Your Order on WhatsApp
              </WhatsAppButton>
            </BillDetailsCard>
          </Box>
        )}
      </ContentContainer>

      <Modal
        open={openAddressModal}
        onClose={() => {
          setOpenAddressModal(false);
          resetAddressForm();
        }}
      >
        <AddressModal>
          <IconButton
            onClick={() => {
              setOpenAddressModal(false);
              resetAddressForm();
            }}
            sx={{
              position: 'absolute',
              right: '16px',
              top: '16px'
            }}
          >
            <Close />
          </IconButton>

          <Typography variant="h6" sx={{ mb: 3 }}>Add New Address</Typography>

          <TextField
            fullWidth
            label="Address Line 1"
            value={addressDetails.addressLine1}
            onChange={(e) => setAddressDetails(prev => ({ ...prev, addressLine1: e.target.value }))}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Enter address line 1"
          />

          <TextField
            fullWidth
            label="Address Line 2"
            value={addressDetails.addressLine2}
            onChange={(e) => setAddressDetails(prev => ({ ...prev, addressLine2: e.target.value }))}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Enter address line 2 (optional)"
          />

          <TextField
            fullWidth
            label="Pincode"
            value={pincode}
            onChange={handlePincodeChange}
            sx={{ mb: 2 }}
            inputProps={{ maxLength: 6 }}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Enter 6-digit pincode"
          />

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TextField
                fullWidth
                label="City"
                value={addressDetails.city}
                disabled
                sx={{ mb: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                label="State"
                value={addressDetails.state}
                disabled
                sx={{ mb: 3 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </>
          )}

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>Set as Default Address:</Typography>
            <RadioGroup 
              row 
              value={isDefault.toString()} 
              onChange={(e) => setIsDefault(e.target.value === "true")}
            >
              <FormControlLabel 
                value="true" 
                control={<Radio />} 
                label="Yes" 
              />
              <FormControlLabel 
                value="false" 
                control={<Radio />} 
                label="No" 
              />
            </RadioGroup>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSaveAddress}
            disabled={
              !addressDetails?.addressLine1?.trim() ||
              !pincode ||
              pincode.length !== 6 ||
              loading ||
              !addressDetails?.state ||
              !addressDetails?.city
            }
            sx={{
              backgroundColor: '#C4362A',
              '&:hover': { backgroundColor: '#b02d23' },
              '&.Mui-disabled': {
                backgroundColor: '#ccc',
                color: '#666'
              }
            }}
          >
            Save Address
          </Button>
        </AddressModal>
      </Modal>
    </PageContainer>
  );
};

export default CartPage; 