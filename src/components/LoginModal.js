import React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import logo from '../assets/images/BoldTribe Logo-2.svg';

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

const LoginButton = styled(Button)({
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

const LoginModal = ({ 
  open, 
  onClose, 
  onLogin,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(e);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-modal"
      aria-describedby="login-form"
    >
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
        <ModalLogo src={logo} alt="BoldEats" />
        <Typography variant="h5" align="center" gutterBottom>
          Welcome Back!
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 3 }}>
          Please login to your account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoginButton type="submit">
            Login
          </LoginButton>
        </form>
      </ModalContainer>
    </Modal>
  );
};

export default LoginModal; 