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

const PageContainer = styled(Box)({
  minHeight: 'calc(100vh - 90px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '120px',
  padding: '40px',
  width: '100%'
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
  maxWidth: '500px'
});

const ItemImage = styled('img')({
  width: '120px',
  height: '120px',
  objectFit: 'cover',
  borderRadius: '8px'
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
  padding: '32px'
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
  flexDirection: 'column'
});

const ContentContainer = styled(Box)({
  display: 'flex',
  gap: '40px',
  maxWidth: '1200px',
  width: '100%',
  justifyContent: 'center',
  position: 'relative',
  padding: '0 20px'
});

const MainContent = styled(Box)({
  flex: 1,
  maxWidth: '500px',
  width: '100%'
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
  marginLeft: '40px'
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
  const [addressDetails, setAddressDetails] = useState({
    buildingNumber: '',
    floorNumber: '',
    address: '',
    state: '',
    district: '',
    city: '',
    area: ''
  });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
    calculateTotal(items);
    // Load saved addresses
    const savedAddresses = JSON.parse(localStorage.getItem('addresses') || '[]');
    setAddresses(savedAddresses);
    if (savedAddresses.length > 0) {
      setSelectedAddress(savedAddresses[0].id);
    }
  }, []);

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
    const deliveryDate = getDeliveryDateText();
    const itemsList = cartItems.map(item => 
      `${item.quantity}x ${item.title} - ₹${item.price}`
    ).join('\n');
    
    const message = `Hi, I would like to place an order:\n${itemsList}\nTotal Amount: ₹${total}\n${deliveryDate}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/+917684836139?text=${encodedMessage}`, '_blank');
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
            district: location.District,
            city: location.Division,
            area: location.Name
          }));
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
      setLoading(false);
    }
  };

  const handleSaveAddress = () => {
    if (!addressDetails?.address || !addressDetails.address.trim()) {
      return;
    }
    
    const newAddress = {
      id: addresses.length + 1,
      type: `Address ${addresses.length + 1}`,
      buildingNumber: addressDetails.buildingNumber || '',
      floorNumber: addressDetails.floorNumber || '',
      address: addressDetails.address.trim(),
      pincode,
      ...addressDetails,
      fullAddress: `${addressDetails.buildingNumber || ''}${addressDetails.floorNumber ? `, Floor ${addressDetails.floorNumber}` : ''}, ${addressDetails.address.trim()}, ${addressDetails.area || ''}, ${addressDetails.city || ''}, ${addressDetails.district || ''}, ${addressDetails.state || ''} - ${pincode}`
    };
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    setSelectedAddress(newAddress.id);
    setOpenAddressModal(false);
    resetAddressForm();
  };

  const resetAddressForm = () => {
    setPincode('');
    setAddressDetails({
      buildingNumber: '',
      floorNumber: '',
      address: '',
      state: '',
      district: '',
      city: '',
      area: ''
    });
  };

  return (
    <PageContainer>
      <ContentContainer>
        <MainContent>
          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Your cart is empty</Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate('/menu')}
                sx={{ 
                  backgroundColor: '#C4362A',
                  '&:hover': { backgroundColor: '#b02d23' }
                }}
              >
                Continue Shopping
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
                  {addresses.length > 0 && (
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
                                {address.id === addresses[0].id && (
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
            label="Building Number"
            value={addressDetails.buildingNumber}
            onChange={(e) => setAddressDetails(prev => ({ ...prev, buildingNumber: e.target.value }))}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Enter building number"
          />

          <TextField
            fullWidth
            label="Floor Number"
            value={addressDetails.floorNumber}
            onChange={(e) => setAddressDetails(prev => ({ ...prev, floorNumber: e.target.value }))}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Enter floor number (optional)"
          />

          <TextField
            fullWidth
            label="Address"
            value={addressDetails.address}
            onChange={(e) => setAddressDetails(prev => ({ ...prev, address: e.target.value }))}
            multiline
            rows={2}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Enter complete address"
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
                label="Area"
                value={addressDetails.area}
                disabled
                sx={{ mb: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
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
                label="District"
                value={addressDetails.district}
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

          <Button
            fullWidth
            variant="contained"
            onClick={handleSaveAddress}
            disabled={
              !addressDetails?.buildingNumber?.trim() ||
              !addressDetails?.address?.trim() ||
              !pincode ||
              pincode.length !== 6 ||
              loading ||
              !addressDetails?.state ||
              !addressDetails?.city ||
              !addressDetails?.area
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