import React, { useState } from 'react';
import { Modal, Box, TextField, Button, IconButton, InputAdornment, Typography, Select, MenuItem } from '@mui/material';
import { Close, Visibility, VisibilityOff, Email, Phone, Lock, Person } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import logo from '../assets/images/BoldTribe Logo-2.svg';
import axios from 'axios';

const ModalContainer = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  backgroundColor: 'white',
  borderRadius: '20px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  padding: '32px'
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  right: '16px',
  top: '16px',
  color: '#666',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    color: '#333',
  },
});

const RegisterButton = styled(Button)({
  backgroundColor: '#C4362A',
  color: 'white',
  borderRadius: '25px',
  padding: '12px',
  width: '100%',
  fontSize: '16px',
  textTransform: 'none',
  marginTop: '24px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#b02d23',
    transform: 'scale(1.02)',
    boxShadow: '0 4px 15px rgba(196, 54, 42, 0.2)',
  },
});

const ModalLogo = styled('img')({
  height: '150px',
  display: 'block',
  margin: '0 auto 24px'
});

const PhoneInputContainer = styled(Box)({
  display: 'flex',
  gap: '10px',
  alignItems: 'flex-start',
  marginBottom: '16px',
  marginTop: '16px'
});

const CountryCodeSelect = styled(Select)({
  width: '120px',
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '13px 14px',
  },
  '& .MuiMenuItem-root': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }
});

const countryCodes = [
  { code: '+91', flag: '🇮🇳', country: 'India' },
  { code: '+1', flag: '🇺🇸', country: 'USA' },
  { code: '+44', flag: '🇬🇧', country: 'UK' },
  { code: '+61', flag: '🇦🇺', country: 'Australia' },
  { code: '+86', flag: '🇨🇳', country: 'China' },
  { code: '+81', flag: '🇯🇵', country: 'Japan' },
  { code: '+82', flag: '🇰🇷', country: 'South Korea' },
  { code: '+65', flag: '🇸🇬', country: 'Singapore' },
  { code: '+971', flag: '🇦🇪', country: 'UAE' },
  { code: '+966', flag: '🇸🇦', country: 'Saudi Arabia' },
  { code: '+49', flag: '🇩🇪', country: 'Germany' },
  { code: '+33', flag: '🇫🇷', country: 'France' },
  { code: '+39', flag: '🇮🇹', country: 'Italy' },
  { code: '+34', flag: '🇪🇸', country: 'Spain' },
  { code: '+7', flag: '🇷🇺', country: 'Russia' },
  { code: '+55', flag: '🇧🇷', country: 'Brazil' },
  { code: '+52', flag: '🇲🇽', country: 'Mexico' },
  { code: '+27', flag: '🇿🇦', country: 'South Africa' },
  { code: '+234', flag: '🇳🇬', country: 'Nigeria' },
  { code: '+20', flag: '🇪🇬', country: 'Egypt' },
];

const RegisterModal = ({
  open,
  onClose,
  onRegister,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  countryCode,
  setCountryCode,
  registerPassword,
  setRegisterPassword,
  showPassword,
  setShowPassword
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle onChange events with logging
  const handleNameChange = (e) => {
    const value = e.target.value;
    console.log('Name input:', value);
    setName(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    console.log('Email input:', value);
    setEmail(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    console.log('Phone input:', value);
    setPhone(value);
  };

  const handleCountryCodeChange = (e) => {
    const value = e.target.value;
    console.log('Country code selected:', value);
    setCountryCode(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    console.log('Password input:', value);
    setRegisterPassword(value);
  };

  const handleShowPasswordClick = () => {
    const newValue = !showPassword;
    console.log('Show password toggled:', newValue);
    setShowPassword(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validate input
    if (!name || !email || !phone || !registerPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    // Phone validation - only numbers
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
      setError('Phone number should contain only digits');
      setLoading(false);
      return;
    }
    
    // Password length check
    if (registerPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }
    
    try {
      // Format the data according to what the API expects
      const userData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone_number: `${countryCode}${phone}`.replace(/\s+/g, ''),
        password: registerPassword
      };
      
      console.log('Sending registration data:', userData);
      console.log('API endpoint:', 'http://3.108.237.86:3333/api/users/register');
      
      // Try using a different content type
      const headers = {
        'Content-Type': 'application/json'
      };
      
      const response = await axios.post(
        'http://3.108.237.86:3333/api/users/register', 
        userData,
        { headers }
      );
      
      console.log('Registration response:', response.data);
      
      if (response.data) {
        // Registration successful, call the onRegister function from props
        onRegister(e);
      }
    } catch (error) {
      // Log the raw error object for full details
      console.error('Raw error object:', error);
      
      // Check for specific error response details
      if (error.response && error.response.data) {
        console.log('Server error details:', error.response.data);
        
        // Check if the response has specific error messages
        const serverErrorMsg = 
          typeof error.response.data === 'string' 
            ? error.response.data 
            : error.response.data.message || error.response.data.error || JSON.stringify(error.response.data);
        
        setError(`Registration failed: ${serverErrorMsg}`);
      } else if (error.request) {
        console.log('No response received from server');
        setError('Server is not responding. Please try again later.');
      } else {
        console.log('Request setup error:', error.message);
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="register-modal"
      aria-describedby="register-form"
    >
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
        <ModalLogo src={logo} alt="BoldEats" />
        <Typography variant="h5" align="center" gutterBottom>
          Create Account
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 3 }}>
          Join BoldEats today
        </Typography>
        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={handleNameChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: '#666' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: '#666' }} />
                </InputAdornment>
              ),
            }}
          />
          <PhoneInputContainer>
            <CountryCodeSelect
              value={countryCode}
              onChange={handleCountryCodeChange}
              variant="outlined"
            >
              {countryCodes.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </MenuItem>
              ))}
            </CountryCodeSelect>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={phone}
              onChange={handlePhoneChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone sx={{ color: '#666' }} />
                  </InputAdornment>
                ),
              }}
            />
          </PhoneInputContainer>
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            value={registerPassword}
            onChange={handlePasswordChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: '#666' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleShowPasswordClick}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RegisterButton type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </RegisterButton>
        </form>
      </ModalContainer>
    </Modal>
  );
};

export default RegisterModal; 